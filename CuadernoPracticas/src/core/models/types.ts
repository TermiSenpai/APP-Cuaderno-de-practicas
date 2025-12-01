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
  pdfConfig?: PDFConfig; // Configuración de PDF guardada
};

export type CuadernoData = {
  config?: CuadernoConfig;
  dias: Dia[];
};

export type Theme = "dark" | "light";

// Configuration view types
export type ConfigView = "notebook" | "app";

export type AppEvent =
  | "cdp-save"
  | "cdp-export"
  | "cdp-import"
  | "cdp-print"
  | "cdp-pdf-modal"
  | "cdp-config";

// ===== PDF Generation Types =====

export type PDFTemplate =
  | "clasica"
  | "moderna"
  | "minimal"
  | "compacta"
  | "profesional";

export interface PDFColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface PDFConfig {
  template: PDFTemplate;
  colors: PDFColors;
  nombreTutor?: string;
  firmaTutor?: string; // dataURL de firma del tutor
}

export interface PDFGenerationOptions {
  config: PDFConfig;
  data: CuadernoData;
}

export interface TemplateMetadata {
  id: PDFTemplate;
  name: string;
  description: string;
  thumbnail?: string;
}

// ===== Notification System Types =====

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // milliseconds, default 4000
}
