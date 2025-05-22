import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDocumentText } from "react-icons/hi2";
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaCode, 
  FaNetworkWired, 
  FaServer, 
  FaDatabase 
} from 'react-icons/fa';
import { 
  SiLeetcode, 
  SiCodechef, 
  SiCodeforces, 
  SiGeeksforgeeks, 
  SiReddit, 
  SiStackoverflow
} from 'react-icons/si';

const aboutImage = "/assets/aboutimg.jpg"; // Replace with your image path

const TARGET_TEXT = "View Resume";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

// Binary/encryption characters for the border animation
const ENCRYPTION_CHARS = "01";
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

// Coding profile data
const codingProfiles = [
  { name: "LeetCode", icon: SiLeetcode, color: "#FFA116", url: "https://leetcode.com/" },
  { name: "GeeksforGeeks", icon: SiGeeksforgeeks, color: "#2F8D46", url: "https://www.geeksforgeeks.org/" },
  { name: "Reddit", icon: SiReddit, color: "#FF4500", url: "https://www.reddit.com/" },
  { name: "CodeChef", icon: SiCodechef, color: "#5B4638", url: "https://www.codechef.com/" },
  { name: "CodeForces", icon: SiCodeforces, color: "#1F8ACB", url: "https://codeforces.com/" },
  { name: "Stack Overflow", icon: SiStackoverflow, color: "#F48024", url: "https://stackoverflow.com/" }
];

// Technical skills data with icons
const technicalSkills = [
  { name: "Web Development", icon: FaCode, color: "#00BFFF" },
  { name: "Data Structures", icon: FaDatabase, color: "#FF6B6B" },
  { name: "Problem Solving", icon: FaCode, color: "#4CAF50" },
  { name: "Networking", icon: FaNetworkWired, color: "#9C27B0" },
  { name: "Backend Development", icon: FaServer, color: "#FF9800" }
];

