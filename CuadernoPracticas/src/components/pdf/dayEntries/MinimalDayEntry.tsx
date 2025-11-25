/**
 * Minimal Day Entry - Ultra Clean Layout
 * No borders, only separator lines, inline signature
 */

import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors } from "../../../core/models/types";

interface MinimalDayEntryProps {
  dia: Dia;
  colors: PDFColors;
  horasDefault: number;
}

export function MinimalDayEntry({
  dia,
  colors,
  horasDefault,
}: MinimalDayEntryProps) {
  const horas = dia.horas ?? horasDefault;
  const asistido = dia.asistido ?? true;

  const fecha = new Date(dia.fecha);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondary,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      gap: 12,
    },
    fecha: {
      fontSize: 11,
      color: colors.text,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    separator: {
      fontSize: 10,
      color: colors.secondary,
    },
    horas: {
      fontSize: 10,
      color: colors.text,
    },
    asistido: {
      fontSize: 10,
      color: asistido ? colors.primary : colors.secondary,
      fontWeight: "bold",
    },
    firmaSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    firmaLabel: {
      fontSize: 8,
      color: colors.secondary,
    },
    firmaImage: {
      width: 40,
      height: 40,
      objectFit: "contain",
    },
    firmaPlaceholder: {
      width: 40,
      height: 20,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
    },
    actividadesList: {
      marginTop: 4,
    },
    actividadItem: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 3,
    },
  });

  return (
    <View style={styles.container} wrap={false}>
      {/* Single Line Header with all info */}
      <View style={styles.headerRow}>
        <Text style={styles.fecha}>{fechaFormateada}</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.horas}>{horas}h</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.asistido}>{asistido ? "✓" : "○"}</Text>
        <Text style={styles.separator}>•</Text>

        <View style={styles.firmaSection}>
          <Text style={styles.firmaLabel}>Firma:</Text>
          {dia.firma ? (
            <Image src={dia.firma} style={styles.firmaImage} />
          ) : (
            <View style={styles.firmaPlaceholder}>
              <Text style={{ fontSize: 6, color: colors.secondary }}>···</Text>
            </View>
          )}
        </View>
      </View>

      {/* Activities with minimal bullets */}
      <View style={styles.actividadesList}>
        {dia.actividades && dia.actividades.length > 0 ? (
          dia.actividades.map((actividad: string, idx: number) => (
            <Text key={idx} style={styles.actividadItem}>
              ─ {actividad}
            </Text>
          ))
        ) : (
          <Text style={styles.actividadItem}>
            ─ Sin actividades registradas
          </Text>
        )}
      </View>
    </View>
  );
}
