/**
 * Action Buttons Component
 * Single Responsibility: Render and dispatch action buttons
 */

import { Save, Import, FileDown, Printer, Settings } from "lucide-react";
import { eventBus } from "../../../core/services/EventBus";

export function ActionButtons() {
  const btnClass =
    "inline-flex items-center gap-1 rounded-lg border bg-white/90 text-[#2C2A27] border-[#E5DFD9] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/30 hover:text-[#7C3AED] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:border-[#334155] dark:hover:bg-[#22D3EE]/10 dark:hover:border-[#22D3EE]/30 dark:hover:text-[#22D3EE] px-3 py-1.5 text-sm transition-all duration-200";

  return (
    <>
      <button
        onClick={() => eventBus.emit("cdp-save")}
        className={btnClass}
        title="Guardar"
      >
        <Save className="h-4 w-4" />
        <span className="hidden sm:inline">Guardar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-import")}
        className={btnClass}
        title="Importar"
      >
        <Import className="h-4 w-4" />
        <span className="hidden sm:inline">Importar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-export")}
        className={btnClass}
        title="Exportar"
      >
        <FileDown className="h-4 w-4" />
        <span className="hidden sm:inline">Exportar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-pdf-modal")}
        className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#6D28D9] hover:to-[#DB2777] px-3 py-1.5 text-sm text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        title="Generar PDF"
      >
        <Printer className="h-4 w-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>

      <button
        title="Configuración"
        onClick={() => eventBus.emit("cdp-config")}
        className={btnClass}
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Configuración</span>
      </button>
    </>
  );
}
