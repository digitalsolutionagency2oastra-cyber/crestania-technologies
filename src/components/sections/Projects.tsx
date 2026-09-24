import React, { useState, useRef } from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { ExternalLink, Github, Layers, ArrowUpRight, Terminal } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (proj: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    setRotateX(normY * -8);
    setRotateY(normX * 8);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
      className="group relative cursor-pointer select-none rounded-2xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-[#c40024] hover:to-[#ff2b4c]/30 transition-all duration-300 perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 43, 76, 0.18), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content Interior */}
      <div className="relative w-full h-full rounded-2xl bg-[#090909]/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
        {/* Top: Category Tag & Status */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#ff3b5c] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b5c]" />
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400">PRODUCTION</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Project Media Window */}
          <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/20 transition-colors bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                {project.subtitle}
              </span>
              <span className="p-1.5 rounded-lg bg-[#c40024] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff3b5c] transition-colors tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Metrics List */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-black/40 border border-white/5 mb-6">
            {project.metrics.map((met, i) => (
              <div key={i} className="text-center">
                <div className="text-[11px] font-mono font-semibold text-neutral-200 truncate">{met}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Tech Stack Chips & Direct Links */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-[11px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-neutral-400">CLICK FOR TELEMETRY</span>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub Repository"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
                className="inline-flex items-center gap-1 text-xs font-mono text-[#ff3b5c] hover:underline"
              >
                <span>DETAILS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'AI & Full-Stack', 'Frontend & Data', 'UI/UX & Design', 'Creative Tech'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/5">
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[300px] bg-[#c40024]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
            <span>02 / FEATURED SYSTEMS & DEPLOYMENTS</span>
          </div>
          <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
            SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">PROJECTS</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Production full-stack applications, interactive 3D WebGL dashboards, and multi-agent AI chatbot integrations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-magnetic="true"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-[#c40024] text-white shadow-[0_0_15px_rgba(196,0,36,0.5)]'
                  : 'bg-[#121212] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} onOpenModal={(p) => setSelectedProject(p)} />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#0a0a0a] border border-[#c40024]/60 p-6 sm:p-8 shadow-[0_0_50px_rgba(196,0,36,0.35)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono text-[#ff3b5c] mb-1">{selectedProject.category}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/10 bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed mb-6">
              <p>{selectedProject.description}</p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#ff3b5c] uppercase">System Telemetry & Impact:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 text-center">
                      <div className="text-xs font-mono text-white font-medium">{m}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="text-xs font-mono text-neutral-400 mb-2">ENGINEERING STACK:</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono text-neutral-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>SOURCE CODE</span>
              </a>
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c40024] hover:bg-[#e0002a] text-white text-xs font-mono transition-colors shadow-[0_0_15px_rgba(196,0,36,0.5)]"
              >
                <span>LAUNCH INSTANCE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
