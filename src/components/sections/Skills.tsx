import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Cpu, Terminal, Zap, Code2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(SKILL_CATEGORIES[0].category);

  const selectedCategoryData =
    SKILL_CATEGORIES.find((cat) => cat.category === activeCategory) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="relative py-28 px-4 max-w-6xl mx-auto border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[320px] bg-[#c40024]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
            <span>05 / TECHNICAL TAXONOMY & PROFICIENCIES</span>
          </div>
          <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
            SKILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">CAPABILITIES</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            A comprehensive matrix of languages, frameworks, cloud primitives, and neural engineering proficiencies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Cpu className="w-4 h-4 text-[#ff3b5c]" />
          <span>FULL-STACK + AI INTEGRATION</span>
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = cat.category === activeCategory;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              data-magnetic="true"
              className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#c40024] text-white shadow-[0_0_18px_rgba(196,0,36,0.55)] font-semibold'
                  : 'bg-[#0f0f0f] text-neutral-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{cat.category.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Skill Cards Grid for Active Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {selectedCategoryData.skills.map((skill, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-[#090909]/90 backdrop-blur-xl border border-white/10 hover:border-[#c40024]/60 p-6 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(196,0,36,0.15)] flex flex-col justify-between"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white tracking-tight text-base group-hover:text-[#ff3b5c] transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-neutral-400 tabular-nums">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c40024] to-[#ff2b4c] transition-all duration-700 ease-out shadow-[0_0_8px_#ff2b4c]"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>

            {/* Bottom details */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                {skill.highlight ? (
                  <>
                    <Zap className="w-3 h-3 text-[#ff2b4c]" />
                    <span className="text-[#ff3b5c]">CORE SPECIALTY</span>
                  </>
                ) : (
                  <span>ACTIVE PRODUCTION</span>
                )}
              </span>
              <span>GRADE A+</span>
            </div>
          </div>
        ))}
      </div>

      {/* All Categories Compact Cloud Overview */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0a0a0a]/80 border border-white/10">
        <div className="text-xs font-mono text-[#ff3b5c] mb-4 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span>FULL SYNTACTIC INDEX (ALL VECTORS)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILL_CATEGORIES.flatMap((c) => c.skills).map((skill, i) => (
            <span
              key={i}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#c40024]/20 border border-white/5 hover:border-[#c40024]/40 text-neutral-300 hover:text-white transition-all cursor-default"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
