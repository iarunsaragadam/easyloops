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
  orientation: "horizontal" | "vertical";
  className?: string;
}

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  isRunning?: boolean;
  onRun: () => void;
  onSubmit: () => void;
}

export interface TestResultsPanelProps {
  testResults: TestResult[];
  output: string;
  height?: number;
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
