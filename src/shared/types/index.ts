export interface TestResult {
  testCase: string;
  expected: string;
  actual: string;
  passed: boolean;
  input?: string;
}

export interface Question {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
}

export interface TestCase {
  inputFile: string;
  expectedFile: string;
  description: string;
}

export interface CodeExecutionResult {
  output: string;
  testResults: TestResult[];
  executionTime?: number;
}

export interface ExecutionMode {
  type: 'RUN' | 'SUBMIT';
  testCaseLimit?: number;
  createSnapshot?: boolean;
}

export interface SubmissionResult {
  id: string;
  success: boolean;
  message: string;
  timestamp: Date;
  questionId: string;
  language: string;
  code: string;
  testResults: TestResult[];
  passedCount: number;
  failedCount: number;
  totalCount: number;
  executionTime?: number;
  overallStatus: 'PASSED' | 'PARTIAL' | 'FAILED';
}

export interface SubmissionSnapshot {
  id: string;
  timestamp: Date;
  questionId: string;
  language: string;
  code: string;
  testResults: TestResult[];
}

export interface SubmissionService {
  submitCode: (
    code: string,
    testCases: TestCase[],
    language: string,
    questionId: string
  ) => Promise<SubmissionResult>;
  getSubmissions: (questionId?: string) => Promise<SubmissionResult[]>;
  getSnapshots: (questionId?: string) => Promise<SubmissionSnapshot[]>;
}

export interface ResizablePaneProps {
  width: number;
  onWidthChange: (width: number) => void;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}

export interface DraggableDividerProps {
  onMouseDown: (e: React.MouseEvent) => void;
  orientation: 'horizontal' | 'vertical';
  className?: string;
}

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  isRunning?: boolean;
  isSubmitting?: boolean;
  onRun: () => void;
  onSubmit: () => void;
}

export interface TestResultsPanelProps {
  testResults: TestResult[];
  output: string;
  height?: number;
  lastSubmission?: SubmissionResult | null;
}

export interface QuestionSelectorProps {
  selectedQuestionId: string;
  availableQuestions: string[];
  onQuestionChange: (questionId: string) => void;
  isLoading?: boolean;
}

export interface ProblemDescriptionProps {
  question: Question | null;
  isLoading: boolean;
}

export interface PyodideManager {
  pyodide: unknown;
  isLoaded: boolean;
  loadingError?: string | null;
  runCode: (
    code: string,
    testCases: TestCase[]
  ) => Promise<CodeExecutionResult>;
}

export interface LayoutState {
  leftPaneWidth: number;
  testResultsHeight: number;
  isDraggingHorizontal: boolean;
  isDraggingVertical: boolean;
}

export interface AppState {
  pythonCode: string;
  goCode: string;
  output: string;
  testResults: TestResult[];
  isRunning: boolean;
  currentQuestion: Question | null;
  availableQuestions: string[];
  selectedQuestionId: string;
  selectedLanguage: string;
  isLoadingQuestion: boolean;
}
