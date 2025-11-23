/**
 * Activities TextArea Subcomponent
 * Single Responsibility: Display and edit activities list
 */

interface ActivitiesTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function ActivitiesTextArea({
  value,
  onChange,
  onBlur,
}: ActivitiesTextAreaProps) {
  return (
    <div>
      <div className="text-xs mb-1 opacity-70">
        Actividades realizadas (una por línea o separadas por comas)
      </div>
      <textarea
        placeholder="Escribe las actividades realizadas…&#10;Cada línea será una actividad"
        className="w-full min-h-[100px] rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2 text-sm resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
}
