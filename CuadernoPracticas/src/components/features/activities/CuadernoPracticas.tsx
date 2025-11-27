/**
 * Main CuadernoPracticas Component
 * Single Responsibility: Render list of day cards and coordinate file input
 */

import { DayCard } from "./DayCard/DayCard";
import { useCuadernoPracticas } from "./useCuadernoPracticas";
import { ConfigModal } from "../config/ConfigModal";
import { PDFPreviewModal } from "../pdf/PDFPreviewModal";

export function CuadernoPracticas() {
  const {
    data,
    horasDefault,
    updateDia,
    handleFileLoad,
    isConfigOpen,
    setIsConfigOpen,
    handleConfigSave,
    handleExport,
    handleImport,
    handleCreateNew,
    isPDFModalOpen,
    setIsPDFModalOpen,
  } = useCuadernoPracticas();

  // If no data, still render the modal component but show config modal
  // The modal is already open by default when there's no data (controlled by useCuadernoPracticas hook)

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

      {/* Configuration Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        config={data?.config}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleConfigSave}
        onImport={handleImport}
        onExport={handleExport}
        onCreateNew={handleCreateNew}
      />

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        data={data}
      />

      {/* List of day cards */}
      {data && data.dias.length > 0 && (
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
      )}

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
