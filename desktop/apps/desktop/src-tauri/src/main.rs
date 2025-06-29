// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;
use serde::{Deserialize, Serialize};

mod judge;
mod database;
mod wasm_runner;

use judge::JudgeResult;
use database::Database;
use wasm_runner::WasmRunner;

#[derive(Debug, Serialize, Deserialize)]
struct Problem {
    id: String,
    title: String,
    description: String,
    difficulty: String,
    test_cases: Vec<TestCase>,
}

#[derive(Debug, Serialize, Deserialize)]
struct TestCase {
    input: String,
    expected_output: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RunCodeRequest {
    code: String,
    language: String,
    problem_id: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RunCodeResponse {
    success: bool,
    results: Vec<TestResult>,
    error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct TestResult {
    passed: bool,
    execution_time_ms: u64,
    memory_used_mb: f64,
    stdout: String,
    stderr: String,
    error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Submission {
    id: String,
    problem_id: String,
    code: String,
    language: String,
    verdict: String,
    submitted_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
struct UserProgress {
    problems_solved: u32,
    total_submissions: u32,
    last_solved_at: Option<chrono::DateTime<chrono::Utc>>,
    language_breakdown: HashMap<String, u32>,
}

struct AppState {
    db: Mutex<Database>,
    wasm_runner: Mutex<WasmRunner>,
    problems: Mutex<HashMap<String, Problem>>,
}

#[tauri::command]
async fn load_problems(state: State<'_, AppState>) -> Result<Vec<Problem>, String> {
    let problems = state.problems.lock().unwrap();
    Ok(problems.values().cloned().collect())
}

#[tauri::command]
async fn get_problem(state: State<'_, AppState>, problem_id: String) -> Result<Problem, String> {
    let problems = state.problems.lock().unwrap();
    problems.get(&problem_id)
        .cloned()
        .ok_or_else(|| "Problem not found".to_string())
}

#[tauri::command]
async fn run_code(
    state: State<'_, AppState>,
    request: RunCodeRequest,
) -> Result<RunCodeResponse, String> {
    let problems = state.problems.lock().unwrap();
    let problem = problems.get(&request.problem_id)
        .ok_or_else(|| "Problem not found")?;
    
    let mut wasm_runner = state.wasm_runner.lock().unwrap();
    let mut results = Vec::new();
    
    for test_case in &problem.test_cases {
        match wasm_runner.run_code(
            &request.code,
            &request.language,
            &test_case.input,
        ).await {
            Ok(result) => {
                let passed = result.stdout.trim() == test_case.expected_output.trim();
                results.push(TestResult {
                    passed,
                    execution_time_ms: result.execution_time_ms,
                    memory_used_mb: result.memory_used_mb,
                    stdout: result.stdout,
                    stderr: result.stderr,
                    error: None,
                });
            }
            Err(e) => {
                results.push(TestResult {
                    passed: false,
                    execution_time_ms: 0,
                    memory_used_mb: 0.0,
                    stdout: String::new(),
                    stderr: String::new(),
                    error: Some(e.to_string()),
                });
            }
        }
    }
    
    Ok(RunCodeResponse {
        success: results.iter().all(|r| r.passed),
        results,
        error: None,
    })
}

#[tauri::command]
async fn submit_solution(
    state: State<'_, AppState>,
    problem_id: String,
    code: String,
    language: String,
    verdict: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    let submission = Submission {
        id: uuid::Uuid::new_v4().to_string(),
        problem_id,
        code,
        language,
        verdict,
        submitted_at: chrono::Utc::now(),
    };
    
    db.save_submission(&submission)
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
async fn get_user_progress(state: State<'_, AppState>) -> Result<UserProgress, String> {
    let db = state.db.lock().unwrap();
    db.get_user_progress()
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_submissions(
    state: State<'_, AppState>,
    problem_id: Option<String>,
) -> Result<Vec<Submission>, String> {
    let db = state.db.lock().unwrap();
    db.get_submissions(problem_id.as_deref())
        .map_err(|e| e.to_string())
}

fn main() {
    // Initialize the app state
    let app_data_dir = tauri::api::path::app_local_data_dir(&tauri::Config::default())
        .expect("Failed to get app data directory");
    
    std::fs::create_dir_all(&app_data_dir)
        .expect("Failed to create app data directory");
    
    let db_path = app_data_dir.join("codequest.db");
    let db = Database::new(&db_path)
        .expect("Failed to initialize database");
    
    let wasm_runner = WasmRunner::new()
        .expect("Failed to initialize WASM runner");
    
    // Load problems from embedded data
    let problems = load_embedded_problems();
    
    let app_state = AppState {
        db: Mutex::new(db),
        wasm_runner: Mutex::new(wasm_runner),
        problems: Mutex::new(problems),
    };

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            load_problems,
            get_problem,
            run_code,
            submit_solution,
            get_user_progress,
            get_submissions
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn load_embedded_problems() -> HashMap<String, Problem> {
    // Load problems from embedded JSON file
    let problems_json = include_str!("../../../problems/problem_list.json");
    
    match serde_json::from_str::<Vec<Problem>>(problems_json) {
        Ok(problems_vec) => {
            let mut problems = HashMap::new();
            for problem in problems_vec {
                problems.insert(problem.id.clone(), problem);
            }
            problems
        }
        Err(e) => {
            eprintln!("Failed to load problems from JSON: {}", e);
            // Return empty HashMap on error
            HashMap::new()
        }
    }
}
