import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/admin/messages');
        const messages = res?.data || [];
        setStats({ total: messages.length, unread: messages.filter((m) => !m.read).length });
      } catch (_) {
        setStats({ total: 0, unread: 0 });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading stats...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="glass-card p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Messages</p>
            <p className="mt-2 text-3xl font-bold text-accent">{stats.total}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Unread Messages</p>
            <p className="mt-2 text-3xl font-bold text-indigo-500">{stats.unread}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Action</p>
            <p className="mt-2 text-lg text-gray-700 dark:text-gray-200">Use the Messages tab to review and delete content.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
