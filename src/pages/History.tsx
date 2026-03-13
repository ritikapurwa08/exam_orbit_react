import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Icons } from "../components/ui/icons";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { getSubjectById } from "../data/subjects";
import { Link } from "react-router";

export default function HistoryPage() {
  const history = useQuery(api.history.getUserHistory);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history?.filter((h) => {
    const subject = getSubjectById(h.subjectId);
    const topic = subject?.topics.find(t => t.id === h.topicId);
    const searchString = `${subject?.name || ""} ${topic?.name || ""} ${h.subjectId} ${h.topicId}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <CenterLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col pt-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <Icons.history className="size-7" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Activity History</h2>
              <p className="text-muted-foreground text-sm font-medium">Review your past tests and track your progress.</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-72">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search subjects or topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card/60 border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
        </div>

        {history === undefined ? (
          <div className="flex justify-center items-center py-20">
            <Icons.refreshCcw className="animate-spin size-8 text-primary" />
          </div>
        ) : filteredHistory?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/60 backdrop-blur-xl border rounded-3xl p-12 shadow-sm text-center flex flex-col items-center"
          >
            <div className="size-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Icons.clock size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No History Found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {searchTerm ? "No tests match your search criteria." : "Once you start taking tests, your activity will appear here so you can track your progress."}
            </p>
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm("")} 
                className="mt-6 px-6 py-2.5 bg-muted font-bold rounded-xl hover:bg-muted/80 transition-colors"
               >
                Clear Search
              </button>
            ) : (
              <Link to="/">
                <button className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 shadow-sm transition-opacity">
                  Start a Practice Test
                </button>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredHistory?.map((h, i) => {
              const subject = getSubjectById(h.subjectId);
              const topic = subject?.topics.find(t => t.id === h.topicId);
              const percentage = Math.round((h.score / h.totalQuestions) * 100);
              const date = new Date(h.completedAt).toLocaleDateString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
              });
              
              const isGoodScore = percentage >= 70;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={h._id} 
                  className="bg-card/60 backdrop-blur-xl border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 font-black text-lg ${subject?.bg || 'bg-muted'} ${subject?.color || 'text-foreground'}`}>
                      {subject?.name.charAt(0) || "S"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{topic?.name || h.topicId}</h3>
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span>{subject?.name || h.subjectId}</span>
                        <span className="size-1 rounded-full bg-muted-foreground/50 mx-1"></span>
                        <Icons.calendar className="size-3.5" /> 
                        {date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 md:gap-12 pl-16 md:pl-0">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Score</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black leading-none">{h.score}</span>
                        <span className="text-sm font-bold text-muted-foreground">/ {h.totalQuestions}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`flex flex-col items-center justify-center size-14 rounded-full border-4 ${isGoodScore ? 'border-green-500/20 text-green-500' : 'border-amber-500/20 text-amber-500'}`}>
                        <span className="text-lg font-black">{percentage}%</span>
                      </div>
                      
                      <Link to={`/test?subject=${h.subjectId}&topic=${h.topicId}`}>
                        <button className="hidden sm:flex size-10 items-center justify-center bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-xl transition-all shadow-sm">
                          <Icons.refreshCcw className="size-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </CenterLayout>
  );
}
