/**
 * PDF Preview Modal
 * Main modal component for PDF generation with preview and customization
 */

import React, { useMemo } from "react";
import { X, Download, Loader2 } from "lucide-react";
import type { CuadernoData } from "../../../core/models/types";
import { usePDFGenerator } from "./usePDFGenerator";
import { TemplateSelector } from "./TemplateSelector";
import { ColorCustomizer } from "./ColorCustomizer";
import { PDFPreview } from "./PDFPreview";
import { ClasicaTemplate } from "../../pdf/templates/ClasicaTemplate";
import { ModernaTemplate } from "../../pdf/templates/ModernaTemplate";
import { MinimalTemplate } from "../../pdf/templates/MinimalTemplate";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CuadernoData | null;
}

export function PDFPreviewModal({
  isOpen,
  onClose,
  data,
}: PDFPreviewModalProps) {
  const {
    isGenerating,
    error,
    selectedTemplate,
    customColors,
    currentConfig,
    handleTemplateChange,
    handleColorChange,
    downloadPDF,
  } = usePDFGenerator({ data, initialConfig: data?.config?.pdfConfig });

  // Generate the document component for download
  const documentComponent = useMemo(() => {
    if (!data) return null;

    const options = { config: currentConfig, data };
    const templates = {
      clasica: ClasicaTemplate,
      moderna: ModernaTemplate,
      minimal: MinimalTemplate,
    };

    const TemplateComp = templates[selectedTemplate];
    return <TemplateComp {...options} />;
  }, [data, currentConfig, selectedTemplate]);

  const handleDownload = async () => {
    if (!documentComponent) return;
    await downloadPDF(documentComponent);
  };

  if (!isOpen || !data) return null;

  const pdfOptions = { config: currentConfig, data };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Vista Previa y Generación de PDF
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Personaliza el diseño y descarga tu cuaderno de prácticas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Configuration */}
          <div className="w-80 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto p-6 space-y-6">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
            />

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <ColorCustomizer
                colors={customColors}
                onColorChange={handleColorChange}
              />
            </div>
          </div>

          {/* Center - PDF Preview */}
          <div className="flex-1 p-6 overflow-hidden">
            <PDFPreview options={pdfOptions} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
