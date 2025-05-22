// // import React, { useState, useEffect } from 'react';
// // import { cn } from '@/lib/utils';
// // import { motion } from 'framer-motion';

// // const Navbar = () => {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [activeSection, setActiveSection] = useState('home');

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (window.scrollY > 20) {
// //         setIsScrolled(true);
// //       } else {
// //         setIsScrolled(false);
// //       }

// //       // Track active section
// //       const sections = ['home', 'about', 'academic', 'projects', 'skills', 'contact'];
// //       let currentSection = 'home';

// //       for (const section of sections) {
// //         const el = document.getElementById(section);
// //         if (el) {
// //           const rect = el.getBoundingClientRect();
// //           if (rect.top <= 100 && rect.bottom >= 100) {
// //             currentSection = section;
// //             break;
// //           }
// //         }
// //       }

// //       setActiveSection(currentSection);
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const menuItems = [
// //     { name: 'Home', href: '#home' },
// //     { name: 'About', href: '#about' },
// //     { name: 'Academic', href: '#academic' },
// //     { name: 'Projects', href: '#projects' },
// //     { name: 'Skills', href: '#skills' },
// //     { name: 'Contact', href: '#contact' }
// //   ];

// //   const handleNavClick = (e, href) => {
// //     e.preventDefault();
// //     setIsMobileMenuOpen(false);

// //     const targetId = href.substring(1);
// //     const element = document.getElementById(targetId);

// //     if (element) {
// //       setActiveSection(targetId);
// //       element.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   const navVariants = {
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.5,
// //         staggerChildren: 0.1
// //       }
// //     },
// //     hidden: {
// //       opacity: 0,
// //       y: -50
// //     }
// //   };

// //   const menuItemVariants = {
// //     visible: { opacity: 1, x: 0 },
// //     hidden: { opacity: 0, x: -20 }
// //   };

// //   return (
// //     <motion.nav 
// //       className={cn(
// //         'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 border-b border-white/20',
// //         isScrolled 
// //           ? 'bg-white/10 backdrop-blur-lg shadow-md' 
// //           : 'bg-transparent'
// //       )}
// //       initial="hidden"
// //       animate="visible"
// //       variants={navVariants}
// //     >
// //       <div className="container mx-auto px-4 flex justify-between items-center">
// //         <motion.a 
// //           href="#" 
// //           className="text-2xl font-bold text-primary"
// //           whileHover={{ scale: 1.05 }}
// //           whileTap={{ scale: 0.95 }}
// //         >
// //           Arun<span className="text-white">.dev</span>
// //         </motion.a>

// //         {/* Desktop Menu */}
// //         <div className="hidden md:flex items-center space-x-8">
// //           {menuItems.map((item) => (
// //             <motion.a 
// //               key={item.name}
// //               href={item.href}
// //               className={cn(
// //                 "text-white hover:text-primary transition-colors relative",
// //                 activeSection === item.href.substring(1) && "text-primary"
// //               )}
// //               onClick={(e) => handleNavClick(e, item.href)}
// //               variants={menuItemVariants}
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               {item.name}
// //               {activeSection === item.href.substring(1) && (
// //                 <motion.div
// //                   className="absolute -bottom-1 left-1/2 h-0.5 bg-primary"
// //                   initial={{ width: 0, x: -8 }}
// //                   animate={{ width: '70%', x: '-35%' }}
// //                   layoutId="navIndicator"
// //                   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// //                 />
// //               )}
// //             </motion.a>
// //           ))}
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <motion.button 
// //           className="md:hidden text-white"
// //           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //           whileHover={{ scale: 1.1 }}
// //           whileTap={{ scale: 0.9 }}
// //           aria-label="Toggle mobile menu"
// //         >
// //           <svg 
// //             xmlns="http://www.w3.org/2000/svg" 
// //             fill="none" 
// //             viewBox="0 0 24 24" 
// //             stroke="currentColor" 
// //             className="w-6 h-6"
// //           >
// //             {isMobileMenuOpen ? (
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             ) : (
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
// //             )}
// //           </svg>
// //         </motion.button>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isMobileMenuOpen && (
// //         <motion.div 
// //           className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-md"
// //           initial={{ opacity: 0, height: 0 }}
// //           animate={{ opacity: 1, height: 'auto' }}
// //           exit={{ opacity: 0, height: 0 }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
// //             {menuItems.map((item) => (
// //               <motion.a 
// //                 key={item.name}
// //                 href={item.href}
// //                 className={cn(
// //                   "text-white hover:text-primary py-2 transition-colors",
// //                   activeSection === item.href.substring(1) && "text-primary"
// //                 )}
// //                 onClick={(e) => handleNavClick(e, item.href)}
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 transition={{ duration: 0.3 }}
// //                 whileHover={{ x: 5 }}
// //               >
// //                 {item.name}
// //               </motion.a>
// //             ))}
// //           </div>
// //         </motion.div>
// //       )}
// //     </motion.nav>
// //   );
// // };

// // export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { cn } from '@/lib/utils';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [hoverIndex, setHoverIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }

//       // Track active section
//       const sections = ['home', 'about', 'academic', 'projects', 'skills', 'contact'];
//       let currentSection = 'home';

//       for (const section of sections) {
//         const el = document.getElementById(section);
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             currentSection = section;
//             break;
//           }
//         }
//       }

//       setActiveSection(currentSection);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const menuItems = [
//     { name: 'Home', href: '#home', icon: '🏠' },
//     { name: 'About', href: '#about', icon: '👤' },
//     { name: 'Academic', href: '#academic', icon: '🎓' },
//     { name: 'Projects', href: '#projects', icon: '💻' },
//     { name: 'Skills', href: '#skills', icon: '⚒️' },
//     { name: 'Contact', href: '#contact', icon: '✉️' }
//   ];

//   const handleNavClick = (e, href) => {
//     e.preventDefault();
//     setIsMobileMenuOpen(false);

//     const targetId = href.substring(1);
//     const element = document.getElementById(targetId);

//     if (element) {
//       setActiveSection(targetId);
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const navVariants = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1
//       }
//     },
//     hidden: {
//       opacity: 0,
//       y: -50
//     }
//   };

//   // Get current time for the logo clock effect
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, '0');
//   const minutes = now.getMinutes().toString().padStart(2, '0');

//   return (
//     <motion.nav 
//       className={cn(
//         'fixed top-0 left-0 w-full z-50 transition-all duration-500',
//         isScrolled 
//           ? 'py-2 backdrop-blur-xl' 
//           : 'py-5 bg-transparent'
//       )}
//       initial="hidden"
//       animate="visible"
//       variants={navVariants}
//     >
//       {/* Glass effect overlay */}
//       {isScrolled && (
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5"></div>
//       )}

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="flex justify-between items-center">
//           {/* Logo Area with animated bracket effect */}
//           <motion.a 
//             href="#home" 
//             className="relative font-bold text-white group flex items-center"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => handleNavClick(e, '#home')}
//           >
//             {/* Bracket animation */}
//             <motion.span 
//               className="text-cyan-400 absolute -left-5 text-2xl font-mono"
//               animate={{ 
//                 opacity: [1, 0.5, 1],
//                 x: [0, -2, 0]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//             >
//               {"{"}
//             </motion.span>
            
//             {/* Main logo */}
//             <div className="flex items-center ml-2">
//               {/* Stylized avatar or icon */}
//               <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/20">
//                 <span className="text-white font-bold text-xs">A</span>
//               </div>
              
//               {/* Logo text with animated digital clock effect */}
//               <div>
//                 <span className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
//                   Arun
//                 </span>
//                 <span className="hidden sm:inline-block text-xs tracking-widest ml-1 font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//                   {hours}:{minutes}
//                 </span>
//               </div>
//             </div>
            
//             {/* End bracket animation */}
//             <motion.span 
//               className="text-cyan-400 absolute -right-5 text-2xl font-mono"
//               animate={{ 
//                 opacity: [1, 0.5, 1],
//                 x: [0, 2, 0]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 0.5
//               }}
//             >
//               {"}"}
//             </motion.span>
//           </motion.a>

//           {/* Desktop Menu - Pill style with hover effect */}
//           <div className="hidden md:block">
//             <div className={cn(
//               "flex rounded-full p-1 transition-all duration-300",
//               isScrolled ? "bg-white/5 backdrop-blur-md shadow-xl" : "bg-black/20 backdrop-blur-sm"
//             )}>
//               {menuItems.map((item, index) => {
//                 const isActive = activeSection === item.href.substring(1);
//                 return (
//                   <motion.a 
//                     key={item.name}
//                     href={item.href}
//                     className={cn(
//                       "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
//                       isActive ? "text-white" : "text-white/70 hover:text-white"
//                     )}
//                     onClick={(e) => handleNavClick(e, item.href)}
//                     onHoverStart={() => setHoverIndex(index)}
//                     onHoverEnd={() => setHoverIndex(null)}
//                   >
//                     {/* Text with optional icon on hover */}
//                     <span className="relative z-10 flex items-center gap-1.5">
//                       {/* Show icon only on hover */}
//                       {hoverIndex === index && (
//                         <motion.span 
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="text-xs"
//                         >
//                           {item.icon}
//                         </motion.span>
//                       )}
//                       {item.name}
//                     </span>
                    
//                     {/* Gradient background for active item */}
//                     {isActive && (
//                       <motion.div
//                         className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-600/80 shadow-lg shadow-cyan-500/20"
//                         layoutId="navBackground"
//                         transition={{ type: 'spring', stiffness: 350, damping: 30 }}
//                       />
//                     )}
//                   </motion.a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Mobile Menu Button - Animated Hamburger */}
//           <motion.button 
//             className="md:hidden relative w-10 h-10 flex items-center justify-center"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             aria-label="Toggle mobile menu"
//           >
//             <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 -z-10"></div>
//             <div className="w-6 h-5 flex flex-col justify-between items-center">
//               <motion.span 
//                 className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
//                 animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.span 
//                 className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
//                 animate={{ opacity: isMobileMenuOpen ? 0 : 1, x: isMobileMenuOpen ? 20 : 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.span 
//                 className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
//                 animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </div>
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu - Fancy Drawer Style */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             className="fixed inset-0 md:hidden bg-black/90 backdrop-blur-xl z-40 pt-20"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="container mx-auto px-4 py-8">
//               <motion.div 
//                 className="flex flex-col space-y-2"
//                 initial="hidden"
//                 animate="visible"
//                 variants={{
//                   visible: { transition: { staggerChildren: 0.1 } },
//                   hidden: {}
//                 }}
//               >
//                 {menuItems.map((item, index) => {
//                   const isActive = activeSection === item.href.substring(1);
//                   return (
//                     <motion.a 
//                       key={item.name}
//                       href={item.href}
//                       className={cn(
//                         "flex items-center p-4 rounded-xl transition-all relative overflow-hidden",
//                         isActive ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-l-2 border-cyan-400" 
//                                 : "hover:bg-white/5 border-l-2 border-transparent"
//                       )}
//                       onClick={(e) => handleNavClick(e, item.href)}
//                       variants={{
//                         visible: { opacity: 1, x: 0 },
//                         hidden: { opacity: 0, x: -20 }
//                       }}
//                     >
//                       <span className="mr-3 text-lg opacity-70">{item.icon}</span>
//                       <span className={cn(
//                         "font-medium",
//                         isActive ? "text-cyan-400" : "text-white"
//                       )}>
//                         {item.name}
//                       </span>
                      
//                       {/* Subtle animated indicator */}
//                       {isActive && (
//                         <motion.div 
//                           className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
//                           animate={{ scale: [1, 1.3, 1] }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                     </motion.a>
//                   );
//                 })}
//               </motion.div>
              
//               {/* Extra UI element for mobile menu */}
//               <motion.div 
//                 className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <p className="text-sm text-white/70">Ready to collaborate?</p>
//                 <motion.a
//                   href="#contact"
//                   className="mt-2 inline-block px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-medium text-white"
//                   onClick={(e) => handleNavClick(e, '#contact')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get in Touch
//                 </motion.a>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isNavigatingRef = useRef(false); // Track if navigation is in progress

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Academic', href: '#academic' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
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
          : 'py-5'
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Glass effect overlay - always visible */}
      <div className={cn(
        "absolute inset-0 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5",
        isScrolled 
          ? "bg-gradient-to-r from-black/60 via-black/70 to-black/60" 
          : "bg-gradient-to-r from-black/30 via-black/40 to-black/30"
      )}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Clean, simplified logo */}
          <motion.a 
            href="#home" 
            className="font-bold text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, '#home')}
          >
            {/* Logo with gradient background */}
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/20">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            
            {/* Logo text */}
            <span className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
              Arun.dev
            </span>
          </motion.a>

          {/* Desktop Menu - Clean pill style without icons */}
          <div className="hidden md:block">
            <div className="flex rounded-full p-1 transition-all duration-300 bg-white/5 backdrop-blur-md shadow-xl">
              {menuItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a 
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    )}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {/* Using button-like approach to prevent flickering */}
                    <span className="relative z-10 block">
                      {item.name}
                    </span>
                    
                    {/* Gradient background for active item */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-600/80 shadow-lg shadow-cyan-500/20"
                        layoutId="navBackground"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <motion.button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 -z-10"></div>
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <motion.span 
                className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1, x: isMobileMenuOpen ? 20 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Clean Drawer Style */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 md:hidden bg-black/90 backdrop-blur-xl z-40 pt-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
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
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button 
                      key={item.name}
                      className={cn(
                        "flex items-center p-4 rounded-xl text-left transition-all relative overflow-hidden w-full",
                        isActive ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-l-2 border-cyan-400" 
                                : "hover:bg-white/5 border-l-2 border-transparent"
                      )}
                      onClick={(e) => {
                        // Use button to prevent flickering
                        e.preventDefault();
                        handleNavClick(e, item.href);
                      }}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -20 }
                      }}
                    >
                      <span className={cn(
                        "font-medium",
                        isActive ? "text-cyan-400" : "text-white"
                      )}>
                        {item.name}
                      </span>
                      
                      {/* Simple active indicator */}
                      {isActive && (
                        <motion.div 
                          className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
              
              {/* Contact CTA in mobile menu */}
              <motion.div 
                className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-white/70">Ready to collaborate?</p>
                <motion.button
                  className="mt-2 inline-block px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-medium text-white"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  whileHover={{ scale: 1.05 }}
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