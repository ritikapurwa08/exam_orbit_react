import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Icons } from "../components/ui/icons";
import { SUBJECTS } from "../data/subjects";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function SubjectSelection() {
  return (
    <CenterLayout>
      <div className="w-full">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">Select Subject</h2>
            <p className="text-lg text-muted-foreground">Choose a subject to start your practice session</p>
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 border rounded-xl hover:bg-muted transition-colors bg-card/50 backdrop-blur-sm">
              <Icons.search className="size-4" />
            </button>
            <button className="p-2.5 border rounded-xl hover:bg-muted transition-colors bg-card/50 backdrop-blur-sm">
              <Icons.list className="size-4" />
            </button>
          </div>
        </header>

        {/* Subject Cards Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SUBJECTS.map((subject) => (
            <Link to={`/topics?subject=${subject.id}`} key={subject.id}>
              <motion.div 
                variants={itemAnim}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-card/60 backdrop-blur-xl border rounded-2xl p-6 transition-all hover:shadow-xl hover:border-primary/50 cursor-pointer overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-xl ${subject.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {/* For now simply putting an initial or standard icon since we don't have all icons loaded smoothly */}
                  <span className={`font-black text-2xl ${subject.color}`}>{subject.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {subject.topics.length} Topics
                  </p>
                  
                  {/* Hover Arrow Effect */}
                  <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 shadow-sm">
                    <Icons.arrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Request Section */}
        <footer className="mt-16 flex justify-center pb-8">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <span>Request New Subject</span>
          </motion.button>
        </footer>
      </div>
    </CenterLayout>
  );
}

