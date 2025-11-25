/**
 * PDF Template Registry
 * Central registry for all available PDF templates
 */

import type { PDFTemplate, TemplateMetadata } from "../models/types";

export const TEMPLATE_METADATA: Record<PDFTemplate, TemplateMetadata> = {
  clasica: {
    id: "clasica",
    name: "Plantilla Clásica",
    description: "Diseño tradicional con bordes y formato formal, ideal para instituciones educativas tradicionales.",
  },
  moderna: {
    id: "moderna",
    name: "Plantilla Moderna",
    description: "Diseño contemporáneo con gradientes sutiles y tipografía limpia.",
  },
  minimal: {
    id: "minimal",
    name: "Plantilla Minimal",
    description: "Diseño ultra-limpio con espacios amplios y máxima legibilidad.",
  },
};

export const DEFAULT_PDF_COLORS = {
  clasica: {
    primary: "#2563eb",      // Azul clásico
    secondary: "#64748b",    // Gris azulado
    text: "#1e293b",         // Gris oscuro
    background: "#ffffff",   // Blanco
  },
  moderna: {
    primary: "#7c3aed",      // Violeta
    secondary: "#22d3ee",    // Cyan
    text: "#0f172a",         // Slate oscuro
    background: "#fafafa",   // Gris muy claro
  },
  minimal: {
    primary: "#000000",      // Negro
    secondary: "#6b7280",    // Gris medio
    text: "#111827",         // Gris muy oscuro
    background: "#ffffff",   // Blanco
  },
};

/**
 * Get all available templates
 */
export function getAvailableTemplates(): TemplateMetadata[] {
  return Object.values(TEMPLATE_METADATA);
}

/**
 * Get template metadata by ID
 */
export function getTemplateMetadata(templateId: PDFTemplate): TemplateMetadata {
  return TEMPLATE_METADATA[templateId];
}

/**
 * Get default colors for a template
 */
export function getDefaultColors(templateId: PDFTemplate) {
  return DEFAULT_PDF_COLORS[templateId];
}
