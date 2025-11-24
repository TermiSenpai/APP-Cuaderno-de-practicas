/**
 * Core type definitions for the Cuaderno de Prácticas application
 */

export type Dia = {
  fecha: string; // ISO 8601
  asistido?: boolean;
  horas?: number;
  actividades?: string[];
  firma?: string | null; // dataURL PNG
};

export type CuadernoConfig = {
  nombreEmpresa?: string;
  fechaInicio?: string; // ISO 8601
  fechaFin?: string; // ISO 8601
  diasActivos?: {
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
  };
  horasPorDia?: number;
};

export type CuadernoData = {
  config?: CuadernoConfig;
  dias: Dia[];
};

export type Theme = "dark" | "light";

export type AppEvent = 
  | "cdp-save"
  | "cdp-export"
  | "cdp-import"
  | "cdp-print"
  | "cdp-config";
