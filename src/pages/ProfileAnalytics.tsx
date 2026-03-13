import { CenterLayout } from "../components/layout/CenterLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../components/ui/icons";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Dynamically import all avatars
const avatarModules = import.meta.glob('../avatar_images/*.png', { eager: true });
const AVATARS = Object.values(avatarModules).map((mod: any) => mod.default);

const containerAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function ProfileAnalytics() {
  const profile = useQuery(api.users.getProfile);
  const updateProfile = useMutation(api.users.updateProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  const openEdit = () => {
    if (profile) {
      setEditName(profile.name || "");
      setEditBio(profile.bio || "");
      setEditAvatar(profile.avatarUrl || AVATARS[0]);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    await updateProfile({
      name: editName,
      bio: editBio,
      avatarUrl: editAvatar,
    });
    setIsEditing(false);
  };

  const displayName = profile?.name || "Student User";
  const displayBio = profile?.bio || "No biography provided yet.";
  const displayAvatar = profile?.avatarUrl || AVATARS[0];
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <CenterLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12 pt-4">
        
        {/* Top Bar / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tight uppercase">Analytics Dashboard</h2>
            <p className="text-muted-foreground text-sm font-medium">Performance insights and study trends for {displayName}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-muted transition-colors bg-card/50 backdrop-blur-sm">
              <Icons.calendar className="size-[14px]" /> 
              Last 30 Days
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
              <Icons.download className="size-[14px]" /> 
              Export Report
            </button>
          </div>
        </div>

        {/* User Identity Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/60 backdrop-blur-xl p-6 md:p-8 border rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm"
        >
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={openEdit}>
              <div className="size-24 rounded-full border-4 border-background shadow-md bg-muted flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                {displayAvatar ? (
                  <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-muted-foreground uppercase">{initials}</span>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Icons.edit2 className="text-white size-6" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 size-6 bg-green-500 rounded-full border-[3px] border-background shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold tracking-tight">{displayName}</p>
                <button onClick={openEdit} className="p-1.5 text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors">
                  <Icons.edit2 size={14} />
                </button>
              </div>
              <p className="text-muted-foreground text-sm font-medium mt-1">{displayBio}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mt-3">
                <p className="text-muted-foreground text-xs font-bold flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md w-fit">
                  <Icons.fingerprint className="size-[14px]" /> Role: {profile?.role || "user"}
                </p>
                <p className="text-muted-foreground text-xs font-bold flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md w-fit">
                  <Icons.history className="size-[14px]" /> Active
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-8 bg-muted/30 p-4 rounded-2xl border">
            <div className="text-center px-4 sm:px-6 border-r border-border">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Global Rank</p>
              <p className="text-2xl font-black text-primary">#1,204</p>
            </div>
            <div className="text-center px-4 sm:px-6">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Streak</p>
              <p className="text-2xl font-black text-amber-500">12 Days</p>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section 
          variants={containerAnim}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemAnim} className="flex flex-col gap-3 rounded-3xl p-6 md:p-8 bg-card/60 backdrop-blur-xl border hover:border-primary/30 transition-colors shadow-sm group">
            <div className="flex justify-between items-start">
              <p className="text-muted-foreground text-sm font-semibold">Overall Score</p>
              <Icons.barChart size={24} className="text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-5xl font-black leading-none tracking-tighter">84%</p>
              <p className="text-green-500 text-sm font-bold pb-1 flex items-center bg-green-500/10 px-2 py-0.5 rounded-md">
                <Icons.arrowUp className="size-[14px] mr-1" /> 5.2%
              </p>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden border">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-primary h-full rounded-full"
              />
            </div>
          </motion.div>

          <motion.div variants={itemAnim} className="flex flex-col gap-3 rounded-3xl p-6 md:p-8 bg-card/60 backdrop-blur-xl border hover:border-primary/30 transition-colors shadow-sm group">
            <div className="flex justify-between items-start">
              <p className="text-muted-foreground text-sm font-semibold">Percentile</p>
              <Icons.users size={24} className="text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-5xl font-black leading-none tracking-tighter">92<span className="text-3xl text-muted-foreground">nd</span></p>
              <p className="text-green-500 text-sm font-bold pb-1 flex items-center bg-green-500/10 px-2 py-0.5 rounded-md">
                <Icons.arrowUp className="size-[14px] mr-1" /> 1.5%
              </p>
            </div>
            <p className="text-muted-foreground text-xs font-semibold mt-4 bg-muted/50 px-3 py-2 rounded-lg inline-block w-fit">Top 8% of all candidates globally</p>
          </motion.div>

          <motion.div variants={itemAnim} className="flex flex-col gap-3 rounded-3xl p-6 md:p-8 bg-card/60 backdrop-blur-xl border hover:border-primary/30 transition-colors shadow-sm group">
            <div className="flex justify-between items-start">
              <p className="text-muted-foreground text-sm font-semibold">Exams Taken</p>
              <Icons.checkCircle size={24} className="text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-5xl font-black leading-none tracking-tighter">45</p>
              <p className="text-green-500 text-sm font-bold pb-1 flex items-center bg-green-500/10 px-2 py-0.5 rounded-md">
                +3 this week
              </p>
            </div>
            <p className="text-muted-foreground text-xs font-semibold mt-4 bg-muted/50 px-3 py-2 rounded-lg inline-block w-fit">128.5 hours total study time</p>
          </motion.div>
        </motion.section>

        {/* Suggested Revision Area */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl shadow-primary/10">
            {/* Decorative Icon Background */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 opacity-[0.03] pointer-events-none transform rotate-12">
              <Icons.alertTriangle size={300} />
            </div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-2 bg-background/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit border border-background/10">
                <Icons.alertCircle className="size-[14px]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">Urgent Revision</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">Weak Topic: Organic Chemistry Nomenclature</h3>
              <p className="text-primary-foreground/80 text-sm font-medium max-w-lg leading-relaxed">
                Your accuracy in this topic has dropped by 14% in the last 3 mock exams. We recommend a focused 45-minute review session.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto mt-4 md:mt-0">
              <button className="px-6 py-3.5 bg-background text-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                Start Review
                <Icons.arrowRight className="size-[14px]" />
              </button>
              <button className="px-6 py-3.5 border border-primary-foreground/30 rounded-xl font-bold text-sm hover:bg-primary-foreground/10 transition-colors flex items-center justify-center">
                Skip for now
              </button>
            </div>
          </div>
        </motion.section>

        {/* Advanced Analytics Section */}
        <section className="pt-4">
          <h2 className="text-2xl font-black tracking-tight mb-6 px-2">Advanced Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Subject Distribution */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/60 backdrop-blur-xl border rounded-3xl p-8 flex flex-col gap-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-base font-bold">Subject Distribution</p>
                <Icons.target size={20} className="text-muted-foreground bg-muted p-1.5 rounded-lg box-content" />
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { name: "Quantum Physics", score: 94, color: "bg-primary" },
                  { name: "Molecular Biology", score: 88, color: "bg-primary/80" },
                  { name: "Advanced Calculus", score: 76, color: "bg-primary/60" },
                  { name: "Organic Chemistry", score: 52, color: "bg-destructive" },
                ].map((subject, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className={subject.score < 60 ? "text-destructive" : ""}>{subject.name}</span>
                      <span className={subject.score < 60 ? "text-destructive" : ""}>{subject.score}%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.score}%` }}
                        transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                        className={`${subject.color} h-full rounded-full`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Time Allocation (Bar Chart) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card/60 backdrop-blur-xl border rounded-3xl p-8 flex flex-col shadow-sm"
            >
              <div className="flex justify-between items-center mb-8">
                <p className="text-base font-bold">Weekly Time Allocation</p>
                <Icons.clock size={20} className="text-muted-foreground bg-muted p-1.5 rounded-lg box-content" />
              </div>
              
              <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-48 mt-auto px-2 border-b">
                {[
                  { day: "MON", height: "20%", active: false },
                  { day: "TUE", height: "45%", active: false },
                  { day: "WED", height: "60%", active: false },
                  { day: "THU", height: "35%", active: false },
                  { day: "FRI", height: "85%", active: false },
                  { day: "SAT", height: "95%", active: true },
                  { day: "SUN", height: "15%", active: false },
                ].map((item, i) => (
                  <div key={item.day} className="flex flex-col items-center gap-3 group h-full justify-end">
                    <motion.div 
                      className={`w-full rounded-t-md transition-colors ${item.active ? 'bg-primary' : 'bg-muted group-hover:bg-primary/50'}`} 
                      initial={{ height: 0 }}
                      animate={{ height: item.height }}
                      transition={{ delay: 0.8 + (i * 0.05), type: "spring" }}
                    />
                    <span className={`text-[10px] font-bold ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>{item.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 mt-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-sm bg-primary"></div>
                  <span className="text-xs font-bold text-muted-foreground">Active Study</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-sm bg-muted border"></div>
                  <span className="text-xs font-bold text-muted-foreground">Mock Exams</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsEditing(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-2xl border rounded-3xl shadow-xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b flex justify-between items-center bg-muted/20">
                <h3 className="text-xl font-bold">Edit Profile</h3>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Icons.sigma size={20} className="rotate-45" /> {/* Close icon workaround */}
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Display Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 bg-background border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Biography / Tagline</label>
                  <input 
                    type="text" 
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Short bio about your studies"
                    className="w-full px-4 py-3 bg-background border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold mb-2">Select Avatar</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-64 overflow-y-auto p-2 border rounded-xl bg-muted/20">
                    {AVATARS.map((avatar, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEditAvatar(avatar)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          editAvatar === avatar ? 'border-primary ring-2 ring-primary/30 scale-105 shadow-md' : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover bg-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t bg-muted/20 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-muted transition-colors border border-transparent hover:border-border"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CenterLayout>
  );
}
