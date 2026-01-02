import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./../pages/styles/navbar.css";

export default function Navbar({ sections, activeId, onNavClick }) {
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const measure = () => {
    const navEl = navRef.current;
    const buttonEl = itemRefs.current[activeId];
    const labelEl = buttonEl?.querySelector(".pillNav__label");
    if (!navEl || !buttonEl || !labelEl) return;
    const navRect = navEl.getBoundingClientRect();
    const labelRect = labelEl.getBoundingClientRect();
    const PILL_PADDING = 12;
    setPill({
      left:
        labelRect.left -
        navRect.left -
        PILL_PADDING,
      width:
        labelRect.width +
        PILL_PADDING * 2,
    });
  };

  // Measure after first paint and whenever activeId changes
  useLayoutEffect(() => {
    measure();
  }, [activeId, sections.length]);

  // Re-measure on resize (responsive widths)
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="navbar">
      <nav className="pillNav" ref={navRef}>
        {/* sliding highlight */}
        <span
          className="pillNav__activePill"
          style={{
            transform: `translateX(${pill.left}px)`,
            width: `${pill.width}px`,
          }}
        />

        {sections.map((s) => (
          <button
            key={s.id}
            ref={(el) => {
              if (el) itemRefs.current[s.id] = el;
            }}
            onClick={() => onNavClick(s.id)}
            className={`pillNav__item ${
              activeId === s.id ? "pillNav__item--active" : ""
            }`}
          >
            <span className="pillNav__label">{s.label}</span>
          </button>

        ))}
      </nav>
    </div>
  );
}
