// App.tsx
import "./App.css";
import CuadernoPracticas from "./Activities.tsx";
import Header from "./Header.tsx";

function App() {
  // Definir las funciones de acción aquí o pasarlas desde un contexto si es necesario
  const handleSave = () => {
    // Lógica de guardado
    console.log("Guardar");
  };
  const handleImport = () => {
    // Lógica de importar
    console.log("Importar");
  };
  const handleExport = () => {
    // Lógica de exportar
    console.log("Exportar");
  };
  const handlePrintPDF = () => {
    // Lógica de imprimir
    console.log("Imprimir PDF");
  };
  return (
    <div className="app-root min-h-screen w-full overflow-x-hidden text-neutral-100 bg-[#0b0f1a] bg-gradient-to-b from-[#0b1220] to-[#0b0f1a]">
  <div className="w-full max-w-[1200px] mx-auto px-4 min-h-screen flex flex-col pt-20">
        <Header
          onSave={handleSave}
          onImport={handleImport}
          onExport={handleExport}
          onPrintPDF={handlePrintPDF}
        />
        <div className="flex-1">
          <CuadernoPracticas />
        </div>
      </div>
    </div>
  );
}

export default App;