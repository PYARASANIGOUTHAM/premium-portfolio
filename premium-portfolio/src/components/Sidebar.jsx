import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const menu = [
  { label: 'Dashboard', to: '/' , icon: <FaTachometerAlt />},
  { label: 'Messages', to: '/messages', icon: <FaEnvelope />},
];

export default function Sidebar({ collapsed, onLogout }) {
  const { pathname } = useLocation();

  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 250 }}
      animate={{ width: collapsed ? 64 : 250 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="glass fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-white/20 bg-white/70 p-4 backdrop-blur-lg dark:bg-apple-gray-900/70"
      style={{ width: collapsed ? 64 : 250 }}
    >
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center">A</div>
        {!collapsed && (
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100">Admin Panel</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">manage@portfolio.com</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mb-5 rounded-xl border border-gray-200 bg-white/80 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-apple-gray-800">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Profile</p>
          <p className="pt-1 text-xs text-gray-500 dark:text-gray-400">Admin user | Portfolio owner</p>
        </div>
      )}

      <div className="mb-8" />
      <div className="space-y-2">
        {menu.map((item) => {
          const active = pathname === item.to || (item.to === '/' && pathname === '/');
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${active ? 'bg-accent/20 text-accent' : 'text-gray-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-white/10'}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && item.label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
      >
        <FaSignOutAlt />
        {!collapsed && 'Logout'}
      </button>
    </motion.aside>
  );
}
