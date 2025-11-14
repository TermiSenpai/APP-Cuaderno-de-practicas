import { useEffect, useState } from "react";
import { Settings, Sun, Moon, Save, Import, FileDown, Printer } from "lucide-react";

type HeaderProps = {
  title?: string;
  totalHoras?: number;
  onSave?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onPrintPDF?: () => void;
};

export default function Header({
  title,
  totalHoras,
  onSave,
  onImport,
  onExport,
  onPrintPDF,
}: HeaderProps) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("cdp-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return "dark";
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Apply theme to the root app container by toggling a class on html
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light-theme");
    } else {
      html.classList.remove("light-theme");
    }
    try {
      localStorage.setItem("cdp-theme", theme);
    } catch {}
  }, [theme]);

  return (
    // Fixed full-width header. An inner container keeps the same centered width
    // as the app content (matching the App's max-w and padding).
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b border-neutral-700/30 bg-neutral-900/60 shadow-sm backdrop-blur-sm">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-3 p-4 rounded-b-lg">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title ?? "Cuaderno de Prácticas"}</h1>
            {typeof totalHoras === "number" && (
              <div className="text-xs opacity-70">
                Total: <span className="font-medium">{totalHoras} horas</span>
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Botones de acciones */}
            {onSave && (
              <button
                onClick={onSave}
                className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
                title="Guardar"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Guardar</span>
              </button>
            )}
            {onImport && (
              <button
                onClick={onImport}
                className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
                title="Importar"
              >
                <Import className="h-4 w-4" />
                <span className="hidden sm:inline">Importar</span>
              </button>
            )}
            {onExport && (
              <button
                onClick={onExport}
                className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
                title="Exportar"
              >
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            )}
            {onPrintPDF && (
              <button
                onClick={onPrintPDF}
                className="inline-flex items-center gap-1 rounded-md bg-fuchsia-600/80 hover:bg-fuchsia-600 px-3 py-1.5 text-sm text-white"
                title="Generar PDF"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            )}

            <button
              title="Ajustes"
              onClick={() => setShowSettings((s) => !s)}
              className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Ajustes</span>
            </button>

            <button
              title="Alternar tema día/noche"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Alternar tema</span>
            </button>
          </div>
        </div>

        {/* Simple settings panel placeholder */}
        {showSettings && (
          <div className="absolute right-4 top-full mt-3 z-50 w-64 rounded-md border border-neutral-700/30 bg-neutral-900/80 p-3 text-sm">
            <div className="font-medium mb-2">Ajustes (placeholder)</div>
            <div className="text-xs opacity-70">Aquí puedes colocar opciones de configuración.</div>
          </div>
        )}
      </div>
    </header>
  );
}