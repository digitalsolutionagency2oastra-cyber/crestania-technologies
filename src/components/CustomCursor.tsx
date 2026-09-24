import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Position references for LERP physics
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Immediate move for precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over magnetic or clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isMagnetic = target.closest('[data-magnetic="true"], a, button, input, textarea, select');
        setIsHovered(!!isMagnetic);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // LERP loop for trailing follower ring
    const loop = () => {
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      ringPosRef.current.x += (targetX - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (targetY - ringPosRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#ff2b4c] shadow-[0_0_8px_#ff2b4c] will-change-transform"
      />

      {/* Smooth Trailing Follower Ring with Magnetic Expansion */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border will-change-transform transition-[width,height,margin,border-color,background-color] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 border-[#ff2b4c] bg-[#ff2b4c]/10 shadow-[0_0_20px_rgba(255,43,76,0.3)]'
            : isClicked
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#e0002a] bg-[#e0002a]/20'
            : 'w-10 h-10 border-white/30'
        }`}
      />
    </div>
  );
};
