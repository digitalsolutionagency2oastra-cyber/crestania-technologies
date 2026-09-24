import React, { useState, useEffect } from 'react';
import { CANDIDATE } from '../data/portfolioData';
import { ArrowUp, Terminal, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 px-4 sm:px-8 border-t border-white/10 bg-[#040404]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#c40024] flex items-center justify-center text-white font-mono font-bold text-xs">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-oswald text-lg text-white uppercase tracking-tight">
              {CANDIDATE.name}<span className="text-[#c40024]">.</span>
            </span>
          </div>

          <span className="hidden sm:inline text-neutral-400">|</span>

          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>NODE ACTIVE: {timeStr || 'UTC'}</span>
          </div>
        </div>

        {/* Center: System notice */}
        <div className="text-xs font-mono text-neutral-400 text-center flex items-center gap-1.5">
          <span>ARCHITECTED WITH NEXT-GEN FRONTEND DISCIPLINE</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          data-magnetic="true"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#c40024] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all group"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
        <div>© {new Date().getFullYear()} {CANDIDATE.fullName}. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-2">
          <span>PORTFOLIO SYSTEM v3.4.0</span>
          <span>·</span>
          <span className="text-emerald-400">ENCRYPTED</span>
        </div>
      </div>
    </footer>
  );
};
