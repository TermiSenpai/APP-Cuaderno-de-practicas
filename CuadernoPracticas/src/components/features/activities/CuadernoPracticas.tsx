/**
 * Main CuadernoPracticas Component
 * Single Responsibility: Render list of day cards and coordinate file input
 */

import { DayCard } from "./DayCard/DayCard";
import { useCuadernoPracticas } from "./useCuadernoPracticas";

export function CuadernoPracticas() {
  const { data, horasDefault, updateDia, handleFileLoad } =
    useCuadernoPracticas();

  if (!data) return null;

  return (
    <div className="w-full">
      {/* Hidden file input for import */}
      <input
        type="file"
        id="file-import"
        accept=".json"
        onChange={handleFileLoad}
        className="hidden"
      />

      {/* List of day cards */}
      <div className="space-y-6 activities-list">
        {data.dias.map((d, i) => (
          <DayCard
            key={d.fecha + i}
            dia={d}
            defaultHoras={horasDefault}
            onChange={(ud) => updateDia(i, ud)}
          />
        ))}
      </div>

      {/* Print styles */}
      <style>{`
        :root { color-scheme: dark; }
        html, body, #root { height: 100%; width: 100%; }
        body { margin: 0; background: #0b0f1a; }
        @media (max-width: 640px) {
          textarea { min-height: 120px; }
        }
        @media print {
          body { background: white; }
          .print\\:px-0 { padding-left: 0 !important; padding-right: 0 !important; }
          button { display: none !important; }
          textarea { border: 1px solid #e5e7eb; }
        }
      `}</style>
    </div>
  );
}
