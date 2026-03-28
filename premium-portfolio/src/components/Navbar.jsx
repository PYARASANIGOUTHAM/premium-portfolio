import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

export default function Navbar({ adminName, onLogout, onToggleTheme, isDark, onMenuToggle }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/70 backdrop-blur-md dark:bg-apple-gray-900/70"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/80 text-gray-600 transition hover:bg-blue-50 dark:bg-apple-gray-800 dark:text-gray-200 md:hidden"
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Hello, {adminName || 'Admin'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-lg border border-white/30 bg-white/80 px-2 py-1 text-gray-600 transition hover:bg-blue-50 dark:bg-apple-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-transparent bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
}
