import React, { useEffect, useRef, useState } from 'react';

const StarBackground = () => {
  const [bgImage, setBgImage] = useState(null);
  const containerRef = useRef(null);

  // 1. Generate the static image ONCE
  useEffect(() => {
    const canvas = document.createElement('canvas');
    // Make canvas larger than screen to allow for movement without gaps
    const width = window.innerWidth * 1.1; 
    const height = window.innerHeight * 1.1;
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // Fill Black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // Draw Stars
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
    
    // Convert to image URL
    setBgImage(canvas.toDataURL());
  }, []);

  // 2. Handle Mouse Movement for Tilt/Parallax
  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate offset (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      // Move background slightly opposite to mouse (Parallax)
      // "20px" is the movement range
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
        top: '-5%',    // Offset to allow movement
        left: '-5%',
        width: '110%', // Larger width to prevent white edges when moving
        height: '110%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        zIndex: -1,    // Send to back
        transition: 'transform 0.1s ease-out', // Smooth movement
      }}
    />
  );
};

export default StarBackground;