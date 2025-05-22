import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

// Elegant fish swimming animation
const SwimmingFish = ({ enabled = true, count = 5 }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        // Randomize fish properties
        const size = Math.random() * 40 + 15;
        const duration = Math.random() * 15 + 25;
        const isTopHalf = Math.random() > 0.5;
        const yPosition = isTopHalf 
          ? `${Math.random() * 30 + 5}%` 
          : `${Math.random() * 30 + 65}%`;
        const delay = Math.random() * 8;
        const direction = i % 2 === 0 ? 1 : -1; // Left to right or right to left
        const initialX = direction > 0 ? -100 : "100vw";
        const finalX = direction > 0 ? "100vw" : -100;
        const fishColor = i % 3 === 0 
          ? "#06b6d4" // Cyan
          : i % 3 === 1 
            ? "#0ea5e9" // Blue
            : "#8b5cf6"; // Purple
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: yPosition,
              left: initialX,
              opacity: 0.4,
            }}
            animate={{
              left: [initialX, finalX],
              y: [0, -15, 10, -5, 0],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              left: {
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              },
              y: {
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              },
              opacity: {
                duration: 4,
                times: [0, 0.1, 0.9, 1],
                repeat: Infinity,
                repeatDelay: duration - 4,
                delay: delay
              }
            }}
          >
            <svg
              width={size}
              height={size * 0.6}
              viewBox="0 0 100 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                transform: direction < 0 ? "scaleX(-1)" : "none",
                filter: `drop-shadow(0 0 3px ${fishColor}40)`
              }}
            >
              <path
                d="M20 30C20 30 35 10 70 10C85 10 95 15 95 30C95 45 85 50 70 50C35 50 20 30 20 30Z"
                fill={`${fishColor}20`}
                stroke={fishColor}
                strokeWidth="1.5"
              />
              <path
                d="M20 30L5 45L10 30L5 15L20 30Z"
                fill={`${fishColor}30`}
                stroke={fishColor}
                strokeWidth="1.5"
              />
              <circle cx="75" cy="25" r="3" fill="white" fillOpacity="0.6" />
            </svg>
            
            {/* Fish tail movement */}
            <motion.div
              className="absolute top-0 left-0"
              animate={{ scaleX: [1, 0.8, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ 
                transformOrigin: direction < 0 ? "center right" : "center left",
                width: "100%", 
                height: "100%" 
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Elegant floating bubbles
const Bubbles = ({ enabled = true, count = 15 }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 15 + 5;
        const startPosition = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              bottom: -30,
              left: `${startPosition}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(125, 211, 252, 0.1))`,
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              opacity: 0,
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.sin(startPosition) * 50],
              opacity: [0, 0.5, 0],
              scale: [1, 1.1, 0.9, 1.05, 1]
            }}
            transition={{
              y: {
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut"
              },
              x: {
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              },
              opacity: {
                duration: duration,
                repeat: Infinity,
                delay: delay,
                times: [0, 0.1, 1]
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
          />
        );
      })}
    </div>
  );
};

// Underwater current/wave effect
const WaterCurrents = ({ enabled = true }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-20">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent h-40 w-screen"
          style={{
            top: `${25 * i}%`,
          }}
          animate={{
            x: ["-100%", "100%"],
            y: [0, 10, -10, 15, -5, 0],
          }}
          transition={{
            x: {
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }
          }}
        />
      ))}
    </div>
  );
};

