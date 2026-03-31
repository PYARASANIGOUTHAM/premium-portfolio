import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaEnvelope, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menu = [
  { label: 'Dashboard', to: '/dashboard', icon: <FaTachometerAlt /> },
  { label: 'Messages', to: '/messages', icon: <FaEnvelope /> },
  { label: 'Analytics', to: '/analytics', icon: <FaChartLine /> },
  { label: 'Settings', to: '/settings', icon: <FaCog /> },
];

export default function Sidebar({ collapsed, onLogout }) {
  return (
    <motion.aside
      initial={{ width: collapsed ? 70 : 260 }}
      animate={{ width: collapsed ? 70 : 260 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/10 bg-[rgba(9,16,35,0.78)] p-4 backdrop-blur-xl shadow-2xl"
      style={{ width: collapsed ? 70 : 260 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg flex items-center justify-center text-lg font-bold">
          A
        </div>
        {!collapsed && (
          <div>
            <p className="text-lg font-semibold text-white">Premium Admin</p>
            <p className="text-xs text-slate-300">admin@saas.app</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mb-5 rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-slate-200 shadow-inner">
          <p className="font-semibold">Profile</p>
          <p className="pt-1 text-xs text-slate-300">Admin user • Portfolio owner</p>
        </div>
      )}

      <div className="mb-6" />
      <div className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-accent/20 text-accent ring-1 ring-accent/30 shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-white/10'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {!collapsed && item.label}
          </NavLink>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
      >
        <FaSignOutAlt />
        {!collapsed && 'Logout'}
      </button>
    </motion.aside>
  );
}
