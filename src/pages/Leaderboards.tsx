import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icons } from "../components/ui/icons";

const PODIUM = [
  { rank: 2, name: "Elena Vance", points: "12,450 pts", color: "bg-slate-300 dark:bg-slate-700", badgeColor: "bg-slate-400 text-white", height: "h-24" },
  { rank: 1, name: "Marcus Thorne", points: "15,820 pts", color: "bg-gradient-to-tr from-yellow-400 to-yellow-600 shadow-xl shadow-yellow-500/20", badgeColor: "bg-yellow-500 text-white", height: "h-32", isFirst: true },
  { rank: 3, name: "Siddharth Rao", points: "11,900 pts", color: "bg-amber-600/30", badgeColor: "bg-amber-700 text-white", height: "h-24" },
];

const LEADERBOARD_LIST = [
  { rank: 4, name: "Sarah Jenkins", level: "Level 42", points: "10,540", trend: "up", isCurrentUser: false },
  { rank: 5, name: "Maya Patel", level: "Level 38", points: "9,815", trend: "flat", isCurrentUser: false },
  { rank: 6, name: "Alex Rivera", level: "Level 40", points: "9,200", trend: "up", isCurrentUser: true },
  { rank: 7, name: "Julian Frost", level: "Level 35", points: "8,990", trend: "down", isCurrentUser: false },
  { rank: 8, name: "Chris Evans", level: "Level 31", points: "8,500", trend: "flat", isCurrentUser: false },
];

const containerAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState("Global");
  const tabs = ["Global", "Weekly", "By Subject"];

  return (
    <CenterLayout>
      <div className="w-full max-w-4xl mx-auto flex flex-col pt-4">
        
        {/* Header section with tabs and search (if fitting) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Icons.trophy className="text-primary size-7" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Leaderboards</h2>
              <p className="text-muted-foreground text-sm font-medium">See how you stack up against the best.</p>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="flex bg-muted/50 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === tab ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Section */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-10 items-end px-4">
          {PODIUM.map((user, i) => (
            <motion.div 
              key={user.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center"
            >
              {user.isFirst && (
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-yellow-500 mb-4 drop-shadow-md"
                >
                  <Icons.award size={36} className="fill-yellow-500/20" />
                </motion.div>
              )}
              <div className="relative mb-5 group">
                <div className={`rounded-full p-1.5 ${user.color} ${user.height} w-${user.height.split('-')[1]} aspect-square flex items-center justify-center transition-transform hover:scale-105`}>
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-primary text-xl font-bold uppercase tracking-widest">
                    {user.name.slice(0, 2)}
                  </div>
                </div>
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${user.badgeColor} ${user.isFirst ? 'w-10 h-10 text-lg border-4' : 'w-8 h-8 text-sm border-2'} rounded-full flex items-center justify-center font-black border-background shadow-sm shadow-primary/20`}>
                  {user.rank}
                </div>
              </div>
              <h3 className={`font-bold text-center mt-2 ${user.isFirst ? 'text-lg text-foreground' : 'text-sm text-foreground/90'}`}>{user.name}</h3>
              <p className={`text-xs font-bold ${user.isFirst ? 'text-primary' : 'text-muted-foreground'}`}>{user.points}</p>
            </motion.div>
          ))}
        </div>

        {/* Table Container */}
        <motion.div 
          variants={containerAnim}
          initial="hidden"
          animate="show"
          className="bg-card/60 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Rank</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Points</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {LEADERBOARD_LIST.map((user) => (
                  <motion.tr 
                    variants={rowAnim}
                    key={user.rank} 
                    className={`transition-colors ${user.isCurrentUser ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted/30'}`}
                  >
                    <td className={`px-6 py-4 font-black ${user.isCurrentUser ? 'text-primary' : 'text-muted-foreground text-sm'}`}>{user.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-full flex items-center justify-center font-bold text-xs ${user.isCurrentUser ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
                          {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold flex items-center gap-2">
                            {user.name} 
                            {user.isCurrentUser && <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md uppercase tracking-wide">You</span>}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">{user.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-black ${user.isCurrentUser ? 'text-primary' : ''}`}>{user.points}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`flex justify-center text-sm font-bold ${
                        user.trend === "up" ? "text-green-500" :
                        user.trend === "down" ? "text-red-500" :
                        "text-muted-foreground"
                      }`}>
                        {user.trend === "up" ? <Icons.trendingUp size={18} /> : 
                         user.trend === "down" ? <Icons.trendingUp size={18} className="rotate-180" /> : 
                         <Icons.arrowRight size={18} />}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination-style Footer */}
          <div className="px-6 py-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-semibold tracking-wide">Showing top 50 users worldwide</p>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:opacity-80 transition-opacity uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-lg">
              <span>Load More</span>
              <Icons.chevronDown size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </CenterLayout>
  );
}

