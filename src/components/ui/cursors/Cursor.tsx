import { useState, useEffect } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Update cursor position on mouse move
    const updatePosition = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle hover state for interactive elements
    const handleMouseOver = (e: any) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: any) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    // Handle click state
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup event listeners and restore default cursor
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      className={`
        fixed cursor-none pointer-events-none focus:pointer-events-none
        z-50 rounded-full 
        mix-blend-exclusion
        bg-liber-red-2
        origin-center
        transition-all duration-200 ease-out
        ${isHovering ? ' w-10 h-10 ' : ' w-6 h-6 '}
        ${isClicking ? ' w-3 h-3 ' : ''}
      `}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  );
}