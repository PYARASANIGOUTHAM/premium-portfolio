import { motion } from 'framer-motion';

const statItems = [
  { label: 'Projects Delivered', value: 14, icon: '🚀' },
  { label: 'Years Experience', value: 7, icon: '💼' },
  { label: 'Clients', value: 26, icon: '🤝' },
  { label: 'Lines of Code', value: '1.1M', icon: '💻' }
];

export default function Stats() {
  return (
    <section id="stats" className="py-20 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h3 className="text-3xl font-bold text-white">Trust & Impact</h3>
          <p className="mt-2 text-gray-300">Forward-thinking metrics that show momentum and capability.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx }}
              className="glass-card p-6 text-center border border-white/20"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div className="mt-2 text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
