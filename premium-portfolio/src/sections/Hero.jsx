import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [speed, setSpeed] = useState(120);

  const phrases = useMemo(
    () => ['Frontend Developer', 'UI/UX Designer', 'React Architect', 'Motion Expert'],
    []
  );

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting && typedText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedText.length > 0) {
      const timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
      }, speed / 2);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && typedText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedText === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setSpeed(100);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isDeleting, phraseIndex, phrases, speed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative px-4">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full glass text-sm font-medium tracking-wide shadow-sm">
              👋 Welcome to my portfolio
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 relative">
            Hi, I'm <span className="text-gradient">Alex Dev</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl md:text-4xl font-semibold text-accent mb-4">
            {typedText || 'Building digital experiences...'}
            <span className="text-accent blink">|</span>
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl font-light">
            I craft stunning, world-class digital experiences with React.js, Tailwind CSS, and Framer Motion. Building products that look and feel Apple-level premium.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#projects" className="px-8 py-4 bg-apple-gray-900 dark:bg-apple-gray-50 text-white dark:text-black rounded-full font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/10 dark:shadow-white/10">
              View My Work <FiArrowRight />
            </a>
            <a href="#contact" className="px-8 py-4 glass rounded-full font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer shadow-md">
              Contact Me
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-16 flex items-center gap-6">
            {[ 
              { icon: <FiGithub size={24} />, href: "https://github.com", label: "GitHub" },
              { icon: <FiLinkedin size={24} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <FiMail size={24} />, href: "mailto:hello@example.com", label: "Email" }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer"
                aria-label={social.label}
                className="p-3 glass rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hover:scale-110 duration-300 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-apple-gray-100/50 dark:to-apple-gray-800/50 z-0 pointer-events-none" />
    </section>
  );
}
