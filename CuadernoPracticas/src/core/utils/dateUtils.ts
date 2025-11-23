/**
 * Date formatting utilities
 * Single Responsibility: Only handles date formatting operations
 */

const WEEKDAYS_ES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

/**
 * Format ISO date string to DD/MM/YYYY
 */
export function formatDDMMYYYY(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Get weekday name in Spanish from ISO date string
 */
export function weekdayEs(iso: string): string {
  const d = new Date(iso);
  return WEEKDAYS_ES[d.getDay()];
}
