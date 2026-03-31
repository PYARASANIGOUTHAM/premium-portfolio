import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,

  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';
import api from '../utils/api';

const baseInsight = [
  { id: 'weeklyMessages', icon: '📬', title: 'Messages this week', value: 120, trend: '+16%' },
  { id: 'growth', icon: '📈', title: 'Growth w/ AI forecast', value: '+25%', trend: '+5.2%' },
  { id: 'peak', icon: '🔥', title: 'Peak activity', value: '6:00 PM', trend: 'Real-time spike' },
];

const sampleTimeseries = [
  { hour: '00:00', messages: 10, engagement: 45 },
  { hour: '04:00', messages: 18, engagement: 49 },
  { hour: '08:00', messages: 28, engagement: 58 },
  { hour: '12:00', messages: 60, engagement: 72 },
  { hour: '16:00', messages: 53, engagement: 67 },
  { hour: '18:00', messages: 90, engagement: 91 },
  { hour: '20:00', messages: 84, engagement: 85 },
  { hour: '23:00', messages: 45, engagement: 66 },
];

const sampleDaily = [
  { day: 'Mon', messages: 50 },
  { day: 'Tue', messages: 90 },
  { day: 'Wed', messages: 120 },
  { day: 'Thu', messages: 80 },
  { day: 'Fri', messages: 160 },
  { day: 'Sat', messages: 140 },
  { day: 'Sun', messages: 95 },
];

const sampleBreakdown = [
  { name: 'Support', value: 46 },
  { name: 'Sales', value: 24 },
  { name: 'Tech', value: 17 },
  { name: 'Billing', value: 11 },
  { name: 'Other', value: 2 },
];

const COLORS = ['#fe1206', '#bc05f9', '#c92ce5', '#7b6cff', '#ffb8bd'];

export default function Analytics() {
  const [insights, setInsights] = useState(baseInsight);
  const [timeseries, setTimeseries] = useState(sampleTimeseries);
  const [daily, setDaily] = useState(sampleDaily);
  const [breakdown, setBreakdown] = useState(sampleBreakdown);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get('/admin/messages');
        const messages = response.data || [];

        const countsByDay = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
        const countsByCategory = { Support: 0, Sales: 0, Tech: 0, Billing: 0, Other: 0 };
        const times = {};

        messages.forEach((msg) => {
          const dt = new Date(msg.createdAt);
          const day = dt.toLocaleDateString('en-US', { weekday: 'short' });
          countsByDay[day] = (countsByDay[day] || 0) + 1;

          const hour = `${String(dt.getHours()).padStart(2, '0')}:00`;
          times[hour] = (times[hour] || 0) + 1;

          const category = msg.category || ['Support', 'Sales', 'Tech', 'Billing', 'Other'][Math.floor(Math.random() * 5)];
          countsByCategory[category] = (countsByCategory[category] || 0) + 1;
        });

        const transformedDaily = Object.entries(countsByDay).map(([day, messages]) => ({ day, messages }));
        const transformedTimeseries = Object.entries(times)
          .map(([hour, messages]) => ({ hour, messages, engagement: Math.min(100, Math.round(messages * 1.25)) }))
          .sort((a, b) => (a.hour > b.hour ? 1 : -1));

        const transformedBreakdown = Object.entries(countsByCategory).map(([name, value]) => ({ name, value }));

        if (isMounted) {
          setDaily(transformedDaily);
          setTimeseries(transformedTimeseries.length ? transformedTimeseries : sampleTimeseries);
          setBreakdown(transformedBreakdown);
          setInsights((prev) => [
            { ...prev[0], value: `${messages.length} Messages` },
            { ...prev[1], value: `${Math.min(55, Math.round((messages.length / 140) * 100))}% growth` },
            { ...prev[2], value: '6:00 PM' },
          ]);
        }
      } catch (err) {
        console.error('Analytics load', err);
        setError('Metrics unavailable. Showing mock analytics.');
        toast.error('Unable to load analytics data, falling back to mock values.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalMessages = useMemo(() => daily.reduce((sum, row) => sum + row.messages, 0), [daily]);

  return (
    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative p-6 bg-[#04122b] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 -top-10 h-80 w-80 rounded-full bg-cyan-400/15 dark:bg-cyan-400/25 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-2">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white">AI Admin Control Center</h2>
            <p className="text-sm text-slate-300">Realtime insights, predictions, and smart operations</p>
          </div>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-300">{loading ? 'Loading...' : `Calculated ${totalMessages} messages`}</span>
        </div>

        {error && <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">{error}</div>}

        <div className="grid gap-4 md:grid-cols-3">
          {insights.map((insight, idx) => (
            <motion.article
              key={insight.id}
              whileHover={{ y: -6, rotateX: 1.2, rotateY: 1.4, scale: 1.02 }}
              className="glass-card border-cyan-300/30 p-5 shadow-2xl"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p className="text-2xl">{insight.icon}</p>
              <p className="mt-3 text-sm uppercase tracking-wide text-cyan-200/80">{insight.title}</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{insight.value}</h3>
              <p className="mt-1 text-xs text-slate-300">{insight.trend}</p>
              <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${80 + idx * 8}%` }} />
            </motion.article>
          ))}
        </div>

        <section className="mt-6 grid gap-4 xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Messages Trend (Line Chart)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeseries}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5e7cff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#5e7cff" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#8ca5ff" fontSize={12} />
                  <YAxis stroke="#8ca5ff" fontSize={12} />
                  <CartesianGrid strokeDasharray="4 4" stroke="#ffffff2e" />
                  <Tooltip contentStyle={{ background: '#050e1f', border: '1px solid #3899ff', borderRadius: 12 }} cursor={{ stroke: '#5e7cff', strokeWidth: 1 }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="messages" stroke="#4cc3ff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={700} />
                  <Area type="monotone" dataKey="engagement" stroke="#6c7cff" fillOpacity={0.2} fill="url(#lineGrad)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Weekly Activity (Bar Chart)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff2e" />
                  <XAxis dataKey="day" stroke="#8ca5ff" />
                  <YAxis stroke="#8ca5ff" />
                  <Tooltip contentStyle={{ background: '#0f1b33', borderRadius: 12, border: '1px solid #8c8dff' }} />
                  <Legend />
                  <Bar dataKey="messages" radius={[12, 12, 0, 0]} fill="#7b94ff" animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Category Distribution (Pie Chart)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={82} fill="#5a93ff" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                    {breakdown.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#03142b', borderRadius: 12, border: '1px solid #84bdff' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Forecasted Growth (Area Chart)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeseries}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#61d7ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#61d7ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#8ca5ff" />
                  <YAxis stroke="#8ca5ff" />
                  <CartesianGrid strokeDasharray="4 4" stroke="#ffffff2f" />
                  <Tooltip contentStyle={{ background: '#061c37', border: '1px solid #4edcff', borderRadius: 12 }} />
                  <Area type="monotone" dataKey="messages" stroke="#5fe0ff" fill="url(#areaGrad)" strokeWidth={3} animationDuration={900} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
