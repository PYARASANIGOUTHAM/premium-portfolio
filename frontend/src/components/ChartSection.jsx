import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'];

export default function ChartSection({ metrics }) {
  return (
    <section className="glass-card p-6 border border-white/10 shadow-2xl">
      <h3 className="mb-4 text-xl font-semibold text-white">Advanced Analytics</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-72 p-3 bg-slate-900/40 rounded-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff26" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="messages" stroke="#38bdf8" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-72 p-3 bg-slate-900/40 rounded-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff26" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-72 p-3 bg-slate-900/40 rounded-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={metrics.category}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={2}
                label
              >
                {metrics.category.map((entry, idx) => (
                  <Cell key={`cell-${entry.name}`} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-72 p-3 bg-slate-900/40 rounded-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.timeSeries}>
              <defs>
                <linearGradient id="areas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff26" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="predicted" stroke="#22d3ee" fill="url(#areas)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
