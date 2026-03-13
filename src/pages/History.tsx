import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Icons } from "../components/ui/icons";

export default function HistoryPage() {
  return (
    <CenterLayout>
      <div className="w-full max-w-4xl mx-auto flex flex-col pt-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Icons.history className="size-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">Activity History</h2>
            <p className="text-muted-foreground text-sm font-medium">Review your past tests, assignments, and study sessions.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/60 backdrop-blur-xl border rounded-3xl p-12 shadow-sm text-center flex flex-col items-center"
        >
          <div className="size-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <Icons.clock size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No History Yet</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Once you start taking tests and participating in study groups, your activity will appear here so you can track your progress over time.
          </p>
          <button className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 shadow-sm transition-opacity">
            Start a Practice Test
          </button>
        </motion.div>
      </div>
    </CenterLayout>
  );
}
