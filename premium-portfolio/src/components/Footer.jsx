import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-white/10 relative z-10 glass">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <a href="#" className="text-xl font-bold tracking-tighter text-gradient-accent mb-2 inline-block">
            Portfolio.
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            &copy; {new Date().getFullYear()} Alex Dev. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com" className="text-gray-500 hover:text-accent transition-colors" aria-label="GitHub">
            <FiGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" className="text-gray-500 hover:text-accent transition-colors" aria-label="LinkedIn">
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" className="text-gray-500 hover:text-accent transition-colors" aria-label="Twitter">
            <FiTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
