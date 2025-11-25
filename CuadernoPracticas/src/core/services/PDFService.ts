/**
 * PDF Service
 * Central service for PDF generation using @react-pdf/renderer
 */

import React from "react";
import { pdf } from "@react-pdf/renderer";

/**
 * Generate PDF document and return as Blob
 */
export async function generatePDFBlob(
  documentComponent: React.ReactElement
): Promise<Blob> {
  try {
    const asPdf = pdf(documentComponent as any);
    const blob = await asPdf.toBlob();
    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}

/**
 * Download PDF document
 */
export async function downloadPDF(
  documentComponent: React.ReactElement,
  filename: string = "cuaderno-practicas.pdf"
): Promise<void> {
  try {
    const blob = await generatePDFBlob(documentComponent);
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw new Error("Failed to download PDF");
  }
}

/**
 * Get filename for PDF based on data
 */
export function getPDFFilename(nombreEmpresa?: string, fechaInicio?: string): string {
  const empresa = nombreEmpresa?.replace(/[^a-z0-9]/gi, "-").toLowerCase() || "cuaderno";
  const fecha = fechaInicio?.replace(/[^0-9]/g, "") || new Date().toISOString().split("T")[0].replace(/[^0-9]/g, "");
  return `${empresa}-practicas-${fecha}.pdf`;
}

export const pdfService = {
  generatePDFBlob,
  downloadPDF,
  getPDFFilename,
};
