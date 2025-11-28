/**
 * Day Card Component
 * Composition of smaller subcomponents
 * Single Responsibility: Compose and coordinate day card UI
 */

import type { Dia } from "../../../../core/models/types";
import { DayCardHeader } from "./DayCardHeader";
import { HoursEditor } from "./HoursEditor";
import { ActivitiesTextArea } from "./ActivitiesTextArea";
import { FirmaCanvas } from "../../../common/FirmaCanvas/FirmaCanvas";
import { useDayCard } from "./useDayCard";

interface DayCardProps {
  dia: Dia;
  defaultHoras: number;
  onChange: (updated: Dia) => void;
  index?: number; // Index in the dias array for scrolling purposes
}

export function DayCard({ dia, defaultHoras, onChange, index }: DayCardProps) {
  const {
    cardRef,
    horas,
    asistido,
    actividadTextState,
    setActividadTextState,
    showHorasEditor,
    setShowHorasEditor,
    handlers,
  } = useDayCard(dia, defaultHoras, onChange);

  return (
    <div
      ref={cardRef}
      data-day-index={index}
      className="rounded-2xl bg-white border border-[#E5DFD9] shadow-[0_2px_8px_rgba(124,58,237,0.06)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.12)] dark:bg-[#1E293B] dark:border-[#334155] dark:shadow-[0_2px_8px_rgba(34,211,238,0.08)] dark:hover:shadow-[0_4px_16px_rgba(34,211,238,0.15)] p-5 space-y-4 transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 text-sm">
        <DayCardHeader
          fecha={dia.fecha}
          asistido={asistido}
          onAsistidoChange={handlers.handleAsistidoChange}
        />

        <HoursEditor
          horas={horas}
          showEditor={showHorasEditor}
          onToggleEditor={() => setShowHorasEditor((s) => !s)}
          onHorasChange={handlers.handleHorasChange}
          onEditorClose={() => setShowHorasEditor(false)}
        />
      </div>

      {/* Activities and Signature side by side */}
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <ActivitiesTextArea
            value={actividadTextState}
            onChange={setActividadTextState}
            onBlur={handlers.handleActivitiesBlur}
          />
        </div>

        <div className="flex-shrink-0">
          <FirmaCanvas
            value={dia.firma ?? null}
            onChange={handlers.handleFirmaChange}
          />
        </div>
      </div>
    </div>
  );
}
