/**
 * Day Card Header Subcomponent
 * Single Responsibility: Display date, weekday, and attendance toggle
 */

import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { formatDDMMYYYY, weekdayEs } from "../../../../core/utils/dateUtils";

interface DayCardHeaderProps {
  fecha: string;
  asistido: boolean;
  onAsistidoChange: (asistido: boolean) => void;
}

export function DayCardHeader({
  fecha,
  asistido,
  onAsistidoChange,
}: DayCardHeaderProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-neutral-200">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 opacity-80" />
        <span className="font-medium">
          {weekdayEs(fecha)}, {formatDDMMYYYY(fecha)}
        </span>
      </div>

      <label className="ml-4 inline-flex items-center gap-2 text-xs select-none">
        <input
          type="checkbox"
          checked={asistido}
          onChange={(e) => onAsistidoChange(e.target.checked)}
        />
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
            asistido
              ? "border-sky-400/30 text-sky-500 dark:text-sky-300"
              : "border-gray-300 text-gray-500 dark:border-neutral-600 dark:text-neutral-400"
          }`}
        >
          {asistido ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <Circle className="h-3.5 w-3.5" />
          )}{" "}
          Día asistido
        </span>
      </label>
    </div>
  );
}
