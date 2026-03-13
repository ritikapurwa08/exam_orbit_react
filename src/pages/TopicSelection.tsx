import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router";
import { Icons } from "../components/ui/icons";
import { getSubjectById } from "../data/subjects";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const REF_MATERIALS = [
  { name: "Nomenclature Guide.pdf", size: "1.2 MB • PDF", icon: <Icons.fileText size={20} /> },
  { name: "Formula Cheat Sheet", size: "850 KB • PDF", icon: <Icons.fileText size={20} /> },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function TopicSelection() {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject") || "rajasthan_geography";
  const subject = getSubjectById(subjectId);
  
  const history = useQuery(api.history.getUserHistory) || [];

  if (!subject) {
    return (
      <CenterLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold">Subject not found</h2>
          <Link to="/" className="text-primary mt-4 hover:underline">Return to Subjects</Link>
        </div>
      </CenterLayout>
    );
  }

  // Calculate overall completion generic based on history
  const totalCompleted = history.filter(h => h.subjectId === subjectId).length;
  const totalTopics = subject.topics.length || 1; 
  const completionPercentage = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <CenterLayout>
      <div className="w-full flex flex-col md:flex-row gap-8">
        
        {/* Left Column (30%) */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          
          {/* Subject Header & Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border shadow-sm"
          >
            <div className="mb-6">
              <span className="text-xs font-bold text-primary dark:text-primary-foreground uppercase tracking-widest mb-2 block">Syllabus Explorer</span>
              <h2 className="text-3xl font-black tracking-tight mb-2">{subject.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">Master the key concepts and practice specialized topics effectively.</p>
            </div>
            
            <div className="flex items-center justify-center py-6">
              <div className="relative size-32">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle className="stroke-muted" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                  <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round" strokeWidth="3"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold leading-none">{completionPercentage}%</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Complete</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-2.5 bg-muted text-foreground text-xs font-bold rounded-xl transition-all hover:bg-muted/80">
              View Syllabus
            </button>
          </motion.div>

          {/* Reference Materials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-bold px-1">Reference Materials</h3>
            <div className="flex flex-col gap-3">
              {REF_MATERIALS.map((mat, i) => (
                <div key={i} className="flex items-center gap-4 bg-card/60 backdrop-blur-xl p-4 rounded-xl border group hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-center rounded-lg bg-muted text-muted-foreground size-12 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {mat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{mat.name}</p>
                    <p className="text-xs text-muted-foreground">{mat.size}</p>
                  </div>
                  <Icons.download className="text-muted-foreground group-hover:text-primary transition-colors size-5" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (70%) */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-xl font-bold">Curriculum Topics</h3>
            <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
              <button className="px-3 py-1.5 text-xs font-bold bg-background shadow-sm rounded-md">All Topics</button>
              <button className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground">Incomplete</button>
            </div>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {subject.topics.length === 0 ? (
              <div className="bg-card/60 backdrop-blur-xl p-8 rounded-2xl border flex flex-col items-center justify-center text-center">
                <Icons.history size={48} className="text-muted-foreground mb-4 opacity-50" />
                <h4 className="text-lg font-bold mb-2">Topics yet to be added</h4>
                <p className="text-sm text-muted-foreground max-w-sm">We are currently compiling the best questions for this subject. Check back soon!</p>
              </div>
            ) : (
              subject.topics.map((topic) => {
                const topicHistory = history.filter(h => h.topicId === topic.id && h.subjectId === subjectId);
                const isCompleted = topicHistory.length > 0;
                const bestScore = isCompleted ? Math.max(...topicHistory.map(h => (h.score / h.totalQuestions) * 100)) : 0;
                
                const status = isCompleted ? "Completed" : "Not Started";
                const color = isCompleted 
                  ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" 
                  : "text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
                  
                return (
                  <motion.div 
                    key={topic.id}
                    variants={itemAnim}
                    className="bg-card/60 backdrop-blur-xl p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-lg hover:border-primary/50 transition-all group"
                  >
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold truncate group-hover:text-primary transition-colors">{topic.name}</h4>
                        {status !== "Not Started" && (
                          <span className={`${color} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>
                            {status}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className={`flex items-center gap-1.5 text-sm font-medium ${status === "Not Started" ? "text-muted-foreground italic" : "text-muted-foreground"}`}>
                          <Icons.history className="size-4" />
                          {status === "Not Started" ? "No attempts yet" : (
                            <span>Best Score: <span className="text-foreground font-semibold">{Math.round(bestScore)}%</span></span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/test?subject=${subjectId}&topic=${topic.id}`} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md">
                        {status === "Completed" ? "Practice Again" : "Start Practice"}
                      </button>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </div>

      </div>
    </CenterLayout>
  );
}

