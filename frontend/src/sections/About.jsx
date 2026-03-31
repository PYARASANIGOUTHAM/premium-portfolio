import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent to-purple-400 rotate-6 opacity-30 dark:opacity-50 blur-xl"></div>
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass-card">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover mix-blend-overlay dark:mix-blend-normal opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              About <span className="text-gradient">Me.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              <p>
                I am a passionate software engineer with a deep appreciation for the intersection of design and technology. My journey began with a curiosity for how visually stunning applications were crafted, leading me to specialize in frontend development.
              </p>
              <p>
                Over the years, I've honed my skills in React, modern CSS architectures, and animation libraries. My philosophy is simple: technology should be invisible. It should just work, and look beautiful doing so.
              </p>
              <p>
                When I'm not pushing pixels or optimizing bundle sizes, you'll find me exploring new coffee shops, contributing to open-source UI libraries, or capturing the world through photography.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { label: 'Experience', value: '5+ Years' },
                { label: 'Projects', value: '40+ Built' },
                { label: 'Clients', value: '25+ Happy' },
                { label: 'Awards', value: '3 Design' }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-4 text-center transform transition duration-300 hover:-translate-y-1">
                  <h3 className="text-3xl font-bold text-gradient-accent mb-1">{stat.value}</h3>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
