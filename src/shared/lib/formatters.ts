/**
 * Formats a question ID into a readable display name
 * @param id - The question ID (e.g., "01-variable-declaration")
 * @returns Formatted display name (e.g., "Variable Declaration")
 */
export const formatQuestionName = (id: string): string => {
  return id
    .replace(/-/g, ' ')
    .replace(/\d+-/, '')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Normalizes text output by trimming whitespace and normalizing line endings
 * @param text - The text to normalize
 * @returns Normalized text
 */
export const normalizeOutput = (text: string): string => {
  return text.trim().replace(/\r\n/g, '\n');
};
