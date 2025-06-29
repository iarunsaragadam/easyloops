use rusqlite::{Connection, Result, Row};
use std::collections::HashMap;
use std::path::Path;
use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};

use crate::{Submission, UserProgress};

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new<P: AsRef<Path>>(path: P) -> Result<Self> {
        let conn = Connection::open(path)?;
        let db = Database { conn };
        db.init_tables()?;
        Ok(db)
    }
    
    fn init_tables(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS submissions (
                id TEXT PRIMARY KEY,
                problem_id TEXT NOT NULL,
                code TEXT NOT NULL,
                language TEXT NOT NULL,
                verdict TEXT NOT NULL,
                submitted_at TEXT NOT NULL
            )",
            [],
        )?;
        
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS user_stats (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )",
            [],
        )?;
        
        Ok(())
    }
    
    pub fn save_submission(&mut self, submission: &Submission) -> Result<()> {
        self.conn.execute(
            "INSERT INTO submissions (id, problem_id, code, language, verdict, submitted_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            [
                &submission.id,
                &submission.problem_id,
                &submission.code,
                &submission.language,
                &submission.verdict,
                &submission.submitted_at.to_rfc3339(),
            ],
        )?;
        Ok(())
    }
    
    pub fn get_submissions(&self, problem_id: Option<&str>) -> Result<Vec<Submission>> {
        let mut stmt = if let Some(pid) = problem_id {
            self.conn.prepare(
                "SELECT id, problem_id, code, language, verdict, submitted_at 
                 FROM submissions WHERE problem_id = ?1 ORDER BY submitted_at DESC"
            )?
        } else {
            self.conn.prepare(
                "SELECT id, problem_id, code, language, verdict, submitted_at 
                 FROM submissions ORDER BY submitted_at DESC"
            )?
        };
        
        let submission_iter = if let Some(pid) = problem_id {
            stmt.query_map([pid], |row| {
                Ok(Submission {
                    id: row.get(0)?,
                    problem_id: row.get(1)?,
                    code: row.get(2)?,
                    language: row.get(3)?,
                    verdict: row.get(4)?,
                    submitted_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(5)?)
                        .unwrap()
                        .with_timezone(&Utc),
                })
            })?
        } else {
            stmt.query_map([], |row| {
                Ok(Submission {
                    id: row.get(0)?,
                    problem_id: row.get(1)?,
                    code: row.get(2)?,
                    language: row.get(3)?,
                    verdict: row.get(4)?,
                    submitted_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(5)?)
                        .unwrap()
                        .with_timezone(&Utc),
                })
            })?
        };
        
        let mut submissions = Vec::new();
        for submission in submission_iter {
            submissions.push(submission?);
        }
        
        Ok(submissions)
    }
    
    pub fn get_user_progress(&self) -> Result<UserProgress> {
        // Get total submissions
        let total_submissions: u32 = self.conn.query_row(
            "SELECT COUNT(*) FROM submissions",
            [],
            |row| row.get(0)
        ).unwrap_or(0);
        
        // Get problems solved (distinct problem_ids with 'Accepted' verdict)
        let problems_solved: u32 = self.conn.query_row(
            "SELECT COUNT(DISTINCT problem_id) FROM submissions WHERE verdict = 'Accepted'",
            [],
            |row| row.get(0)
        ).unwrap_or(0);
        
        // Get last solved date
        let last_solved_at: Option<DateTime<Utc>> = self.conn.query_row(
            "SELECT MAX(submitted_at) FROM submissions WHERE verdict = 'Accepted'",
            [],
            |row| {
                let date_str: String = row.get(0)?;
                Ok(DateTime::parse_from_rfc3339(&date_str)
                    .unwrap()
                    .with_timezone(&Utc))
            }
        ).ok();
        
        // Get language breakdown
        let mut stmt = self.conn.prepare(
            "SELECT language, COUNT(*) FROM submissions GROUP BY language"
        )?;
        
        let language_iter = stmt.query_map([], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, u32>(1)?))
        })?;
        
        let mut language_breakdown = HashMap::new();
        for item in language_iter {
            let (language, count) = item?;
            language_breakdown.insert(language, count);
        }
        
        Ok(UserProgress {
            problems_solved,
            total_submissions,
            last_solved_at,
            language_breakdown,
        })
    }
}