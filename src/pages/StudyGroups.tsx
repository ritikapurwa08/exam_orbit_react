import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Icons } from "../components/ui/icons";

const SIDEBAR_GROUPS = [
  { id: 1, name: "RPSC 2026 Aspirants", message: "Aryan: Check this PDF...", time: "12:45", unread: 3, isPinned: true },
  { id: 2, name: "General GS Prep", message: "Priya: Anyone for a quiz tonight?", time: "11:20", unread: 0, isPinned: true },
];

const DIRECT_MSGS = [
  { id: 3, name: "Rahul (Mentor)", status: "Online", isOnline: true },
];

const CHAT_MESSAGES = [
  { id: 1, sender: "Priya Sharma", time: "12:30 PM", text: "Has anyone solved the polity questions from last year's prelims? I'm stuck on question #14.", isSelf: false },
  { id: 2, sender: "Aryan V.", time: "12:35 PM", text: "This one? I think the reasoning for C is quite clear but let me know if you need the notes.", hasCard: true, isSelf: false },
  { id: 3, sender: "YOU", time: "12:45 PM", text: "Thanks Aryan! I was confusing it with Article 19 freedom of speech aspects.", isSelf: true },
];

const listAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export default function StudyGroups() {
  return (
    <CenterLayout>
      <div className="w-full h-[calc(100vh-140px)] flex border rounded-3xl overflow-hidden bg-background shadow-sm mt-4">
        
        {/* Left Pane: Group & Chat List */}
        <section className="w-full md:w-80 border-r border-border flex flex-col bg-card/50">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" 
                placeholder="Search conversations..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Pinned Groups */}
            <div className="px-4 py-3 uppercase text-[10px] font-bold tracking-wider text-muted-foreground flex items-center justify-between mt-2">
              Pinned Groups
              <Icons.pin className="size-[14px]" />
            </div>
            <motion.div variants={listAnim} initial="hidden" animate="show" className="space-y-1 px-2">
              {SIDEBAR_GROUPS.map((group, i) => (
                <motion.div variants={itemAnim} key={group.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${i === 0 ? 'bg-muted border-l-4 border-primary' : 'hover:bg-muted/50 border-l-4 border-transparent'}`}>
                  <div className="size-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold shadow-sm">
                    {group.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{group.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{group.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground font-medium">{group.time}</span>
                    {group.unread > 0 && <span className="size-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">{group.unread}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Direct Discussions */}
            <div className="px-4 py-3 mt-4 uppercase text-[10px] font-bold tracking-wider text-muted-foreground flex items-center justify-between">
              Direct Discussions
              <Icons.message className="size-[14px]" />
            </div>
            <motion.div variants={listAnim} initial="hidden" animate="show" className="space-y-1 px-2">
              {DIRECT_MSGS.map((msg) => (
                <motion.div variants={itemAnim} key={msg.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors border-l-4 border-transparent">
                  <div className="size-10 rounded-full bg-muted flex-shrink-0 flex items-center justify-center border font-bold text-muted-foreground">
                    {msg.name.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{msg.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`size-2 rounded-full ${msg.isOnline ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></span>
                      <p className="text-xs text-muted-foreground truncate font-medium">{msg.status}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Right Pane: Active Chat Interface */}
        <section className="hidden md:flex flex-1 flex-col relative bg-card/30 backdrop-blur-xl">
          {/* Chat Header */}
          <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-card/50">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                <Icons.users className="text-primary size-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">RPSC 2026 Aspirants</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="size-1.5 rounded-full bg-green-500"></span>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">42 Members • 8 Active</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Icons.search className="size-5" /></button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Icons.phone className="size-5" /></button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Icons.moreVertical className="size-5" /></button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-card/30">
            {/* Date Divider */}
            <div className="flex justify-center sticky top-0 z-10">
              <span className="px-4 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest border shadow-sm">Today</span>
            </div>

            {CHAT_MESSAGES.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                key={msg.id} 
                className={`flex gap-3 max-w-2xl ${msg.isSelf ? 'flex-row-reverse self-end ml-auto' : ''}`}
              >
                {!msg.isSelf ? (
                  <div className="size-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center border font-bold text-xs shadow-sm">
                    {msg.sender.slice(0, 1)}
                  </div>
                ) : (
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0 shadow-sm shadow-primary/20">
                    <span className="text-[10px] font-black">YOU</span>
                  </div>
                )}
                
                <div className={`flex flex-col ${msg.isSelf ? 'items-end' : ''}`}>
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                    {!msg.isSelf && <span className="text-[11px] font-bold">{msg.sender}</span>}
                    <span className="text-[10px] text-muted-foreground font-medium">{msg.time}</span>
                  </div>
                  
                  {msg.hasCard && (
                    <div className="border border-border rounded-xl overflow-hidden max-w-sm bg-card shadow-sm mb-2">
                      <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5"><Icons.bookOpen className="size-[14px]" /> Mock Test #4 • Q14</span>
                        <Icons.externalLink className="size-[14px] text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-sm font-semibold leading-relaxed">Which article of the Indian Constitution deals with the 'Right to Privacy'?</p>
                        <div className="space-y-2">
                          {["Article 14", "Article 19", "Article 21", "Article 32"].map((opt, i) => (
                            <div key={i} className={`text-xs p-2.5 rounded-lg border font-medium ${i === 2 ? 'bg-primary/10 border-primary/30 text-primary font-bold' : 'border-border bg-muted/20'}`}>
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-muted/30 hover:bg-muted text-[10px] font-bold border-t border-border hover:text-primary transition-colors uppercase tracking-widest">View Solution</button>
                    </div>
                  )}

                  <div className={`${msg.isSelf ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' : 'bg-muted/80 text-foreground border shadow-sm'} p-3.5 rounded-2xl ${msg.isSelf ? 'rounded-tr-sm' : 'rounded-tl-sm'} text-sm leading-relaxed max-w-[90%]`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-card/80 backdrop-blur-md">
            <div className="flex items-center gap-2 bg-muted/50 rounded-2xl px-2 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-background transition-all shadow-sm">
              <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/5 flex items-center justify-center shrink-0" title="Attach Question">
                <Icons.helpCircle className="size-[22px]" />
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/5 flex items-center justify-center shrink-0" title="Add File">
                <Icons.paperclip className="size-[22px]" />
              </button>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 outline-none font-medium placeholder:text-muted-foreground" 
                placeholder="Type a message or share a question..." 
                type="text"
              />
              <button className="bg-primary text-primary-foreground size-10 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity shadow-md shadow-primary/20 shrink-0 ml-1">
                <Icons.send className="size-[18px]" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </CenterLayout>
  );
}
