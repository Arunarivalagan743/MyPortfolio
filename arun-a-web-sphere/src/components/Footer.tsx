
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Update window width and handle scroll position
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    
    // Initial values
    handleResize();
    handleScroll();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function with consideration for overflow-x hidden
  const scrollToTop = () => {
    // First ensure we're working with the document element
    const scrollableElement = document.scrollingElement || document.documentElement;
    
    // Scroll the page to top smoothly without affecting horizontal position
    scrollableElement.scrollTo({
      top: 0,
      left: window.scrollX, // Maintain horizontal position
      behavior: 'smooth'
    });
  };

  // Determine button position based on screen size
  const isMobile = windowWidth < 768; // Match your md breakpoint
  const buttonRightPosition = isMobile ? '16px' : '24px';
  const buttonBottomPosition = isMobile ? '20px' : '24px';
  const buttonSize = isMobile ? '36px' : '44px';
  const iconSize = isMobile ? '14px' : '18px';

  return (
    <footer className="relative py-16 ">
  
      
      {/* Scroll to top button - aligned with hamburger position */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed p-0 bg-cyan-500/80 hover:bg-cyan-500 text-white rounded-full shadow-lg backdrop-blur-sm z-50 flex items-center justify-center ${showScrollTop ? 'visible' : 'invisible'}`}
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
        style={{
          bottom: buttonBottomPosition,
          right: buttonRightPosition,
          width: buttonSize,
          height: buttonSize,
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: 'transform', // Optimize animations
          marginRight: 'env(safe-area-inset-right, 0px)', // Handle safe areas on mobile
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <FaChevronUp size={iconSize} />
      </motion.button>
      
      <div className="container mx-auto px-4 overflow-hidden">
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">A</div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
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
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 block py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      // Ensure smooth scrolling maintains overflow-x hidden
                      const element = document.getElementById(item.toLowerCase());
                      if (element) {
                        const scrollableElement = document.scrollingElement || document.documentElement;
                        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                        
                        scrollableElement.scrollTo({
                          top: elementTop,
                          left: window.scrollX, // Keep horizontal position
                          behavior: 'smooth'
                        });
                      }
                    }}
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
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 overflow-hidden text-ellipsis"
              >
                <FaEnvelope className="flex-shrink-0" /> 
                <span className="truncate">arunarivalagan774@gmail.com</span>
              </a>
              <p className="text-gray-400 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-cyan-500/20 flex-shrink-0 relative">
                  <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75"></span>
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
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <FaGithub className="text-xl text-gray-300 group-hover:text-white transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">GitHub</span>
              </a>
              <a 
                href="https://leetcode.com/u/Arun_774/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <SiLeetcode className="text-xl text-[#f89f1b] group-hover:text-[#ffb84d] transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">LeetCode</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/arun-a-25b6a5289/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <FaLinkedinIn className="text-xl text-[#0077b5] group-hover:text-[#0095dd] transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">LinkedIn</span>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <FaTwitter className="text-xl text-[#1da1f2] group-hover:text-[#4db5f5] transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">Twitter</span>
              </a>
              <a 
                href="https://dev.to/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <SiDevdotto className="text-xl text-white group-hover:text-gray-200 transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">Dev.to</span>
              </a>
              <a 
                href="https://hashnode.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
              >
                <SiHashnode className="text-xl text-[#2962ff] group-hover:text-[#5985ff] transition-colors duration-200" />
                <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-200">Hashnode</span>
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
            <div className="mt-4 md:mt-0 flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <p className="flex items-center">Made with <span className="text-red-500 mx-1">❤️</span> in India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;