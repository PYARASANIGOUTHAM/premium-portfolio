import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
export default function Navbar({ adminName, onLogout, onToggleTheme, isDark, onMenuToggle }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-white/15 bg-[rgba(10,15,34,0.75)] backdrop-blur-xl shadow-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-slate-200 transition hover:bg-white/20"
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>

          <div className="hidden md:flex items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-slate-200 shadow-sm backdrop-blur-sm">
            <FiSearch className="text-slate-400" />
            <input
              type="search"
              placeholder="Search messages..."
              className="ml-2 w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition hover:bg-white/20"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="absolute -top-1 right-0 h-2.5 w-2.5 rounded-full bg-rose-500 shadow-lg" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition hover:bg-white/20"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=80&q=80"
                alt="Admin"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="hidden sm:inline">{adminName || 'Admin'}</span>
              <FiChevronDown className="text-sm" />
            </button>

            {profileOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-44 space-y-1 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl"
              >
                <li>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10">Profile</button>
                </li>
                <li>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10">Settings</button>
                </li>
                <li>
                  <button onClick={onLogout} className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-500/20">Logout</button>
                </li>
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

