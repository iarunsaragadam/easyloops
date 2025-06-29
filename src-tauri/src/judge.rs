use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct JudgeResult {
    pub verdict: Verdict,
    pub execution_time_ms: u64,
    pub memory_used_mb: f64,
    pub test_results: Vec<TestCaseResult>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Verdict {
    Accepted,
    WrongAnswer,
    TimeLimitExceeded,
    MemoryLimitExceeded,
    RuntimeError,
    CompilationError,
}

impl ToString for Verdict {
    fn to_string(&self) -> String {
        match self {
            Verdict::Accepted => "Accepted".to_string(),
            Verdict::WrongAnswer => "Wrong Answer".to_string(),
            Verdict::TimeLimitExceeded => "Time Limit Exceeded".to_string(),
            Verdict::MemoryLimitExceeded => "Memory Limit Exceeded".to_string(),
            Verdict::RuntimeError => "Runtime Error".to_string(),
            Verdict::CompilationError => "Compilation Error".to_string(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TestCaseResult {
    pub passed: bool,
    pub expected_output: String,
    pub actual_output: String,
    pub execution_time_ms: u64,
    pub memory_used_mb: f64,
    pub error: Option<String>,
}

pub struct Judge;

impl Judge {
    pub fn new() -> Self {
        Judge
    }
    
    pub fn evaluate_output(&self, expected: &str, actual: &str) -> bool {
        // Normalize whitespace and compare
        let expected_normalized = expected.trim();
        let actual_normalized = actual.trim();
        
        expected_normalized == actual_normalized
    }
    
    pub fn determine_verdict(
        &self,
        test_results: &[TestCaseResult],
        time_limit_ms: u64,
        memory_limit_mb: f64,
    ) -> Verdict {
        // Check for runtime errors
        if test_results.iter().any(|r| r.error.is_some()) {
            return Verdict::RuntimeError;
        }
        
        // Check for time limit exceeded
        if test_results.iter().any(|r| r.execution_time_ms > time_limit_ms) {
            return Verdict::TimeLimitExceeded;
        }
        
        // Check for memory limit exceeded
        if test_results.iter().any(|r| r.memory_used_mb > memory_limit_mb) {
            return Verdict::MemoryLimitExceeded;
        }
        
        // Check if all test cases passed
        if test_results.iter().all(|r| r.passed) {
            Verdict::Accepted
        } else {
            Verdict::WrongAnswer
        }
    }
    
    pub fn judge_submission(
        &self,
        test_results: Vec<TestCaseResult>,
        time_limit_ms: u64,
        memory_limit_mb: f64,
    ) -> JudgeResult {
        let verdict = self.determine_verdict(&test_results, time_limit_ms, memory_limit_mb);
        
        let total_time = test_results.iter().map(|r| r.execution_time_ms).sum();
        let max_memory = test_results.iter()
            .map(|r| r.memory_used_mb)
            .fold(0.0, |acc, x| acc.max(x));
        
        JudgeResult {
            verdict,
            execution_time_ms: total_time,
            memory_used_mb: max_memory,
            test_results,
        }
    }
}