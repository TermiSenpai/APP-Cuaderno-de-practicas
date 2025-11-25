/**
 * Plantilla Profesional
 * Diseño corporativo con paginación optimizada
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";
import { groupDaysForPages } from "../../../core/utils/pdfUtils";
import { ProfesionalDayEntry } from "../dayEntries/ProfesionalDayEntry";

export function ProfesionalTemplate({ config, data }: PDFGenerationOptions) {
  // Use dynamic pagination with profesional-specific height calculation
  const pages = groupDaysForPages(data.dias, "profesional");
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
          DayComponent={ProfesionalDayEntry}
        />
      ))}
    </Document>
  );
}
