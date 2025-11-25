/**
 * PDF Preview Component
 * Renders a live preview of the PDF
 */

import React, { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import type {
  PDFGenerationOptions,
  PDFTemplate,
} from "../../../core/models/types";
import { ClasicaTemplate } from "../../pdf/templates/ClasicaTemplate";
import { ModernaTemplate } from "../../pdf/templates/ModernaTemplate";
import { MinimalTemplate } from "../../pdf/templates/MinimalTemplate";
import { CompactaTemplate } from "../../pdf/templates/CompactaTemplate";
import { ProfesionalTemplate } from "../../pdf/templates/ProfesionalTemplate";

interface PDFPreviewProps {
  options: PDFGenerationOptions;
}

export function PDFPreview({ options }: PDFPreviewProps) {
  const { config } = options;

  // Select the appropriate template component
  const TemplateComponent = useMemo(() => {
    const templates: Record<
      PDFTemplate,
      React.ComponentType<PDFGenerationOptions>
    > = {
      clasica: ClasicaTemplate,
      moderna: ModernaTemplate,
      minimal: MinimalTemplate,
      compacta: CompactaTemplate,
      profesional: ProfesionalTemplate,
    };
    return templates[config.template];
  }, [config.template]);

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
      <PDFViewer
        key={config.template}
        width="100%"
        height="100%"
        className="border-0"
        showToolbar={false}
      >
        <TemplateComponent {...options} />
      </PDFViewer>
    </div>
  );
}
