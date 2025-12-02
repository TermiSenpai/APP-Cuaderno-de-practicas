/**
 * Minimal HTML Preview Template
 * Placeholder using Clásica as base - customize this later
 */

import type { PDFGenerationOptions } from "../../../../../core/models/types";
import { ClasicaHTMLPreview } from "./ClasicaHTMLPreview";

export function MinimalHTMLPreview(props: { options: PDFGenerationOptions }) {
  return <ClasicaHTMLPreview {...props} />;
}
