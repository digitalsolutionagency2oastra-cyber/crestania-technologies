import React, { useState, useEffect } from 'react';
import { CANDIDATE } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Stack', href: '#skills' },
  { label: 'About', href: '#about' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'certifications', 'experience', 'skills', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-5 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-[#090909]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          data-magnetic="true"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#c40024] flex items-center justify-center text-white font-mono font-bold text-xs shadow-[0_0_15px_rgba(196,0,36,0.5)] group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-oswald text-xl tracking-tight text-white uppercase group-hover:text-[#ff3b5c] transition-colors">
            {CANDIDATE.name}<span className="text-[#c40024]">.</span>
          </span>
        </a>

        {/* Zone 2: Nav links with sliding indicator tracking active section */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121212]/70 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                data-magnetic="true"
                className={`relative px-4 py-1.5 text-xs font-mono transition-colors rounded-lg ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 bg-[#c40024] rounded-lg -z-10 shadow-[0_0_12px_rgba(196,0,36,0.6)] transition-all"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            data-magnetic="true"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#c40024] border border-white/10 hover:border-[#c40024] text-xs font-mono text-neutral-200 hover:text-white transition-all duration-200"
          >
            <span>INITIALIZE COMMS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-[#121212] border border-white/10 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-5 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl pointer-events-auto space-y-3 animate-in fade-in duration-200">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#c40024] text-white text-xs font-mono"
            >
              <span>INITIALIZE COMMS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
