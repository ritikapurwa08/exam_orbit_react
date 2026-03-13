import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Link } from "react-router";

const containerAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function TestSummary() {
  return (
    <CenterLayout>
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Hero Result Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-card/60 backdrop-blur-xl rounded-3xl border p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group"
        >
          {/* Decorative glow behind the circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-1000 pointer-events-none" />

          <div className="relative flex items-center justify-center mb-8">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle className="text-muted stroke-current" cx="96" cy="96" fill="transparent" r="88" strokeWidth="12"></circle>
              <motion.circle 
                initial={{ strokeDashoffset: 552.92 }}
                animate={{ strokeDashoffset: 55.29 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="text-primary stroke-current drop-shadow-md" 
                cx="96" cy="96" 
                fill="transparent" 
                r="88" 
                strokeDasharray="552.92" 
                strokeLinecap="round" 
                strokeWidth="12"
              ></motion.circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-5xl font-black tracking-tighter"
              >
                90%
              </motion.span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-1">Score</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-black tracking-tight mb-3">Test Completed Successfully!</h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Excellent performance! You've demonstrated a strong understanding of the subject matter. Keep up the great work.
          </p>
        </motion.div>

        {/* Metric Grid */}
        <motion.div 
          variants={containerAnim}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Questions", value: "20", icon: "quiz", color: "text-muted-foreground" },
            { label: "Correct", value: "18", icon: "check_circle", color: "text-green-500" },
            { label: "Time", value: "12m 40s", icon: "timer", color: "text-muted-foreground" },
            { label: "Accuracy", value: "90%", icon: "insights", color: "text-primary" },
          ].map((metric, i) => (
            <motion.div 
              key={i}
              variants={itemAnim}
              className="bg-card/60 backdrop-blur-xl flex flex-col gap-2 rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow hover:border-primary/30 group"
            >
              <div className={`flex items-center gap-2 ${metric.color} mb-1 group-hover:scale-105 transition-transform`}>
                <span className="material-symbols-outlined text-xl">{metric.icon}</span>
                <p className="text-xs font-bold uppercase tracking-wider">{metric.label}</p>
              </div>
              <p className="tracking-tight text-3xl font-black">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Analysis Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card/60 backdrop-blur-xl rounded-2xl border overflow-hidden shadow-sm"
        >
          <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/20">
            <h3 className="font-bold text-lg">Detailed Analytics</h3>
            <span className="text-xs font-bold px-3 py-1 bg-background rounded-full border shadow-sm">Attempt #4</span>
          </div>
          <div className="p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Subject Proficiency</span>
                <span className="text-sm font-black text-primary">High</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-500/5 dark:bg-green-500/10 border border-green-500/20">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-green-700 dark:text-green-400">Strengths</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Logical Reasoning, Calculus Basics</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  <span className="material-symbols-outlined">error_outline</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-amber-700 dark:text-amber-400">Improvement Areas</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Time Management in Section B</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4"
        >
          <button className="w-full sm:w-auto min-w-[180px] flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-primary/20 hover:scale-[1.02]">
            <span className="material-symbols-outlined text-xl">rule</span>
            Review Answers
          </button>
          
          <Link to="/topics" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto min-w-[180px] flex h-12 items-center justify-center gap-2 rounded-xl border-2 bg-transparent text-sm font-bold transition-all hover:bg-muted hover:scale-[1.02]">
              <span className="material-symbols-outlined text-xl">replay</span>
              Retake Test
            </button>
          </Link>
          
          <button className="w-full sm:w-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-transparent text-muted-foreground text-sm font-bold transition-all hover:text-foreground px-6 hover:bg-muted ml-0 sm:ml-auto border border-transparent hover:border-border">
            <span className="material-symbols-outlined text-xl">share</span>
            Share Result
          </button>
        </motion.div>

      </div>
    </CenterLayout>
  );
}

