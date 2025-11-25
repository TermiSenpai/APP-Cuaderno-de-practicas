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

export type AppEvent = 
  | "cdp-save"
  | "cdp-export"
  | "cdp-import"
  | "cdp-print"
  | "cdp-pdf-modal"
  | "cdp-config";

// ===== PDF Generation Types =====

export type PDFTemplate = "clasica" | "moderna" | "minimal";

export type PDFColors = {
  primary: string;      // Color principal (ej: #7C3AED)
  secondary: string;    // Color secundario (ej: #22D3EE)
  text: string;         // Color de texto títulos
  background: string;   // Fondo de página (si aplica)
};

export type PDFConfig = {
  template: PDFTemplate;
  colors: PDFColors;
  nombreTutor?: string;
  firmaTutor?: string; // dataURL de firma del tutor
};

export type PDFGenerationOptions = {
  config: PDFConfig;
  data: CuadernoData;
};

export type TemplateMetadata = {
  id: PDFTemplate;
  name: string;
  description: string;
  thumbnail?: string;
};
