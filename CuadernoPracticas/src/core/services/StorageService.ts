/**
 * Storage Service abstraction
 * Interface Segregation Principle: Specific interface for storage operations
 * Open/Closed Principle: Can implement different storage strategies without changing consumers
 */

import type { CuadernoData } from "../models/types";

export interface IStorageService {
  load(): CuadernoData | null;
  save(data: CuadernoData): void;
  saveTheme(theme: string): void;
  loadTheme(): string | null;
}

/**
 * LocalStorage implementation of IStorageService
 * Single Responsibility: Only handles localStorage operations
 */
export class LocalStorageService implements IStorageService {
  private readonly DATA_KEY = "cdp-data";
  private readonly THEME_KEY = "cdp-theme";

  load(): CuadernoData | null {
    try {
      const raw = localStorage.getItem(this.DATA_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    return null;
  }

  save(data: CuadernoData): void {
    try {
      localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      throw error;
    }
  }

  saveTheme(theme: string): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  }

  loadTheme(): string | null {
    try {
      return localStorage.getItem(this.THEME_KEY);
    } catch (error) {
      console.error("Error loading theme:", error);
      return null;
    }
  }
}

// Default instance
export const storageService = new LocalStorageService();
