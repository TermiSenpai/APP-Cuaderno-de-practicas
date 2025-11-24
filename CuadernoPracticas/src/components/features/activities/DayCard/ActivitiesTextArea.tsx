/**
 * Activities TextArea Subcomponent
 * Single Responsibility: Display and edit activities list
 */

interface ActivitiesText AreaProps {
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
      <div className="text-xs mb-2 font-medium text-[#6B6865] dark:text-[#94A3B8]">
        Actividades realizadas
      </div>
      <textarea
        placeholder="Escribe las actividades realizadas…&#10;Cada línea será una actividad"
        className="w-full rounded-xl bg-white border border-[#E5DFD9] text-[#2C2A27] placeholder-[#6B6865]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F1F5F9] dark:placeholder-[#94A3B8]/50 dark:focus:ring-[#22D3EE]/30 dark:focus:border-[#22D3EE] px-4 py-3 text-sm resize-y transition-all duration-200"
        style={{ minHeight: '205px' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
}
