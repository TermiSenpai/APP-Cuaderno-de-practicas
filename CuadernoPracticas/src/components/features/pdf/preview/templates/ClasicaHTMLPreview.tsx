/**
 * Clásica HTML Preview Template
 * Real-time HTML preview matching the Clásica PDF template
 */

import type {
  PDFGenerationOptions,
  Dia,
} from "../../../../../core/models/types";
import {
  groupDaysForPages,
  formatDateRange,
} from "../../../../../core/utils/pdfUtils";

interface ClasicaHTMLPreviewProps {
  options: PDFGenerationOptions;
}

export function ClasicaHTMLPreview({ options }: ClasicaHTMLPreviewProps) {
  const { config, data } = options;
  const { colors } = config;
  const horasDefault = data.config?.horasPorDia ?? 5;
  const nombreEmpresa = data.config?.nombreEmpresa ?? "Centro de Trabajo";

  // Use same pagination logic as PDF
  const pages = groupDaysForPages(data.dias, "clasica");

  return (
    <div className="flex flex-col gap-6 p-6">
      {pages.map((diasInPage, pageIndex) => {
        const firstDate = diasInPage[0]?.fecha;
        const lastDate = diasInPage[diasInPage.length - 1]?.fecha;
        const dateRange =
          firstDate && lastDate ? formatDateRange(firstDate, lastDate) : "";

        return (
          <div
            key={pageIndex}
            className="w-[210mm] h-[297mm] mx-auto shadow-2xl"
            style={{ backgroundColor: colors.background }}
          >
            {/* A4 Page Container */}
            <div className="h-full flex flex-col p-8">
              {/* Header */}
              <div
                className="pb-2 mb-3 border-b-2"
                style={{ borderColor: colors.primary }}
              >
                <h1
                  className="text-center text-sm font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  Hoja de Actividades de Prácticas
                </h1>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold" style={{ color: colors.text }}>
                    Centro de trabajo: {nombreEmpresa}
                  </span>
                  {dateRange && (
                    <span
                      className="italic"
                      style={{ color: colors.secondary }}
                    >
                      {dateRange}
                    </span>
                  )}
                </div>
              </div>

              {/* Content - Days */}
              <div className="flex-1 overflow-hidden">
                {diasInPage.map((dia, idx) => (
                  <DayEntry
                    key={`${dia.fecha}-${idx}`}
                    dia={dia}
                    colors={colors}
                    horasDefault={horasDefault}
                  />
                ))}
              </div>

              {/* Footer */}
              <div
                className="pt-2 mt-3 border-t-2"
                style={{ borderColor: colors.primary }}
              >
                <p
                  className="text-[8px] text-center mb-2"
                  style={{ color: colors.text }}
                >
                  El alumno deberá firmar por cada día de asistencia, siempre
                  supervisado por su tutor en la empresa
                </p>
                <p
                  className="text-[8px] text-right italic"
                  style={{ color: colors.secondary }}
                >
                  Página {pageIndex + 1} de {pages.length}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Day Entry Component
interface DayEntryProps {
  dia: Dia;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  horasDefault: number;
}

function DayEntry({ dia, colors, horasDefault }: DayEntryProps) {
  const horas = dia.horas ?? horasDefault;
  const asistido = dia.asistido ?? true;

  const fecha = new Date(dia.fecha);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div
      className="mb-2 p-2 border rounded"
      style={{ borderColor: colors.secondary }}
    >
      {/* Header */}
      <div
        className="flex justify-between mb-2 pb-2 border-b"
        style={{ borderColor: colors.secondary }}
      >
        <div>
          <p
            className="text-[10px] font-bold capitalize"
            style={{ color: colors.text }}
          >
            {fechaFormateada}
          </p>
          <p
            className="text-[8px] font-bold"
            style={{ color: asistido ? colors.primary : colors.secondary }}
          >
            {asistido ? "✓ Día asistido" : "○ No asistido"}
          </p>
        </div>
        <p className="text-[9px]" style={{ color: colors.text }}>
          Horas: {horas}h
        </p>
      </div>

      {/* Activities */}
      <div>
        <p className="text-[9px] font-bold mb-1" style={{ color: colors.text }}>
          Actividades realizadas:
        </p>
        <div className="ml-2">
          {dia.actividades && dia.actividades.length > 0 ? (
            dia.actividades.map((actividad, idx) => (
              <p
                key={idx}
                className="text-[9px] mb-0.5"
                style={{ color: colors.text }}
              >
                • {actividad}
              </p>
            ))
          ) : (
            <p className="text-[9px]" style={{ color: colors.text }}>
              - Sin actividades registradas
            </p>
          )}
        </div>
      </div>

      {/* Signature */}
      <div
        className="mt-2 pt-2 border-t flex items-center gap-2"
        style={{ borderColor: colors.secondary }}
      >
        <span className="text-[8px]" style={{ color: colors.secondary }}>
          Firma del estudiante:
        </span>
        {dia.firma ? (
          <img
            src={dia.firma}
            alt="Firma"
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div
            className="w-16 h-8 border border-dashed flex items-center justify-center"
            style={{ borderColor: colors.secondary }}
          >
            <span className="text-[7px]" style={{ color: colors.secondary }}>
              Sin firma
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
