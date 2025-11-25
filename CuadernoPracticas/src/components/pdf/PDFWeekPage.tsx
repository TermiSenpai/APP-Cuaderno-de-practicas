/**
/**
 * PDF Week Page Component
 * Renders days dynamically with header and footer always visible
 */

import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors, CuadernoConfig } from "../../core/models/types";
import { formatDateRange } from "../../core/utils/pdfUtils";

interface PDFWeekPageProps {
  dias: Dia[];
  colors: PDFColors;
  config?: CuadernoConfig;
  pageNumber: number;
  totalPages: number;
  DayComponent: React.ComponentType<{
    dia: Dia;
    colors: PDFColors;
    horasDefault: number;
  }>;
}

export function PDFWeekPage({
  dias,
  colors,
  config,
  pageNumber,
  totalPages,
  DayComponent,
}: PDFWeekPageProps) {
  const horasDefault = config?.horasPorDia ?? 5;
  const nombreEmpresa = config?.nombreEmpresa ?? "Centro de Trabajo";

  // Calculate date range for this page
  const firstDate = dias[0]?.fecha;
  const lastDate = dias[dias.length - 1]?.fecha;
  const dateRange =
    firstDate && lastDate ? formatDateRange(firstDate, lastDate) : "";

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: colors.background,
      fontFamily: "Helvetica",
    },
    header: {
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    headerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 6,
    },
    empresaLabel: {
      fontSize: 10,
      color: colors.text,
      fontWeight: "bold",
    },
    dateRange: {
      fontSize: 9,
      color: colors.secondary,
      fontStyle: "italic",
    },
    content: {
      flex: 1,
    },
    footer: {
      marginTop: 20,
      paddingTop: 10,
      borderTopWidth: 2,
      borderTopColor: colors.primary,
    },
    footerText: {
      fontSize: 8,
      color: colors.text,
      textAlign: "center",
      marginBottom: 6,
    },
    pageNumber: {
      fontSize: 8,
      color: colors.secondary,
      textAlign: "right",
      fontStyle: "italic",
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Header - Always visible */}
      <View style={styles.header} fixed>
        <Text style={styles.title}>Hoja de Actividades de Prácticas</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.empresaLabel}>
            Centro de trabajo: {nombreEmpresa}
          </Text>
          {dateRange && <Text style={styles.dateRange}>{dateRange}</Text>}
        </View>
      </View>

      {/* Content - Uses dynamic DayComponent */}
      <View style={styles.content}>
        {dias.map((dia: Dia, idx: number) => (
          <DayComponent
            key={`${dia.fecha}-${idx}`}
            dia={dia}
            colors={colors}
            horasDefault={horasDefault}
          />
        ))}
      </View>

      {/* Footer - Always visible */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          El alumno deberá firmar por cada día de asistencia, siempre
          supervisado por su tutor en la empresa
        </Text>
        <Text style={styles.pageNumber}>
          Página {pageNumber} de {totalPages}
        </Text>
      </View>
    </Page>
  );
}
