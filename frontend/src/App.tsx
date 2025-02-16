import { ThemeProvider } from "@/components/ui/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEditQuiz from "./pages/CreateEditQuiz";
import Layout from "./pages/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-quiz" element={<CreateEditQuiz />} />
            <Route path="/edit-quiz/:id" element={<CreateEditQuiz />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
