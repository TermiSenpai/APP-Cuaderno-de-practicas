/**
 * Action Buttons Component
 * Single Responsibility: Render and dispatch action buttons
 */

import { Save, Import, FileDown, Printer, Settings } from "lucide-react";
import { eventBus } from "../../../core/services/EventBus";

export function ActionButtons() {
  return (
    <>
      <button
        onClick={() => eventBus.emit("cdp-save")}
        className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
        title="Guardar"
      >
        <Save className="h-4 w-4" />
        <span className="hidden sm:inline">Guardar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-import")}
        className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
        title="Importar"
      >
        <Import className="h-4 w-4" />
        <span className="hidden sm:inline">Importar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-export")}
        className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
        title="Exportar"
      >
        <FileDown className="h-4 w-4" />
        <span className="hidden sm:inline">Exportar</span>
      </button>

      <button
        onClick={() => eventBus.emit("cdp-print")}
        className="inline-flex items-center gap-1 rounded-md bg-fuchsia-600/80 hover:bg-fuchsia-600 px-3 py-1.5 text-sm text-white"
        title="Generar PDF"
      >
        <Printer className="h-4 w-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>

      <button
        title="Configuración"
        onClick={() => eventBus.emit("cdp-config")}
        className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Configuración</span>
      </button>
    </>
  );
}
