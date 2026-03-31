import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Redux'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'] },
  { category: 'Tools & Design', items: ['Git', 'Figma', 'Webpack', 'Vite', 'Jest'] }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Technical <span className="text-gradient">Arsenal.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light"
          >
            The tools I use to bring ideas to life. Always learning, constantly evolving.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/20 dark:border-white/5"
            >
              <h3 className="text-xl font-bold text-gradient-accent mb-6">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-lg text-sm font-medium shadow-sm bg-white/50 dark:bg-white/5"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
