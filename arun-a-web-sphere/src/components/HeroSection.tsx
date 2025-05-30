// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGithub, FaChevronDown, FaMicrophone } from 'react-icons/fa';
// import { SiLeetcode, SiLinkedin } from 'react-icons/si';
// import { TypeAnimation } from 'react-type-animation';

// const myImage = "/assets/me.jpg"; 

// const HeroSection: React.FC = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   useEffect(() => {
//     // Check if we're on a mobile device
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     // Initial check
//     checkMobile();
    
//     // Listen for window resize
//     window.addEventListener('resize', checkMobile);
    
//     // Set loaded after a small delay to ensure smooth animations
//     const timer = setTimeout(() => setIsLoaded(true), 300);
    
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('resize', checkMobile);
//     };
//   }, []);

//   const handleScrollToContact = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const contactSection = document.getElementById('contact');
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const scrollToNextSection = () => {
//     const nextSection = document.getElementById('about');
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Enhanced animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
//     }
//   };

//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
//       {/* Modern gradient background - Simplified for better performance */}
//       <div className="absolute inset-0 w-full h-full -z-10">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4D00B4]/20 rounded-full filter blur-[120px] opacity-10"></div>
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00BFFF]/15 rounded-full filter blur-[120px] opacity-10"></div>
        
//         {/* Grid pattern overlay - reduced opacity on mobile */}
//         <div className={`absolute inset-0 bg-grid-pattern ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.03]'} bg-[length:50px_50px]`}></div>
//       </div>

//       {/* Floating particles - reduced count for mobile */}
//       {!isMobile && (
//         <div className="absolute inset-0 w-full h-full pointer-events-none">
//           {[...Array(isMobile ? 3 : 6)].map((_, index) => (
//             <motion.div
//               key={index}
//               className="absolute rounded-full"
//               style={{
//                 width: Math.random() * 6 + 2,
//                 height: Math.random() * 6 + 2,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 background: index % 2 === 0 ? '#00BFFF' : '#4D00B4',
//                 opacity: Math.random() * 0.15 + 0.05,
//               }}
//               animate={{
//                 y: [0, -20, 0],
//                 opacity: [0.05, 0.15, 0.05],
//               }}
//               transition={{
//                 duration: Math.random() * 5 + 5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* AI Voice Feature - Only visible on non-mobile devices */}
//       {!isMobile && (
//         <motion.div 
//           className="absolute left-5 top-24 md:top-32 z-20 max-w-[300px]"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 1.2, duration: 0.6 }}
//         >
//           <div className="px-4 py-3 bg-zinc-900/70 backdrop-blur-md rounded-lg border border-cyan-500/20">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
//                 <FaMicrophone className="text-cyan-400" />
//               </div>
//               <div>
//                 <h3 className="text-white font-medium">AI Voice Navigation</h3>
//                 <p className="text-xs text-gray-300">Say "show projects" or "open github"</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Main content container */}
//       <div className="container mx-auto px-4 md:px-8 z-10 flex items-center justify-center">
//         <motion.div 
//           className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 w-full max-w-7xl"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isLoaded ? "visible" : "hidden"}
//         >
//           {/* Left side - Profile image with modern container */}
//           <motion.div
//             variants={itemVariants}
//             className="relative"
//           >
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 blur-md opacity-20 scale-110"></div>
            
//             {/* Circular border animation - reduced animation on mobile */}
//             <motion.div 
//               className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30"
//               animate={{ rotate: 360 }}
//               transition={{ duration: isMobile ? 30 : 20, repeat: Infinity, ease: "linear" }}
//             ></motion.div>
            
//             {/* Image container */}
//             <div className="relative bg-gradient-to-b from-transparent to-[#070024] w-60 h-60 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl">
//               <img
//                 src={myImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//                 loading="eager"
//                 decoding="async"
//               />
              
//               {/* Overlay shine effect - less frequent on mobile */}
//               <motion.div 
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
//                 initial={{ left: "-100%" }}
//                 animate={{ left: "100%" }}
//                 transition={{ 
//                   duration: 1.5, 
//                   repeat: Infinity, 
//                   repeatDelay: isMobile ? 10 : 5 
//                 }}
//               ></motion.div>
//             </div>
            
