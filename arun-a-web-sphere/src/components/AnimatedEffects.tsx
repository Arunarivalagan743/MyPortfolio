import React from 'react';
import { motion } from 'framer-motion';

const MissileTrail = () => {
  return (
    <motion.div
      className="fixed h-1 md:h-2 w-20 md:w-32 bg-gradient-to-r from-cyan-400 to-transparent z-10"
      initial={{ x: "-100%", y: "40%" }}
      animate={{ 
        x: "200vw", 
        y: "25%", 
        transition: { 
          duration: 2, 
          delay: 5,
          repeat: Infinity,
          repeatDelay: 15
        }
      }}
    >
      <div className="absolute right-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
    </motion.div>
  );
};

const ExplosionEffect = () => {
  return (
    <motion.div
      className="fixed w-40 h-40 md:w-64 md:h-64 rounded-full z-10 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 4, 5], 
        opacity: [0, 0.8, 0], 
        transition: { 
          duration: 2, 
          delay: 7, 
          repeat: Infinity,
          repeatDelay: 15
        }
      }}
      style={{ 
        top: '30%', 
        right: '20%',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 1) 0%, rgba(0, 128, 255, 1) 50%, rgba(200, 230, 255, 0.4) 70%)' 
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated dots */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle, transparent 20%, #000 70%)',
        backgroundSize: '4px 4px',
        opacity: 0.3,
      }}></div>
      
      {/* Animated gradient */}
      <motion.div 
        className="absolute -inset-[100px] opacity-30 blur-3xl"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #4f46e5 0%, transparent 70%)',
            'radial-gradient(circle at 80% 20%, #0ea5e9 0%, transparent 70%)',
            'radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 70%)',
            'radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 70%)',
            'radial-gradient(circle at 20% 20%, #4f46e5 0%, transparent 70%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

const AnimatedEffects = () => {
  return (
    <>
     
    </>
  );
};

export default AnimatedEffects;
