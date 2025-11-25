/**
 * Plantilla Minimal
 * Diseño ultra-limpio con paginación dinámica
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";
import { groupDaysForPages } from "../../../core/utils/pdfUtils";
import { MinimalDayEntry } from "../dayEntries/MinimalDayEntry";

export function MinimalTemplate({ config, data }: PDFGenerationOptions) {
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
          DayComponent={MinimalDayEntry}
        />
      ))}
    </Document>
  );
}
