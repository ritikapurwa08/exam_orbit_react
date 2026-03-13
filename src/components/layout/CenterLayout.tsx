import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";

interface CenterLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const NAV_ITEMS = [
  { name: "Subjects", path: "/", icon: "book_2" },
  { name: "History", path: "/history", icon: "history" },
  { name: "Leaderboard", path: "/leaderboards", icon: "leaderboard" },
  { name: "Study Groups", path: "/groups", icon: "groups" },
  { name: "Profile", path: "/profile", icon: "account_circle" },
];

export function CenterLayout({ children, hideNav = false }: CenterLayoutProps) {
  const location = useLocation();

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col p-4 selection:bg-primary/30 selection:text-primary relative overflow-hidden ${hideNav ? 'p-0' : ''}`}>
      
      {/* Top Navigation Bar */}
      {!hideNav && (
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between p-4 mb-8 bg-card/60 backdrop-blur-md border rounded-2xl shadow-sm z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-black tracking-tighter">
            EO
          </div>
          <span className="font-bold text-lg tracking-tight">ExamOrbit</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {/* Fallback to hugeicons if needed, but since we are replacing material UI, we can just use words or placeholder. For now, we'll just show text since we might not have the icons handy without setting them up.*/}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-bold text-sm">
           New Session
        </button>
      </header>
      )}

      <div className={`flex-1 w-full max-w-5xl mx-auto flex flex-col relative z-10 ${hideNav ? 'h-screen p-4' : ''}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Decorative Background Elements for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
    </div>
  );
}

