/**
 * Plantilla Clásica
 * Diseño tradicional con paginación dinámica
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";
import { groupDaysForPages } from "../../../core/utils/pdfUtils";
import { ClasicaDayEntry } from "../dayEntries/ClasicaDayEntry";

export function ClasicaTemplate({ config, data }: PDFGenerationOptions) {
  // Use dynamic pagination with clasica-specific height calculation
  const pages = groupDaysForPages(data.dias, "clasica");
  const totalPages = pages.length;

  return (
    <Document>
      {pages.map((diasInPage, pageIndex) => (
        <PDFWeekPage
          key={pageIndex}
          dias={diasInPage}
          colors={config.colors}
          config={data.config}
          pageNumber={pageIndex + 1}
          totalPages={totalPages}
          DayComponent={ClasicaDayEntry}
        />
      ))}
    </Document>
  );
}
