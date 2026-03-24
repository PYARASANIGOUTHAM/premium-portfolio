import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send an email or save to a database
    alert("Thanks for your message! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-24 relative z-10 px-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Let's <span className="text-gradient">Connect.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light"
          >
            Looking to start a project or just want to say hi? My inbox is always open.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white/40 dark:bg-black/20 p-8 rounded-3xl border border-white/20 dark:border-white/5 shadow-xl backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="p-3 bg-black/5 dark:bg-white/10 rounded-full text-accent shadow-sm">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="p-3 bg-black/5 dark:bg-white/10 rounded-full text-accent shadow-sm">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="p-3 bg-black/5 dark:bg-white/10 rounded-full text-accent shadow-sm">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-light"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-light"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-light"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  required 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none font-light"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-apple-gray-900 dark:bg-apple-gray-50 text-white dark:text-black rounded-full font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg w-full md:w-auto mt-4 border border-transparent"
              >
                Send Message <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
