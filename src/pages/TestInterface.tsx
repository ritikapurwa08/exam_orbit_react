import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

const OPTIONS = [
  { id: "A", text: "400 kJ/kg" },
  { id: "B", text: "-400 kJ/kg" },
  { id: "C", text: "600 kJ/kg" },
  { id: "D", text: "800 kJ/kg" },
  { id: "E", text: "None of the above" },
];

export default function TestInterface() {
  const [selectedOption, setSelectedOption] = useState<string | null>("B");

  return (
    <CenterLayout>
      <div className="w-full flex flex-col gap-6">
        
        {/* Sticky Header / Progress Section specific to Test */}
        <header className="sticky top-20 z-40 bg-card/80 backdrop-blur-xl border-b border-x rounded-t-2xl px-6 py-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <span className="hover:text-foreground cursor-pointer transition-colors">Chemistry</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-foreground">Thermodynamics</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-primary">
              <div className="flex gap-1 bg-muted px-3 py-1.5 rounded-lg font-bold font-mono tracking-wider tabular-nums">
                <span>12</span>:<span>45</span>
              </div>
              <span className="material-symbols-outlined text-muted-foreground">timer</span>
            </div>
            <Link to="/summary">
              <button className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Finish Test
              </button>
            </Link>
          </div>
        </header>

        {/* Thin Progress Bar positioned right under header */}
        <div className="h-1.5 w-full bg-muted overflow-hidden -mt-6 rounded-b-2xl shadow-sm z-30">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary" 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          {/* Main Question Area (flex-1) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="bg-card/60 backdrop-blur-xl p-8 rounded-2xl border shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">Question 15 of 50</span>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors group">
                  <span className="material-symbols-outlined text-sm group-hover:fill-amber-500">bookmark</span>
                  <span className="text-xs font-bold">MARK FOR REVIEW</span>
                </button>
              </div>
              
              <div className="prose prose-slate max-w-none mb-8">
                <h2 className="text-xl font-semibold leading-relaxed">
                  In a steady-state flow process, a gas undergoes an adiabatic expansion through a nozzle. If the initial enthalpy is 3200 kJ/kg and the final enthalpy is 2800 kJ/kg, what is the change in kinetic energy of the gas?
                </h2>
              </div>
              
              {/* Options */}
              <div className="grid gap-3">
                {OPTIONS.map((opt, index) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button 
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`group flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-muted hover:border-primary/50 bg-card/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`size-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground border group-hover:bg-primary group-hover:text-primary-foreground"
                        }`}>
                          {opt.id}
                        </span>
                        <span className={`font-medium ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {opt.text}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border">
                        [{index + 1}]
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Actions Footer */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-muted/50">
                <button className="flex items-center gap-2 text-muted-foreground font-bold px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Previous
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedOption(null)}
                    className="text-muted-foreground font-bold px-4 py-2 hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                  <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transform">
                    Next
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side / Navigation Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-72 space-y-6"
          >
            <div className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border shadow-sm sticky top-[136px]">
              <h3 className="font-bold text-sm mb-6 flex items-center justify-between">
                Overview
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded uppercase text-muted-foreground">50 Total</span>
              </h3>
              
              <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Simulated Grid of questions */}
                {Array.from({ length: 50 }).map((_, i) => {
                  const num = i + 1;
                  const formattedNum = num.toString().padStart(2, '0');
                  
                  let stateClass = "border border-muted text-muted-foreground hover:border-primary/50";
                  let indicator = null;
                  
                  if (num <= 3 || num === 6 || num === 7 || num === 11 || num === 12) {
                    stateClass = "bg-primary text-primary-foreground border-primary";
                  } else if (num === 15) {
                    stateClass = "bg-primary/10 ring-2 ring-primary border-transparent text-primary";
                  } else if (num === 5) {
                    stateClass = "border-muted text-foreground";
                    indicator = <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>;
                  }

                  return (
                    <button key={num} className={`relative aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all hover:scale-105 ${stateClass}`}>
                      {formattedNum}
                      {indicator}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-muted/50 space-y-3">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 bg-primary rounded-sm"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 border border-muted rounded-sm"></div>
                  <span>Unvisited</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 border border-muted rounded-sm relative">
                    <span className="absolute top-[-2px] right-[-2px] w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  </div>
                  <span>Marked for Review</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/10 text-foreground p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-primary opacity-80 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                Pro Tip
              </h4>
              <p className="text-sm leading-relaxed font-medium">Use number keys <span className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-bold">1-5</span> to quickly select options and <span className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-bold">Enter</span> for next.</p>
            </div>
          </motion.aside>

        </div>
      </div>
    </CenterLayout>
  );
}

