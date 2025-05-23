import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nameControls = useAnimation();
  const progressValue = useMotionValue(0);
  
  // Track mouse/touch position
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const event = 'touches' in e ? e.touches[0] : e;
      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;
      
      setPointerPosition({ x, y });
      
      // Move glow effect
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    };
    
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);
  
  // Loading animation
  useEffect(() => {
    // Simulate content loading with interactive animations
    const timer = setTimeout(() => {
      nameControls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 1.5 }
      }).then(() => {
        setLoading(false);
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [nameControls]);
  
  // Update progress in real-time
  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000; // 3 seconds
    
    const updateProgress = () => {
      if (!loading) return;
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      progressValue.set(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
    
    return () => {
      progressValue.set(0);
    };
  }, [loading, progressValue]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0  backdrop-blur-lg z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={loading ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Interactive glow effect that follows cursor */}
      <div 
        ref={glowRef}
        className="fixed w-[200px] h-[200px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.7) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />
      
   
      
      <div className="relative w-full max-w-4xl px-4">
        {/* Top animated lines with interactive hover */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-[200px] md:w-[450px]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            style={{
              transformOrigin: "center",
              rotate: pointerPosition.y * 5, // subtle rotation based on mouse y position
            }}
          />
        </div>
        
        {/* Main loader element - responds to mouse movement */}
        <motion.div 
          className="flex flex-col items-center"
          style={{
            x: pointerPosition.x * 15, // subtle movement based on mouse position
            y: pointerPosition.y * 15,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Interactive animated rings */}
          <div className="relative h-[200px] w-[200px] flex items-center justify-center group">
            {/* Outer ring */}
            <motion.div 
              className="absolute rounded-full border-2 border-cyan-500/30 h-full w-full group-hover:border-cyan-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                rotateX: pointerPosition.y * 20,
                rotateY: -pointerPosition.x * 20,
              }}
            />
            
            {/* Middle rotating ring */}
            <motion.div 
              className="absolute h-3/4 w-3/4 rounded-full border border-cyan-400/50 group-hover:border-cyan-300/70"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              style={{
                rotateX: pointerPosition.y * 10,
                rotateY: -pointerPosition.x * 10,
              }}
            >
              {/* Accent dots - multiple for more visual interest */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1.3 }}
                transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
              />
            </motion.div>
            
            {/* Inner pulse ring */}
            <motion.div 
              className="absolute h-1/2 w-1/2 rounded-full border border-amber-400"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Core element - interactive on hover */}
            <motion.div 
              className="h-1/3 w-1/3 rounded-full bg-gradient-to-br from-cyan-300 to-amber-400 opacity-80 hover:opacity-100 cursor-pointer"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              style={{
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
                filter: "brightness(1.1)",
              }}
              onClick={() => {
                // Small interactive feature - clicking core speeds up the loading
                const remaining = Math.max(0, 3000 - (Date.now() - performance.now()));
                if (remaining > 500) {
                  setLoading(false);
                }
              }}
            />
            
            {/* Particles that orbit around */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-300"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 100, 0],
                  y: [0, Math.sin(i * Math.PI / 4) * 100, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Text carousel with 3D perspective */}
          <div className="perspective-[800px]">
            <motion.div 
              className="mt-8 relative overflow-hidden h-14 transform-style-3d" 
              initial={{ opacity: 0, rotateX: 30 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-56, 0, 56, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut"
                }}
              >
                <div className="h-14 flex items-center justify-center font-light text-xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-amber-400 text-transparent bg-clip-text">
                    Designing experiences
                  </span>
                </div>
                <div className="h-14 flex items-center justify-center font-light text-xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-amber-400 text-transparent bg-clip-text">
                    Creating solutions
                  </span>
                </div>
                <div className="h-14 flex items-center justify-center font-light text-xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-amber-400 text-transparent bg-clip-text">
                    Building the future
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Interactive progress bar */}
          <div className="mt-16 w-[280px] md:w-[360px]">
            <div className="h-px bg-zinc-800 w-full relative overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 relative"
                initial={{ width: "0%" }}
                style={{ width: progressValue }}
              />
              
              {/* Animated glow effect on progress bar */}
              <motion.div 
                className="absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ 
                  x: [-40, 400],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              />
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-zinc-400 font-mono">
              <motion.span
                animate={{ color: ["#94a3b8", "#06b6d4"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Initializing
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  animate={{ 
                    color: ["#94a3b8", "#fbbf24"]
                  }} 
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  Please wait
                </motion.span>
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced 3D cutout text effect with hover interaction */}
      <motion.div 
        className="absolute bottom-12 w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="bg-clip-text text-transparent pointer-events-none font-black text-center px-4 cursor-pointer"
          style={{
            backgroundImage: "linear-gradient(135deg, #06b6d4, #fbbf24, #06b6d4)",
            backgroundSize: "200% 200%",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            animation: "gradient-shift 3s ease infinite",
            textShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            letterSpacing: "2px",
          }}
          animate={nameControls}
          whileHover={{ scale: 1.05, letterSpacing: "4px" }}
        >
          ARUN DEVS
        </motion.div>
        
        {/* Decorative elements that enhance the logo */}
        <motion.div 
          className="h-px w-[180px] md:w-[220px] mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        />
        
        <style >{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default Loader;