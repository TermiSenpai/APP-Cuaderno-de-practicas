/**
 * Compacta HTML Preview Template
 * Placeholder using Clásica as base - customize this later
 */

import type { PDFGenerationOptions } from "../../../../../core/models/types";
import { ClasicaHTMLPreview } from "./ClasicaHTMLPreview";

export function CompactaHTMLPreview(props: { options: PDFGenerationOptions }) {
  return <ClasicaHTMLPreview {...props} />;
}
