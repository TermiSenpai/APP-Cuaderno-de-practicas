# 📓 CuadernoPrácticas / Practice Notebook

**Idiomas disponibles:** 🇪🇸 [Español](#español) | 🇬🇧 [English](#english)

---

<a name="español"></a>

> Una aplicación moderna para registrar y gestionar prácticas profesionales con persistencia local, firmas digitales e importación/exportación en JSON.

## 🇪🇸 Documentación en Español

### 📑 Tabla de contenidos
1. [Descripción general](#descripción-general)
2. [Características principales](#características-principales)
3. [Stack tecnológico](#stack-tecnológico)
4. [Requisitos del sistema](#requisitos-del-sistema)
5. [Instalación y configuración](#instalación-y-configuración)
6. [Guía de uso](#guía-de-uso)
7. [Estructura del proyecto](#estructura-del-proyecto)
8. [Desarrollo](#desarrollo)
9. [Compilación a escritorio (Electron)](#compilación-a-escritorio-electron)
10. [Formato de datos JSON](#formato-de-datos-json)
11. [Solución de problemas](#solución-de-problemas)
12. [Contribuir](#contribuir)
13. [Licencia](#licencia)

---

### 📋 Descripción general

**CuadernoPrácticas** es una aplicación web moderna construida con **React 19** y **Vite**, diseñada para registrar y administrar jornadas de prácticas profesionales. Permite a estudiantes y aprendices:

- Registrar actividades diarias con horas trabajadas
- Marcar asistencia y capturar firmas digitales
- Guardar datos en almacenamiento local (sin necesidad de servidor)
- Exportar/importar cuadernos en formato JSON
- Generar reportes en PDF mediante impresión
- Alternar entre modo claro y oscuro

La aplicación está lista para ser empaquetada como aplicación de escritorio usando **Electron** o como Progressive Web App (PWA).

---

### ⭐ Características principales

#### 1. **Gestión inteligente de días**
- Visualización en tarjetas individuales por jornada
- Registro de fecha, estado de asistencia, horas trabajadas y actividades
- Interfaz responsiva adaptada a dispositivos móviles
- Validación automática de datos
- **Editor de horas inteligente:** solo visible al hacer clic en el reloj, se oculta al perder el foco

#### 2. **Captura de firma digital**
- Lienzo interactivo para capturar la firma del estudiante
- Almacenamiento como imagen PNG embebida (DataURL)
- Visualización en tiempo real durante la impresión/PDF
- Opción de limpiar y redibujar

#### 3. **Configuración flexible**
- Definición de fecha de inicio y fin del período de prácticas
- Selección de días activos de la semana (lunes a viernes, etc.)
- Configuración de horas por defecto por jornada
- Generación automática del calendario

#### 4. **Persistencia y sincronización**
- Auto-guardado en `localStorage` del navegador (sin conexión requerida)
- Exportación a JSON con toda la información (incluyendo firmas)
- Importación de cuadernos existentes
- Compatibilidad con múltiples navegadores modernos

#### 5. **Acciones de la cabecera**
- **Guardar:** confirma guardado manual en almacenamiento local
- **Importar:** carga un JSON previamente exportado
- **Exportar:** descarga el cuaderno actual como archivo JSON
- **Generar PDF:** abre el diálogo de impresión del navegador
- **Configurar:** modal para ajustar parámetros globales

#### 6. **Interfaz de usuario**
- Tema claro/oscuro automático o manual
- Diseño moderno con Tailwind CSS
- Iconografía consistente con lucide-react
- Notificaciones de feedback para el usuario

---

### 🛠 Stack tecnológico

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|----------|
| **Frontend** | React | 19.1.0 | Framework UI |
| **Builder** | Vite | 7.0.4 | Herramienta de compilación |
| **Lenguaje** | TypeScript | 5.8.3 | Tipado estático |
| **Estilos** | Tailwind CSS | 3.4.18 | Utilidades CSS |
| **Post-CSS** | PostCSS | 8.5.6 | Transformación CSS |
| **Iconos** | lucide-react | 0.548.0 | Librería de iconos |
| **PDF** | @react-pdf/renderer | 4.3.1 | Generación de PDF (opcional) |
| **Desktop** | Electron | 28.0.0 | Empaquetamiento a aplicación de escritorio |
| **Bundler** | electron-builder | 24.9.1 | Constructor de instaladores |

**Dependencias de desarrollo:** autoprefixer, concurrently, wait-on

---

### 💻 Requisitos del sistema

#### Mínimos
- **Node.js**: 18.0.0 o superior
- **npm**: 9.0.0 o superior
- **Git**: 2.30.0 o superior (para clonar el repositorio)

#### Recomendados
- **Node.js**: 20 LTS o superior
- **npm**: 10.0.0 o superior
- Editor de código: VS Code con extensiones para React y TypeScript

#### Para escritorio (Electron)
- **Herramientas compiladas** (depende del SO):
  - **Windows**: Visual Studio Build Tools (opcional, recomendado)
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: build-essential y gcc

---

### 🚀 Instalación y configuración

#### Paso 1: Clonar o descargar el repositorio
```bash
# Opción 1: Clonar con Git
git clone https://github.com/TermiSenpai/APP-Cuaderno-de-practicas.git
cd APP-Cuaderno-de-practicas

# Opción 2: Descargar ZIP desde GitHub
# Descargar, extraer y abrir la carpeta
```

#### Paso 2: Instalar dependencias
```bash
# Desde la carpeta raíz
npm install

# Navegar a la carpeta de la aplicación web
cd CuadernoPracticas
npm install
```

#### Paso 3: Ejecutar en modo desarrollo
```bash
# Desde la carpeta CuadernoPracticas/
npm run dev
```

El servidor de Vite se abrirá automáticamente en `http://localhost:1420` (o el puerto disponible).

#### Paso 4: Compilar para producción
```bash
# Desde la carpeta CuadernoPracticas/
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

#### Paso 5 (Opcional): Compilar para escritorio
```bash
# Desde la carpeta CuadernoPracticas/
npm run electron:build
```

Se generará un instalador en la carpeta `dist/` según tu sistema operativo.

---

### 📖 Guía de uso

#### Interfaz principal
La aplicación se divide en dos áreas principales:

1. **Barra de cabecera** (fija en la parte superior)
   - Botones de acciones rápidas: Guardar, Importar, Exportar, PDF, Configurar
   - Selector de tema (claro/oscuro)

2. **Área de contenido** (scrollable)
   - Tarjetas de días de prácticas
   - Cada tarjeta contiene los detalles de una jornada

#### Workflow típico

##### 1. Crear un nuevo cuaderno
```
1. Haz clic en "Configurar" (botón con engranaje)
2. Completa los campos:
   - Fecha de inicio: Ej. 2025-09-01
   - Fecha de fin: Ej. 2025-12-31
   - Días activos: Selecciona lunes a viernes (por defecto)
   - Horas por día: Ej. 5
3. Haz clic en "Crear cuaderno"
4. Se generarán automáticamente todas las jornadas
```

##### 2. Registrar actividades en una jornada
```
Para cada tarjeta de día:

1. Marca "Día asistido" si asististe ✓
2. Haz clic en el reloj (⏱) para mostrar el editor de horas
3. Ajusta las horas (ej. 5.5) - El campo desaparece al hacer clic fuera
4. Escribe las actividades realizadas en el área de texto
   (Cada línea = una actividad)
5. Dibuja tu firma en el lienzo
6. Los cambios se guardan automáticamente
```

##### 3. Exportar el cuaderno
```
1. Haz clic en "Exportar"
2. Se descargará un archivo JSON: cuaderno-practicas-YYYY-MM-DD.json
3. Guarda en lugar seguro para respaldar tus datos
```

##### 4. Importar un cuaderno anterior
```
1. Haz clic en "Importar"
2. Selecciona un archivo JSON previamente exportado
3. El cuaderno se cargará reemplazando el actual
```

##### 5. Generar PDF/Imprimir
```
1. Haz clic en "Generar PDF"
2. Se abre el diálogo de impresión del navegador
3. Selecciona "Guardar como PDF" o tu impresora
4. Configura márgenes, encabezado/pie de página según necesites
5. Confirma para guardar o imprimir
```

#### Atajos útiles
| Acción | Método |
|--------|--------|
| Guardar rápidamente | Presionar `Ctrl+S` (si se implementa) |
| Oscurecer/aclarar tema | Clic en selector de tema en cabecera |
| Editar horas | Clic en el icono del reloj (⏱) en la tarjeta |
| Limpiar firma | Clic en botón "Limpiar" bajo el lienzo |

---

### 📁 Estructura del proyecto

```
APP-Cuaderno-de-practicas/
├── README.md                          # Este archivo
├── LICENSE.md                         # Licencia MIT
├── CuadernoPracticas/                 # 🎯 Aplicación principal
│   ├── package.json                   # Dependencias y scripts
│   ├── tsconfig.json                  # Configuración TypeScript
│   ├── vite.config.ts                 # Configuración Vite
│   ├── tailwind.config.js             # Configuración Tailwind CSS
│   ├── postcss.config.js              # Configuración PostCSS
│   ├── electron-builder.json          # Config para compilar a .exe/.dmg/.snap
│   ├── index.html                     # HTML entry point
│   ├── public/                        # Activos estáticos
│   │   └── data.json                  # Datos de ejemplo (opcional)
│   ├── electron/                      # Scripts de Electron
│   │   └── main.cjs                   # Punto de entrada de Electron
│   ├── dist/                          # Build de producción (generado)
│   ├── src/                           # 📂 Código fuente
│   │   ├── main.tsx                   # Punto de entrada React
│   │   ├── App.tsx                    # Componente raíz
│   │   ├── index.css                  # Estilos globales
│   │   ├── vite-env.d.ts              # Tipos de Vite
│   │   ├── components/
│   │   │   ├── features/
│   │   │   │   └── activities/
│   │   │   │       └── CuadernoPracticas.tsx  # Componente principal de actividades
│   │   │   ├── layout/
│   │   │   │   └── Header/
│   │   │   │       └── Header.tsx    # Barra de navegación superior
│   │   │   └── common/
│   │   │       ├── NotificationProvider.tsx  # Proveedor de notificaciones
│   │   │       └── ToastContainer.tsx       # Contenedor de notificaciones
│   │   ├── core/                      # Lógica compartida
│   │   ├── hooks/                     # Hooks personalizados de React
│   │   ├── styles/                    # Archivos CSS adicionales
│   │   └── assets/                    # Imágenes, iconos, fuentes
│   └── node_modules/                  # Dependencias instaladas
├── .gitignore                         # Archivos ignorados por Git
└── (otros archivos de configuración)
```

**Notas sobre la estructura:**
- Los componentes están organizados por características (features-first)
- Cada componente se ubica en su propia carpeta con estilos asociados
- El estado de la aplicación se gestiona con React Hooks (`useState`, `useContext`)
- La persistencia se realiza en `localStorage` (navegador)

---

### 🔧 Desarrollo

#### Ejecutar con recarga en caliente (HMR)
```bash
cd CuadernoPracticas
npm run dev
```

Vite se encargará de:
- Servir la aplicación en `http://localhost:1420`
- Recargar automáticamente al editar archivos
- Preservar el estado de la aplicación (no perderás datos de prueba)

#### Estructura de componentes React

La aplicación sigue estos patrones:

```tsx
// 1. Componentes funcionales con TypeScript
export function MyComponent({ prop1, prop2 }: Props) {
  const [state, setState] = useState<Type>(initialValue);
  
  useEffect(() => {
    // Efectos secundarios
  }, [dependencies]);
  
  return <div>{/* JSX */}</div>;
}

// 2. Props tipadas
interface Props {
  title: string;
  onAction: (id: string) => void;
}

// 3. Estado local con TypeScript
const [data, setData] = useState<DayType[]>([]);
```

#### Extensión de funcionalidades

Para añadir nuevas características:

1. Crea un nuevo componente en `src/components/features/[feature]/`
2. Define sus tipos/interfaces
3. Integra en el flujo de datos de `CuadernoPracticas.tsx`
4. Prueba con `npm run dev`
5. Compila con `npm run build`

---

### 📦 Compilación a escritorio (Electron)

La aplicación incluye configuración para empaquetarse como aplicación de escritorio.

#### Compilar para tu sistema operativo
```bash
cd CuadernoPracticas
npm run electron:build
```

Esto generará:
- **Windows**: Instalador `.exe` en `dist/CuadernoPracticas Setup X.X.X.exe`
- **macOS**: Instalador `.dmg` en `dist/CuadernoPracticas-X.X.X.dmg`
- **Linux**: Paquete `.AppImage` en `dist/CuadernoPracticas-X.X.X.AppImage`

#### Ejecutar en modo desarrollo con Electron
```bash
cd CuadernoPracticas
npm run electron:dev
```

Esto ejecutará simultáneamente:
- El servidor de desarrollo de Vite
- La aplicación Electron vinculada a ese servidor

#### Cambios en Electron
Edita `electron/main.cjs` para personalizar:
- Tamaño inicial de ventana
- Icono de aplicación
- Comportamiento de menús
- URLs permitidas
- Actualización automática

---

### 📄 Formato de datos JSON

#### Estructura general
```json
{
  "config": {
    "horasPorDia": 5,
    "fechaInicio": "2025-09-01",
    "fechaFin": "2025-12-31",
    "diasActivos": ["lunes", "martes", "miércoles", "jueves", "viernes"]
  },
  "dias": [
    {
      "fecha": "2025-09-01",
      "asistido": true,
      "horas": 5,
      "actividades": [
        "Familiarización con el equipo de trabajo",
        "Inducción de seguridad",
        "Revisión de proyectos activos"
      ],
      "firma": "data:image/png;base64,iVBORw0KGgoAAAANS..."
    }
  ]
}
```

#### Campos detallados

| Campo | Tipo | Descripción | Obligatorio |
|-------|------|-------------|------------|
| `config.horasPorDia` | number | Horas por defecto por jornada | Sí |
| `config.fechaInicio` | string (ISO date) | Primer día de prácticas (YYYY-MM-DD) | Sí |
| `config.fechaFin` | string (ISO date) | Último día de prácticas (YYYY-MM-DD) | Sí |
| `config.diasActivos` | array | Días de la semana activos (lunes-viernes) | No |
| `dias[].fecha` | string (ISO date) | Fecha de la jornada | Sí |
| `dias[].asistido` | boolean | Asistencia confirmada | No (default: true) |
| `dias[].horas` | number | Horas trabajadas ese día | No (default: horasPorDia) |
| `dias[].actividades` | array[string] | Listado de actividades realizadas | No (default: []) |
| `dias[].firma` | string (DataURL) | Firma en formato PNG base64 | No (default: null) |

#### Ejemplo completo
```json
{
  "config": {
    "horasPorDia": 5
  },
  "dias": [
    {
      "fecha": "2025-09-01",
      "asistido": true,
      "horas": 5,
      "actividades": ["Inducción"],
      "firma": null
    },
    {
      "fecha": "2025-09-02",
      "asistido": true,
      "horas": 4.5,
      "actividades": ["Análisis de requisitos", "Diseño de base de datos"],
      "firma": "data:image/png;base64,..."
    }
  ]
}
```

#### Validación al importar
Al importar un JSON la aplicación valida:
- Presencia de array `dias`
- Formato ISO de fechas
- Tipos de datos correctos
- Mensajes de error descriptivos si hay problemas

---

### 🆘 Solución de problemas

#### Problema: "No se guardan los cambios"
**Causa:** localStorage puede estar deshabilitado o lleno.
**Solución:**
1. Verifica que localStorage esté habilitado en navegador (F12 → Storage)
2. Limpia datos antiguos o exporta/importa el cuaderno
3. Prueba en navegador diferente
4. Verifica que la aplicación tiene permisos de lectura/escritura

#### Problema: "Error al importar JSON"
**Causa:** Formato incorrecto o corrupción del archivo.
**Solución:**
1. Abre el JSON en editor de texto y valida que esté bien formado
2. Asegúrate de que tiene campos `config` y `dias`
3. Usa un validador JSON online si no estás seguro
4. Re-exporta y re-importa con la versión actual

#### Problema: "La firma no se ve en el PDF"
**Causa:** Problema de rendering en impresora o navegador.
**Solución:**
1. Prueba con otro navegador
2. Verifica que la firma se vea en pantalla antes de imprimir
3. Dibuja la firma de nuevo y confirma que aparezca
4. Cambia configuración de impresión (márgenes, escala)

#### Problema: "Electron no abre o se ve en blanco"
**Causa:** Archivo compilado corrupto o rutas incorrectas.
**Solución:**
```bash
# Limpia y recompila
rm -rf dist node_modules
npm install
npm run build
npm run electron:build
```

#### Problema: "npm install falla con errores"
**Causa:** Versiones conflictivas o instalación incompleta.
**Solución:**
```bash
# Limpia cache de npm
npm cache clean --force

# Intenta de nuevo
npm install

# Si persiste, usa npm ci (instalación exacta)
npm ci
```

---

### 🎯 TO DO - Hoja de Ruta de Desarrollo

#### 📊 FASE 1: Fundamentos y Arquitectura Base (PRIORIDAD CRÍTICA)

- [ ] **Testing Automatizado**
  - [ ] Configurar Vitest
  - [ ] Tests unitarios de servicios
  - [ ] Tests de componentes con React Testing Library
  - [ ] Alcanzar >80% de cobertura

- [ ] **Validación de Datos**
  - [ ] Implementar esquemas con Zod
  - [ ] Validación de formularios
  - [ ] Mensajes de error personalizados
  - [ ] Tests de validación

- [ ] **Separar Configuración Básica y Avanzada**
  - [ ] Crear tabs en ConfigModal
  - [ ] Componente BasicSettings
  - [ ] Componente AdvancedSettings
  - [ ] Migrar configuración existente

---

#### 🎨 FASE 2: Mejoras de UX y Visualización

- [ ] **Atajos de Teclado**
  - [ ] Hook useKeyboardShortcuts
  - [ ] Implementar shortcuts globales (Ctrl+S, Ctrl+P, etc.)
  - [ ] Modal de ayuda de shortcuts (Ctrl+?)
  - [ ] Tests de shortcuts

- [ ] **Drag and Drop para Importar**
  - [ ] Hook useFileDrop
  - [ ] Componente DropZone
  - [ ] Feedback visual de drag & drop
  - [ ] Validación de tipos de archivo

- [ ] **Indicadores Visuales de Completitud**
  - [ ] Barra de progreso en header
  - [ ] Cards de estadísticas rápidas
  - [ ] Indicadores de racha
  - [ ] Color coding por % completado

- [ ] **Vistas Semanales/Mensuales**
  - [ ] Componente ViewSelector
  - [ ] Vista diaria (refactor actual)
  - [ ] Vista semanal (agrupación)
  - [ ] Vista mensual (calendario)
  - [ ] Persistencia de vista seleccionada

---

#### 🔧 FASE 3: Gestión de Datos Avanzada

- [ ] **Sistema de Almacenamiento Flexible**
  - [ ] Interface StorageAdapter
  - [ ] LocalStorageAdapter
  - [ ] FileSystemAdapter (Electron dialog)
  - [ ] GoogleDriveAdapter (OAuth)
  - [ ] StorageFactory
  - [ ] UI de selección de storage

- [ ] **Historial de Cambios y Logs**
  - [ ] HistoryService con timestamps precisos
  - [ ] LogService con niveles
  - [ ] Componente HistoryViewer
  - [ ] Funcionalidad de reversión
  - [ ] Límite de entradas (100 máx)
  - [ ] Tests de historial

---

#### 📈 FASE 4: Estadísticas y Exportación

- [ ] **Dashboard de Estadísticas Completo**
  - [ ] Componente StatsDashboard
  - [ ] Gráfico de horas por semana (Recharts)
  - [ ] Calendario de asistencia (heat map)
  - [ ] Tendencias de productividad
  - [ ] Métricas avanzadas (racha, promedio, etc.)
  - [ ] Tests de cálculos estadísticos

- [ ] **Exportación Multi-formato**
  - [ ] ExcelExporter con múltiples hojas
  - [ ] WordExporter con formato profesional
  - [ ] CSVExporter
  - [ ] HTMLExporter
  - [ ] Modal de selección de formato
  - [ ] Tests de exportadores

- [ ] **Configuración Avanzada de PDF**
  - [ ] Configuración de fuentes (título, cuerpo, caption)
  - [ ] Márgenes personalizables
  - [ ] Encabezados/pies de página
  - [ ] Numeración de páginas configurable
  - [ ] Soporte para logo de empresa
  - [ ] Marca de agua opcional

---

#### 🌐 FASE 5: Internacionalización e IA

- [ ] **Sistema Multi-idioma**
  - [ ] Configurar i18next
  - [ ] Archivos de traducción (ES, EN, FR, DE)
  - [ ] Componente LanguageSelector
  - [ ] Editor de traducciones para usuarios
  - [ ] Sistema de exportación/importación de traducciones
  - [ ] Tests de i18n

- [ ] **Integración de IA (Opcional)**
  - [ ] AIService con architecture de providers
  - [ ] OllamaProvider (local, gratuito) - Recomendado
  - [ ] OpenAIProvider (API key del usuario)
  - [ ] HuggingFaceProvider (token del usuario)
  - [ ] Componente AIAssistant
  - [ ] Sugerencias de actividades
  - [ ] Análisis de competencias
  - [ ] Generación de memoria
  - [ ] Disclaimers de privacidad y costos

---

#### 📊 Progreso General

```
📊 Progreso por Fase:
├─ Fase 1: Fundamentos       [ ] 0/3  (0%)
├─ Fase 2: UX                [ ] 0/4  (0%)
├─ Fase 3: Datos Avanzados   [ ] 0/2  (0%)
├─ Fase 4: Estadísticas      [ ] 0/3  (0%)
└─ Fase 5: i18n & IA         [ ] 0/2  (0%)

Total: 0/14 características completadas (0%)
```

---

### 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. **Fork** el repositorio desde GitHub
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza commits descriptivos (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request** describiendo los cambios

#### Directrices de contribución
- Sigue el estilo de código existente (TypeScript, React Hooks)
- Añade comentarios para lógica compleja
- Prueba en navegador antes de enviar
- Actualiza la documentación si es necesario

---

### 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Ver archivo `LICENSE.md` para detalles completos.

```
Copyright (c) 2025 Termi

Se otorga permiso, gratuitamente, a cualquier persona...
[Consulta LICENSE.md para el texto completo]
```

---

<a name="english"></a>

## 🇬🇧 English Documentation
> A modern application to record and manage professional internships with local persistence, digital signatures, and JSON import/export.
### 📑 Table of Contents
1. [General Description](#general-description)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [System Requirements](#system-requirements)
5. [Installation & Setup](#installation--setup)
6. [User Guide](#user-guide)
7. [Project Structure](#project-structure)
8. [Development](#development)
9. [Desktop Build (Electron)](#desktop-build-electron)
10. [JSON Data Format](#json-data-format)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)
13. [License](#license)

---

### 📋 General Description

**CuadernoPrácticas** is a modern web application built with **React 19** and **Vite**, designed to record and manage professional practice sessions. It allows students and apprentices to:

- Register daily activities with hours worked
- Mark attendance and capture digital signatures
- Save data in local storage (no server required)
- Export/import notebooks in JSON format
- Generate reports in PDF via print
- Switch between light and dark mode

The application is ready to be packaged as a desktop application using **Electron** or as a Progressive Web App (PWA).

---

### ⭐ Key Features

#### 1. **Intelligent Day Management**
- Individual card visualization per working day
- Recording of date, attendance status, hours worked, and activities
- Responsive interface adapted for mobile devices
- Automatic data validation
- **Smart hours editor:** only visible when clicking the clock icon, hides on blur

#### 2. **Digital Signature Capture**
- Interactive canvas for capturing student signature
- Storage as embedded PNG image (DataURL)
- Real-time visualization during printing/PDF
- Option to clear and redraw

#### 3. **Flexible Configuration**
- Definition of start and end date of practice period
- Selection of active days of the week (Monday to Friday, etc.)
- Configuration of default hours per day
- Automatic calendar generation

#### 4. **Persistence and Synchronization**
- Auto-save to browser's `localStorage` (no connection required)
- Export to JSON with all information (including signatures)
- Import of previously exported notebooks
- Compatibility with multiple modern browsers

#### 5. **Header Quick Actions**
- **Save:** manual save confirmation to local storage
- **Import:** load previously exported JSON
- **Export:** download current notebook as JSON file
- **Generate PDF:** opens browser print dialog
- **Configure:** modal for adjusting global parameters

#### 6. **User Interface**
- Automatic or manual light/dark theme
- Modern design with Tailwind CSS
- Consistent iconography with lucide-react
- User feedback notifications

---

### 🛠 Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend** | React | 19.1.0 | UI Framework |
| **Builder** | Vite | 7.0.4 | Build tool |
| **Language** | TypeScript | 5.8.3 | Static typing |
| **Styles** | Tailwind CSS | 3.4.18 | CSS utilities |
| **Post-CSS** | PostCSS | 8.5.6 | CSS transformation |
| **Icons** | lucide-react | 0.548.0 | Icon library |
| **PDF** | @react-pdf/renderer | 4.3.1 | PDF generation (optional) |
| **Desktop** | Electron | 28.0.0 | Package as desktop app |
| **Builder** | electron-builder | 24.9.1 | Installer builder |

**Dev Dependencies:** autoprefixer, concurrently, wait-on

---

### 💻 System Requirements

#### Minimum
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: 2.30.0 or higher (for cloning repository)

#### Recommended
- **Node.js**: 20 LTS or higher
- **npm**: 10.0.0 or higher
- Code editor: VS Code with React and TypeScript extensions

#### For Desktop (Electron)
- **Build tools** (depends on OS):
  - **Windows**: Visual Studio Build Tools (optional, recommended)
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: build-essential and gcc

---

### 🚀 Installation & Setup

#### Step 1: Clone or Download Repository
```bash
# Option 1: Clone with Git
git clone https://github.com/TermiSenpai/APP-Cuaderno-de-practicas.git
cd APP-Cuaderno-de-practicas

# Option 2: Download ZIP from GitHub
# Download, extract, and open folder
```

#### Step 2: Install Dependencies
```bash
# From root folder
npm install

# Navigate to web app folder
cd CuadernoPracticas
npm install
```

#### Step 3: Run Development Server
```bash
# From CuadernoPracticas/ folder
npm run dev
```

Vite server will automatically open at `http://localhost:1420` (or available port).

#### Step 4: Build for Production
```bash
# From CuadernoPracticas/ folder
npm run build
```

Compiled files will be in the `dist/` folder.

#### Step 5 (Optional): Build for Desktop
```bash
# From CuadernoPracticas/ folder
npm run electron:build
```

An installer will be generated in the `dist/` folder according to your OS.

---

### 📖 User Guide

#### Main Interface
The application is divided into two main areas:

1. **Header bar** (fixed at top)
   - Quick action buttons: Save, Import, Export, PDF, Configure
   - Theme selector (light/dark)

2. **Content area** (scrollable)
   - Practice day cards
   - Each card contains details of one working day

#### Typical Workflow

##### 1. Create a New Notebook
```
1. Click "Configure" (gear icon)
2. Fill in the fields:
   - Start date: e.g. 2025-09-01
   - End date: e.g. 2025-12-31
   - Active days: Select Monday to Friday (default)
   - Hours per day: e.g. 5
3. Click "Create Notebook"
4. All working days will be auto-generated
```

##### 2. Register Activities for a Day
```
For each day card:

1. Check "Day attended" if you were there ✓
2. Click the clock icon (⏱) to show hours editor
3. Adjust hours (e.g. 5.5) - Field disappears when clicking outside
4. Write activities in the text area
   (Each line = one activity)
5. Draw your signature on the canvas
6. Changes auto-save
```

##### 3. Export Notebook
```
1. Click "Export"
2. File will download: cuaderno-practicas-YYYY-MM-DD.json
3. Store in safe place to backup your data
```

##### 4. Import Previous Notebook
```
1. Click "Import"
2. Select previously exported JSON file
3. Notebook will load, replacing current one
```

##### 5. Generate PDF/Print
```
1. Click "Generate PDF"
2. Browser print dialog opens
3. Select "Save as PDF" or your printer
4. Configure margins, header/footer as needed
5. Confirm to save or print
```

#### Useful Shortcuts
| Action | Method |
|--------|--------|
| Quick save | Press `Ctrl+S` (if implemented) |
| Toggle theme | Click theme selector in header |
| Edit hours | Click clock icon (⏱) on card |
| Clear signature | Click "Clear" button under canvas |

---

### 📁 Project Structure

```
APP-Cuaderno-de-practicas/
├── README.md                          # This file
├── LICENSE.md                         # MIT License
├── CuadernoPracticas/                 # 🎯 Main application
│   ├── package.json                   # Dependencies and scripts
│   ├── tsconfig.json                  # TypeScript config
│   ├── vite.config.ts                 # Vite config
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── postcss.config.js              # PostCSS config
│   ├── electron-builder.json          # Config for .exe/.dmg/.snap build
│   ├── index.html                     # HTML entry point
│   ├── public/                        # Static assets
│   │   └── data.json                  # Example data (optional)
│   ├── electron/                      # Electron scripts
│   │   └── main.cjs                   # Electron entry point
│   ├── dist/                          # Production build (generated)
│   ├── src/                           # 📂 Source code
│   │   ├── main.tsx                   # React entry point
│   │   ├── App.tsx                    # Root component
│   │   ├── index.css                  # Global styles
│   │   ├── vite-env.d.ts              # Vite type definitions
│   │   ├── components/
│   │   │   ├── features/
│   │   │   │   └── activities/
│   │   │   │       └── CuadernoPracticas.tsx  # Main activities component
│   │   │   ├── layout/
│   │   │   │   └── Header/
│   │   │   │       └── Header.tsx    # Top navigation bar
│   │   │   └── common/
│   │   │       ├── NotificationProvider.tsx  # Notification provider
│   │   │       └── ToastContainer.tsx       # Notification container
│   │   ├── core/                      # Shared logic
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── styles/                    # Additional CSS files
│   │   └── assets/                    # Images, icons, fonts
│   └── node_modules/                  # Installed dependencies
├── .gitignore                         # Files ignored by Git
└── (other config files)
```

**Notes about structure:**
- Components organized by features (features-first approach)
- Each component in its own folder with associated styles
- Application state managed with React Hooks (`useState`, `useContext`)
- Persistence handled with browser `localStorage`

---

### 🔧 Development

#### Run with Hot Reload (HMR)
```bash
cd CuadernoPracticas
npm run dev
```

Vite will handle:
- Serving app at `http://localhost:1420`
- Auto-reload on file changes
- Preserve application state (don't lose test data)

#### React Component Patterns

The application follows these patterns:

```tsx
// 1. Functional components with TypeScript
export function MyComponent({ prop1, prop2 }: Props) {
  const [state, setState] = useState<Type>(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <div>{/* JSX */}</div>;
}

// 2. Typed props
interface Props {
  title: string;
  onAction: (id: string) => void;
}

// 3. Local state with TypeScript
const [data, setData] = useState<DayType[]>([]);
```

#### Extending Features

To add new functionality:

1. Create new component in `src/components/features/[feature]/`
2. Define its types/interfaces
3. Integrate into `CuadernoPracticas.tsx` data flow
4. Test with `npm run dev`
5. Build with `npm run build`

---

### 📦 Desktop Build (Electron)

The application includes configuration to package as a desktop app.

#### Build for Your OS
```bash
cd CuadernoPracticas
npm run electron:build
```

This will generate:
- **Windows**: Installer `.exe` at `dist/CuadernoPracticas Setup X.X.X.exe`
- **macOS**: Installer `.dmg` at `dist/CuadernoPracticas-X.X.X.dmg`
- **Linux**: Package `.AppImage` at `dist/CuadernoPracticas-X.X.X.AppImage`

#### Run Electron in Development Mode
```bash
cd CuadernoPracticas
npm run electron:dev
```

This will simultaneously run:
- Vite development server
- Electron app linked to that server

#### Customize Electron
Edit `electron/main.cjs` to customize:
- Initial window size
- Application icon
- Menu behavior
- Allowed URLs
- Auto-update

---

### 📄 JSON Data Format

#### General Structure
```json
{
  "config": {
    "horasPorDia": 5,
    "fechaInicio": "2025-09-01",
    "fechaFin": "2025-12-31",
    "diasActivos": ["lunes", "martes", "miércoles", "jueves", "viernes"]
  },
  "dias": [
    {
      "fecha": "2025-09-01",
      "asistido": true,
      "horas": 5,
      "actividades": [
        "Team orientation",
        "Safety induction",
        "Active projects review"
      ],
      "firma": "data:image/png;base64,iVBORw0KGgoAAAANS..."
    }
  ]
}
```

#### Detailed Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `config.horasPorDia` | number | Default hours per working day | Yes |
| `config.fechaInicio` | string (ISO date) | First practice day (YYYY-MM-DD) | Yes |
| `config.fechaFin` | string (ISO date) | Last practice day (YYYY-MM-DD) | Yes |
| `config.diasActivos` | array | Active weekdays (Monday-Friday) | No |
| `dias[].fecha` | string (ISO date) | Date of the working day | Yes |
| `dias[].asistido` | boolean | Attendance confirmed | No (default: true) |
| `dias[].horas` | number | Hours worked that day | No (default: horasPorDia) |
| `dias[].actividades` | array[string] | List of activities performed | No (default: []) |
| `dias[].firma` | string (DataURL) | Signature in PNG base64 format | No (default: null) |

#### Complete Example
```json
{
  "config": {
    "horasPorDia": 5
  },
  "dias": [
    {
      "fecha": "2025-09-01",
      "asistido": true,
      "horas": 5,
      "actividades": ["Induction"],
      "firma": null
    },
    {
      "fecha": "2025-09-02",
      "asistido": true,
      "horas": 4.5,
      "actividades": ["Requirements analysis", "Database design"],
      "firma": "data:image/png;base64,..."
    }
  ]
}
```

#### Import Validation
When importing JSON the application validates:
- Presence of `dias` array
- ISO date format
- Correct data types
- Descriptive error messages if issues found

---

### 🆘 Troubleshooting

#### Issue: "Changes are not being saved"
**Cause:** localStorage may be disabled or full.
**Solution:**
1. Check that localStorage is enabled in browser (F12 → Storage)
2. Clear old data or export/import notebook
3. Try different browser
4. Verify app has read/write permissions

#### Issue: "Error when importing JSON"
**Cause:** Incorrect format or file corruption.
**Solution:**
1. Open JSON in text editor and validate format
2. Ensure it has `config` and `dias` fields
3. Use online JSON validator if unsure
4. Re-export and re-import with current version

#### Issue: "Signature doesn't show in PDF"
**Cause:** Rendering issue in printer or browser.
**Solution:**
1. Try different browser
2. Verify signature shows on screen before printing
3. Redraw signature and confirm it appears
4. Change print settings (margins, scale)

#### Issue: "Electron doesn't open or shows blank screen"
**Cause:** Corrupted compiled file or incorrect paths.
**Solution:**
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
npm run electron:build
```

#### Issue: "npm install fails with errors"
**Cause:** Version conflicts or incomplete installation.
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If persists, use exact install
npm ci
```

---

### 🎯 TO DO - Development Roadmap

#### 📊 PHASE 1: Fundamentals and Base Architecture (CRITICAL PRIORITY)

- [ ] **Automated Testing**
  - [ ] Configure Vitest
  - [ ] Unit tests for services
  - [ ] Component tests with React Testing Library
  - [ ] Achieve >80% coverage

- [ ] **Data Validation**
  - [ ] Implement schemas with Zod
  - [ ] Form validation
  - [ ] Custom error messages
  - [ ] Validation tests

- [ ] **Separate Basic and Advanced Configuration**
  - [ ] Create tabs in ConfigModal
  - [ ] BasicSettings component
  - [ ] AdvancedSettings component
  - [ ] Migrate existing configuration

---

#### 🎨 PHASE 2: UX and Visualization Improvements

- [ ] **Keyboard Shortcuts**
  - [ ] useKeyboardShortcuts hook
  - [ ] Implement global shortcuts (Ctrl+S, Ctrl+P, etc.)
  - [ ] Shortcuts help modal (Ctrl+?)
  - [ ] Shortcuts tests

- [ ] **Drag and Drop to Import**
  - [ ] useFileDrop hook
  - [ ] DropZone component
  - [ ] Visual drag & drop feedback
  - [ ] File type validation

- [ ] **Completion Visual Indicators**
  - [ ] Progress bar in header
  - [ ] Quick stats cards
  - [ ] Streak indicators
  - [ ] Color coding by % completed

- [ ] **Weekly/Monthly Views**
  - [ ] ViewSelector component
  - [ ] Daily view (refactor current)
  - [ ] Weekly view (grouping)
  - [ ] Monthly view (calendar)
  - [ ] Persist selected view

---

#### 🔧 PHASE 3: Advanced Data Management

- [ ] **Flexible Storage System**
  - [ ] StorageAdapter interface
  - [ ] LocalStorageAdapter
  - [ ] FileSystemAdapter (Electron dialog)
  - [ ] GoogleDriveAdapter (OAuth)
  - [ ] StorageFactory
  - [ ] Storage selection UI

- [ ] **Change History and Logs**
  - [ ] HistoryService with precise timestamps
  - [ ] LogService with levels
  - [ ] HistoryViewer component
  - [ ] Revert functionality
  - [ ] Entry limit (100 max)
  - [ ] History tests

---

#### 📈 PHASE 4: Statistics and Export

- [ ] **Complete Statistics Dashboard**
  - [ ] StatsDashboard component
  - [ ] Hours per week chart (Recharts)
  - [ ] Attendance calendar (heat map)
  - [ ] Productivity trends
  - [ ] Advanced metrics (streak, average, etc.)
  - [ ] Statistical calculation tests

- [ ] **Multi-format Export**
  - [ ] ExcelExporter with multiple sheets
  - [ ] WordExporter with professional formatting
  - [ ] CSVExporter
  - [ ] HTMLExporter
  - [ ] Format selection modal
  - [ ] Exporter tests

- [ ] **Advanced PDF Configuration**
  - [ ] Font configuration (title, body, caption)
  - [ ] Customizable margins
  - [ ] Headers/footers
  - [ ] Configurable page numbering
  - [ ] Company logo support
  - [ ] Optional watermark

---

#### 🌐 PHASE 5: Internationalization and AI

- [ ] **Multi-language System**
  - [ ] Configure i18next
  - [ ] Translation files (ES, EN, FR, DE)
  - [ ] LanguageSelector component
  - [ ] User translation editor
  - [ ] Translation export/import system
  - [ ] i18n tests

- [ ] **AI Integration (Optional)**
  - [ ] AIService with provider architecture
  - [ ] OllamaProvider (local, free) - Recommended
  - [ ] OpenAIProvider (user API key)
  - [ ] HuggingFaceProvider (user token)
  - [ ] AIAssistant component
  - [ ] Activity suggestions
  - [ ] Skills analysis
  - [ ] Report generation
  - [ ] Privacy and cost disclaimers

---

#### 📊 Overall Progress

```
📊 Progress by Phase:
├─ Phase 1: Fundamentals     [ ] 0/3  (0%)
├─ Phase 2: UX               [ ] 0/4  (0%)
├─ Phase 3: Advanced Data    [ ] 0/2  (0%)
├─ Phase 4: Statistics       [ ] 0/3  (0%)
└─ Phase 5: i18n & AI        [ ] 0/2  (0%)

Total: 0/14 features completed (0%)
```

---

### 🤝 Contributing

Contributions are welcome. Please:

1. **Fork** the repository from GitHub
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Make descriptive commits (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request** describing the changes

#### Contribution Guidelines
- Follow existing code style (TypeScript, React Hooks)
- Add comments for complex logic
- Test in browser before submitting
- Update documentation if needed

---

### 📄 License

This project is licensed under the **MIT License**. See `LICENSE.md` file for complete details.

```
Copyright (c) 2025 Termi

Permission is hereby granted, free of charge, to any person...
[See LICENSE.md for full text]
```

---

**Last updated:** November 2025 | Maintained by Termi
