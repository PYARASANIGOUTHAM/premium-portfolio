import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-white">Settings</h2>
        <p className="mt-2 text-sm text-slate-300">Configure your admin preferences and control center AI settings.</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-4">
            <p className="text-sm font-medium text-cyan-200">Theme</p>
            <p className="text-sm text-slate-300">Switch between AI dark mode and Solarized standard profiles.</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm font-medium text-cyan-200">Data sync</p>
            <p className="text-sm text-slate-300">Frequency, webhook targets, and live analytics refresh interval.</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm font-medium text-cyan-200">Notifications</p>
            <p className="text-sm text-slate-300">AI-powered alert thresholds and message priority settings.</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm font-medium text-cyan-200">Security</p>
            <p className="text-sm text-slate-300">2FA, session expiry, and admin-level access logging.</p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
