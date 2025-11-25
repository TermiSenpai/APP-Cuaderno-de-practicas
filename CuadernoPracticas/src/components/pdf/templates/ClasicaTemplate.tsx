/**
 * Plantilla Clásica
 * Diseño tradicional con bordes y formato formal
 */

import { Document } from "@react-pdf/renderer";
import type { PDFGenerationOptions } from "../../../core/models/types";
import { PDFWeekPage } from "../PDFWeekPage";

export function ClasicaTemplate({ config, data }: PDFGenerationOptions) {
  const { colors } = config;
  const dias = data.dias || [];

  // Group days into weeks (max 5 days per page)
  const DAYS_PER_PAGE = 5;
  const weeks: (typeof dias)[] = [];

  for (let i = 0; i < dias.length; i += DAYS_PER_PAGE) {
    weeks.push(dias.slice(i, i + DAYS_PER_PAGE));
  }

  return (
    <Document>
      {weeks.map((weekDias, weekIndex) => (
        <PDFWeekPage
          key={`week-${weekIndex}`}
          dias={weekDias}
          colors={colors}
          config={data.config}
          weekNumber={weekIndex + 1}
          pageNumber={weekIndex + 1}
        />
      ))}
    </Document>
  );
}
