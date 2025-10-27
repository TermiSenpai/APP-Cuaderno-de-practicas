import React, { useEffect, useMemo, useRef, useState } from "react";
import { Save, Import, Printer, FileDown, Calendar, CheckCircle2, Circle, Clock3, Trash2 } from "lucide-react";
import "./activities.css";
import Header from "./Header";

/**
 * - Los días se generan a partir de un JSON (schema abajo).
 * - Permite importar/exportar el cuaderno completo como JSON.
 * - Guarda automático en localStorage (en Tauri, puedes persistir en AppData usando @tauri-apps/api/fs).
 * - Campo de horas, lista de actividades (textarea), toggle de asistencia y firma con canvas.
 * - Suma total de horas y etiqueta “Asistido / 5h”.
 * - Botones: Guardar, Importar, Exportar, Generar PDF (usa window.print como atajo multiplataforma).
 *
 * JSON esperado (ejemplo simplificado):
 * {
 *   "config": {
 *     "horasPorDia": 5
 *   },
 *   "dias": [
 *     {
 *       "fecha": "2025-09-25",        // ISO date
 *       "asistido": true,              // opcional (default true)
 *       "horas": 5,                    // opcional (default config.horasPorDia)
 *       "actividades": ["...", "..."] // opcional
 *     }
 *   ]
 * }
 */

// ===== Tipos =====
export type Dia = {
  fecha: string; // ISO 8601
  asistido?: boolean;
  horas?: number;
  actividades?: string[]; // cada línea o coma en UI acaba como item aquí
  firma?: string | null; // dataURL PNG de la firma
};

export type CuadernoData = {
  config?: {
    horasPorDia?: number;
  };
  dias: Dia[];
};

// ===== Utilidades =====
const WEEKDAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function formatDDMMYYYY(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function weekdayEs(iso: string) {
  const d = new Date(iso);
  return WEEKDAYS_ES[d.getDay()];
}

function parseActivities(text: string): string[] {
  // separa por líneas (cada salto de línea es una actividad).
  // No separar por comas: permitimos comas y espacios dentro de una actividad.
  return text
    .split(/\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function joinActivities(arr: string[] | undefined): string {
  if (!arr || !arr.length) return "";
  return arr.join("\n");
}

// ===== FirmaCanvas =====
function FirmaCanvas({ value, onChange }: { value: string | null | undefined; onChange: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [isEmpty, setIsEmpty] = useState(!value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    // fondo transparente; trazo simple
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#f5d0fe"; // rosa suave parecido al screenshot
    // si hay firma cargada, pégala
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setIsEmpty(false);
      };
      img.src = value;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
    }
  }, [value]);

  function getPos(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  const onDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setIsEmpty(false);
  };

  const onUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const data = canvasRef.current!.toDataURL("image/png");
    onChange(data);
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
    setIsEmpty(true);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-pink-100/30 border border-pink-300/30 p-2">
        <canvas
          ref={canvasRef}
          width={64}
          height={64}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          className="block h-16 w-16 cursor-crosshair rounded-md bg-pink-50/40"
        />
      </div>
      <div className="text-xs opacity-70">Firma del estudiante {isEmpty && <span>(vacía)</span>}</div>
      <button onClick={clear} className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-neutral-700/30 hover:bg-neutral-800/40">
        <Trash2 className="h-3.5 w-3.5" /> Limpiar
      </button>
    </div>
  );
}

