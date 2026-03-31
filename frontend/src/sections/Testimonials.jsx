import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'Product Lead, Fintech Inc.',
    quote: 'An outstanding developer who really listened to our goals and delivered a polished product on time. The UI/UX improvements raised our user engagement by 33%.',
  },
  {
    name: 'Luca Martin',
    role: 'Founder, CreativeStudio',
    quote: 'Highly efficient and collaborative. The portfolio site redesign was clean, fast and accessible. Communication was excellent throughout the project.',
  },
  {
    name: 'Ashley Cooper',
    role: 'CTO, GreenTech',
    quote: 'Extremely detail-oriented and reliable. Built a responsive dashboard with modern animations and minimal overhead. I’d hire again for bigger features.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Testimonials</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-light">
            Real feedback from people who partnered with me on product design, engineering, and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="glass-card p-6 rounded-2xl shadow-lg border border-white/10 bg-white/70 dark:bg-gray-900/60"
            >
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-6">“{item.quote}”</p>
              <div>
                <h3 className="text-xl font-semibold text-gradient-accent">{item.name}</h3>
                <p className="text-sm uppercase tracking-wide text-gray-500">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
