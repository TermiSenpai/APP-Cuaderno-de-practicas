/**
 * Custom hook for DayCard logic
 * Separates state management from presentation
 */

import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { joinActivities, parseActivities } from "../../../../core/utils/activityUtils";
import type { Dia } from "../../../../core/models/types";

export function useDayCard(dia: Dia, defaultHoras: number, onChange: (updated: Dia) => void) {
  const horas = dia.horas ?? defaultHoras;
  const asistido = dia.asistido ?? true;
  const actividadText = joinActivities(dia.actividades);

  const [actividadTextState, setActividadTextState] = useState(actividadText);
  const [showHorasEditor, setShowHorasEditor] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Keep local text in sync when dia.actividades changes from outside
  useEffect(() => {
    setActividadTextState(joinActivities(dia.actividades));
  }, [dia.actividades]);

  // Click outside to close the hours editor
  useClickOutside(cardRef, () => setShowHorasEditor(false), showHorasEditor);

  const handleAsistidoChange = (asistido: boolean) => {
    onChange({ ...dia, asistido });
  };

  const handleHorasChange = (horas: number) => {
    onChange({ ...dia, horas });
  };

  const handleActivitiesBlur = () => {
    onChange({ ...dia, actividades: parseActivities(actividadTextState) });
  };

  const handleFirmaChange = (firma: string | null) => {
    onChange({ ...dia, firma });
  };

  return {
    cardRef,
    horas,
    asistido,
    actividadTextState,
    setActividadTextState,
    showHorasEditor,
    setShowHorasEditor,
    handlers: {
      handleAsistidoChange,
      handleHorasChange,
      handleActivitiesBlur,
      handleFirmaChange,
    },
  };
}
