import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'academic', 'projects', 'skills', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);  // Update active section directly here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // Removed activeSection as a dependency to avoid unnecessary re-renders

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Academic', href: '#academic' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();  // Prevent the default anchor tag behavior

    // Close mobile menu after a click
    setIsMobileMenuOpen(false);

    const targetId = href.substring(1);  // Get the section ID from href
    const element = document.getElementById(targetId);  // Find the target element

    if (element) {
      // Update active section immediately to prevent the jump
      setActiveSection(targetId);

      element.scrollIntoView({ behavior: 'smooth' });  // Ensure smooth scrolling
    }
  };

  const navVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      y: -50
    }
  };

  const menuItemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 }
  };

  return (
    <motion.nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3',
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-bold text-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Arun<span className="text-white">.dev</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <motion.a 
              key={item.name}
              href={item.href}
              className={cn(
                "text-white hover:text-primary transition-colors relative",
                activeSection === item.href.substring(1) && "text-primary"
              )}
              onClick={(e) => handleNavClick(e, item.href)}
              variants={menuItemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-0.5 bg-primary"
                  initial={{ width: 0, x: -8 }}
                  animate={{ width: '70%', x: '-35%' }}
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-zinc-900/95 shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <motion.a 
                key={item.name}
                href={item.href}
                className={cn(
                  "text-white hover:text-primary py-2 transition-colors",
                  activeSection === item.href.substring(1) && "text-primary"
                )}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
