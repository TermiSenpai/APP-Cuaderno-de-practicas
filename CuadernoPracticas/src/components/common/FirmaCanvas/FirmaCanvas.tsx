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
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-pink-100/30 border border-pink-300/30 p-2">
        <canvas
          ref={canvasRef}
          width={64}
          height={64}
          onMouseDown={handlers.onDown}
          onMouseMove={handlers.onMove}
          onMouseUp={handlers.onUp}
          onMouseLeave={handlers.onUp}
          className="block h-16 w-16 cursor-crosshair rounded-md bg-pink-50/40"
        />
      </div>
      <div className="text-xs opacity-70">Firma del estudiante</div>
      <button
        onClick={clear}
        className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-neutral-700/30 hover:bg-neutral-800/40"
      >
        <Trash2 className="h-3.5 w-3.5" /> Limpiar
      </button>
    </div>
  );
}