//             {/* Decorative circles - hidden on mobile */}
//             {!isMobile && (
//               <>
//                 <motion.div 
//                   className="w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-sm absolute -top-4 -right-4 border border-cyan-500/30"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 ></motion.div>
//                 <motion.div 
//                   className="w-4 h-4 rounded-full bg-purple-500/20 backdrop-blur-sm absolute bottom-8 -left-6 border border-purple-500/30"
//                   animate={{ y: [0, 8, 0] }}
//                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
//                 ></motion.div>
//               </>
//             )}
//           </motion.div>

//           {/* Right side - Text content */}
//           <motion.div 
//             variants={itemVariants} 
//             className="flex flex-col items-start max-w-xl space-y-6"
//           >
//             {/* Greeting chip */}
//             <motion.div 
//               className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-cyan-400 flex items-center space-x-2"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//             >
//               <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//               <span>Available for new opportunities</span>
//             </motion.div>

//             {/* Main heading */}
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//               Hi, I'm{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
//                 Arun A
//               </span>
//             </h1>

//             {/* Typewriter with better styling */}
//             <div className="h-12 md:h-16">
//               <TypeAnimation
//                 sequence={[
//                   "MERN Stack Developer", 2000,
//                   "CSE Student", 2000,
//                   "Full Stack Enthusiast", 2000,
//                 ]}
//                 wrapper="h2"
//                 cursor={true}
//                 repeat={Infinity}
//                 className="text-xl md:text-3xl font-medium text-cyan-400"
//               />
//             </div>

//             {/* Description with better typography */}
//             <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
//               A Computer Science Engineering student passionate about full stack
//               development and crafting efficient, scalable web solutions with a
//               clean coding approach.
//             </p>

//             {/* Buttons + Social Icons with modern styling */}
//             <div className="flex flex-wrap items-center gap-5 mt-4 w-full">
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 191, 255, 0.5)" }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3 rounded-full relative overflow-hidden group z-0"
//                 onClick={handleScrollToContact}
//               >
//                 {/* Button gradient background */}
//                 <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 z-10"></span>
                
//                 {/* Button hover shine effect */}
//                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20"></span>
                
//                 {/* Button text */}
//                 <span className="relative z-30 font-medium">Let's Talk</span>
//               </motion.button>

//               {/* Social links with more modern styling */}
//               <div className="flex gap-4 sm:gap-5 text-xl sm:text-2xl">
//                 {[
//                   { icon: <FaGithub />, href: "https://github.com/Arunarivalagan743", color: "white" },
//                   { icon: <SiLinkedin />, href: "https://www.linkedin.com/in/arun-a-25b6a5289", color: "#0077B5" },
//                   { icon: <SiLeetcode />, href: "https://leetcode.com/", color: "#FFA116" }
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors relative"
//                     whileHover={{ 
//                       scale: 1.15,
//                       boxShadow: `0 0 15px rgba(0, 191, 255, 0.2)`,
//                       borderColor: "rgba(0, 191, 255, 0.3)"
//                     }}
//                     style={{ color: social.color }}
//                   >
//                     {social.icon}
                    
//                     {/* Subtle glow effect on hover */}
//                     <motion.div
//                       className="absolute inset-0 rounded-full"
//                       initial={{ opacity: 0 }}
//                       whileHover={{ opacity: 1 }}
//                       style={{ boxShadow: `0 0 10px ${social.color}40` }}
//                     />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Improved scroll indicator for mobile */}
//       <motion.div
//         className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
//         animate={{ 
//           y: [0, 8, 0],
//           opacity: [0.7, 1, 0.7],
//         }}
//         transition={{ 
//           duration: 2, 
//           repeat: Infinity,
//           ease: "easeInOut" 
//         }}
//         onClick={scrollToNextSection}
//         whileHover={{ scale: 1.1 }}
//       >
//         <div className="flex flex-col items-center gap-1 sm:gap-2">
//           {/* Hide text on very small screens */}
//           <span className="hidden xs:inline-block text-xs sm:text-sm font-light text-cyan-400/80">Scroll down</span>
//           <div className="w-7 h-7 sm:w-8 sm:h-10 md:h-12 rounded-full border border-cyan-400/40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
//             <FaChevronDown className="text-cyan-400 animate-bounce text-xs sm:text-sm" />
//           </div>
//         </div>
//       </motion.div>

//       {/* CSS for grid pattern and custom spacing for floating buttons */}
//       <style>{`
//         .bg-grid-pattern {
//           background-image: 
//             linear-gradient(to right, #ffffff08 1px, transparent 1px),
//             linear-gradient(to bottom, #ffffff08 1px, transparent 1px);
//         }
        
//         /* Add xs breakpoint for very small screens */
//         @media (min-width: 480px) {
//           .xs\\:inline-block {
//             display: inline-block;
//           }
//         }
        
