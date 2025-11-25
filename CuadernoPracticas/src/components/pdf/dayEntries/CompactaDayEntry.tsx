/**
 * Compacta Day Entry - Efficient Layout
 * Maximum information in minimum space
 */

import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors } from "../../../core/models/types";

interface CompactaDayEntryProps {
  dia: Dia;
  colors: PDFColors;
  horasDefault: number;
}

export function CompactaDayEntry({
  dia,
  colors,
  horasDefault,
}: CompactaDayEntryProps) {
  const horas = dia.horas ?? horasDefault;
  const asistido = dia.asistido ?? true;

  const fecha = new Date(dia.fecha);
  const diaAbrev = fecha
    .toLocaleDateString("es-ES", { weekday: "short" })
    .charAt(0)
    .toUpperCase();
  const fechaCorta = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });

  const styles = StyleSheet.create({
    container: {
      marginBottom: 6,
      paddingBottom: 6,
      paddingTop: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
      borderBottomStyle: "dashed",
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
      gap: 8,
    },
    fecha: {
      fontSize: 9,
      color: colors.text,
      fontWeight: "bold",
    },
    separator: {
      fontSize: 8,
      color: colors.secondary,
    },
    info: {
      fontSize: 8,
      color: colors.text,
    },
    asistido: {
      fontSize: 8,
      color: asistido ? colors.primary : colors.secondary,
    },
    firmaSmall: {
      width: 25,
      height: 25,
      objectFit: "contain",
    },
    actividadesInline: {
      fontSize: 8,
      color: colors.text,
      lineHeight: 1.3,
    },
  });

  // Concatenate activities in a single line
  const actividadesText =
    dia.actividades && dia.actividades.length > 0
      ? dia.actividades.join(", ")
      : "Sin actividades";

  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.headerRow}>
        <Text style={styles.fecha}>
          {diaAbrev} {fechaCorta}
        </Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.info}>{horas}h</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.asistido}>{asistido ? "✓" : "○"}</Text>
        <Text style={styles.separator}>•</Text>
        {dia.firma && <Image src={dia.firma} style={styles.firmaSmall} />}
      </View>
      <Text style={styles.actividadesInline}>{actividadesText}</Text>
    </View>
  );
}
