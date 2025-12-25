import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const progressValue = useMotionValue(0);
  
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000;
    
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
      className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-md z-50 flex flex-col items-center justify-center"
      animate={loading ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center">
  
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              ARUN
            </span>
            <span className="text-gray-500 ml-1">DEVS</span>
          </h1>
        </motion.div>

        <div className="flex flex-col items-center">
      
          <motion.div 
            className="w-16 h-16 rounded-full border-t-2 border-r-2 border-cyan-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
          
      
          <motion.p
            className="mt-6 text-gray-600 font-medium text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Preparing Experience
          </motion.p>
          
    
          <div className="mt-8 w-64 sm:w-80">
            <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: "0%" }}
                style={{ width: progressValue }}
              />
            </div>
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
              <span>Loading assets</span>
              <motion.span
                className="tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span style={{ x: progressValue }}>
                  {Math.round(progressValue.get())}%
                </motion.span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>
      
    
      <motion.div 
        className="absolute bottom-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Arun Devs • Web Developer
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;