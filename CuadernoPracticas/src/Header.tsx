import { useEffect, useState } from "react";
import { Settings, Sun, Moon } from "lucide-react";

export default function Header({ title, totalHoras }: { title?: string; totalHoras?: number }) {
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
    <header className="app-header mb-6 relative flex items-center gap-3 sm:gap-4 rounded-lg p-4 bg-neutral-900/40 border border-neutral-700/30 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title ?? "Cuaderno de Prácticas"}</h1>
        {typeof totalHoras === "number" && (
          <div className="text-xs opacity-70">Total: <span className="font-medium">{totalHoras} horas</span></div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
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

      {/* Simple settings panel placeholder */}
      {showSettings && (
        <div className="absolute right-4 top-full mt-3 z-50 w-64 rounded-md border border-neutral-700/30 bg-neutral-900/80 p-3 text-sm">
          <div className="font-medium mb-2">Ajustes (placeholder)</div>
          <div className="text-xs opacity-70">Aquí puedes colocar opciones de configuración.</div>
        </div>
      )}
    </header>
  );
}
