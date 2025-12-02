/**
 * HTML Preview Component
 * Real-time HTML preview of the PDF with instant color updates
 */

import type { PDFGenerationOptions } from "../../../../core/models/types";
import { ClasicaHTMLPreview } from "./templates/ClasicaHTMLPreview";
import { ModernaHTMLPreview } from "./templates/ModernaHTMLPreview";
import { MinimalHTMLPreview } from "./templates/MinimalHTMLPreview";
import { CompactaHTMLPreview } from "./templates/CompactaHTMLPreview";
import { ProfesionalHTMLPreview } from "./templates/ProfesionalHTMLPreview";

interface HTMLPreviewProps {
  options: PDFGenerationOptions;
}

export function HTMLPreview({ options }: HTMLPreviewProps) {
  const { config } = options;

  // Select the appropriate preview component based on template
  const PreviewComponent = {
    clasica: ClasicaHTMLPreview,
    moderna: ModernaHTMLPreview,
    minimal: MinimalHTMLPreview,
    compacta: CompactaHTMLPreview,
    profesional: ProfesionalHTMLPreview,
  }[config.template];

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-auto">
      <PreviewComponent options={options} />
    </div>
  );
}
