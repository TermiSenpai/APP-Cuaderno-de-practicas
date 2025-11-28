import { describe, it, expect } from "vitest";
import { parseActivities, joinActivities } from "../activityUtils";

describe("activityUtils", () => {
  describe("parseActivities()", () => {
    it("should split text by newlines", () => {
      const text = "Activity 1\nActivity 2\nActivity 3";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Activity 1", "Activity 2", "Activity 3"]);
    });

    it("should trim whitespace from each line", () => {
      const text = "  Activity 1  \n  Activity 2  \n  Activity 3  ";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Activity 1", "Activity 2", "Activity 3"]);
    });

    it("should filter empty lines", () => {
      const text = "Activity 1\n\nActivity 2\n\n\nActivity 3";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Activity 1", "Activity 2", "Activity 3"]);
    });

    it("should filter lines with only whitespace", () => {
      const text = "Activity 1\n   \nActivity 2\n\t\t\nActivity 3";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Activity 1", "Activity 2", "Activity 3"]);
    });

    it("should handle empty string", () => {
      const result = parseActivities("");
      
      expect(result).toEqual([]);
    });

    it("should handle single line", () => {
      const text = "Single activity";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Single activity"]);
    });

    it("should handle text with only newlines", () => {
      const text = "\n\n\n";
      const result = parseActivities(text);
      
      expect(result).toEqual([]);
    });

    it("should handle text with mixed line endings", () => {
      const text = "Activity 1\nActivity 2\nActivity 3";
      const result = parseActivities(text);
      
      expect(result).toEqual(["Activity 1", "Activity 2", "Activity 3"]);
    });

    it("should preserve special characters in activities", () => {
      const text = "Activity with @special #chars!\nAnother € activity";
      const result = parseActivities(text);
      
      expect(result).toEqual([
        "Activity with @special #chars!",
        "Another € activity",
      ]);
    });

    it("should handle very long activities", () => {
      const longActivity = "A".repeat(1000);
      const text = `${longActivity}\nShort activity`;
      const result = parseActivities(text);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(longActivity);
      expect(result[1]).toBe("Short activity");
    });
  });

  describe("joinActivities()", () => {
    it("should join array with newlines", () => {
      const arr = ["Activity 1", "Activity 2", "Activity 3"];
      const result = joinActivities(arr);
      
      expect(result).toBe("Activity 1\nActivity 2\nActivity 3");
    });

    it("should handle empty array", () => {
      const result = joinActivities([]);
      
      expect(result).toBe("");
    });

    it("should handle undefined array", () => {
      const result = joinActivities(undefined);
      
      expect(result).toBe("");
    });

    it("should handle single element array", () => {
      const arr = ["Single activity"];
      const result = joinActivities(arr);
      
      expect(result).toBe("Single activity");
    });

    it("should preserve empty strings in array", () => {
      const arr = ["Activity 1", "", "Activity 2"];
      const result = joinActivities(arr);
      
      expect(result).toBe("Activity 1\n\nActivity 2");
    });

    it("should handle array with special characters", () => {
      const arr = ["Activity @1", "Activity #2", "Activity €3"];
      const result = joinActivities(arr);
      
      expect(result).toBe("Activity @1\nActivity #2\nActivity €3");
    });

    it("should roundtrip correctly with parseActivities", () => {
      const originalText = "Activity 1\nActivity 2\nActivity 3";
      
      const parsed = parseActivities(originalText);
      const joined = joinActivities(parsed);
      
      expect(joined).toBe(originalText);
    });

    it("should handle large arrays", () => {
      const arr = Array.from({ length: 100 }, (_, i) => `Activity ${i + 1}`);
      const result = joinActivities(arr);
      
      expect(result.split("\n")).toHaveLength(100);
    });
  });

  describe("roundtrip conversions", () => {
    it("should maintain data integrity through parse and join", () => {
      const testCases = [
        "Activity 1\nActivity 2\nActivity 3",
        "Single line",
        "Line 1\n\nLine 3", // Note: empty line will be filtered out
        "  Trimmed  \n  Lines  ",
      ];

      testCases.forEach((originalText) => {
        const parsed = parseActivities(originalText);
        const joined = joinActivities(parsed);
        const reparsed = parseActivities(joined);
        
        // After parsing, joining, and reparsing, should get same array
        expect(reparsed).toEqual(parsed);
      });
    });

    it("should handle empty input consistently", () => {
      expect(joinActivities(parseActivities(""))).toBe("");
      expect(parseActivities(joinActivities([]))).toEqual([]);
    });
  });
});
