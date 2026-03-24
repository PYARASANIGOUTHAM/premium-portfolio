import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin dashboard for e-commerce platforms with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Tailwind', 'Chart.js', 'Redux'],
    github: '#',
    live: '#'
  },
  {
    title: 'FinTech Mobile App',
    description: 'A beautiful financial tracking application with smooth transitions and data visualization.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    tech: ['React Native', 'TypeScript', 'Framer Motion'],
    github: '#',
    live: '#'
  },
  {
    title: 'AI Prompt Studio',
    description: 'A sleek interface for generating, saving, and organizing AI prompts.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    tech: ['Next.js', 'Tailwind', 'OpenAI API'],
    github: '#',
    live: '#'
  },
  {
    title: 'Minimalist Task Master',
    description: 'A highly optimized, distraction-free productivity app.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Zustand', 'Radix UI'],
    github: '#',
    live: '#'
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const availableTags = useMemo(() => {
    const allTech = projects.flatMap((project) => project.tech);
    const uniqueTech = Array.from(new Set(allTech));
    return ['All', ...uniqueTech];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Featured <span className="text-gradient">Projects.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 max-w-2xl font-light"
            >
              A selection of my recent work. Crafted with precision and an eye for detail.
            </motion.p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 text-sm rounded-full transition ${activeFilter === tag ? 'bg-accent text-white' : 'bg-white/40 dark:bg-black/35 text-gray-700 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-black/60'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden group border border-white/10 dark:border-white/5"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8 pb-10">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 font-light line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mt-auto">
                  <a href={project.live} className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors text-gray-500">
                    <FiGithub /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