// ===== Tarjeta de un día =====
function DayCard({
  dia,
  defaultHoras,
  onChange,
}: {
  dia: Dia;
  defaultHoras: number;
  onChange: (updated: Dia) => void;
}) {
  const horas = dia.horas ?? defaultHoras;
  const asistido = dia.asistido ?? true;
  const actividadText = joinActivities(dia.actividades);

  // Local state for the textarea to avoid parsing on every keystroke. We parse
  // the text into activities only on blur (when the user finishes editing), so
  // the user can freely type spaces, commas and newlines.
  const [actividadTextState, setActividadTextState] = useState(actividadText);

  useEffect(() => {
    // Keep local text in sync when dia.actividades changes from outside
    setActividadTextState(joinActivities(dia.actividades));
  }, [dia.actividades]);

  return (
    <div className="rounded-2xl bg-neutral-900/40 border border-neutral-700/30 p-5 space-y-4">
      {/* Cabecera fecha */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 opacity-80" />
          <span className="font-medium">
            {weekdayEs(dia.fecha)}, {formatDDMMYYYY(dia.fecha)}
          </span>
        </div>

        <label className="ml-4 inline-flex items-center gap-2 text-xs select-none">
          <input
            type="checkbox"
            checked={asistido}
            onChange={(e) => onChange({ ...dia, asistido: e.target.checked })}
          />
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${asistido ? "border-sky-400/30 text-sky-300" : "border-neutral-600 text-neutral-400"}`}>
            {asistido ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />} Día asistido
          </span>
        </label>

        <div className="ml-auto inline-flex items-center gap-2 text-xs opacity-80">
          <Clock3 className="h-4 w-4" /> {horas}h
        </div>
      </div>

      {/* Horas trabajadas */}
      <div className="flex items-center gap-3">
        <div className="text-xs w-40 opacity-70">Horas trabajadas</div>
        <input
          type="number"
          step={0.5}
          min={0}
          className="w-full max-w-[11rem] sm:w-40 rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2 text-sm"
          value={horas}
          onChange={(e) => onChange({ ...dia, horas: Number(e.target.value) })}
        />
      </div>

      {/* Actividades */}
      <div>
        <div className="text-xs mb-1 opacity-70">Actividades realizadas (una por línea o separadas por comas)</div>
        <textarea
          placeholder="Escribe las actividades realizadas…\nCada línea será una actividad"
          className="w-full min-h-[100px] rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2 text-sm resize-y"
          value={actividadTextState}
          onChange={(e) => setActividadTextState(e.target.value)}
          onBlur={() => onChange({ ...dia, actividades: parseActivities(actividadTextState) })}
        />
      </div>

      {/* Firma */}
      <div className="flex items-center justify-end">
        <FirmaCanvas value={dia.firma ?? null} onChange={(data) => onChange({ ...dia, firma: data })} />
      </div>
    </div>
  );
}

// ===== App principal =====
export default function CuadernoPracticas() {
  const [data, setData] = useState<CuadernoData | null>(null);

  // Carga inicial: si hay algo en localStorage, úsalo; si no, no hagas nada.
  useEffect(() => {
    const raw = localStorage.getItem("cdp-data");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {}
    }
  }, []);

  // Autosave en localStorage
  useEffect(() => {
    if (!data) return;
    localStorage.setItem("cdp-data", JSON.stringify(data));
  }, [data]);

  const horasDefault = data?.config?.horasPorDia ?? 5;

  const totalHoras = useMemo(() => {
    if (!data) return 0;
    return data.dias.reduce((acc, d) => acc + (d.horas ?? horasDefault), 0);
  }, [data, horasDefault]);

  function updateDia(idx: number, updated: Dia) {
    if (!data) return;
    const dias = [...data.dias];
    dias[idx] = updated;
    setData({ ...data, dias });
  }

  // === Acciones de barra ===
  async function handleFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as CuadernoData;
      if (!Array.isArray(parsed.dias)) throw new Error("Formato inválido: no contiene un array de días.");
      setData(parsed);
    } catch (err: any) {
      alert("Error al leer el archivo: " + err?.message);
    }
  }

  function handleImport() {
    const fileInput = document.getElementById("file-import") as HTMLInputElement;
    fileInput?.click();
  }

  async function handleExport() {
    if (!data) return;
    const txt = JSON.stringify(data, null, 2);
    // web: descarga rápida
    const blob = new Blob([txt], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cuaderno-practicas-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    /** En Tauri puedes escribir directamente:
     * await writeFile({
     *   contents: txt,
     *   path: `cuaderno-practicas.json`,
     * }, { dir: BaseDirectory.Document });
     */
  }

  function handleSave() {
    if (!data) return;
    localStorage.setItem("cdp-data", JSON.stringify(data));
  }

  function handlePrintPDF() {
    window.print(); // en Tauri abre el diálogo del SO (guardar como PDF)
  }

  if (!data) return null;

  return (
    <div className="app-root min-h-dvh w-full overflow-x-hidden bg-[#0b0f1a] bg-gradient-to-b from-[#0b1220] to-[#0b0f1a] text-neutral-100 flex justify-start items-start">
      <div className="container-inner px-4 sm:px-5 pt-4 sm:pt-6 pb-6 sm:pb-8 print:px-0">

        {/* Input oculto para importar archivo */}
        <input
          type="file"
          id="file-import"
          accept=".json"
          onChange={handleFileLoad}
          className="hidden"
        />

        <div className="mb-6 flex items-center gap-2 flex-wrap justify-end">
          <button onClick={handleSave} className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50">
            <Save className="h-4 w-4" /> Guardar
          </button>
          <button onClick={handleImport} className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50">
            <Import className="h-4 w-4" /> Importar
          </button>
          <button onClick={handleExport} className="inline-flex items-center gap-1 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50">
            <FileDown className="h-4 w-4" /> Exportar
          </button>
          <button onClick={handlePrintPDF} className="inline-flex items-center gap-1 rounded-md bg-fuchsia-600/80 hover:bg-fuchsia-600 px-3 py-1.5 text-sm text-white">
            <Printer className="h-4 w-4" /> Generar PDF
          </button>
        </div>

        {/* Lista de días */}
        <div className="space-y-6 activities-list">
          {data.dias.map((d, i) => (
            <DayCard key={d.fecha + i} dia={d} defaultHoras={horasDefault} onChange={(ud) => updateDia(i, ud)} />
          ))}
        </div>

        {/* Nota de estilos para impresión */}
        <style>{`
          :root { color-scheme: dark; }
          html, body, #root { height: 100%; width: 100%; }
          body { margin: 0; background: #0b0f1a; }
          @media (max-width: 640px) {
            textarea { min-height: 120px; }
          }
          @media print {
            body { background: white; }
            .print\:px-0 { padding-left: 0 !important; padding-right: 0 !important; }
            button { display: none !important; }
            textarea { border: 1px solid #e5e7eb; }
          }
        `}</style>
      </div>
    </div>
  );
}