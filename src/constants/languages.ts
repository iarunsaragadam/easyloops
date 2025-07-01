export const SUPPORTED_LANGUAGES = [
  { value: "python", label: "Python3" },
  { value: "go", label: "Go" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "rust", label: "Rust" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["value"];
