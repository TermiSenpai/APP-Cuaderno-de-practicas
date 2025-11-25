/**
 * Plantilla Clásica
 * Diseño tradicional con paginación dinámica
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";
import { groupDaysForPages } from "../../../core/utils/pdfUtils";

export function ClasicaTemplate({ config, data }: PDFGenerationOptions) {
  // Use dynamic pagination based on content
  const pages = groupDaysForPages(data.dias);
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
        />
      ))}
    </Document>
  );
}
