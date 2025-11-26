<div align="center">

# Cuaderno de Prácticas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-v19-61dafb)](https://react.dev/)

[🇪🇸 Español](#-español) | [🇺🇸 English](#-english)

</div>

---

<div id="es"></div>

## 🇪🇸 Español

Aplicación de escritorio moderna construida con Tauri, React y TypeScript para la gestión digital del cuaderno de prácticas. Diseñada para ofrecer una experiencia de usuario fluida, segura y eficiente.

### � Índice

- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Configuración y Desarrollo](#-configuración-y-desarrollo)
- [Tecnologías](#-tecnologías)
- [Licencia](#-licencia)

### �🚀 Características Principales

#### 📅 Gestión de Actividades

- **Registro Diario**: Interfaz intuitiva para registrar actividades diarias.
- **Control de Horas**: Seguimiento automático de horas acumuladas.
- **Firmas Digitales**: Soporte para firmas manuscritas digitales en cada día.
- **Estados**: Checkbox de "Asistido" por defecto para agilizar el flujo.

#### 📄 Generación de PDF

- **Motor Potente**: Generación de PDFs en el cliente usando `@react-pdf/renderer`.
- **Múltiples Plantillas**:
  - **Clásica**: Diseño tradicional y formal.
  - **Moderna**: Estilo contemporáneo con mejor jerarquía visual.
  - **Minimal**: Diseño limpio enfocado en el contenido.
  - **Compacta**: Optimizado para maximizar la información por página.
  - **Profesional**: Acabado corporativo y elegante.
- **Previsualización**: Vista previa en tiempo real antes de exportar.

#### 💾 Gestión de Datos

- **Persistencia Local**: Guardado automático y seguro en el dispositivo.
- **Importar/Exportar**: Respaldo completo en formato JSON.
- **Configuración Flexible**: Personalización de datos de empresa, fechas y horarios.

#### 🎨 UI/UX

- **Tema Oscuro/Claro**: Soporte nativo para cambio de tema con persistencia.
- **Diseño Responsivo**: Adaptable a diferentes tamaños de ventana.
- **Feedback Visual**: Sistema de notificaciones toast para acciones del usuario.

### 🛠 Arquitectura del Proyecto

El proyecto sigue una arquitectura modular y desacoplada, priorizando la mantenibilidad y la escalabilidad.

#### Estructura de Directorios

```
src/
├── components/
│   ├── common/       # Componentes reutilizables (Toast, Modal, etc.)
│   ├── features/     # Componentes de negocio (Activities, Config, etc.)
│   ├── layout/       # Estructura base (Header, Layout)
│   └── pdf/          # Motor de generación y plantillas PDF
├── core/
│   ├── models/       # Definiciones de tipos e interfaces (TypeScript)
│   ├── services/     # Lógica de negocio pura (EventBus, Storage)
│   └── utils/        # Funciones auxiliares
├── hooks/            # Custom Hooks (useTheme, useEventBus, etc.)
└── styles/           # Configuración global de estilos
```

#### Patrones de Diseño

- **Event Bus**: Se utiliza un `EventBus` personalizado para la comunicación entre componentes dispersos, evitando el "prop drilling" excesivo y manteniendo los componentes desacoplados.
- **Custom Hooks**: La lógica de estado y efectos se encapsula en hooks como `useCuadernoPracticas` para separar la vista de la lógica.
- **Dependency Inversion**: Los componentes dependen de abstracciones (interfaces) y servicios inyectados o globales, facilitando el testing y la refactorización.

### 💻 Configuración y Desarrollo

#### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/) (para Tauri)

#### Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```

#### Comandos Disponibles

- **Desarrollo**: Inicia la aplicación en modo dev con HMR.
  ```bash
   npm run tauri dev
  ```
- **Web Preview**: Ejecuta solo la parte web en el navegador.
  ```bash
   npm run dev
  ```
- **Construcción**: Genera el instalador para producción.
  ```bash
   npm run tauri build
  ```

### 🔧 Tecnologías

- **Core**: [Tauri v2](https://tauri.app/)
- **Frontend**: [React v19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF**: [React-PDF](https://react-pdf.org/)
- **Iconos**: [Lucide React](https://lucide.dev/)

### 📝 Licencia

Este proyecto está bajo la Licencia **MIT**.

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para tratar con el Software sin restricciones, incluyendo sin limitación los derechos de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y para permitir a las personas a las que se les proporcione el Software a hacerlo, sujeto a la siguiente condición:

> **ATRIBUCIÓN REQUERIDA**: Cualquier uso, modificación o distribución de este software debe dar el crédito apropiado al autor original.

---

<div id="en"></div>

## 🇺🇸 English

Modern desktop application built with Tauri, React, and TypeScript for digital internship logbook management. Designed to offer a fluid, secure, and efficient user experience.

### 📑 Index

- [Key Features](#-key-features)
- [Project Architecture](#-project-architecture)
- [Setup & Development](#-setup--development)
- [Technologies](#-technologies)
- [License](#-license)

### 🚀 Key Features

#### 📅 Activity Management

- **Daily Log**: Intuitive interface for recording daily activities.
- **Hours Tracking**: Automatic tracking of accumulated hours.
- **Digital Signatures**: Support for handwritten digital signatures for each day.
- **Status**: "Attended" checkbox enabled by default to streamline workflow.

#### 📄 PDF Generation

- **Powerful Engine**: Client-side PDF generation using `@react-pdf/renderer`.
- **Multiple Templates**:
  - **Classic**: Traditional and formal design.
  - **Modern**: Contemporary style with better visual hierarchy.
  - **Minimal**: Clean design focused on content.
  - **Compact**: Optimized to maximize information per page.
  - **Professional**: Corporate and elegant finish.
- **Preview**: Real-time preview before exporting.

#### 💾 Data Management

- **Local Persistence**: Automatic and secure saving on the device.
- **Import/Export**: Full backup in JSON format.
- **Flexible Configuration**: Customization of company data, dates, and schedules.

#### 🎨 UI/UX

- **Dark/Light Theme**: Native support for theme switching with persistence.
- **Responsive Design**: Adaptable to different window sizes.
- **Visual Feedback**: Toast notification system for user actions.

### 🛠 Project Architecture

The project follows a modular and decoupled architecture, prioritizing maintainability and scalability.

#### Directory Structure

```
src/
├── components/
│   ├── common/       # Reusable components (Toast, Modal, etc.)
│   ├── features/     # Business components (Activities, Config, etc.)
│   ├── layout/       # Base structure (Header, Layout)
│   └── pdf/          # PDF generation engine and templates
├── core/
│   ├── models/       # Type definitions and interfaces (TypeScript)
│   ├── services/     # Pure business logic (EventBus, Storage)
│   └── utils/        # Helper functions
├── hooks/            # Custom Hooks (useTheme, useEventBus, etc.)
└── styles/           # Global style configuration
```

#### Design Patterns

- **Event Bus**: A custom `EventBus` is used for communication between dispersed components, avoiding excessive "prop drilling" and keeping components decoupled.
- **Custom Hooks**: State logic and effects are encapsulated in hooks like `useCuadernoPracticas` to separate view from logic.
- **Dependency Inversion**: Components depend on abstractions (interfaces) and injected or global services, facilitating testing and refactoring.

### 💻 Setup & Development

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/) (for Tauri)

#### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### Available Commands

- **Development**: Starts the app in dev mode with HMR.
  ```bash
   npm run tauri dev
  ```
- **Web Preview**: Runs only the web part in the browser.
  ```bash
   npm run dev
  ```
- **Build**: Generates the installer for production.
  ```bash
   npm run tauri build
  ```

### 🔧 Tecnologías

- **Core**: [Tauri v2](https://tauri.app/)
- **Frontend**: [React v19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styles**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF**: [React-PDF](https://react-pdf.org/)
- **Iconos**: [Lucide React](https://lucide.dev/)

### 📝 License

This project is under the **MIT** License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following condition:

> **ATTRIBUTION REQUIRED**: Any use, modification, or distribution of this software must give appropriate credit to the original author.
