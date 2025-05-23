import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaGraduationCap, FaLaptopCode, FaTools, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const isNavigatingRef = useRef(false); // Track if navigation is in progress

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only update active section if we're not in the middle of a navigation
      if (!isNavigatingRef.current) {
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

        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items with all cyan icons for consistency
  const menuItems = [
    { name: 'Home', href: '#home', icon: <FaHome className="text-cyan-400" /> },
    { name: 'About', href: '#about', icon: <FaUser className="text-cyan-400" /> },
    { name: 'Academic', href: '#academic', icon: <FaGraduationCap className="text-cyan-400" /> },
    { name: 'Projects', href: '#projects', icon: <FaLaptopCode className="text-cyan-400" /> },
    { name: 'Skills', href: '#skills', icon: <FaTools className="text-cyan-400" /> },
    { name: 'Contact', href: '#contact', icon: <FaEnvelope className="text-cyan-400" /> }
  ];

  // Improved navigation handler with debounce
  const handleNavClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    // Don't process if already navigating
    if (isNavigatingRef.current) return;
    
    // Set navigating flag
    isNavigatingRef.current = true;
    
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    
    // Update active section immediately for UI feedback
    setActiveSection(targetId);
    
    const element = document.getElementById(targetId);
    if (element) {
      // Smooth scroll to the element
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reset navigating flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800); // A little longer than the scroll animation
    } else {
      isNavigatingRef.current = false;
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

  return (
    <motion.nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isScrolled 
          ? 'py-2' 
          : 'py-5 md:py-6'
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Enhanced glass effect overlay with animated gradient */}
      <div className={cn(
        "absolute inset-0 backdrop-blur-xl border-b transition-all duration-500",
        isScrolled 
          ? "border-white/10 shadow-lg shadow-black/10 bg-gradient-to-r from-black/60 via-black/70 to-black/60" 
          : "border-transparent bg-gradient-to-r from-black/20 via-black/30 to-black/20"
      )}>
        {/* Animated subtle gradient accent */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -inset-[100%] opacity-10"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.3), transparent 70%)'
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Animated logo that changes size on scroll */}
          <motion.a 
            href="#home" 
            className="font-bold text-white flex items-center"
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: isScrolled ? 0.95 : 1.05 }}
            whileTap={{ scale: isScrolled ? 0.85 : 0.95 }}
            onClick={(e) => handleNavClick(e, '#home')}
          >
            {/* Logo with gradient background */}
            <div className={cn(
              "bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300",
              isScrolled ? "w-7 h-7" : "w-9 h-9"
            )}>
              <span className="text-white font-bold text-xs">A</span>
            </div>
            
            {/* Logo text with size transition */}
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-bold ml-3 transition-all duration-300",
              isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
            )}>
              Arun.dev
            </span>
          </motion.a>

          {/* Desktop Menu - Enhanced pill style with improved hover effects and icons */}
          <div className="hidden md:block">
            <div className={cn(
              "flex rounded-full p-1 transition-all duration-300",
              isScrolled 
                ? "bg-white/5 backdrop-blur-md shadow-xl" 
                : "bg-white/10 backdrop-blur-sm shadow-2xl"
            )}>
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                const isHovered = hoveredItem === index;
                
                return (
                  <motion.a 
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
                      isScrolled ? "mx-0.5" : "mx-1",
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    )}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    {/* Text with icon that appears on hover */}
                    <motion.span 
                      className="relative z-10 flex items-center gap-1.5"
                      animate={{ x: isHovered ? 2 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Show icon always for active item, otherwise on hover */}
                      {(isActive || isHovered) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5, x: -5 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.5, x: -5 }}
                          className="text-xs"
                        >
                          {item.icon}
                        </motion.span>
                      )}
                      {item.name}
                    </motion.span>
                    
                    {/* Enhanced gradient background for active/hovered items */}
                    {isActive && (
                      <motion.div
                        className={cn(
                          "absolute inset-0 rounded-full shadow-lg",
                          isScrolled 
                            ? "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 shadow-cyan-500/20" 
                            : "bg-gradient-to-r from-cyan-400/90 to-blue-500/90 shadow-cyan-400/30"
                        )}
                        layoutId="navBackground"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    
                    {/* Subtle highlight effect on hover (when not active) */}
                    {isHovered && !isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button - Enhanced animated hamburger */}
          <motion.button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            {/* Background that changes based on scroll position */}
            <div className={cn(
              "absolute inset-0 rounded-full border transition-all duration-300 -z-10",
              isScrolled 
                ? "bg-white/5 backdrop-blur-sm border-white/10" 
                : "bg-white/10 backdrop-blur-sm border-white/15"
            )}></div>
            
            {/* Animated hamburger lines */}
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <motion.span 
                className="w-full h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500"
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0, 
                  y: isMobileMenuOpen ? 8 : 0,
                  width: isScrolled ? '100%' : '85%'
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                animate={{ 
                  opacity: isMobileMenuOpen ? 0 : 1, 
                  x: isMobileMenuOpen ? 20 : 0,
                  width: isScrolled ? '100%' : '65%' 
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500"
                animate={{ 
                  rotate: isMobileMenuOpen ? -45 : 0, 
                  y: isMobileMenuOpen ? -8 : 0,
                  width: isScrolled ? '100%' : '85%' 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu with better animations and icons */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 md:hidden z-40 pt-20"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          >
            <div className="container mx-auto px-4 py-8">
              <motion.div 
                className="flex flex-col space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
              >
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button 
                      key={item.name}
                      className={cn(
                        "flex items-center p-4 rounded-xl text-left transition-all relative overflow-hidden w-full",
                        isActive 
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-l-2 border-cyan-400" 
                          : "hover:bg-white/5 border-l-2 border-transparent"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(e, item.href);
                      }}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -20 }
                      }}
                      whileHover={{ x: 5 }}
                    >
                      {/* Icon with consistent cyan color */}
                      <span className="mr-3 text-lg">
                        {item.icon}
                      </span>
                      
                      {/* Text with dynamic color */}
                      <span className={cn(
                        "font-medium",
                        isActive ? "text-cyan-400" : "text-white"
                      )}>
                        {item.name}
                      </span>
                      
                      {/* Improved active indicator */}
                      {isActive && (
                        <motion.div 
                          className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              '0 0 0px rgba(34, 211, 238, 0.5)',
                              '0 0 8px rgba(34, 211, 238, 0.8)',
                              '0 0 0px rgba(34, 211, 238, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
              
              {/* Contact CTA in mobile menu with enhanced styling */}
              <motion.div 
                className="mt-8 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-white/70">Ready to collaborate?</p>
                <motion.button
                  className="mt-2 inline-block px-5 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full text-sm font-medium text-white shadow-md shadow-cyan-500/20"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;