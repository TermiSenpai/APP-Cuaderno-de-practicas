import "./App.css";
import CuadernoPracticas from "./Activities.tsx";
import Header from "./Header.tsx";

function App() {
  return (
    <main className="w-full max-w-[1200px] mx-auto px-4">
      <Header />
      <CuadernoPracticas />
    </main>
  );
}

export default App;