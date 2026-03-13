import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Icons } from "../components/ui/icons";

const containerAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function AdminConsole() {
  return (
    <CenterLayout>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-12 pt-4">
        
        {/* Header Title */}
        <div className="flex flex-col gap-1 px-2">
          <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase">Creator Workspace</p>
          <h2 className="text-3xl font-black tracking-tight">Manage Resource Pipeline</h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted/50 p-1 rounded-xl w-fit">
          <button className="px-5 py-2.5 text-sm font-bold bg-background shadow-sm rounded-lg text-foreground flex items-center gap-2">
            <Icons.fileUp className="size-4" />
            PDF Manager
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors rounded-lg flex items-center gap-2">
            <Icons.edit3 className="size-4" />
            Question Editor
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors rounded-lg flex items-center gap-2">
            <Icons.history className="size-4" />
            Recent Uploads
          </button>
        </div>

        <motion.div 
          variants={containerAnim}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: PDF Manager Zone + Quick Actions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <motion.section variants={itemAnim} className="bg-card/60 backdrop-blur-xl border rounded-3xl p-8 shadow-sm">
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-1 tracking-tight">PDF Upload Zone</h4>
                <p className="text-muted-foreground text-sm font-medium">Convert your study materials into structured exam questions.</p>
              </div>
              
              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center bg-muted/20 hover:border-primary hover:bg-muted/40 transition-all cursor-pointer group">
                <div className="size-16 bg-background rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all text-primary">
                  <Icons.cloudUpload size={32} />
                </div>
                <p className="text-sm font-bold mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground font-semibold">PDF, DOCX up to 25MB</p>
              </div>
              
              <div className="mt-8">
                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Current Processing</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-destructive/10 text-destructive rounded-lg flex items-center justify-center">
                        <Icons.fileText size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Physics_Unit_3_Notes.pdf</p>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">4.2 MB • Processing AI extraction...</p>
                      </div>
                    </div>
                    <div className="w-24 md:w-32 bg-muted h-2 rounded-full overflow-hidden border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                        className="bg-primary h-full w-[65%]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemAnim} className="bg-card/60 backdrop-blur-xl border rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h4 className="text-xl font-bold mb-1 tracking-tight">Quick Actions</h4>
                  <p className="text-muted-foreground text-sm font-medium">Manage existing content banks</p>
                </div>
                <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 shadow-sm transition-opacity">
                  <Icons.plus className="size-[18px]" /> New Course
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border rounded-2xl hover:border-primary/50 cursor-pointer transition-colors hover:shadow-sm bg-card/50">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icons.archive size={24} />
                  </div>
                  <p className="text-sm font-bold mb-1">Bulk Export</p>
                  <p className="text-xs text-muted-foreground font-medium">Export questions to LMS</p>
                </div>
                <div className="p-5 border rounded-2xl hover:border-primary/50 cursor-pointer transition-colors hover:shadow-sm bg-card/50">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icons.wand2 size={24} />
                  </div>
                  <p className="text-sm font-bold mb-1">AI Refiner</p>
                  <p className="text-xs text-muted-foreground font-medium">Auto-clean question text</p>
                </div>
              </div>
            </motion.section>
            
          </div>

          {/* Right Column: Upload options & Editor Preview */}
          <div className="flex flex-col gap-6">
            
            <motion.section variants={itemAnim} className="bg-card/60 backdrop-blur-xl border rounded-3xl p-6 shadow-sm">
              <h4 className="text-base font-bold mb-5 flex items-center gap-2 tracking-tight">
                <Icons.code size={20} className="text-primary bg-primary/10 p-1.5 rounded-lg box-content" />
                Bulk Upload Questions
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-2xl border">
                  <p className="text-xs font-semibold text-muted-foreground leading-relaxed mb-4">Upload your questions in bulk using structured formats.</p>
                  <div className="flex flex-col gap-3">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-background border rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors shadow-sm">
                      <Icons.fileSpreadsheet className="size-[18px]" /> Upload CSV
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-background border rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors shadow-sm">
                      <Icons.code className="size-[18px]" /> Upload JSON
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center py-2">
                  <div className="h-px bg-border flex-1"></div>
                  <span className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">OR</span>
                  <div className="h-px bg-border flex-1"></div>
                </div>
                
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                  <Icons.edit2 className="size-[18px]" /> Manual Entry
                </button>
              </div>
            </motion.section>

            <motion.section variants={itemAnim} className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl relative overflow-hidden shadow-primary/20">
              <div className="relative z-10">
                <h4 className="text-lg font-black tracking-tight mb-2 flex items-center gap-2">
                  <Icons.lightbulb className="text-amber-400 size-6" />
                  Creator Tip
                </h4>
                <p className="text-primary-foreground/80 text-sm mb-5 leading-relaxed font-medium">
                  Use our new AI feature to generate distractor options based on your correct answer automatically.
                </p>
                <button className="text-xs font-bold flex items-center gap-1 hover:opacity-80 transition-opacity bg-background/20 px-3 py-1.5 rounded-full w-fit">
                  Learn how <Icons.arrowRight className="size-[14px]" />
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none transform -rotate-12">
                <Icons.lightbulb className="size-[120px]" />
              </div>
            </motion.section>

            {/* Rich Text Editor Preview */}
            <motion.section variants={itemAnim} className="bg-card/60 backdrop-blur-xl border rounded-3xl overflow-hidden shadow-sm flex flex-col h-full min-h-[200px]">
              <div className="bg-muted/50 p-3 border-b flex gap-2 flex-wrap">
                {[
                  <Icons.bold key="bold" size={18} />, 
                  <Icons.italic key="italic" size={18} />, 
                  <Icons.list key="list" size={18} />, 
                  <Icons.sigma key="sigma" size={18} />
                ].map((icon, i) => (
                  <button key={i} className="size-8 flex items-center justify-center hover:bg-background rounded-lg border border-transparent hover:border-border transition-colors text-muted-foreground hover:text-foreground shadow-sm">
                    {icon}
                  </button>
                ))}
              </div>
              <div className="p-4 flex-1 text-muted-foreground text-sm font-medium focus-within:text-foreground">
                <textarea 
                  className="w-full h-full bg-transparent border-none resize-none outline-none placeholder:text-muted-foreground"
                  placeholder="Start typing your question here..."
                />
              </div>
            </motion.section>

          </div>
        </motion.div>

      </div>
    </CenterLayout>
  );
}
