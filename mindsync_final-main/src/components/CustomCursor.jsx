import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });

        // Check if the cursor is over an interactive element
        const target = document.elementFromPoint(e.clientX, e.clientY);
        setTarget(target);
        
        const isInteractive = target?.matches(
          'button, a, input, select, textarea, [role="button"], [tabindex="0"]'
        );
        setIsPointer(isInteractive);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Main dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div
          className={`rounded-full bg-dark-green/80 backdrop-blur-sm transition-all duration-200 ${
            isPointer
              ? 'w-5 h-5 bg-dark-green/20'
              : isClicking
              ? 'w-2 h-2 bg-dark-green'
              : 'w-3 h-3'
          }`}
          style={{
            boxShadow: '0 0 10px rgba(0, 17, 11, 0.3), 0 0 20px rgba(0, 17, 11, 0.2)',
            transition: 'width 0.2s, height 0.2s, background-color 0.2s',
            willChange: 'width, height, background-color'
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ${
            isPointer
              ? 'w-12 h-12 bg-dark-green/5'
              : isClicking
              ? 'w-8 h-8 bg-dark-green/10'
              : 'w-10 h-10 bg-dark-green/5'
          }`}
          style={{
            transition: 'width 0.3s, height 0.3s, background-color 0.3s',
            backdropFilter: 'blur(4px)',
            willChange: 'width, height, background-color'
          }}
        />
      </div>
    </>
  );
};