import React from 'react';
import { CANDIDATE } from '../../data/portfolioData';
import { ArrowUpRight, Download, Radio, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleDownloadResume = () => {
    // Generate and download a formatted resume markdown file
    const resumeText = `# ${CANDIDATE.fullName} - Resume
Role: ${CANDIDATE.role}
Email: ${CANDIDATE.email}
Location: ${CANDIDATE.location}

## Professional Summary
${CANDIDATE.shortBio}

## Core Competencies
- Full-Stack Web Architecture (React 19, TypeScript, Next.js, Node.js)
- UI/UX Design & Kinetic Systems (Figma, Design Systems, Zero-Pill Typography)
- AI & Autonomous Chatbot Integration (Gemini SDK, OpenAI, RAG, Pinecone)
- High-Performance APIs & Scalable Databases (PostgreSQL, MongoDB, Redis)

## Verified Metrics
- Academic CGPA: 8.94 / 10 (Computer Science & Engineering)
- 38+ Production Projects Deployed
- 450+ LeetCode & CodeChef Algorithmic Solutions Solved
- 99.98% System Uptime SLA

Contact: ${CANDIDATE.email}
`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume-${CANDIDATE.name}-FullStack-AI.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* High-intensity background watermark with candidate's first name */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/4 -translate-y-1/2 pointer-events-none select-none font-oswald text-[18vw] font-black uppercase text-transparent leading-none z-0 tracking-tighter opacity-35"
        style={{
          WebkitTextStroke: '2px rgba(196, 0, 36, 0.35)',
          textShadow: '0 0 50px rgba(196, 0, 36, 0.18)',
        }}
      >
        {CANDIDATE.name}
      </div>

      {/* Hero Top Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow Badge & Open to Opportunities Beacon */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a]/80 border border-[#c40024]/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider text-neutral-200">
              01 / FULL-STACK & AI ENGINEER
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-md">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Large Bold Editorial Typography using 'Oswald' */}
        <div className="max-w-[13ch] sm:max-w-[14ch] tracking-tight">
          <h1 className="font-oswald text-5xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase font-bold leading-[0.92] text-white">
            <span>BUILDING</span>
            <br />
            <span>IDEAS</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#ff3b5c] to-[#c40024]">
              INTO EXPERIENCES
            </span>
            <span className="text-[#ff2b4c] inline-block shadow-[0_0_20px_#ff2b4c]">.</span>
          </h1>
        </div>

        {/* Concise Editorial Subheading */}
        <p className="mt-8 text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
          {CANDIDATE.shortBio}
        </p>

        {/* Magnetic CTAs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-10">
          <a
            href="#projects"
            data-magnetic="true"
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#c40024] hover:bg-[#e0002a] text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(196,0,36,0.55)] hover:shadow-[0_0_35px_rgba(224,0,42,0.75)] hover:scale-[1.02]"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={handleDownloadResume}
            data-magnetic="true"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#090909]/80 hover:bg-[#141414] border border-white/10 hover:border-[#c40024]/50 text-neutral-200 hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-[#ff3b5c]" />
            <span>DOWNLOAD RÉSUMÉ</span>
          </button>
        </div>
      </div>

      {/* Bottom Metric Telemetry Counters */}
      <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CANDIDATE.metrics.map((metric, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                <Sparkles className="w-3 h-3 text-[#ff2b4c]" />
                <span>{metric.label}</span>
              </div>
              <div className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight tabular-nums group-hover:text-[#ff3b5c] transition-colors">
                {metric.value}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
