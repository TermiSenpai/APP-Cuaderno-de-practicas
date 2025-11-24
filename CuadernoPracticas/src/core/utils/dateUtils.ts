/**
 * Date formatting utilities
 * Single Responsibility: Only handles date formatting operations
 */

import type { CuadernoConfig, Dia } from "../models/types";

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

/**
 * Generate days array based on configuration
 * @param config Configuration with start date, end date, and active days
 * @returns Array of Dia objects
 */
export function generateDiasFromConfig(config?: CuadernoConfig): Dia[] {
  if (!config?.fechaInicio || !config?.fechaFin) {
    return [];
  }

  const startDate = new Date(config.fechaInicio);
  const endDate = new Date(config.fechaFin);
  
  // Validate dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
    return [];
  }

  const dias: Dia[] = [];
  const currentDate = new Date(startDate);

  // Map of day names to weekday numbers (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayNameToWeekday: Record<string, number> = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
  };

  // Get active weekday numbers
  const activeDays = new Set<number>();
  if (config.diasActivos) {
    Object.entries(config.diasActivos).forEach(([dayName, isActive]) => {
      if (isActive) {
        activeDays.add(dayNameToWeekday[dayName]);
      }
    });
  }

  // If no active days specified, default to Monday-Friday
  if (activeDays.size === 0) {
    [1, 2, 3, 4, 5].forEach(day => activeDays.add(day));
  }

  // Generate days
  while (currentDate <= endDate) {
    const weekday = currentDate.getDay();
    
    if (activeDays.has(weekday)) {
      dias.push({
        fecha: currentDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        asistido: true,
        horas: config.horasPorDia || 5,
        actividades: [],
        firma: null,
      });
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dias;
}

