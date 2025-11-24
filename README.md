# CuadernoPrácticas / Practice Notebook

## Acceso rápido / Quick Access
- [Español](#español)
- [English](#english)

### Español
- [Descripción](#descripción-español)
  - [Características principales](#características-principales)
  - [Requisitos](#requisitos)
  - [Instalación y ejecución](#instalación-y-ejecución)
  - [Uso básico](#uso-básico)

## Descripción (Español)
CuadernoPrácticas es una aplicación basada en React + Vite (con TailwindCSS) y preparada para empaquetarse con Tauri. Permite registrar las actividades diarias de prácticas, controlar horas asistidas, capturar firmas digitales y gestionar el cuaderno mediante importación/exportación en JSON y generación en PDF a través de la opción de impresión del navegador.

### Características principales
- **Gestión de días de prácticas:** visualiza y edita cada jornada en tarjetas independientes con fecha, asistencia, horas y actividades realizadas.
- **Captura de firma digital:** cada día incluye un lienzo para guardar la firma (almacenada junto con los datos del día).
- **Configuración flexible:** define fecha de inicio/fin, días activos y horas por día; genera automáticamente el calendario de prácticas.
- **Persistencia local:** guarda automáticamente en `localStorage` y permite importar/exportar cuadernos en formato JSON.
- **Acciones rápidas en la cabecera:** guardar, importar, exportar, imprimir/PDF y abrir la configuración global.
- **Modo claro/oscuro:** selector de tema integrado.

### Requisitos
- Node.js 18 o superior
- npm 9 o superior
- (Opcional) Herramientas de Tauri instaladas para crear binarios nativos

### Instalación y ejecución
1. Instala las dependencias del proyecto principal:
   ```bash
   npm install
   ```
2. Entra a la aplicación web ubicada en `CuadernoPracticas/` y prepara las dependencias del frontend:
   ```bash
   cd CuadernoPracticas
   npm install
   ```
3. Modo desarrollo (frontend):
   ```bash
   npm run dev
   ```
   El servidor de Vite se iniciará y mostrará la URL local en consola.
4. Build de producción (web):
   ```bash
   npm run build
   ```
5. (Opcional) Ejecutar Tauri para empaquetar como aplicación de escritorio:
   ```bash
   npm run tauri
   ```

### Uso básico
- Desde la cabecera, utiliza los botones para **guardar**, **importar** (selecciona un JSON existente), **exportar** (descarga un JSON), **PDF** (abre el diálogo de impresión) y **configurar** (abre el modal de configuración).
- En el modal de configuración establece fechas de inicio/fin, activa los días de la semana y define horas por día; luego crea un nuevo cuaderno con esos parámetros.
- En cada tarjeta de día puedes marcar asistencia, ajustar horas, escribir actividades y firmar. Los cambios se guardan automáticamente en el almacenamiento local.

---

### English
- [Description](#description-english)
  - [Key features](#key-features)
  - [Requirements](#requirements)
  - [Installation and running](#installation-and-running)
  - [Basic usage](#basic-usage)

## Description (English)
CuadernoPrácticas is a React + Vite app (with TailwindCSS) that can be packaged with Tauri. It helps you log daily practice sessions, track attended hours, capture digital signatures, and manage the notebook through JSON import/export plus PDF generation via the browser print dialog.

### Key features
- **Practice day management:** view and edit each day card with date, attendance flag, hours, and activity notes.
- **Digital signature capture:** every day provides a canvas to store a signature alongside the day data.
- **Flexible configuration:** set start/end dates, active weekdays, and default hours per day; automatically generate the practice calendar.
- **Local persistence:** auto-saves to `localStorage` and supports JSON import/export for backups.
- **Header quick actions:** save, import, export, print/PDF, and open the global configuration modal.
- **Light/Dark mode:** built-in theme toggle.

### Requirements
- Node.js 18 or later
- npm 9 or later
- (Optional) Tauri toolchain installed to build native binaries

### Installation and running
1. Install root dependencies:
   ```bash
   npm install
   ```
2. Move into the web app at `CuadernoPracticas/` and install frontend dependencies:
   ```bash
   cd CuadernoPracticas
   npm install
   ```
3. Development server (frontend):
   ```bash
   npm run dev
   ```
   Vite will start and print the local URL in the console.
4. Production build (web):
   ```bash
   npm run build
   ```
5. (Optional) Run Tauri to package as a desktop app:
   ```bash
   npm run tauri
   ```

### Basic usage
- Use the header buttons to **save**, **import** (choose an existing JSON), **export** (download a JSON), **PDF** (open print dialog), and **configure** (open the settings modal).
- In the configuration modal, set start/end dates, enable weekdays, and define default hours; then create a new notebook from those settings.
- On each day card you can toggle attendance, adjust hours, enter activity notes, and sign. Changes are auto-saved to local storage.
