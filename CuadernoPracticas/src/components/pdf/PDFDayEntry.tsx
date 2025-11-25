/**
 * PDF Day Entry Component
 * Renders a single day's activities in the PDF
 */

import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors } from "../../core/models/types";

interface PDFDayEntryProps {
  dia: Dia;
  colors: PDFColors;
  horasDefault: number;
}

export function PDFDayEntry({ dia, colors, horasDefault }: PDFDayEntryProps) {
  const horas = dia.horas ?? horasDefault;
  const asistido = dia.asistido ?? true;

  const fecha = new Date(dia.fecha);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const styles = StyleSheet.create({
    dayContainer: {
      marginBottom: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 4,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
    },
    fecha: {
      fontSize: 10,
      color: colors.text,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    horasInfo: {
      fontSize: 9,
      color: colors.text,
    },
    asistidoBadge: {
      fontSize: 8,
      color: asistido ? colors.primary : colors.secondary,
      fontWeight: "bold",
    },
    actividadesLabel: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 4,
      fontWeight: "bold",
    },
    actividadesList: {
      marginLeft: 8,
    },
    actividadItem: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 2,
    },
    firmaContainer: {
      marginTop: 8,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: colors.secondary,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    firmaLabel: {
      fontSize: 8,
      color: colors.secondary,
    },
  });

  return (
    <View style={styles.dayContainer} wrap={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.fecha}>{fechaFormateada}</Text>
          <Text style={styles.asistidoBadge}>
            {asistido ? "✓ Día asistido" : "○ No asistido"}
          </Text>
        </View>
        <Text style={styles.horasInfo}>Horas: {horas}h</Text>
      </View>

      <View>
        <Text style={styles.actividadesLabel}>Actividades realizadas:</Text>
        <View style={styles.actividadesList}>
          {dia.actividades && dia.actividades.length > 0 ? (
            dia.actividades.map((actividad: string, idx: number) => (
              <Text key={idx} style={styles.actividadItem}>
                • {actividad}
              </Text>
            ))
          ) : (
            <Text style={styles.actividadItem}>
              - Sin actividades registradas
            </Text>
          )}
        </View>
      </View>

      {dia.firma && (
        <View style={styles.firmaContainer}>
          <Text style={styles.firmaLabel}>Firma del estudiante</Text>
        </View>
      )}
    </View>
  );
}
