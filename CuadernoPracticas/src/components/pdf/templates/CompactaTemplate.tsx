/**
 * Plantilla Compacta
 * Diseño eficiente con paginación optimizada
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";
import { groupDaysForPages } from "../../../core/utils/pdfUtils";
import { CompactaDayEntry } from "../dayEntries/CompactaDayEntry";

export function CompactaTemplate({ config, data }: PDFGenerationOptions) {
  // Use dynamic pagination with compacta-specific height calculation
  const pages = groupDaysForPages(data.dias, "compacta");
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
          DayComponent={CompactaDayEntry}
        />
      ))}
    </Document>
  );
}
