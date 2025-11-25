/**
 * PDF Pagination Utility
 * Calculates dynamic page breaks based on content
 */

import type { Dia } from "../models/types";

// Constants for page layout (in points, 1 inch = 72 points)
const PAGE_HEIGHT = 792; // A4 height in points (11 inches)
const PAGE_WIDTH = 612; // A4 width in points (8.5 inches)
const MARGIN = 40;
const HEADER_HEIGHT = 80; // Header with company name and separators
const FOOTER_HEIGHT = 40; // Footer with instructions and page number
const USABLE_HEIGHT = PAGE_HEIGHT - MARGIN * 2 - HEADER_HEIGHT - FOOTER_HEIGHT;

// Estimated heights for day components
const DAY_BASE_HEIGHT = 120; // Base height per day (header + borders + firma)
const ACTIVITY_LINE_HEIGHT = 12; // Height per activity line
const MAX_ACTIVITIES_BEFORE_EXPANSION = 5;

/**
 * Estimates the height a single day will take in the PDF
 */
export function estimateDayHeight(dia: Dia): number {
  let height = DAY_BASE_HEIGHT;
  
  // Add height for activities
  const activitiesCount = dia.actividades?.length || 0;
  if (activitiesCount > 0) {
    // Each activity adds a line, with some extra if there are many
    const extraHeight = activitiesCount * ACTIVITY_LINE_HEIGHT;
    height += Math.min(extraHeight, MAX_ACTIVITIES_BEFORE_EXPANSION * ACTIVITY_LINE_HEIGHT + 20);
  }
  
  return height;
}

/**
 * Groups days into pages dynamically based on content height
 * Ensures no page is empty and no day is split across pages
 */
export function groupDaysForPages(dias: Dia[]): Dia[][] {
  const pages: Dia[][] = [];
  let currentPage: Dia[] = [];
  let currentPageHeight = 0;
  
  for (const dia of dias) {
    const diaHeight = estimateDayHeight(dia);
    
    // Check if adding this day exceeds the usable height
    if (currentPageHeight + diaHeight > USABLE_HEIGHT && currentPage.length > 0) {
      // Save current page and start new one
      pages.push(currentPage);
      currentPage = [dia];
      currentPageHeight = diaHeight;
    } else {
      // Add to current page
      currentPage.push(dia);
      currentPageHeight += diaHeight;
    }
  }
  
  // Add the last page if it has content
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }
  
  // Safety check: if we have no pages, create one with all days
  // This should never happen, but ensures we always return something
  if (pages.length === 0 && dias.length > 0) {
    pages.push(dias);
  }
  
  return pages;
}

/**
 * Gets the week number for a given date
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Formats a date range for display
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  
  return `${start.toLocaleDateString("es-ES", formatOptions)} - ${end.toLocaleDateString("es-ES", formatOptions)}`;
}
