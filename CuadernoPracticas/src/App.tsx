// App.tsx
import "./App.css";
import CuadernoPracticas from "./Activities.tsx";
import Header from "./Header.tsx";

function App() {
  return (
    <div className="app-root min-h-screen w-full overflow-x-hidden text-neutral-100 bg-[#0b0f1a] bg-gradient-to-b from-[#0b1220] to-[#0b0f1a]">
      <main className="w-full max-w-[1200px] mx-auto px-4">
        <Header />
        <CuadernoPracticas />
      </main>
    </div>
  );
}

export default App;