import React from 'react';
import { LenisProvider } from './components/LenisProvider';
import { CustomCursor } from './components/CustomCursor';
import { CinematicVideo } from './components/CinematicVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LenisProvider>
      {/* Precision Smooth Cursor Tracker */}
      <CustomCursor />

      {/* Signature 3D Video Scrubbing Engine (Fixed Background Viewport) */}
      <CinematicVideo
        videoSrc="/assets/cyber_hero.mp4"
        fallbackPoster="/src/assets/images/cyber_developer_hero_1790230770127.jpg"
      />

      {/* Floating Cyberpunk Navbar */}
      <Navbar />

      {/* Main Content Sections Layout */}
      <main className="relative z-10 w-full min-h-screen">
        <Hero />
        <Projects />
        <Certifications />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* System Footer */}
      <Footer />
    </LenisProvider>
  );
}