const AboutSection = () => {
  const intervalRef = useRef(null);
  const encryptionIntervalRef = useRef(null);
  const buttonIntervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);
  const [encryptedBorder, setEncryptedBorder] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [buttonEncrypted, setButtonEncrypted] = useState("");
  const [isButtonEncrypting, setIsButtonEncrypting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [hoverProfile, setHoverProfile] = useState(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate initial encrypted border text
  useEffect(() => {
    generateEncryptedBorder();
    generateButtonEncryption();
    
    // Automatically animate encryption every 10 seconds
    const interval = setInterval(() => {
      animateEncryption();
      // Also animate button encryption periodically on mobile
      if (isMobile) {
        animateButtonEncryption();
      }
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearInterval(encryptionIntervalRef.current);
      clearInterval(buttonIntervalRef.current);
    };
  }, [isMobile]);
  
  const generateEncryptedBorder = () => {
    // Generate a string of random binary characters
    const length = isMobile ? 50 : 100;
    let result = "";
    
    for (let i = 0; i < length; i++) {
      result += ENCRYPTION_CHARS.charAt(Math.floor(Math.random() * ENCRYPTION_CHARS.length));
    }
    
    setEncryptedBorder(result);
  };

  const generateButtonEncryption = () => {
    // Generate a string of random binary characters for the button
    const length = isMobile ? 30 : 60;
    let result = "";
    
    for (let i = 0; i < length; i++) {
      result += ENCRYPTION_CHARS.charAt(Math.floor(Math.random() * ENCRYPTION_CHARS.length));
    }
    
    setButtonEncrypted(result);
  };
  
  const animateEncryption = () => {
    if (isEncrypting) return;
    
    setIsEncrypting(true);
    let iterations = 0;
    const maxIterations = 20; // Number of animation frames
    
    clearInterval(encryptionIntervalRef.current);
    encryptionIntervalRef.current = setInterval(() => {
      generateEncryptedBorder();
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(encryptionIntervalRef.current);
        setIsEncrypting(false);
      }
    }, 100);
  };

  const animateButtonEncryption = () => {
    if (isButtonEncrypting) return;
    
    setIsButtonEncrypting(true);
    let iterations = 0;
    const maxIterations = 15; // Number of animation frames
    
    clearInterval(buttonIntervalRef.current);
    buttonIntervalRef.current = setInterval(() => {
      generateButtonEncryption();
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(buttonIntervalRef.current);
        setIsButtonEncrypting(false);
      }
    }, 100);
  };

  const scramble = () => {
    const cycles = isMobile ? 1 : CYCLES_PER_LETTER;
    let pos = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("").map((char, index) => {
        if (pos / cycles > index) {
          return char;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * cycles) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
    
    // Also trigger the border encryption animations
    animateEncryption();
    animateButtonEncryption();
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  // Function to handle mobile tap events specifically
  const handleMobileTap = () => {
    scramble();
    animateButtonEncryption();
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        {/* Modern Section Header with Animated Underline */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </h2>
            <motion.div 
              className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-zinc-400 mt-6 text-center max-w-2xl">
            Developer, innovator, and creative problem-solver. My journey in building the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left Column: Image and Coding Profiles */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Encrypted Image Container */}
            <motion.div
              className="relative"
              onMouseEnter={animateEncryption}
              onTouchStart={animateEncryption}
            >
              {/* Encryption animation border */}
              <div className="absolute -inset-1 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                
                {/* Top encryption text */}
                <div className="absolute top-0 left-0 right-0 h-4 md:h-6 flex items-center overflow-hidden z-10">
                  <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}>
                    {encryptedBorder}
                  </div>
                </div>
                
                {/* Bottom encryption text */}
                <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 flex items-center overflow-hidden z-10">
                  <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}
                    style={{ direction: 'rtl' }}>
                    {encryptedBorder}
                  </div>
                </div>
                
                {/* Left encryption text */}
                <div className="absolute top-0 left-0 bottom-0 w-4 md:w-6 writing-vertical-lr overflow-hidden z-10">
                  <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}>
                    {encryptedBorder}
                  </div>
                </div>
                
                {/* Right encryption text */}
                <div className="absolute top-0 right-0 bottom-0 w-4 md:w-6 writing-vertical-rl overflow-hidden z-10">
                  <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}>
                    {encryptedBorder}
                  </div>
                </div>
              </div>

              <div className="w-full aspect-square max-h-[400px] bg-zinc-900 rounded-lg overflow-hidden relative">
                <img src={aboutImage} alt="About Me" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-700/30 flex items-center justify-center" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 blue-gradient rounded-full opacity-60 blur-lg"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 blue-gradient rounded-full opacity-40 blur-md"></div>
                
                {/* Matrix-like falling characters overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                  {Array.from({length: 10}).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 text-cyan-300 font-mono text-xs"
                      style={{
                        left: `${i * 10}%`,
                        animation: `matrixFall ${5 + i * 0.5}s linear infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    >
                      {Array.from({length: 20}).map((_, j) => (
                        <div key={j} className="my-1">
                          {MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -left-6 text-primary text-5xl font-mono opacity-20">{`{`}</div>
              <div className="absolute -bottom-6 -right-6 text-primary text-5xl font-mono opacity-20">{`}`}</div>
            </motion.div>

            {/* Coding Profiles Section */}
            <motion.div
              className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 border border-zinc-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-cyan-400">#</span> Coding Profiles
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {codingProfiles.map((profile, index) => (
                  <motion.a 
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex flex-col items-center justify-center p-3 bg-zinc-800/50 rounded-lg overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: `rgba(30, 30, 35, 0.9)`,
                      transition: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    onHoverStart={() => setHoverProfile(profile.name)}
                    onHoverEnd={() => setHoverProfile(null)}
                  >
                    <profile.icon 
                      className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-125"
                      style={{ color: profile.color }} 
                    />
                    <span className="text-xs text-gray-300 text-center font-medium">
                      {profile.name}
                    </span>
                    
                    {/* Pulsing border effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      animate={{
                        boxShadow: hoverProfile === profile.name 
                          ? `0 0 0 2px ${profile.color}` 
                          : `0 0 0 0px transparent`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column: About Content */}
          <motion.div
            className="md:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-zinc-900/60 backdrop-blur-sm p-1 rounded-lg">
              {['about', 'education', 'interests'].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Content Panel */}
            <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-zinc-800">
              <AnimatePresence mode="wait">
                {activeTab === 'about' && (
                  <motion.div 
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        A
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Arun A</h3>
                        <p className="text-cyan-400 font-medium">MERN Stack Developer</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      I'm a <span className="text-cyan-400 font-medium">MERN Stack Developer</span> and a B.E Computer Science Engineering student (2027 batch). 
                      I'm a strong communicator, fast learner, and enthusiastic problem solver with interests in web design, 
                      data structures, and networking.
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      I thrive in team environments and also excel independently. My passion lies in creating 
                      efficient, scalable web solutions with clean code practices.
                    </p>

                    {/* Professional skills bars with animation */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Technical Expertise</h4>
                      
                      {technicalSkills.map((skill, index) => (
                        <motion.div 
                          key={skill.name}
                          className="space-y-1"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <skill.icon style={{ color: skill.color }} />
                              <span className="text-gray-300">{skill.name}</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: skill.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${85 - index * 5}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'education' && (
                  <motion.div 
                    key="education"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-white">Academic Journey</h3>
                    
                    <div className="space-y-8">
                      <motion.div 
                        className="relative pl-8 border-l-2 border-cyan-400/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-cyan-400"></div>
                        <h4 className="text-lg font-medium text-white">B.E Computer Science Engineering</h4>
                        <p className="text-cyan-400">2023 - 2027</p>
                        <p className="text-gray-400 mt-2">Currently pursuing my Bachelor's degree with focus on web technologies, data structures and algorithms.</p>
                      </motion.div>
                      
                      <motion.div 
                        className="relative pl-8 border-l-2 border-zinc-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-zinc-700"></div>
                        <h4 className="text-lg font-medium text-white">Higher Secondary Education</h4>
                        <p className="text-gray-400">2021 - 2023</p>
                        <p className="text-gray-400 mt-2">Completed with excellence in Mathematics and Computer Science.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'interests' && (
                  <motion.div 
                    key="interests"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-white">Beyond Coding</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: "Problem Solving", desc: "I enjoy solving challenging algorithmic problems on LeetCode and CodeForces." },
                        { title: "Web Design", desc: "Creating beautiful, responsive web interfaces with attention to UX." },
                        { title: "Open Source", desc: "Contributing to open-source projects and learning from the community." },
                        { title: "Learning", desc: "Continuously exploring new technologies and programming paradigms." },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="bg-zinc-800/50 p-4 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <h4 className="text-lg font-medium text-cyan-400 mb-2">{item.title}</h4>
                          <p className="text-gray-400">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Animated Resume Button - Enhanced version */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative inline-block">
                {/* Encryption animation border for button - with better mobile visibility */}
                <div className="absolute -inset-1 md:-inset-1 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                  
                  {/* Encryption texts */}
                  {['top', 'bottom', 'left', 'right'].map((side) => (
                    <div 
                      key={side}
                      className={`absolute ${
                        side === 'top' ? 'top-0 left-0 right-0 h-3 md:h-4' :
                        side === 'bottom' ? 'bottom-0 left-0 right-0 h-3 md:h-4' :
                        side === 'left' ? 'top-0 left-0 bottom-0 w-3 md:w-4 writing-vertical-lr' :
                        'top-0 right-0 bottom-0 w-3 md:w-4 writing-vertical-rl'
                      } flex items-center overflow-hidden z-10`}
                    >
                      <div 
                        className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}
                        style={side === 'bottom' ? { direction: 'rtl' } : {}}
                      >
                        {buttonEncrypted}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/assets/714023104011 ( 23CS011 ).pdf"
                  download
                  onClick={isMobile ? handleMobileTap : undefined}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      scramble();
                      animateButtonEncryption();
                    }
                  }}
                  onMouseLeave={!isMobile ? stopScramble : undefined}
                  onTouchStart={handleMobileTap}
                  className="group relative block w-full sm:w-auto overflow-hidden rounded-lg border border-cyan-500 bg-neutral-800 px-4 py-2 sm:px-6 sm:py-3 font-mono font-medium uppercase text-cyan-300 transition-colors hover:text-white inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 z-30"
                >
                  <HiDocumentText className="text-xl text-cyan-300" />

                  {/* Gradient animated text */}
                  <span
                    className="inline-block min-w-[8ch] text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] whitespace-nowrap"
                  >
                    {text}
                  </span>

                  {/* Glowing hover stripe animation */}
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "-100%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 1,
                      ease: "linear",
                    }}
                    className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-cyan-400/0 from-40% via-cyan-400 to-cyan-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </div>
              
              <motion.a
                href="https://github.com/Arunarivalagan743"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm px-6 py-3 text-gray-300 hover:text-white hover:border-zinc-600 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGithub className="text-xl" />
                <span>GitHub Profile</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global styles for vertical text and animations */}
      <style >{`
        .writing-vertical-lr {
          writing-mode: vertical-lr;
        }
        
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        
        @keyframes matrixFall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        /* Show border animation on mobile touch */
        @media (max-width: 768px) {
          .group:active .animate-pulse {
            animation: pulse 1s infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
        }
        
        /* Blue gradient for background effects */
        .blue-gradient {
          background: linear-gradient(45deg, #00BFFF, #1E90FF);
        }
        
        /* Animation for text scramble */
        @keyframes textScramble {
          0% {
            content: "${CHARS.charAt(Math.floor(Math.random() * CHARS.length))}";
          }
          100% {
            content: "${CHARS.charAt(Math.floor(Math.random() * CHARS.length))}";
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;