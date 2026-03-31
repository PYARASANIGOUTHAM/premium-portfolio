import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import StatCard from '../components/StatCard';
import ChartSection from '../components/ChartSection';
import MessageTable from '../components/MessageTable';
import api from '../utils/api';

const defaults = {
  timeSeries: [
    { label: 'Mon', messages: 50, predicted: 60 },
    { label: 'Tue', messages: 90, predicted: 110 },
    { label: 'Wed', messages: 120, predicted: 125 },
    { label: 'Thu', messages: 80, predicted: 95 },
    { label: 'Fri', messages: 160, predicted: 175 },
    { label: 'Sat', messages: 140, predicted: 150 },
    { label: 'Sun', messages: 95, predicted: 105 },
  ],
  weekly: [
    { day: 'Mon', value: 50 }, { day: 'Tue', value: 90 }, { day: 'Wed', value: 120 },
    { day: 'Thu', value: 80 }, { day: 'Fri', value: 160 }, { day: 'Sat', value: 140 },
    { day: 'Sun', value: 95 }
  ],
  category: [
    { name: 'Support', value: 40 }, { name: 'Sales', value: 27 }, { name: 'Bug', value: 20 },
    { name: 'Feature', value: 10 }, { name: 'Other', value: 3 }
  ]
};

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/admin/messages');
      setMessages(response.data || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Unable to load messages';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((m) => !m.read).length;
    const weeklyGrowth = total > 0 ? `${Math.round(Math.min(150, (total / 20) * 100))}%` : '0%';
    const activeUsers = Math.max(1, Math.round(total / 3));

    return { total, unread, weeklyGrowth, activeUsers };
  }, [messages]);

  const onDeleteMessage = async (id) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));

    try {
      await api.delete(`/admin/messages/${id}`);
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]">Dashboard</h1>
          <p className="text-sm text-slate-200/95">Modern AI SaaS control panel with analytics and message management.</p>
        </div>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="📬" label="Total Messages" value={stats.total} colorClass="bg-gradient-to-r from-cyan-400 to-blue-400" />
        <StatCard icon="✉️" label="New Messages" value={stats.unread} colorClass="bg-gradient-to-r from-purple-400 to-indigo-500" />
        <StatCard icon="📈" label="Weekly Growth" value={stats.weeklyGrowth} colorClass="bg-gradient-to-r from-teal-400 to-green-400" />
        <StatCard icon="🧑‍💻" label="Active Users" value={stats.activeUsers} colorClass="bg-gradient-to-r from-violet-400 to-pink-400" />
      </div>

      <div className="mt-6">
        <ChartSection metrics={defaults} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="glass-card p-8 text-center">Loading messages...</div>
        ) : error ? (
          <div className="glass-card p-6 text-red-300">{error}</div>
        ) : (
          <MessageTable messages={messages} onDelete={onDeleteMessage} />
        )}
      </div>
    </motion.main>
  );
}
