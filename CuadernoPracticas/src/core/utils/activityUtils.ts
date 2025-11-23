/**
 * Activity parsing utilities
 * Single Responsibility: Only handles activity text parsing
 */

/**
 * Parse activity text into array of activities
 * Splits by newlines, trims whitespace, filters empty strings
 */
export function parseActivities(text: string): string[] {
  return text
    .split(/\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Join activity array into single text string
 */
export function joinActivities(arr: string[] | undefined): string {
  if (!arr || !arr.length) return "";
  return arr.join("\n");
}
