import React, { useState } from 'react';
import { MILESTONES, Milestone } from '../../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles } from 'lucide-react';

type FilterType = 'all' | 'experience' | 'education';

export const Experience: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredMilestones = MILESTONES.filter((m) => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  return (
    <section id="experience" className="relative py-28 px-4 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c40024]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-ping" />
            <span>04 / CAREER & ACADEMIC TRAJECTORY</span>
          </div>
          <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
            EXPERIENCE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">EDUCATION</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            Bilateral chronologic ledger spanning production agency engineering, autonomous AI deployment, and academic foundation.
          </p>

          {/* Filter Segmented Controls */}
          <div className="inline-flex items-center p-1.5 mt-8 rounded-xl bg-[#0d0d0d] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              data-magnetic="true"
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[#c40024] text-white shadow-[0_0_15px_rgba(196,0,36,0.6)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ALL MILESTONES ({MILESTONES.length})
            </button>
            <button
              onClick={() => setFilter('experience')}
              data-magnetic="true"
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                filter === 'experience'
                  ? 'bg-[#c40024] text-white shadow-[0_0_15px_rgba(196,0,36,0.6)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              WORK EXPERIENCE
            </button>
            <button
              onClick={() => setFilter('education')}
              data-magnetic="true"
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                filter === 'education'
                  ? 'bg-[#c40024] text-white shadow-[0_0_15px_rgba(196,0,36,0.6)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EDUCATION
            </button>
          </div>
        </div>

        {/* BILATERAL ALTERNATING TIMELINE */}
        <div className="relative mt-12">
          {/* Central glowing neon laser spine down the middle (50% desktop, single-column mobile) */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#c40024] via-[#ff2b4c] to-[#c40024]/20 shadow-[0_0_10px_#ff2b4c]" />

          <div className="space-y-12">
            {filteredMilestones.map((item: Milestone, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Waypoint Center Node with pulsing green/red status rings */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#070707] border-2 shadow-lg transition-transform duration-300 hover:scale-125 ${
                        item.status === 'current'
                          ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : 'border-[#c40024] shadow-[0_0_15px_rgba(196,0,36,0.5)]'
                      }`}
                    >
                      {item.type === 'experience' ? (
                        <Briefcase
                          className={`w-4 h-4 ${
                            item.status === 'current' ? 'text-emerald-400' : 'text-[#ff3b5c]'
                          }`}
                        />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-[#ff3b5c]" />
                      )}

                      {/* Pulsing ring indicator */}
                      {item.status === 'current' ? (
                        <span className="absolute -inset-1 rounded-full border border-emerald-400/50 animate-ping" />
                      ) : (
                        <span className="absolute -inset-0.5 rounded-full border border-[#c40024]/40" />
                      )}
                    </div>
                  </div>

                  {/* Card Content Column (alternates left and right) */}
                  <div
                    className={`w-full pl-12 sm:pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12'
                    }`}
                  >
                    <div className="group relative rounded-2xl bg-[#090909]/90 backdrop-blur-xl border border-white/10 hover:border-[#c40024]/60 p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(196,0,36,0.18)]">
                      {/* Top laser accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c40024] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Period & Category Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                          <Calendar className="w-3.5 h-3.5 text-[#ff3b5c]" />
                          <span>{item.period}</span>
                        </div>
                        {item.gradeOrMetric && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <Sparkles className="w-3 h-3" />
                            {item.gradeOrMetric}
                          </span>
                        )}
                      </div>

                      {/* Role & Organization */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff3b5c] transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 mt-1 mb-4">
                        <span>{item.organization}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-neutral-400">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 mb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed list-none">
                        {item.description.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#ff3b5c] font-bold mt-0.5">›</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                        {item.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
