import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useConvexAuth } from "convex/react";

// Import pages
import AdminConsole from "./pages/AdminConsole";
import Leaderboards from "./pages/Leaderboards";
import ProfileAnalytics from "./pages/ProfileAnalytics";
import StudyGroups from "./pages/StudyGroups";
import SubjectSelection from "./pages/SubjectSelection";
import TestInterface from "./pages/TestInterface";
import TestSummary from "./pages/TestSummary";
import TopicSelection from "./pages/TopicSelection";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import History from "./pages/History";

// Setup Protected Routes
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background"><div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}

function PublicRoute() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background"><div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }
  
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Public auth pages */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Dashboard pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SubjectSelection />} />
          <Route path="/topics" element={<TopicSelection />} />
          <Route path="/test" element={<TestInterface />} />
          <Route path="/summary" element={<TestSummary />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/profile" element={<ProfileAnalytics />} />
          <Route path="/groups" element={<StudyGroups />} />
          <Route path="/history" element={<History />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}