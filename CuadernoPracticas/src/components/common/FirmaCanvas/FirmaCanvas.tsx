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
      <div className="text-xs font-medium text-gray-600 dark:text-neutral-400">
        Firma del estudiante
      </div>
      <div className="rounded-xl bg-pink-100/30 border border-pink-300/30 dark:bg-pink-100/10 dark:border-pink-300/20 p-3">
        <canvas
          ref={canvasRef}
          width={150}
          height={150}
          onMouseDown={handlers.onDown}
          onMouseMove={handlers.onMove}
          onMouseUp={handlers.onUp}
          onMouseLeave={handlers.onUp}
          className="block cursor-crosshair rounded-md bg-pink-50/40 dark:bg-pink-50/10"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <button
        onClick={clear}
        className="inline-flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-neutral-200 dark:border-neutral-700/30 dark:hover:bg-neutral-800/40 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" /> Limpiar
      </button>
    </div>
  );
}
