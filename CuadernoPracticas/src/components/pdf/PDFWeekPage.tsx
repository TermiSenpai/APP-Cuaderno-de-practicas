/**
 * PDF Week Page Component
 * Renders a week's worth of days (up to 5 days per page)
 */

import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors, CuadernoConfig } from "../../core/models/types";
import { PDFDayEntry } from "./PDFDayEntry";

interface PDFWeekPageProps {
  dias: Dia[];
  colors: PDFColors;
  config?: CuadernoConfig;
  weekNumber: number;
  pageNumber: number;
}

export function PDFWeekPage({
  dias,
  colors,
  config,
  weekNumber,
  pageNumber,
}: PDFWeekPageProps) {
  const horasDefault = config?.horasPorDia ?? 5;
  const nombreEmpresa = config?.nombreEmpresa ?? "Centro de Trabajo";

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: colors.background,
      fontFamily: "Helvetica",
    },
    header: {
      marginBottom: 20,
      paddingBottom: 12,
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
    subtitle: {
      fontSize: 10,
      color: colors.secondary,
      textAlign: "center",
    },
    empresaLabel: {
      fontSize: 11,
      color: colors.text,
      marginBottom: 4,
    },
    weekLabel: {
      fontSize: 9,
      color: colors.secondary,
      marginTop: 8,
      fontStyle: "italic",
    },
    content: {
      flex: 1,
    },
    footer: {
      marginTop: 20,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.secondary,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footerText: {
      fontSize: 8,
      color: colors.secondary,
    },
    pageNumber: {
      fontSize: 8,
      color: colors.text,
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Hoja de Actividades de Prácticas</Text>
        <Text style={styles.empresaLabel}>
          Centro de trabajo: {nombreEmpresa}
        </Text>
        <Text style={styles.weekLabel}>Semana {weekNumber}</Text>
      </View>

      <View style={styles.content}>
        {dias.map((dia: Dia, idx: number) => (
          <PDFDayEntry
            key={`${dia.fecha}-${idx}`}
            dia={dia}
            colors={colors}
            horasDefault={horasDefault}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          El alumno deberá firmar por cada día de asistencia, siempre
          supervisado por su tutor en la empresa
        </Text>
        <Text style={styles.pageNumber}>Hoja {pageNumber}</Text>
      </View>
    </Page>
  );
}
