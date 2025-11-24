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
    <div className="flex flex-col">
      <div className="text-xs mb-2 font-medium text-gray-600 dark:text-neutral-400">
        Actividades realizadas
      </div>
      <textarea
        placeholder="Escribe las actividades realizadas…&#10;Cada línea será una actividad"
        className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 dark:bg-neutral-900/60 dark:border-neutral-700/40 dark:text-neutral-100 dark:placeholder-neutral-500 px-3 py-2 text-sm resize-y"
        style={{ minHeight: "205px" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
}
