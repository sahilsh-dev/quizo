import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="text-white p-4 border-b-white border-b-1">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold">
            Quizo
          </Link>
          <div className="flex gap-3">
            <Button>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button>
              <Link to="/create-quiz">Create Quiz</Link>
            </Button>
            {/* 
            <Button variant="ghost" asChild>
              <Link to="/">Logout</Link>
            </Button>
            */}
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
