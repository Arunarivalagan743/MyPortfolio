



import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaChevronDown } from 'react-icons/fa';
import { SiLeetcode, SiLinkedin } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';

const myImage = "/assets/me.jpg"; 

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    
    // Set loaded after a small delay to ensure smooth animations
    const timer = setTimeout(() => setIsLoaded(true), 300);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Navigation items
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  // Social links data
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/Arunarivalagan743", color: "white" },
    { icon: <SiLinkedin />, href: "https://www.linkedin.com/in/arun-a-25b6a5289", color: "#0077B5" },
    { icon: <SiLeetcode />, href: "https://codolio.com/profile/arun_743", color: "#FFA116" }
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between pt-0 relative overflow-hidden">
      <h1 className="sr-only">Arun A - Portfolio</h1>
      
      {/* Navigation Header */}
      <header className="w-full fixed top-0 left-0 z-50">
        <nav className="w-full px-4 md:px-8 py-4 backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo/Name */}
          <motion.a 
  href="#home"
  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center gap-1"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <span className="font-light">MR</span>
  <span className="text-cyan-400">-</span>
  <span>AR</span>
</motion.a>

            {/* Desktop Navigation Links */}
        

       
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
       
      </header>

      {/* Modern gradient background - Simplified for better performance */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4D00B4]/20 rounded-full filter blur-[120px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00BFFF]/15 rounded-full filter blur-[120px] opacity-10"></div>
        
        {/* Grid pattern overlay - reduced opacity on mobile */}
        <div className={`absolute inset-0 bg-grid-pattern ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.03]'} bg-[length:50px_50px]`}></div>
      </div>

      {/* Vertical Social Icons - Desktop only */}
      <motion.div 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-black/30 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors relative backdrop-blur-sm"
            whileHover={{ 
              scale: 1.15,
              boxShadow: `0 0 15px rgba(0, 191, 255, 0.2)`,
              borderColor: "rgba(0, 191, 255, 0.3)"
            }}
            style={{ color: social.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3 + index * 0.1 }
            }}
          >
            <span className="text-lg">{social.icon}</span>
            
            {/* Subtle glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{ boxShadow: `0 0 10px ${social.color}40` }}
            />
          </motion.a>
        ))}
        {/* Decorative connecting line */}
        <div className="w-px h-16 bg-gradient-to-b from-cyan-400/30 to-transparent mx-auto"></div>
      </motion.div>

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-8 z-10 flex items-center justify-center flex-1 mt-16">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 w-full max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Left side - Profile image with modern container */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Circular border animation - only on desktop */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            )}

            <div className={`relative ${isMobile ? 'bg-transparent' : 'bg-gradient-to-b from-transparent to-[#070024]'} w-60 h-60 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl`}>
              <img
                src={myImage}
                alt="Profile"
                className="w-full h-full object-cover object-top" // Added object-top to focus on face
                loading="eager"
                decoding="async"
              />
              
              {/* Overlay shine effect - only on desktop */}
              {!isMobile && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 5 
                  }}
                ></motion.div>
              )}
            </div>
            
            {/* Mobile social links - fixed position and improved styling */}
            <div className="flex md:hidden justify-center gap-4 mt-6 w-full">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/30 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ color: social.color }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ borderColor: "rgba(0, 191, 255, 0.3)" }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-start max-w-xl space-y-6"
          >
            {/* Greeting chip */}
            <motion.div 
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-cyan-400 flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Available for new opportunities</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Arun A
              </span>
            </h1>

            {/* Typewriter with better styling */}
            <div className="h-10 md:h-16">
              <TypeAnimation
                sequence={[
                  "MERN Stack Developer", 2000,
                  "CSE Student", 2000,
                  "Full Stack Enthusiast", 2000,
                ]}
                wrapper="h2"
                cursor={true}
                repeat={Infinity}
                className="text-xl md:text-3xl font-medium text-cyan-400"
              />
            </div>

            {/* Description with better typography */}
            <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
              Computer Science student passionate about efficient development.
            </p>

            {/* Button with modern styling */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 191, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full relative overflow-hidden group z-0 mt-4"
              onClick={handleScrollToContact}
            >
              {/* Button gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 z-10"></span>
              
              {/* Button hover shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20"></span>
              
              {/* Button text */}
              <span className="relative z-30 font-medium">Let's Talk</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Improved scroll indicator positioned on the right side */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 right-4 md:right-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ 
          y: [0, 8, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-light text-cyan-400/80 mb-1">
            Scroll
          </span>
          <div className="w-9 h-9 rounded-full border border-cyan-400/40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <FaChevronDown className="text-cyan-400 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* CSS for grid pattern and custom spacing */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #ffffff08 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff08 1px, transparent 1px);
        }
        
        /* Better tap target sizes for mobile */
        @media (max-width: 767px) {
          a {
            touch-action: manipulation;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;