//         /* Better spacing for floating controls on mobile */
//         @media (max-width: 767px) {
//           :root {
//             --floating-button-spacing: 12px;
//           }
//         }
        
//         @media (min-width: 768px) {
//           :root {
//             --floating-button-spacing: 16px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaChevronDown } from 'react-icons/fa';
import { SiLeetcode, SiLinkedin } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

const myImage = "/assets/me.jpg"; 

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Modern gradient background - Simplified for better performance */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4D00B4]/20 rounded-full filter blur-[120px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00BFFF]/15 rounded-full filter blur-[120px] opacity-10"></div>
        
        {/* Grid pattern overlay - reduced opacity on mobile */}
        <div className={`absolute inset-0 bg-grid-pattern ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.03]'} bg-[length:50px_50px]`}></div>
      </div>

      {/* Floating particles - reduced count for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {[...Array(isMobile ? 3 : 6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: index % 2 === 0 ? '#00BFFF' : '#4D00B4',
                opacity: Math.random() * 0.15 + 0.05,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-8 z-10 flex items-center justify-center">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 blur-md opacity-20 scale-110"></div>
            
            {/* Circular border animation - reduced animation on mobile */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: isMobile ? 30 : 20, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            
            {/* Image container */}
            <div className="relative bg-gradient-to-b from-transparent to-[#070024] w-60 h-60 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl">
              <img
                src={myImage}
                alt="Profile"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              
              {/* Overlay shine effect - less frequent on mobile */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: isMobile ? 10 : 5 
                }}
              ></motion.div>
            </div>
            
            {/* Decorative circles - hidden on mobile */}
            {!isMobile && (
              <>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-sm absolute -top-4 -right-4 border border-cyan-500/30"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="w-4 h-4 rounded-full bg-purple-500/20 backdrop-blur-sm absolute bottom-8 -left-6 border border-purple-500/30"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
              </>
            )}
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
            <div className="h-12 md:h-16">
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
              A Computer Science Engineering student passionate about full stack
              development and crafting efficient, scalable web solutions with a
              clean coding approach.
            </p>

            {/* Buttons + Social Icons with modern styling */}
            <div className="flex flex-wrap items-center gap-5 mt-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 191, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-full relative overflow-hidden group z-0"
                onClick={handleScrollToContact}
              >
                {/* Button gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 z-10"></span>
                
                {/* Button hover shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20"></span>
                
                {/* Button text */}
                <span className="relative z-30 font-medium">Let's Talk</span>
              </motion.button>

              {/* Social links with more modern styling */}
              <div className="flex gap-4 sm:gap-5 text-xl sm:text-2xl">
                {[
                  { icon: <FaGithub />, href: "https://github.com/Arunarivalagan743", color: "white" },
                  { icon: <SiLinkedin />, href: "https://www.linkedin.com/in/arun-a-25b6a5289", color: "#0077B5" },
                  { icon: <SiLeetcode />, href: "https://leetcode.com/", color: "#FFA116" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors relative"
                    whileHover={{ 
                      scale: 1.15,
                      boxShadow: `0 0 15px rgba(0, 191, 255, 0.2)`,
                      borderColor: "rgba(0, 191, 255, 0.3)"
                    }}
                    style={{ color: social.color }}
                  >
                    {social.icon}
                    
                    {/* Subtle glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ boxShadow: `0 0 10px ${social.color}40` }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Improved scroll indicator for mobile */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ 
          y: [0, 8, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          {/* Hide text on very small screens */}
          <span className="hidden xs:inline-block text-xs sm:text-sm font-light text-cyan-400/80">Scroll down</span>
          <div className="w-7 h-7 sm:w-8 sm:h-10 md:h-12 rounded-full border border-cyan-400/40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <FaChevronDown className="text-cyan-400 animate-bounce text-xs sm:text-sm" />
          </div>
        </div>
      </motion.div>

      {/* CSS for grid pattern and custom spacing for floating buttons */}
      <style >{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #ffffff08 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff08 1px, transparent 1px);
        }
        
        /* Add xs breakpoint for very small screens */
        @media (min-width: 480px) {
          .xs\\:inline-block {
            display: inline-block;
          }
        }
        
        /* Better spacing for floating controls on mobile */
        @media (max-width: 767px) {
          :root {
            --floating-button-spacing: 12px;
          }
        }
        
        @media (min-width: 768px) {
          :root {
            --floating-button-spacing: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;