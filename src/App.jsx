import { useMemo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initBlackHole } from "./pages/ui/BlackHole";
import StarBackground from './pages/ui/StarBackground';
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import "./index.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState("/");
  const blackHoleControlRef = useRef(null);
  const containerRef = useRef(null);
  const sections = useMemo(
    () => [
      { id: "/", label: "Home", component: <Home /> },
      { id: "/about", label: "About", component: <About /> },
      { id: "/projects", label: "Projects", component: <Projects /> },
      { id: "/experience", label: "Experience", component: <Experience /> },
      { id: "/contact", label: "Contact", component: <Contact /> },
    ],
    []
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const triggerRefresh = () => {
    setTimeout(() => {
        setRefreshKey(prev => prev + 1);
    }, 1);
  };
  useEffect(() => {
    const timer = setInterval(triggerRefresh, 0.1 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("blackhole-canvas");
    if (!canvas) return;
    const { cleanup, setPage } = initBlackHole(canvas);
    blackHoleControlRef.current = setPage;
    return cleanup;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newId = entry.target.getAttribute("id");
            setActiveId(newId);

            if (window.location.pathname !== newId) {
               window.history.replaceState(null, "", newId);
            }

            if (blackHoleControlRef.current) {
              const index = sections.findIndex((s) => s.id === newId);
              if (index !== -1) blackHoleControlRef.current(index);
            }
          }
        });
      },
      { 
        root: container,
        threshold: 0.5 
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavClick = (path) => {
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page">
      <StarBackground />
      <canvas
        id="blackhole-canvas"
        style={{
          opacity: opacity, transition: 'opacity 1s ease-in-out',
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1,
        }}
      />

      <Navbar
        sections={sections}
        activeId={activeId}
        onNavClick={handleNavClick}
      />

      <div className="snap-container" ref={containerRef}>
        {sections.map((section) => (
          <div 
            key={section.id} 
            id={section.id} 
            className="section-container"
          >
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
}






















// SAME App.jsx but NO SCROLL

// import { useMemo, useEffect, useRef } from "react";
// import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { initBlackHole } from "./pages/ui/BlackHole";
// import StarBackground from './pages/ui/StarBackground';
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Projects from "./pages/Projects";
// import Experience from "./pages/Experience";
// import Contact from "./pages/Contact";

// export default function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const activeId = location.pathname;
//   const blackHoleControlRef = useRef(null);

//   const sections = useMemo(
//     () => [
//       { id: "/", label: "Home" },
//       { id: "/about", label: "About" },
//       { id: "/projects", label: "Projects" },
//       { id: "/experience", label: "Experience" },
//       { id: "/contact", label: "Contact" },
//     ],
//     []
//   );

//   useEffect(() => {
//     const canvas = document.getElementById("blackhole-canvas");
//     if (!canvas) return;
//     const { cleanup, setPage } = initBlackHole(canvas);
//     blackHoleControlRef.current = setPage;
//     return cleanup;
//   }, []);

//   useEffect(() => {
//     if (blackHoleControlRef.current) {
//       const currentIndex = sections.findIndex(section => section.id === activeId);
//       if (currentIndex !== -1) {
//         blackHoleControlRef.current(currentIndex);
//       }
//     }
//   }, [activeId, sections]);

//   return (
//     <div className="page">
//       <StarBackground />
//       <canvas 
//         id="blackhole-canvas" 
//         style={{ 
//           position: 'fixed',
//           top: 0, 
//           left: 0, 
//           width: '100%', 
//           height: '100%', 
//           display: 'block',
//           zIndex: -1
//         }} 
//       />
      
//       <Navbar
//         sections={sections}
//         activeId={activeId}
//         onNavClick={(path) => navigate(path)}
//       />
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/experience" element={<Experience />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
      
//     </div>
//   );
// }













// Plain Old App.jsx

// import { useMemo, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { initBlackHole } from "./pages/ui/BlackHole";
// import StarBackground from './pages/ui/StarBackground';
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Projects from "./pages/Projects";
// import Experience from "./pages/Experience";
// // import Publications from "./pages/Publications";
// import Contact from "./pages/Contact";

// export default function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const activeId = location.pathname;
//   const sections = useMemo(
//     () => [
//       { id: "/", label: "Home" },
//       { id: "/about", label: "About" },
//       { id: "/projects", label: "Projects" },
//       { id: "/experience", label: "Experience" },
//       // { id: "/publications", label: "Publications" },
//       { id: "/contact", label: "Contact" },
//     ],
//     []
//   );

//   useEffect(() => {
//     const canvas = document.getElementById("blackhole-canvas");
//     if (!canvas) return;
//     const cleanup = initBlackHole(canvas);
//     return cleanup;
//   }, []);

//   return (
//     <div className="page">
//       <StarBackground />
//       <canvas id="blackhole-canvas" style={{ width: '100%', height: '100%', display: 'block' }} />
//       <Navbar
//         sections={sections}
//         activeId={activeId}
//         onNavClick={(path) => navigate(path)}
//       />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/experience" element={<Experience />} />
//         {/* <Route path="/publications" element={<Publications />} /> */}
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
      
//     </div>
//   );
// }