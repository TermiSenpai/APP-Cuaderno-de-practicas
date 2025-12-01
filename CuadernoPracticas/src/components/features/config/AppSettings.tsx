/**
 * App Settings Component
 * Placeholder for future advanced settings
 * Shows "Próximamente" notifications for upcoming features
 */

import { eventBus } from "../../../core/services/EventBus";

export function AppSettings() {
  const showComingSoon = (feature: string) => {
    eventBus.emit("cdp-notification");
    // TODO: Implement actual notification with message when NotificationService supports payload
    console.log(`${feature} - Próximamente`);
  };

  return (
    <div className="space-y-6">
      {/* Apariencia Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white border-b border-neutral-700 pb-2">
          🎨 Apariencia
        </h3>
        <button
          onClick={() => showComingSoon("Configuración de tema")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Tema (Claro/Oscuro/Auto)</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
        <button
          onClick={() => showComingSoon("Selector de idioma")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Idioma (Español/English)</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
      </div>

      {/* Auto-guardado y Respaldos */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white border-b border-neutral-700 pb-2">
          💾 Auto-guardado y Respaldos
        </h3>
        <button
          onClick={() => showComingSoon("Auto-guardado")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Guardado automático en cada edición</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
        <button
          onClick={() => showComingSoon("Historial de versiones")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>📜 Ver Versiones Anteriores</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
      </div>

      {/* Notificaciones */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white border-b border-neutral-700 pb-2">
          🔔 Notificaciones
        </h3>
        <button
          onClick={() => showComingSoon("Configuración de notificaciones")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Duración, sonidos y posición</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
      </div>

      {/* Exportación */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white border-b border-neutral-700 pb-2">
          📤 Exportación
        </h3>
        <button
          onClick={() => showComingSoon("Preferencias de exportación")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Formato y opciones de exportación</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
      </div>

      {/* Atajos de Teclado */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white border-b border-neutral-700 pb-2">
          ⌨️ Atajos de Teclado
        </h3>
        <button
          onClick={() => showComingSoon("Atajos personalizables")}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 hover:bg-neutral-700 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span>Personalizar atajos de teclado</span>
            <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </button>
      </div>

      {/* Version Info */}
      <div className="pt-4 border-t border-neutral-700">
        <div className="text-sm text-neutral-500 text-center">
          Versión 1.0.0
        </div>
      </div>
    </div>
  );
}
