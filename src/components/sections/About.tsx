import React, { useState } from 'react';
import { CANDIDATE } from '../../data/portfolioData';
import { Terminal, ShieldCheck, Cpu, Code2, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const [terminalOutput, setTerminalOutput] = useState<string>(
    'SYS_OK: Architecture verified. 100% test coverage across primary endpoints. Ready for production deployment.'
  );
  const [activeCmd, setActiveCmd] = useState<string>('status');

  const runCommand = (cmd: string) => {
    setActiveCmd(cmd);
    switch (cmd) {
      case 'whoami':
        setTerminalOutput(
          `IDENTITY: ${CANDIDATE.fullName} | Role: ${CANDIDATE.role} | Specialization: Full-Stack Web Development, UI/UX Engineering & Autonomous AI Chatbot Systems.`
        );
        break;
      case 'philosophy':
        setTerminalOutput(
          'PHILOSOPHY: Zero-pill typographic discipline, sub-200ms perceptual latency budgets, and immersive 3D/canvas spatial interactions that respect user focus.'
        );
        break;
      case 'stack':
        setTerminalOutput(
          'STACK: TypeScript (ESNext), React 19, Tailwind CSS, Next.js, Node.js, Python, PostgreSQL, MongoDB, Pinecone RAG, Gemini SDK, Docker.'
        );
        break;
      case 'status':
      default:
        setTerminalOutput(
          `STATUS: ${CANDIDATE.statusMessage} | Location: ${CANDIDATE.location} | SLA: 99.98% | Academic CGPA: 8.94/10`
        );
        break;
    }
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/5">
      {/* Background ambient red glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[320px] bg-[#c40024]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
          <span>06 / ARCHITECTURAL PROFILE & PHILOSOPHY</span>
        </div>
        <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">{CANDIDATE.name.toUpperCase()}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait & Cyber Inspection Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Avatar Media Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 p-2 bg-[#090909]/90 shadow-2xl">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black">
              <img
                src="/src/assets/images/cyber_developer_avatar_1790230792440.jpg"
                alt={CANDIDATE.fullName}
                className="w-full h-full object-cover filter contrast-110 brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Status overlay badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">{CANDIDATE.fullName}</div>
                  <div className="text-[11px] font-mono text-neutral-400">{CANDIDATE.role}</div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>

            {/* Corner cyber brackets */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#c40024]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#c40024]" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#c40024]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#c40024]" />
          </div>

          {/* Quick Spec Metadata */}
          <div className="p-5 rounded-2xl bg-[#090909]/80 border border-white/10 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-white/5">
              <span>LOCATION</span>
              <span className="text-white">{CANDIDATE.location}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-white/5">
              <span>DISCIPLINE</span>
              <span className="text-[#ff3b5c]">FULL-CYCLE WEB + AI</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-white/5">
              <span>AVAILABILITY</span>
              <span className="text-emerald-400">IMMEDIATE / CONTRACT</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>SECURITY CLEARANCE</span>
              <span className="text-white">ENCRYPTED PROTOCOL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal & Inspection Layout (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cyber Terminal Window */}
          <div className="rounded-2xl bg-[#090909]/95 backdrop-blur-xl border border-[#c40024]/40 shadow-[0_0_35px_rgba(196,0,36,0.18)] overflow-hidden">
            {/* Terminal Window Header Bar */}
            <div className="px-4 py-3 bg-[#0d0d0d] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff3b5c]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-neutral-400">astra@core-node:~$</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-400">BASH / UTF-8</div>
            </div>

            {/* Interactive Command Launcher */}
            <div className="p-4 bg-black/50 border-b border-white/5 flex flex-wrap gap-2">
              <button
                onClick={() => runCommand('status')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeCmd === 'status'
                    ? 'bg-[#c40024] text-white shadow-[0_0_10px_#ff2b4c]'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                $ cat status.log
              </button>
              <button
                onClick={() => runCommand('whoami')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeCmd === 'whoami'
                    ? 'bg-[#c40024] text-white shadow-[0_0_10px_#ff2b4c]'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                $ whoami
              </button>
              <button
                onClick={() => runCommand('philosophy')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeCmd === 'philosophy'
                    ? 'bg-[#c40024] text-white shadow-[0_0_10px_#ff2b4c]'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                $ cat manifesto.md
              </button>
              <button
                onClick={() => runCommand('stack')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeCmd === 'stack'
                    ? 'bg-[#c40024] text-white shadow-[0_0_10px_#ff2b4c]'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                $ inspect --stack
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs sm:text-sm text-neutral-200 min-h-[120px] bg-black/75 flex items-start gap-3">
              <span className="text-[#ff3b5c] font-bold select-none">›</span>
              <p className="leading-relaxed font-mono">{terminalOutput}</p>
            </div>
          </div>

          {/* Narrative Bio */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090909]/80 border border-white/10 space-y-4">
            <h3 className="font-oswald text-2xl uppercase tracking-tight text-white">
              ENGINEERING DIGITAL EXPERIENCES
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">{CANDIDATE.fullBio}</p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              I treat every interface as a unified mechanical instrument: from spatial ergonomics, typography, and micro-interactions on the frontend to resilient fault-tolerant microservices, vector similarity caches, and streaming LLM orchestrations on the backend.
            </p>

            {/* Core Strengths Triplets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-mono text-[#ff3b5c] mb-1 font-semibold">01. FULL-LIFECYCLE</div>
                <div className="text-xs text-neutral-400">
                  Concept, UX wireframes, client-side React, API contracts, deployment.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-mono text-[#ff3b5c] mb-1 font-semibold">02. AI INTEGRATIONS</div>
                <div className="text-xs text-neutral-400">
                  RAG vector retrieval, custom autonomous chatbots, streaming tool use.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-mono text-[#ff3b5c] mb-1 font-semibold">03. ZERO-SLOP DISCIPLINE</div>
                <div className="text-xs text-neutral-400">
                  Editorial typography, accessible contrast, and smooth 60fps animations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
