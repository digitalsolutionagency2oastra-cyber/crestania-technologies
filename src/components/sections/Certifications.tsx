import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CERTIFICATIONS, Certification } from '../../data/portfolioData';
import { ShieldCheck, ExternalLink, X, RotateCw, Pause, Play, Award, CheckCircle2 } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [autoSpin, setAutoSpin] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const samplesRef = useRef<{ x: number; time: number }[]>([]);
  const rafIdRef = useRef<number | null>(null);

  // Responsive radius R: 480px (desktop), 380px (tablet), 275px (mobile)
  const [radius, setRadius] = useState<number>(480);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(275);
      } else if (w < 1024) {
        setRadius(380);
      } else {
        setRadius(480);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = CERTIFICATIONS.length;
  const stepAngle = 360 / totalCards;

  // Calculate which card is currently closest to the front (0 deg)
  const computeActiveIndex = useCallback((curAngle: number) => {
    // Card i angle in world space = (i * stepAngle + curAngle)
    // To be closest to 0 deg:
    let minDiff = Infinity;
    let closest = 0;
    for (let i = 0; i < totalCards; i++) {
      const cardAngle = (i * stepAngle + curAngle) % 360;
      let diff = Math.abs(cardAngle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    }
    return closest;
  }, [totalCards, stepAngle]);

  // Main physics loop (inertia damping + gentle auto-spin)
  useEffect(() => {
    const loop = () => {
      if (!isDraggingRef.current) {
        // Friction damping (0.945 decay factor in RAF)
        if (Math.abs(velocityRef.current) > 0.005) {
          velocityRef.current *= 0.945;
          angleRef.current += velocityRef.current;
        } else {
          velocityRef.current = 0;
          // Gentle auto-spin (0.06°/frame) resumes when idle
          if (autoSpin) {
            angleRef.current += 0.06;
          }
        }
        setAngle(angleRef.current);
        setActiveCardIndex(computeActiveIndex(angleRef.current));
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [autoSpin, computeActiveIndex]);

  // Pointer event handlers with Unified Pointer Events & setPointerCapture
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    samplesRef.current = [{ x: e.clientX, time: lastTimeRef.current }];

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    // Multi-sample velocity tracking across recent pointer movements
    samplesRef.current.push({ x: e.clientX, time: now });
    if (samplesRef.current.length > 5) {
      samplesRef.current.shift();
    }

    // Convert pixel delta to rotational degrees
    const sensitivity = 0.28;
    angleRef.current += dx * sensitivity;
    setAngle(angleRef.current);
    setActiveCardIndex(computeActiveIndex(angleRef.current));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    // Calculate throw inertia velocity from recent samples
    const samples = samplesRef.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.time - first.time;
      if (dt > 10 && dt < 200) {
        const dx = last.x - first.x;
        velocityRef.current = (dx / dt) * 8.5; // Scaled throw velocity
      }
    }
  };

  // Click card to spin shortest rotational delta to center front
  const spinToCard = (index: number) => {
    const baseAngle = index * stepAngle;
    const curAngle = angleRef.current;
    let delta = (-baseAngle - curAngle) % 360;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const target = curAngle + delta;

    // Animate smoothly to target
    let start = curAngle;
    let startTime: number | null = null;
    const duration = 650; // ms

    const animateSpin = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Quintic ease out
      const ease = 1 - Math.pow(1 - progress, 4);
      angleRef.current = start + delta * ease;
      setAngle(angleRef.current);
      setActiveCardIndex(index);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        velocityRef.current = 0;
      }
    };
    requestAnimationFrame(animateSpin);
  };

  const handleCardClick = (cert: Certification, index: number) => {
    const isFront = index === activeCardIndex;
    if (isFront) {
      setSelectedCert(cert);
    } else {
      spinToCard(index);
    }
  };

  return (
    <section id="certifications" className="relative py-28 px-4 overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#c40024]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
              <span>03 / CRYPTOGRAPHIC CREDENTIALS</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              VERIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">CERTIFICATIONS</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Drag, swipe, or throw the 3D cylindrical gallery. Click any credential to bring it to center focus or inspect cryptographic verification.
            </p>
          </div>

          {/* Gallery Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setAutoSpin((prev) => !prev)}
              data-magnetic="true"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#090909]/80 backdrop-blur-md text-xs font-mono text-neutral-300 hover:text-white hover:border-[#c40024]/50 transition-colors"
            >
              {autoSpin ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#ff3b5c]" />
                  <span>AUTO-SPIN ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-neutral-400" />
                  <span>PAUSED</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                const nextIdx = (activeCardIndex + 1) % totalCards;
                spinToCard(nextIdx);
              }}
              data-magnetic="true"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#090909]/80 backdrop-blur-md text-xs font-mono text-neutral-300 hover:text-white hover:border-[#c40024]/50 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>NEXT</span>
            </button>
          </div>
        </div>

        {/* 3D DRAGGABLE CYLINDER STAGE */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y perspective-1200"
          style={{ touchAction: 'pan-y' }}
        >
          {/* THE 3D CYLINDER CONTAINER WITH CAMERA PULL-BACK
              CRITICAL: translateZ(-R) rotateY(angle deg)
              Ensures the front-facing card sits at Z = -R + R = 0 (exact scale 1.0)
          */}
          <div
            className="relative w-0 h-0 preserve-3d transition-none will-change-transform"
            style={{
              transform: `translateZ(-${radius}px) rotateY(${angle}deg)`,
            }}
          >
            {CERTIFICATIONS.map((cert, i) => {
              const cardBaseAngle = i * stepAngle;
              // Current orientation of this card relative to camera (0 deg is dead center front)
              const currentCardWorldAngle = (cardBaseAngle + angle) % 360;
              const rad = (currentCardWorldAngle * Math.PI) / 180;
              const cosVal = Math.cos(rad);
              const isFrontFacing = cosVal > -0.05;
              const isCenterFront = i === activeCardIndex;

              return (
                <div
                  key={cert.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(cert, i);
                  }}
                  className={`absolute top-0 left-0 w-[280px] sm:w-[320px] h-[380px] -translate-x-1/2 -translate-y-1/2 preserve-3d backface-hidden transition-[opacity,box-shadow,border-color] duration-300 ${
                    isFrontFacing ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: `rotateY(${cardBaseAngle}deg) translateZ(${radius}px)`,
                    opacity: isFrontFacing ? Math.max(0.18, (cosVal + 0.15) / 1.15) : 0,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Card Body - Dark Obsidian Glass with laser top beam */}
                  <div
                    className={`relative w-full h-full rounded-2xl bg-[#090909]/90 backdrop-blur-xl border transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-2xl ${
                      isCenterFront
                        ? 'border-[#c40024] shadow-[0_0_35px_rgba(196,0,36,0.32)] ring-1 ring-[#ff2b4c]/40'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Brand-colored laser top beam */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${cert.badgeAccent || '#c40024'}, transparent)`,
                      }}
                    />

                    {/* Card Top: Code & Status */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5">
                          {cert.code}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>VERIFIED</span>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-400 font-mono mb-1">{cert.issuer}</div>
                      <h3 className="text-lg font-semibold text-white tracking-tight leading-snug line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Competencies */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-neutral-400">Core Competencies:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.competencies.slice(0, 3).map((comp, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom / Action */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-400">ISSUED {cert.issueDate}</span>
                      <button
                        type="button"
                        className="text-xs font-mono flex items-center gap-1 text-[#ff3b5c] hover:underline"
                      >
                        <span>INSPECT</span>
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Laser corner accent */}
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#c40024]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Track & Dot Indicators */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            {CERTIFICATIONS.map((cert, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <button
                  key={cert.id}
                  onClick={() => spinToCard(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-8 h-2 bg-[#ff2b4c] shadow-[0_0_10px_#ff2b4c]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to ${cert.title}`}
                />
              );
            })}
          </div>
          <span className="text-xs font-mono text-neutral-400">
            [ CARD {String(activeCardIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')} ] — CLICK FRONT CARD TO VERIFY
          </span>
        </div>
      </div>

      {/* Cybernetic Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-[#c40024]/60 p-6 sm:p-8 shadow-[0_0_60px_rgba(196,0,36,0.35)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top scanning line aesthetic */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c40024] via-[#ff3b5c] to-[#c40024] shadow-[0_0_12px_#ff3b5c]" />

            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c40024]/10 border border-[#c40024]/30 flex items-center justify-center text-[#ff3b5c]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#ff3b5c]">CRYPTOGRAPHIC RECORD VERIFIED</div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{selectedCert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Credential Data Grid */}
            <div className="space-y-4 mb-6">
              <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Cryptographic Integrity Hash:</div>
                <div className="text-xs font-mono text-emerald-400 break-all select-all">
                  {selectedCert.verificationHash}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Credential Code:</div>
                  <div className="text-xs font-mono text-white mt-0.5">{selectedCert.code}</div>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Issued By:</div>
                  <div className="text-xs font-mono text-white mt-0.5">{selectedCert.issuer}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 uppercase mb-1">Competency Domains:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.competencies.map((comp, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">{selectedCert.summary}</p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                CLOSE
              </button>
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c40024] hover:bg-[#e0002a] text-white text-xs font-mono transition-colors shadow-[0_0_15px_rgba(196,0,36,0.5)]"
              >
                <span>VERIFY ON ISSUER VAULT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
