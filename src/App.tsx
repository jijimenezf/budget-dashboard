import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Dashboard } from "@/components/Dashboard";
import { getCurrentParameters } from "@/utils/selector";

function App() {

  const { currentMonth, currentYear } = getCurrentParameters();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-end"><ModeToggle /></div>
      <Dashboard currentMonth={currentMonth} currentYear={currentYear} />
    </ThemeProvider>
  )
}

export default App
