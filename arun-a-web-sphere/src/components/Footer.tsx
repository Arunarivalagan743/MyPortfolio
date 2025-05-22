import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope, FaChevronUp } from 'react-icons/fa';
import { SiLeetcode, SiHashnode, SiDevdotto } from 'react-icons/si';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative py-16 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-900/50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-primary/80 hover:bg-primary text-white rounded-full shadow-lg backdrop-blur-sm z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaChevronUp />
      </motion.button>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand section */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg">A</div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                Arun.dev
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">Building tomorrow's web experiences with modern technologies, creative design, and efficient code.</p>
            
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-400">Available for new projects</span>
            </div>
          </motion.div>
          
          {/* Quick links */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Connect */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
            <div className="space-y-3">
              <a 
                href="mailto:arunarivalagan774@gmail.com" 
                className="text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2"
              >
                <FaEnvelope /> arunarivalagan774@gmail.com
              </a>
              <p className="text-gray-400 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-primary/20 flex-shrink-0 relative">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                </span>
                Tirupur, India
              </p>
            </div>
          </motion.div>
          
          {/* Follow */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-lg">Follow Me</h4>
            <div className="grid grid-cols-3 gap-2">
              <a 
                href="https://github.com/Arunarivalagan743" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <FaGithub className="text-xl text-gray-300" />
                <span className="text-xs text-gray-400 mt-2">GitHub</span>
              </a>
              <a 
                href="https://leetcode.com/u/Arun_774/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <SiLeetcode className="text-xl text-[#f89f1b]" />
                <span className="text-xs text-gray-400 mt-2">LeetCode</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/arun-a-25b6a5289/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <FaLinkedinIn className="text-xl text-[#0077b5]" />
                <span className="text-xs text-gray-400 mt-2">LinkedIn</span>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <FaTwitter className="text-xl text-[#1da1f2]" />
                <span className="text-xs text-gray-400 mt-2">Twitter</span>
              </a>
              <a 
                href="https://dev.to/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <SiDevdotto className="text-xl text-white" />
                <span className="text-xs text-gray-400 mt-2">Dev.to</span>
              </a>
              <a 
                href="https://hashnode.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                <SiHashnode className="text-xl text-[#2962ff]" />
                <span className="text-xs text-gray-400 mt-2">Hashnode</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer bottom */}
        <div className="border-t border-zinc-900/70 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Arun A. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <p>Made with ❤️ in India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;