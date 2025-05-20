import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDocumentText } from "react-icons/hi2";

const aboutImage = "/assets/aboutimg.jpg"; // Replace with your image path

const TARGET_TEXT = "View Resume";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

// Binary/encryption characters for the border animation
const ENCRYPTION_CHARS = "01";
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

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
    
    // For mobile, we want the animation to happen but also allow the download
    // No need to preventDefault since we want the link to work
  };

  return (
    <section id="about" className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              I'm Arun A, a MERN Stack Developer and a B.E Computer Science Engineering student (2027 batch). 
              I'm a strong communicator, fast learner, and enthusiastic problem solver with interests in web design, 
              data structures, and networking.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              I thrive in team environments and also excel independently. My passion lies in creating 
              efficient, scalable web solutions with clean code practices.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {["Web Development", "Data Structures", "Problem Solving", "Networking"].map((skill, index) => (
                <motion.div 
                  key={skill}
                  className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800"
                  whileHover={{ scale: 1.05, borderColor: '#00BFFF' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Animated Resume Button */}
            <div className="pt-6">
              <div className="relative inline-block">
                {/* Encryption animation border for button - with better mobile visibility */}
                <div className="absolute -inset-1 md:-inset-1 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                  
                  {/* Top encryption text - adjusted for mobile */}
                  <div className="absolute top-0 left-0 right-0 h-3 md:h-4 flex items-center overflow-hidden z-10">
                    <div className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}>
                      {buttonEncrypted}
                    </div>
                  </div>
                  
                  {/* Bottom encryption text - adjusted for mobile */}
                  <div className="absolute bottom-0 left-0 right-0 h-3 md:h-4 flex items-center overflow-hidden z-10">
                    <div className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}
                      style={{ direction: 'rtl' }}>
                      {buttonEncrypted}
                    </div>
                  </div>
                  
                  {/* Left encryption text - adjusted for mobile */}
                  <div className="absolute top-0 left-0 bottom-0 w-3 md:w-4 writing-vertical-lr overflow-hidden z-10">
                    <div className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}>
                      {buttonEncrypted}
                    </div>
                  </div>
                  
                  {/* Right encryption text - adjusted for mobile */}
                  <div className="absolute top-0 right-0 bottom-0 w-3 md:w-4 writing-vertical-rl overflow-hidden z-10">
                    <div className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}>
                      {buttonEncrypted}
                    </div>
                  </div>
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
                  className="group relative block w-fit sm:w-auto overflow-hidden rounded-lg border border-cyan-500 bg-neutral-800 px-4 py-2 sm:px-6 sm:py-3 font-mono font-medium uppercase text-cyan-300 transition-colors hover:text-white inline-flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 z-30"
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
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={animateEncryption}
            onTouchStart={animateEncryption}
          >
            {/* Encryption animation border */}
            <div className="absolute -inset-1 rounded-lg overflow-hidden">
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

            <div className="w-full h-80 md:h-96 bg-zinc-900 rounded-lg overflow-hidden relative">
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