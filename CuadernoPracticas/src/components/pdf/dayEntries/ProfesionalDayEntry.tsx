/**
 * Profesional Day Entry - Corporate Style
 * Business report style with sections and sidebar
 */

import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors } from "../../../core/models/types";

interface ProfesionalDayEntryProps {
  dia: Dia;
  colors: PDFColors;
  horasDefault: number;
}

export function ProfesionalDayEntry({
  dia,
  colors,
  horasDefault,
}: ProfesionalDayEntryProps) {
  const horas = dia.horas ?? horasDefault;
  const asistido = dia.asistido ?? true;

  const fecha = new Date(dia.fecha);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 3,
    },
    statusBar: {
      width: 8,
      backgroundColor: asistido ? colors.primary : colors.secondary,
    },
    contentArea: {
      flex: 1,
      padding: 10,
    },
    firmaSidebar: {
      width: 80,
      borderLeftWidth: 1,
      borderLeftColor: colors.secondary,
      padding: 8,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    header: {
      marginBottom: 8,
    },
    fechaTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: colors.text,
      textTransform: "uppercase",
      marginBottom: 3,
    },
    jornada: {
      fontSize: 8,
      color: colors.secondary,
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 6,
      marginBottom: 4,
      textTransform: "uppercase",
    },
    actividadRow: {
      flexDirection: "row",
      marginBottom: 3,
      gap: 4,
    },
    actividadNumber: {
      fontSize: 8,
      color: colors.primary,
      fontWeight: "bold",
    },
    actividadText: {
      fontSize: 8,
      color: colors.text,
      flex: 1,
    },
    firmaLabel: {
      fontSize: 7,
      color: colors.secondary,
      marginBottom: 6,
      textAlign: "center",
      textTransform: "uppercase",
    },
    firmaImage: {
      width: 65,
      height: 65,
      objectFit: "contain",
    },
    firmaPlaceholder: {
      width: 65,
      height: 35,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container} wrap={false}>
      {/* Status Bar */}
      <View style={styles.statusBar} />

      {/* Main Content */}
      <View style={styles.contentArea}>
        <View style={styles.header}>
          <Text style={styles.fechaTitle}>{fechaFormateada}</Text>
          <Text style={styles.jornada}>Jornada: {horas} horas</Text>
        </View>

        <Text style={styles.sectionTitle}>Actividades Realizadas:</Text>
        {dia.actividades && dia.actividades.length > 0 ? (
          dia.actividades.map((actividad: string, idx: number) => (
            <View key={idx} style={styles.actividadRow}>
              <Text style={styles.actividadNumber}>{idx + 1}.</Text>
              <Text style={styles.actividadText}>→ {actividad}</Text>
            </View>
          ))
        ) : (
          <View style={styles.actividadRow}>
            <Text style={styles.actividadText}>
              Sin actividades registradas
            </Text>
          </View>
        )}
      </View>

      {/* Firma Sidebar */}
      <View style={styles.firmaSidebar}>
        <Text style={styles.firmaLabel}>Firma</Text>
        {dia.firma ? (
          <Image src={dia.firma} style={styles.firmaImage} />
        ) : (
          <View style={styles.firmaPlaceholder}>
            <Text style={{ fontSize: 6, color: colors.secondary }}>
              Sin firma
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
