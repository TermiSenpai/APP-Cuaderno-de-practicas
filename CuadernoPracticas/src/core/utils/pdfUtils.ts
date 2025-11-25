/**
 * PDF Pagination Utility
 * Calculates dynamic page breaks based on content and template
 */

import type { Dia, PDFTemplate } from "../models/types";

// Constants for page layout (in points, 1 inch = 72 points)
const PAGE_HEIGHT = 792; // A4 height in points (11 inches)
const MARGIN = 30;       // Reducido de 40 → más espacio útil
const HEADER_HEIGHT = 60; // Reducido de 80 → más compacto
const FOOTER_HEIGHT = 30; // Reducido de 40 → más compacto
const USABLE_HEIGHT = PAGE_HEIGHT - MARGIN * 2 - HEADER_HEIGHT - FOOTER_HEIGHT;

// Template-specific height parameters (maximized space utilization)
const TEMPLATE_PARAMS = {
  clasica: {
    dayBaseHeight: 70,    // Reducido de 95 → ultra compacto
    activityLineHeight: 9,  // Reducido de 11
    maxActivitiesBeforeExpansion: 8,
  },
  moderna: {
    dayBaseHeight: 80,    // Reducido de 105 → más compacto
    activityLineHeight: 9,  // Reducido de 11
    maxActivitiesBeforeExpansion: 8,
  },
  minimal: {
    dayBaseHeight: 60,    // Reducido de 85 → mínimo absoluto
    activityLineHeight: 9,  // Reducido de 11
    maxActivitiesBeforeExpansion: 10,
  },
  compacta: {
    dayBaseHeight: 35,    // Reducido de 45 → ultra eficiente
    activityLineHeight: 6,  // Reducido de 7
    maxActivitiesBeforeExpansion: 15,
  },
  profesional: {
    dayBaseHeight: 95,    // Reducido de 125 → más compacto
    activityLineHeight: 10, // Reducido de 12
    maxActivitiesBeforeExpansion: 7,
  },
};

/**
 * Estimates the height a single day will take in the PDF
 * Based on template-specific parameters and ACTUAL content
 */
export function estimateDayHeight(dia: Dia, template: PDFTemplate = "clasica"): number {
  const params = TEMPLATE_PARAMS[template];
  let height = params.dayBaseHeight;
  
  // Calculate height based on ACTUAL number of activities
  const activitiesCount = dia.actividades?.length || 0;
  
  if (activitiesCount > 0) {
    // Calculate total text length to estimate wrapping
    const totalTextLength = dia.actividades?.reduce((sum, act) => sum + act.length, 0) || 0;
    const avgActivityLength = totalTextLength / activitiesCount;
    
    // Estimate line wrapping (assuming ~60 chars per line for normal width)
    const charsPerLine = template === "compacta" ? 80 : 60;
    const linesPerActivity = Math.ceil(avgActivityLength / charsPerLine);
    
    // Each activity can take multiple lines
    const totalLines = activitiesCount * linesPerActivity;
    const extraHeight = totalLines * params.activityLineHeight;
    
    // Add the calculated extra height
    height += extraHeight;
  }
  
  return height;
}

/**
 * Groups days into pages dynamically based on REAL content height and template
 * NO min/max constraints - purely based on whether content fits
 */
export function groupDaysForPages(dias: Dia[], template: PDFTemplate = "clasica"): Dia[][] {
  const pages: Dia[][] = [];
  let currentPage: Dia[] = [];
  let currentPageHeight = 0;
  
  for (const dia of dias) {
    const diaHeight = estimateDayHeight(dia, template);
    
    // Check if this specific day fits in current page
    const wouldExceedPage = currentPageHeight + diaHeight > USABLE_HEIGHT;
    
    if (wouldExceedPage && currentPage.length > 0) {
      // Current page is full, save it and start new page
      pages.push(currentPage);
      currentPage = [dia];
      currentPageHeight = diaHeight;
    } else {
      // Day fits, add to current page
      currentPage.push(dia);
      currentPageHeight += diaHeight;
    }
  }
  
  // Add the last page if it has content
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }
  
  // Safety fallback: ensure at least one page
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

