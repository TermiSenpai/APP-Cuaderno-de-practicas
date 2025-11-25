/**
 * usePDFGenerator Hook
 * Custom hook for PDF generation logic
 */

import { useState, useCallback, useMemo } from "react";
import type { PDFTemplate, PDFColors, PDFConfig, CuadernoData } from "../../../core/models/types";
import { getDefaultColors } from "../../../core/services/PDFTemplateRegistry";
import { pdfService } from "../../../core/services/PDFService";

interface UsePDFGeneratorProps {
  data: CuadernoData | null;
  initialConfig?: PDFConfig;
}

export function usePDFGenerator({ data, initialConfig }: UsePDFGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState<PDFTemplate>(
    initialConfig?.template || "clasica"
  );
  
  const [customColors, setCustomColors] = useState<PDFColors>(
    initialConfig?.colors || getDefaultColors("clasica")
  );

  // Update colors when template changes
  const handleTemplateChange = useCallback((template: PDFTemplate) => {
    setSelectedTemplate(template);
    setCustomColors(getDefaultColors(template));
  }, []);

  // Update individual color
  const handleColorChange = useCallback((colorKey: keyof PDFColors, value: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [colorKey]: value,
    }));
  }, []);

  // Current PDF config
  const currentConfig: PDFConfig = useMemo(
    () => ({
      template: selectedTemplate,
      colors: customColors,
    }),
    [selectedTemplate, customColors]
  );

  // Open modal
  const openModal = useCallback(() => {
    setIsOpen(true);
    setError(null);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setError(null);
  }, []);

  // Download PDF
  const downloadPDF = useCallback(
    async (documentComponent: React.ReactElement) => {
      if (!data) {
        setError("No hay datos para generar el PDF");
        return;
      }

      setIsGenerating(true);
      setError(null);

      try {
        const filename = pdfService.getPDFFilename(
          data.config?.nombreEmpresa,
          data.config?.fechaInicio
        );
        
        await pdfService.downloadPDF(
          { config: currentConfig, data },
          documentComponent,
          filename
        );
      } catch (err) {
        console.error("Error downloading PDF:", err);
        setError("Error al descargar el PDF. Por favor, inténtalo de nuevo.");
      } finally {
        setIsGenerating(false);
      }
    },
    [data, currentConfig]
  );

  return {
    isOpen,
    isGenerating,
    error,
    selectedTemplate,
    customColors,
    currentConfig,
    openModal,
    closeModal,
    handleTemplateChange,
    handleColorChange,
    downloadPDF,
  };
}
