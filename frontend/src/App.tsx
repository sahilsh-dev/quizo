import { ThemeProvider } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-md m-auto text-center">
        <h1>Hello, world!</h1>
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
