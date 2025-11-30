/**
 * Main CuadernoPracticas Component
 * Single Responsibility: Render list of day cards and coordinate file input
 */

import { useEffect, useRef, useCallback } from "react";
import { DayCard } from "./DayCard/DayCard";
import { useCuadernoPracticas } from "./useCuadernoPracticas";
import { ConfigModal } from "../config/ConfigModal";
import { PDFPreviewModal } from "../pdf/PDFPreviewModal";
import { findFirstEmptyAttendedDay } from "../../../core/utils/dateUtils";
import type { Dia } from "../../../core/models/types";

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

  // Track if initial auto-scroll has already been executed
  const hasAutoScrolled = useRef(false);

  /**
   * Reusable function to scroll to the first empty attended day
   * Can be called from buttons or other UI events in the future
   */
  const scrollToFirstEmptyDay = useCallback((dias: Dia[]) => {
    if (!dias || dias.length === 0) return;

    const firstEmptyIndex = findFirstEmptyAttendedDay(dias);
    if (firstEmptyIndex === -1) {
      console.log("Auto-scroll: No empty attended days found");
      return; // No empty days found
    }

    console.log(`Auto-scroll: Scrolling to day index ${firstEmptyIndex}`);

    // Wait for DOM to render, then scroll
    setTimeout(() => {
      const element = document.querySelector(
        `[data-day-index="${firstEmptyIndex}"]`
      );
      if (element) {
        console.log("Auto-scroll: Element found, scrolling into view");

        // Calculate exact scroll position: element's Y position minus desired offset
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetScrollPosition = absoluteElementTop - 100; // 100px space above

        // Single precise scroll to the exact position
        window.scrollTo({
          top: targetScrollPosition,
          behavior: "smooth",
        });
      } else {
        console.warn(
          `Auto-scroll: Element with data-day-index="${firstEmptyIndex}" not found in DOM`
        );
      }
    }, 500); // Increased delay to ensure DOM is fully ready
  }, []);

  // Auto-scroll to first empty attended day ONLY on initial load or when number of days changes
  useEffect(() => {
    if (!data?.dias || data.dias.length === 0) return;
    if (hasAutoScrolled.current) return; // Already scrolled once

    console.log("Auto-scroll: Triggering scroll effect");
    scrollToFirstEmptyDay(data.dias);
    hasAutoScrolled.current = true; // Mark as scrolled
  }, [data?.dias?.length, scrollToFirstEmptyDay]); // Changed dependency to length only

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
              index={i}
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
