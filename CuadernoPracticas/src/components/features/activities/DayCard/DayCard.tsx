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
}

export function DayCard({ dia, defaultHoras, onChange }: DayCardProps) {
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
      className="rounded-2xl bg-white border border-gray-200 dark:bg-neutral-900/40 dark:border-neutral-700/30 p-5 space-y-4"
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
