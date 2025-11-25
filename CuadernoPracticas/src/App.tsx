// App.tsx
/**
 * Main Application Component
 * Simplified architecture using EventBus for communication
 * No prop drilling - components communicate via events
 */

import { Header } from "./components/layout/Header/Header";
import { CuadernoPracticas } from "./components/features/activities/CuadernoPracticas";
import { NotificationProvider } from "./components/common/NotificationProvider";
import { ToastContainer } from "./components/common/ToastContainer";

function App() {
  return (
    <NotificationProvider>
      <div className="app-root min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#FAF9F6] via-[#F5F3EF] to-[#F0EDE7] text-[#2C2A27] dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] dark:text-[#F1F5F9]">
        <div className="w-full max-w-[1200px] mx-auto px-4 min-h-screen flex flex-col pt-20">
          <Header />
          <div className="flex-1">
            <CuadernoPracticas />
          </div>
        </div>
        <ToastContainer />
      </div>
    </NotificationProvider>
  );
}

export default App;
