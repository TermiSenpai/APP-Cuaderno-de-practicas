/**
 * Moderna Day Entry - Two Column Layout
 * Modern magazine-style design with signature on the right
 */

import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Dia, PDFColors } from "../../../core/models/types";

interface ModernaDayEntryProps {
  dia: Dia;
  colors: PDFColors;
  horasDefault: number;
}

export function ModernaDayEntry({
  dia,
  colors,
  horasDefault,
}: ModernaDayEntryProps) {
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
      flexDirection: "row",
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
      paddingBottom: 10,
      paddingLeft: 10,
    },
    leftColumn: {
      flex: 1,
      paddingRight: 10,
    },
    rightColumn: {
      width: 100,
      alignItems: "center",
      justifyContent: "flex-start",
      borderLeftWidth: 1,
      borderLeftColor: colors.secondary,
      paddingLeft: 10,
    },
    fecha: {
      fontSize: 11,
      color: colors.text,
      fontWeight: "bold",
      textTransform: "capitalize",
      marginBottom: 4,
    },
    asistidoBadge: {
      fontSize: 8,
      color: asistido ? colors.primary : colors.secondary,
      marginBottom: 8,
    },
    actividadesLabel: {
      fontSize: 9,
      color: colors.text,
      fontWeight: "bold",
      marginBottom: 4,
    },
    actividadItem: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 3,
      marginLeft: 8,
    },
    infoLabel: {
      fontSize: 8,
      color: colors.secondary,
      marginBottom: 4,
      textAlign: "center",
    },
    infoValue: {
      fontSize: 10,
      color: colors.text,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    firmaContainer: {
      marginTop: 8,
      alignItems: "center",
    },
    firmaLabel: {
      fontSize: 7,
      color: colors.secondary,
      marginBottom: 4,
    },
    firmaImage: {
      width: 70,
      height: 70,
      objectFit: "contain",
    },
    firmaPlaceholder: {
      width: 70,
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
      {/* Left Column - Date and Activities */}
      <View style={styles.leftColumn}>
        <Text style={styles.fecha}>{fechaFormateada}</Text>
        <Text style={styles.asistidoBadge}>
          {asistido ? "✓ Día asistido" : "○ No asistido"}
        </Text>

        <Text style={styles.actividadesLabel}>Actividades:</Text>
        {dia.actividades && dia.actividades.length > 0 ? (
          dia.actividades.map((actividad: string, idx: number) => (
            <Text key={idx} style={styles.actividadItem}>
              • {actividad}
            </Text>
          ))
        ) : (
          <Text style={styles.actividadItem}>- Sin actividades</Text>
        )}
      </View>

      {/* Right Column - Hours, Status, Signature */}
      <View style={styles.rightColumn}>
        <Text style={styles.infoLabel}>HORAS</Text>
        <Text style={styles.infoValue}>{horas}h</Text>

        <View style={styles.firmaContainer}>
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
    </View>
  );
}
