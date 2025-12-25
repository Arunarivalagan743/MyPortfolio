
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope, FaChevronUp, FaEye } from 'react-icons/fa';
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
  const [visitorStats, setVisitorStats] = useState({ uniqueVisitors: 0, totalViews: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  // Track visitor on mount
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
        const response = await fetch(`${BACKEND_URL}/api/visitor/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setVisitorStats(data.data);
          }
        }
      } catch (error) {
        console.error('Failed to track visitor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisitor();
  }, []);
  
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
    <footer className="relative py-6">
  
      
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
        {/* Compact Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Arun.dev</span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/Arunarivalagan743" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaGithub className="text-lg" />
            </a>
            <a href="https://leetcode.com/u/Arun_774/" target="_blank" rel="noopener noreferrer" className="text-[#FFA116] hover:text-[#FFB84D] transition-colors">
              <SiLeetcode className="text-lg" />
            </a>
            <a href="https://www.linkedin.com/in/arunarivalagan/" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#0095dd] transition-colors">
              <FaLinkedinIn className="text-lg" />
            </a>
            <a href="https://twitter.com/arunarivalagan743" target="_blank" rel="noopener noreferrer" className="text-[#1da1f2] hover:text-[#4db5f5] transition-colors">
              <FaTwitter className="text-lg" />
            </a>
            <a href="mailto:arunarivalagan774@gmail.com" className="text-gray-600 hover:text-cyan-600 transition-colors">
              <FaEnvelope className="text-lg" />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-500 text-xs">
            © {currentYear} Arun A. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;