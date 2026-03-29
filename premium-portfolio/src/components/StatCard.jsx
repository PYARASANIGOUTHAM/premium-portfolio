import { motion } from 'framer-motion';

export default function StatCard({ icon, label, value, colorClass }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-frost border border-white/15 p-5 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl">{icon}</div>
        <div className={`h-2 w-10 rounded-full ${colorClass}`} />
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-slate-300">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
