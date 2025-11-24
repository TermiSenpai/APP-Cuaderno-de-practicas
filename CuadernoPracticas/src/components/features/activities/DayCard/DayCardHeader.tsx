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
    <div className="flex items-center gap-3 text-sm text-[#2C2A27] dark:text-[#F1F5F9]">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 opacity-80 text-[#7C3AED] dark:text-[#22D3EE]" />
        <span className="font-medium">
          {weekdayEs(fecha)}, {formatDDMMYYYY(fecha)}
        </span>
      </div>

      <label className="ml-4 inline-flex items-center gap-2 text-xs select-none cursor-pointer">
        <input
          type="checkbox"
          checked={asistido}
          onChange={(e) => onAsistidoChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-medium transition-all duration-200 ${
            asistido
              ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] dark:border-[#34D399]/30 dark:bg-[#34D399]/10 dark:text-[#34D399]"
              : "border-[#E5DFD9] bg-white/50 text-[#6B6865] dark:border-[#334155] dark:bg-[#1E293B]/50 dark:text-[#94A3B8]"
          }`}
        >
          {asistido ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <Circle className="h-3.5 w-3.5" />
          )}
          Día asistido
        </span>
      </label>
    </div>
  );
}
