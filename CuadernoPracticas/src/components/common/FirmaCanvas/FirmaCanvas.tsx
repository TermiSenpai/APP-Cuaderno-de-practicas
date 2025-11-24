/**
 * Signature Canvas Component
 * Single Responsibility: Only renders and manages signature input
 * Independent and reusable
 */

import { Trash2 } from "lucide-react";
import { useFirmaCanvas } from "./useFirmaCanvas";

interface FirmaCanvasProps {
  value: string | null | undefined;
  onChange: (dataUrl: string | null) => void;
}

export function FirmaCanvas({ value, onChange }: FirmaCanvasProps) {
  const { canvasRef, handlers, clear } = useFirmaCanvas(value, onChange);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium text-[#6B6865] dark:text-[#94A3B8]">
        Firma del estudiante
      </div>
      <div className="rounded-xl bg-gradient-to-br from-[#EC4899]/10 to-[#7C3AED]/10 border border-[#EC4899]/20 dark:from-[#EC4899]/5 dark:to-[#A78BFA]/5 dark:border-[#A78BFA]/20 p-3">
        <canvas
          ref={canvasRef}
          width={150}
          height={150}
          onMouseDown={handlers.onDown}
          onMouseMove={handlers.onMove}
          onMouseUp={handlers.onUp}
          onMouseLeave={handlers.onUp}
          className="block cursor-crosshair rounded-lg bg-white/80 dark:bg-[#1E293B]/50"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <button
        onClick={clear}
        className="inline-flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-lg border bg-white/90 text-[#2C2A27] border-[#E5DFD9] hover:bg-[#EC4899]/10 hover:border-[#EC4899]/30 hover:text-[#EC4899] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:border-[#334155] dark:hover:bg-[#A78BFA]/10 dark:hover:border-[#A78BFA]/30 dark:hover:text-[#A78BFA] transition-all duration-200"
      >
        <Trash2 className="h-3.5 w-3.5" /> Limpiar
      </button>
    </div>
  );
}
