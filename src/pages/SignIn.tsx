import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Cloud, User } from "lucide-react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      navigate("/");
    } catch (error) {
      console.error(error);
      // Option to handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-display antialiased text-foreground">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="layout-container flex w-full max-w-[480px] flex-col px-6 py-12"
        >
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-primary dark:text-slate-100">
              <Target size={36} className="text-primary" />
              <h1 className="text-2xl font-black leading-tight tracking-tight">ExamOrbit</h1>
            </div>
          </div>
          
          <div className="w-full rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Sign In</h2>
              <p className="text-muted-foreground text-sm">Enter your credentials to access your dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background p-3.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" 
                  placeholder="name@example.com" 
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Password</label>
                  <a className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors" href="#">Forgot Password?</a>
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background p-3.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" 
                  placeholder="••••••••" 
                  required
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input id="remember" type="checkbox" className="rounded border-border text-primary focus:ring-primary bg-background" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me for 30 days</label>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-primary py-4 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold tracking-wider">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  <User size={18} /> Google
                </button>
                <button 
                  className="flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  <Cloud size={18} /> Apple
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Create an account</Link>
          </p>
          
          <footer className="mt-20 flex justify-center gap-6 text-xs text-muted-foreground">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Help Center</a>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
