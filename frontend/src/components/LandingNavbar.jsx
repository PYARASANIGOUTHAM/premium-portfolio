import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingNavbar({ isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-400 ${scrolled ? 'bg-[#05112b]/85 shadow-lg' : 'bg-transparent'} `}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <a href="#hero" className="text-lg font-extrabold tracking-tight text-white">Goutham<span className="text-cyan-300">.</span></a>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-200">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
              {item.label}
            </a>
          ))}

          <a href="/login" className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300">
            Sign In
          </a>

          <button
            className="inline-flex items-center gap-2 rounded-full border border-blue/20 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:border-cyan-300 hover:text-cyan-300"
            onClick={onToggleTheme}
            type="button"
          >
            {isDark ? <FiSun /> : <FiMoon />} {isDark ? 'Light' : 'Dark'}
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={onToggleTheme} type="button" className="rounded-full border border-white/20 p-2 text-white hover:text-cyan-300">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={() => setOpen((v) => !v)} type="button" className="rounded-full border border-white/20 p-2 text-white">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-[#061533]/95 border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-cyan-500/20 hover:text-cyan-300">
                {item.label}
              </a>
            ))}
            <button onClick={onToggleTheme} className="rounded-lg border border-white/20 px-3 py-2 text-left text-slate-200 hover:border-cyan-300 hover:text-cyan-300">
              Toggle {isDark ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
