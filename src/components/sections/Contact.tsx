import React, { useState } from 'react';
import { CANDIDATE } from '../../data/portfolioData';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Sparkles, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous encrypted dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[320px] bg-[#c40024]/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff2b4c] tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ff2b4c] animate-pulse" />
          <span>07 / DIRECT COMMUNICATIONS PROTOCOL</span>
        </div>
        <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
          INITIALIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff3b5c] to-[#c40024]">TRANSMISSION</span>
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          Available for contract architecture, high-impact web applications, UI/UX redesigns, and AI chatbot integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Comms & Quick Copy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#090909]/90 backdrop-blur-xl border border-white/10 hover:border-[#c40024]/50 transition-all duration-300 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
              <Mail className="w-4 h-4 text-[#ff3b5c]" />
              <span>OFFICIAL INBOX</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-white break-all mb-4">
              {CANDIDATE.email}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                data-magnetic="true"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${CANDIDATE.email}`}
                data-magnetic="true"
                className="py-3 px-4 rounded-xl bg-[#c40024] hover:bg-[#e0002a] text-white text-xs font-mono transition-colors shadow-[0_0_15px_rgba(196,0,36,0.5)]"
              >
                DISPATCH
              </a>
            </div>
          </div>

          {/* Magnetic Social Links */}
          <div className="p-6 rounded-2xl bg-[#090909]/80 border border-white/10 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase">External Signal Beacons:</div>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={CANDIDATE.github}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-neutral-300 hover:text-white transition-all group"
              >
                <Github className="w-5 h-5 mb-1 group-hover:text-[#ff3b5c] transition-colors" />
                <span className="text-[11px] font-mono">GITHUB</span>
              </a>
              <a
                href={CANDIDATE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-neutral-300 hover:text-white transition-all group"
              >
                <Linkedin className="w-5 h-5 mb-1 group-hover:text-[#ff3b5c] transition-colors" />
                <span className="text-[11px] font-mono">LINKEDIN</span>
              </a>
              <a
                href={CANDIDATE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-neutral-300 hover:text-white transition-all group"
              >
                <Twitter className="w-5 h-5 mb-1 group-hover:text-[#ff3b5c] transition-colors" />
                <span className="text-[11px] font-mono">TWITTER</span>
              </a>
            </div>
          </div>

          {/* Response Protocol Status */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono space-y-2 text-neutral-400">
            <div className="flex items-center justify-between">
              <span>RESPONSE TIME</span>
              <span className="text-emerald-400">&lt; 12 HOURS</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ENCRYPTION</span>
              <span className="text-white">TLS 1.3 / E2E</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ACTIVE TIMEZONE</span>
              <span className="text-neutral-300">UTC-7 / FLEXIBLE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Cybernetic Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-[#090909]/95 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Top scanning laser */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c40024] to-transparent" />

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">TRANSMISSION RECEIVED</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto font-sans">
                  Your message has been encrypted and routed directly to Astra. Expect a formal response within 12 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors"
                >
                  DISPATCH ANOTHER PACKET
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b5c]">
                    <MessageSquare className="w-4 h-4" />
                    <span>ENCRYPTED MESSAGE DISPATCH</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">READY</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024] text-sm text-white placeholder-neutral-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024] text-sm text-white placeholder-neutral-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                    Engagement Scope
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024] text-sm text-white outline-none transition-all"
                  >
                    <option value="Full-Stack Development">Full-Stack Development (React/Next.js + Node)</option>
                    <option value="AI Chatbot Integration">AI Chatbot & Autonomous Agent Integration</option>
                    <option value="UI/UX & Kinetic Systems">UI/UX Design & High-Performance Frontend</option>
                    <option value="Full Website Build">End-to-End Website Build & Deployment</option>
                    <option value="Contract / Other">General Consulting / Contract Role</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                    Project Parameters / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, deliverables, timeline, and expectations..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024] text-sm text-white placeholder-neutral-400 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-magnetic="true"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#c40024] hover:bg-[#e0002a] text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(196,0,36,0.5)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>ENCRYPTING & DISPATCHING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT PACKET</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
