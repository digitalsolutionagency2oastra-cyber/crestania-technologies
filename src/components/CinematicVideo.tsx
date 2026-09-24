import React, { useEffect, useRef, useState } from 'react';

interface CinematicVideoProps {
  videoSrc?: string;
  fallbackPoster?: string;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  videoSrc = '/assets/cyber_hero.mp4',
  fallbackPoster = '/src/assets/images/cyber_developer_hero_1790230770127.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const readyRef = useRef<boolean>(false);
  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Parallax tilt tracking state
  const mouseNormRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      readyRef.current = true;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Safe seek failover
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const glow = glowRef.current;
    const progressBar = progressBarRef.current;

    // Normalizing cursor X position across window width (0.0 to 1.0) and scroll progress
    const handleMouseMove = (e: MouseEvent) => {
      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      const nx = Math.max(0, Math.min(1, e.clientX / winW));
      const ny = Math.max(0, Math.min(1, e.clientY / winH));
      mouseNormRef.current = { x: nx, y: ny };

      // Update dynamic cursor-tracking spotlight (#cine-glow)
      if (glow) {
        const xp = (nx * 100).toFixed(1);
        const yp = (ny * 100).toFixed(1);
        glow.style.background = `radial-gradient(circle 480px at ${xp}% ${yp}%, rgba(196, 0, 36, 0.22), transparent 70%)`;
      }

      // Tilt transform: scale(1.06) translate3d(dx * -15px, dy * -15px, 0) rotateX(dy * -2deg) rotateY(dx * 2deg)
      if (containerRef.current) {
        const dx = (nx - 0.5) * 2; // -1 to +1
        const dy = (ny - 0.5) * 2; // -1 to +1
        containerRef.current.style.transform = `scale(1.06) translate3d(${dx * -15}px, ${dy * -15}px, 0) rotateX(${dy * -2}deg) rotateY(${dx * 2}deg)`;
      }

      updateTargetTime();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      setScrollProgress(progress);

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      updateTargetTime();
    };

    const updateTargetTime = () => {
      if (!video) return;
      const duration = video.duration || 6.8;
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollNorm = Math.max(0, Math.min(1, scrollY / maxScroll));
      const cursorNorm = mouseNormRef.current.x;

      // Blend cursor X position and scroll progress: cursor provides continuous responsive micro-scrubbing, scroll moves through timeline
      const blendedNorm = (scrollNorm * 0.75 + cursorNorm * 0.25);
      targetRef.current = Math.max(0, Math.min(duration, blendedNorm * duration));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RAF loop: interpolate current video time toward target time using LERP
    // currentRef.current += (targetRef.current - currentRef.current) * 0.10
    const loop = () => {
      if (video) {
        const diff = targetRef.current - currentRef.current;
        if (Math.abs(diff) > 0.001) {
          currentRef.current += diff * 0.10;
          try {
            video.currentTime = currentRef.current;
          } catch {
            // Browser internal seek queue protection
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Ambient Red Glowing Scroll Progress Bar (Height: 2px) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-black/40 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#c40024] via-[#ff2b4c] to-[#e0002a] shadow-[0_0_12px_#ff2b4c]"
          style={{ transform: `scaleX(${scrollProgress})`, transition: 'transform 0.05s linear' }}
        />
      </div>

      {/* Background 3D Video Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden perspective-1200 bg-[#030303]">
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full will-change-transform preserve-3d"
          style={{
            transform: 'scale(1.06) translate3d(0, 0, 0)',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={fallbackPoster}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-90"
          />

          {/* Layered Cinematic Overlays */}
          {/* 1. Vignette: dark radial edge falloff */}
          <div className="absolute inset-0 cine-vignette" />

          {/* 2. Cine Glow: dynamic cursor-tracking spotlight */}
          <div
            id="cine-glow"
            ref={glowRef}
            className="absolute inset-0 cine-glow"
          />

          {/* 3. Cine Grain: subtle SVG noise grain overlay with keyframe jitter */}
          <div className="absolute inset-0 cine-grain" />

          {/* 4. Cine Scan: ultra-faint scanlines */}
          <div className="absolute inset-0 cine-scan" />
        </div>
      </div>
    </>
  );
};
