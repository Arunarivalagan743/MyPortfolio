




import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaLaptopCode, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hideNavbar, setHideNavbar] = useState(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when near footer
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Hide when footer is visible (within 100px of viewport bottom)
        setHideNavbar(footerRect.top < windowHeight - 50);
      }

      // Only update active section if we're not in the middle of a navigation
      if (!isNavigatingRef.current) {
        // Map secondary sections to their primary nav items
        const sectionToNavMap = {
          'home': 'home',
          'about': 'about',
          'projects': 'projects',
          'contact': 'contact',
          'academic': 'about',
          'skills': 'projects',
          'publications': 'projects',
          'certificates': 'projects',
          'experience': 'projects'
        };
        
        const allSections = [
          'home', 'about', 'academic', 'projects', 'skills', 
          'publications', 'certificates', 'experience', 'contact'
        ];
        
        let currentSection = null;
        let closestSection = null;
        let closestDistance = Infinity;

        for (const section of allSections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 0) {
              currentSection = section;
              break;
            }
            
            const distanceToCenter = Math.abs(rect.top);
            if (distanceToCenter < closestDistance) {
              closestDistance = distanceToCenter;
              closestSection = section;
            }
          }
        }

        if (!currentSection && closestSection) {
          currentSection = closestSection;
        }
        
        if (!currentSection) {
          currentSection = 'home';
        }

        const mappedSection = sectionToNavMap[currentSection] || currentSection;
        
        if (mappedSection !== activeSection) {
          setActiveSection(mappedSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Main navigation items
  const menuItems = [
    { name: 'Home', href: '#home', icon: <FaHome /> },
    { name: 'About', href: '#about', icon: <FaUser /> },
    { name: 'Projects', href: '#projects', icon: <FaLaptopCode /> },
    { name: 'Contact', href: '#contact', icon: <FaEnvelope /> }
  ];

  // Navigation handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    setActiveSection(targetId);
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    } else {
      isNavigatingRef.current = false;
    }
  };

  return (
    <>
      {/* Name header at top */}
      <div className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <div className="flex justify-center p-4">
         
        </div>
      </div>
    
      {/* Bottom centered navigation bar - Fixed with transform for perfect centering */}
      <div className={`fixed bottom-0 left-0 right-0 flex justify-center items-center w-full px-4 pb-6 pt-0 z-50 pointer-events-none transition-all duration-300 ${hideNavbar ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'}`}>
        <motion.nav 
          className="pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: hideNavbar ? 0 : 1, y: hideNavbar ? 50 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={cn(
            "flex items-center justify-center px-3 py-2 rounded-full transition-all duration-300",
            "bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg shadow-gray-200/50",
            isScrolled ? "shadow-cyan-500/10" : ""
          )}>
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-all duration-300",
                    "w-10 h-10 sm:w-12 sm:h-12 mx-1.5 sm:mx-2"
                  )}
                  onClick={(e) => handleNavClick(e, item.href)}
                  whileTap={{ scale: 0.85 }}
                  title={item.name}
                >
                  {/* Background for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20"
                      layoutId="navActiveBackground"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  {/* Icon with color based on active state */}
                  <motion.div 
                    className={cn(
                      "text-lg sm:text-xl",
                      isActive ? "text-cyan-500" : "text-gray-500"
                    )}
                    animate={{ 
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  {/* Active indicator ring */}
                  {isActive && (
                    <motion.div 
                      className="absolute -inset-1 rounded-full border-2 border-cyan-400/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: ["0 0 0px rgba(34, 211, 238, 0)", "0 0 8px rgba(34, 211, 238, 0.3)", "0 0 0px rgba(34, 211, 238, 0)"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Mobile expanded menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              className="relative bg-black/80 rounded-2xl border border-white/10 p-6 max-w-[80%] backdrop-blur-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.name}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg",
                        isActive ? "bg-cyan-500/10 text-cyan-400" : "text-white/70",
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(e, item.href);
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-xs">{item.name}</div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 text-white/80" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;