// Elegant seaweed animation
const Seaweed = ({ enabled = true, count = 5 }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-x-0 bottom-0 pointer-events-none overflow-hidden h-60 opacity-30">
      {[...Array(count)].map((_, i) => {
        const height = Math.random() * 100 + 80;
        const width = Math.random() * 30 + 10;
        const position = Math.random() * 100;
        const delay = Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute bottom-0 origin-bottom"
            style={{
              left: `${position}%`,
              height: height,
              width: width,
            }}
            animate={{
              rotateZ: [0, 5, -5, 3, -2, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: delay,
            }}
          >
            {/* Multiple seaweed strands */}
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute bottom-0 rounded-t-full"
                style={{
                  left: `${j * (width / 3)}px`,
                  width: width / 5,
                  height: `${height - j * 15}px`,
                  backgroundColor: j % 2 === 0 ? "#0d9488" : "#0891b2",
                  opacity: 0.5,
                  transformOrigin: "bottom"
                }}
                animate={{
                  rotateZ: [0, 5, -7, 4, -2, 0],
                  scaleY: [1, 0.98, 1.02, 0.99, 1]
                }}
                transition={{
                  duration: 7 + j,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: delay + j * 0.5,
                }}
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

// Elegant jellyfish animation
const Jellyfish = ({ enabled = true, count = 3 }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 70 + 50;
        const yPosition = Math.random() * 60 + 20;
        const xPosition = Math.random() * 80 + 10;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 2;
        const color = i % 2 === 0 ? "#06b6d4" : "#8b5cf6";
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${yPosition}%`,
              left: `${xPosition}%`,
            }}
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1], // Special easing for jellyfish movement
              delay: delay
            }}
          >
            <div className="relative">
              {/* Jellyfish bell */}
              <motion.div
                className="rounded-full backdrop-blur-sm relative"
                style={{
                  width: size,
                  height: size * 0.7,
                  background: `radial-gradient(circle at 50% 40%, ${color}10, ${color}30)`,
                  border: `1px solid ${color}40`,
                }}
                animate={{
                  scaleX: [1, 1.05, 0.95, 1],
                  scaleY: [1, 0.95, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Jellyfish tentacles */}
              <div className="absolute top-[60%] w-full flex justify-around">
                {[...Array(7)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="w-[2px] origin-top"
                    style={{
                      height: size * 0.8,
                      backgroundColor: `${color}40`,
                    }}
                    animate={{
                      scaleY: [1, 0.85, 1.1, 0.9, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: j * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Water surface effect
const WaterSurface = ({ enabled = true }) => {
  if (!enabled) return null;
  
  return (
    <div className="fixed top-0 inset-x-0 h-[30vh] pointer-events-none overflow-hidden opacity-50">
      <motion.div 
        className="absolute inset-0 origin-center"
        style={{
          background: `
            linear-gradient(0deg, transparent, rgba(6, 182, 212, 0.05) 20%, transparent 50%),
            linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.05) 30%, rgba(6, 182, 212, 0.1) 50%, rgba(6, 182, 212, 0.05) 70%, transparent)
          `,
          backgroundSize: '100% 30px, 200px 100%',
          opacity: 0.7,
        }}
        animate={{
          backgroundPosition: ['0px 0px, 0px 0px', '0px 30px, 200px 0px']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Light rays through water */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => {
          const width = Math.random() * 200 + 100;
          const left = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="absolute top-0 h-full bg-gradient-to-b from-cyan-300/5 to-transparent"
              style={{
                width: width,
                left: `${left}%`,
                transform: `skewX(${Math.random() * 20 - 10}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Main component combining all underwater effects
const AnimatedEffects = ({ 
  enableFish = true,
  enableBubbles = true,
  enableCurrents = true,
  enableSeaweed = true,
  enableJellyfish = true,
  enableWaterSurface = true
}) => {
  return (
    <>
      <WaterCurrents enabled={enableCurrents} />
      <WaterSurface enabled={enableWaterSurface} />
      <SwimmingFish enabled={enableFish} />
      <Bubbles enabled={enableBubbles} />
      <Seaweed enabled={enableSeaweed} />
      <Jellyfish enabled={enableJellyfish} />
    </>
  );
};

// Export individual components for flexibility
export { 
  // SwimmingFish,
  // Bubbles,
  // WaterCurrents,
  // Seaweed,
  // Jellyfish,
  // WaterSurface
};

export default AnimatedEffects;