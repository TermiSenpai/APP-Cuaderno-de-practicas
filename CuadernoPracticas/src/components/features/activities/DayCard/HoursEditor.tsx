/**
 * Hours Editor Subcomponent
 * Single Responsibility: Display and edit hours worked
 */

import { useRef, useEffect } from "react";
import { Clock3 } from "lucide-react";

interface HoursEditorProps {
  horas: number;
  showEditor: boolean;
  onToggleEditor: () => void;
  onHorasChange: (horas: number) => void;
  onEditorClose: () => void;
}

export function HoursEditor({
  horas,
  showEditor,
  onToggleEditor,
  onHorasChange,
  onEditorClose,
}: HoursEditorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showEditor) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [showEditor]);

  return (
    <>
      <div className="ml-auto inline-flex items-center gap-2 text-xs opacity-80">
        <button
          type="button"
          onClick={onToggleEditor}
          className="inline-flex items-center gap-2"
          aria-pressed={showEditor}
          aria-label="Mostrar/ocultar horas trabajadas"
        >
          <Clock3 className="h-4 w-4" />
          <span>{horas}h</span>
        </button>
      </div>

      {showEditor && (
        <div className="flex items-center gap-3">
          <div className="text-xs w-40 opacity-70">Horas trabajadas</div>
          <input
            ref={inputRef}
            type="number"
            step={0.5}
            min={0}
            className="w-full max-w-[11rem] sm:w-40 rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2 text-sm"
            value={horas}
            onChange={(e) => onHorasChange(Number(e.target.value))}
            onBlur={onEditorClose}
          />
        </div>
      )}
    </>
  );
}
