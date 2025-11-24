// App.tsx
import "./App.css";
/**
 * Main Application Component
 * Simplified architecture using EventBus for communication
 * No prop drilling - components communicate via events
 */

import { Header } from "./components/layout/Header/Header";
import { CuadernoPracticas } from "./components/features/activities/CuadernoPracticas";

function App() {
  return (
    <div className="app-root min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#0b0f1a] dark:text-neutral-100">
      <div className="w-full max-w-[1200px] mx-auto px-4 min-h-screen flex flex-col pt-20">
        <Header />
        <div className="flex-1">
          <CuadernoPracticas />
        </div>
      </div>
    </div>
  );
}

export default App;
