import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CenterLayoutProps {
  children: ReactNode;
}

export function CenterLayout({ children }: CenterLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-primary/30 selection:text-primary">
      <div className="w-full max-w-5xl mx-auto flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Decorative Background Elements for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>
    </div>
  );
}
