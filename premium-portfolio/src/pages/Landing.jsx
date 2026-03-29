import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from '../components/LandingNavbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Stats from '../sections/Stats';
import Contact from '../sections/Contact';

export default function Landing() {
  const [isDark, setIsDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const body = document.documentElement;
    if (isDark) body.classList.add('dark');
    else body.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const handleMouse = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="relative overflow-hidden text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,.25),_transparent_40%),_radial-gradient(circle_at_80%_10%,_rgba(105,57,255,.25),_transparent_40%),_radial-gradient(circle_at_50%_80%,_rgba(17,235,255,.12),_transparent_35%)]"
      />

      <div className="pointer-events-none fixed left-0 top-0 z-50 h-1 w-full bg-white/20">
        <div className="h-full bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 transition-all" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div
        style={{ transform: `translate3d(${cursor.x - 80}px, ${cursor.y - 80}px, 0)` }}
        className="pointer-events-none fixed h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl transition-all duration-150"
      />

      <LandingNavbar isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
      </motion.div>
    </div>
  );
}
