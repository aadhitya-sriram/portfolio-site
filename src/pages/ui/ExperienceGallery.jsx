import { useEffect, useState, useRef } from "react";

export function ExperienceGallery({ dir, count, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  function next() {
    setIndex((i) => (i + 1) % count);
  }

  function prev() {
    setIndex((i) => (i - 1 + count) % count);
  }

  function startAutoScroll() {
    if (count <= 1) return;
    stopAutoScroll();
    timerRef.current = setInterval(next, interval);
  }

  function stopAutoScroll() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [count, interval]);

  return (
    <div
      className="experienceGallery"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <img
        key={index}
        src={`/experience/${dir}/${index + 1}.png`}
        alt=""
        className="galleryImage"
      />
    </div>
  );
}
