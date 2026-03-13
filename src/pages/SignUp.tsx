import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Target, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signIn("password", { name, email, password, flow: "signUp" });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/30 font-display text-foreground min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Target size={28} />
            <h1 className="text-xl font-bold tracking-tight uppercase">ExamOrbit</h1>
          </Link>
          <div className="flex items-center gap-4">
            <a className="text-sm font-medium hover:text-primary/70 transition-colors" href="#">Support</a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Value Proposition */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-3">Join thousands of aspirants today.</h2>
            <p className="text-muted-foreground">Create your ExamOrbit account to start your journey.</p>
          </div>

          {/* Registration Card */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground" 
                    placeholder="John Doe" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground" 
                    placeholder="name@example.com" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Password</label>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground pr-12" 
                    placeholder="••••••••" 
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Confirm Password</label>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground pr-12" 
                    placeholder="••••••••" 
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link to="/signin" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">Sign In</Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-6">
            <a className="text-xs text-muted-foreground hover:text-foreground transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-muted-foreground hover:text-foreground transition-colors" href="#">Privacy Policy</a>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">© 2024 ExamOrbit Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
