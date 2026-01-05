import { useEffect, useRef, useState } from 'react';

const StarBackground = () => {
  const [bgImage, setBgImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const width = window.innerWidth * 1.1; 
    const height = window.innerHeight * 1.1;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    const starCount = 800;
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      const opacity = Math.random();
      
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    setBgImage(canvas.toDataURL());
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;    
      const xOffset = xPos * -30; 
      const yOffset = yPos * -30;
      containerRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!bgImage) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '-5%',
        left: '-5%',
        width: '110%',
        height: '110%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        zIndex: -1,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

export default StarBackground;