import "./App.css";
import CuadernoPracticas from "./Activities.tsx";
import Header from "./Header.tsx";

function App() {
  return (
    <div className="app-root w-full overflow-x-hidden text-neutral-100">
    <div className="container-inner px-4 sm:px-5 pt-4 sm:pt-6 pb-6 sm:pb-8 print:px-0 flex-grow"></div>
      <main className="w-full max-w-[1200px] mx-auto px-4">
        <Header />
        <CuadernoPracticas />
      </main>
    </div>
  );
}

export default App;