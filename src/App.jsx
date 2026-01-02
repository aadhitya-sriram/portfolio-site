import { useMemo, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { initBlackHole } from "./pages/ui/BlackHole";
import StarBackground from './pages/ui/StarBackground';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = location.pathname;
  const sections = useMemo(
    () => [
      { id: "/", label: "Home" },
      { id: "/about", label: "About" },
      { id: "/projects", label: "Projects" },
      { id: "/experience", label: "Experience" },
      { id: "/publications", label: "Publications" },
      { id: "/contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const canvas = document.getElementById("blackhole-canvas");
    if (!canvas) return;
    const cleanup = initBlackHole(canvas);
    return cleanup;
  }, []);

  return (
    <div className="page">
      <StarBackground />
      <canvas id="blackhole-canvas" style={{ width: '100%', height: '100%', display: 'block' }} />
      <Navbar
        sections={sections}
        activeId={activeId}
        onNavClick={(path) => navigate(path)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </div>
  );
}