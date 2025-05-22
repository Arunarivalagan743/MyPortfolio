// import React, { useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import HeroSection from '../components/HeroSection';
// import AboutSection from '../components/AboutSection';
// import AcademicSection from '../components/AcademicSection';
// import ProjectsSection from '../components/ProjectsSection';
// import ExperienceTimeline from '../components/ExperienceTimeline';
// import SkillsSection from '../components/SkillsSection';
// import ContactSection from '../components/ContactSection';
// import AnimatedEffects from '../components/AnimatedEffects';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Loader from '../components/Loader';  // your loader component

// // AOS for scroll animations
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// // Framer Motion for animations
// import { motion, AnimatePresence } from 'framer-motion';

// // Define the shape of your fetched data
// interface FetchDataResult {
//   message: string;
// }

// // Simulated fetch function (replace with your real API call)
// const fetchData = async (): Promise<FetchDataResult> => {
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   return { message: "Hello, This is my PortFolio!" };
// };

// const Index: React.FC = () => {
//   // useQuery with typed data and error
//   const { data, isLoading, error } = useQuery<FetchDataResult, Error>({
//     queryKey: ['fetchData'],
//     queryFn: fetchData,
//   });

//   useEffect(() => {
//     document.title = "Arun A | MERN Developer";
//     AOS.init({
//       duration: 800,
//       once: false,
//       mirror: true,
//     });
//   }, []);

//   if (isLoading) return <Loader />;

//   if (error) return <div>Error loading data: {error.message}</div>;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-black text-white overflow-hidden"
//       >
//         <AnimatedEffects />
//         <Navbar />
//         <HeroSection />
//         <AboutSection />
//         <AcademicSection />
//         <ProjectsSection />
//         <ExperienceTimeline />
//         <SkillsSection />
//         <ContactSection />
//         <Footer />
//         {/* Example of showing fetched data message */}
//         <div className="p-4 text-center text-green-400">{(data as FetchDataResult | undefined)?.message}</div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Index;
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AcademicSection from '../components/AcademicSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import AnimatedEffects from '../components/AnimatedEffects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import VoiceNavigation from '../components/AiVoiceNavigation'; // Import your voice navigation component
// AOS for scroll animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Framer Motion for animations
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner'; // For notifications

// Define the shape of your fetched data
interface FetchDataResult {
  message: string;
}

// Simulated fetch function (replace with your real API call)
const fetchData = async (): Promise<FetchDataResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { message: "Hello, This is my PortFolio!" };
};

const Index: React.FC = () => {
  // Voice navigation state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showVoicePrompt, setShowVoicePrompt] = useState(false);

  // useQuery with typed data and error
  const { data, isLoading, error } = useQuery<FetchDataResult, Error>({
    queryKey: ['fetchData'],
    queryFn: fetchData,
  });

  useEffect(() => {
    document.title = "Arun A | MERN Developer";
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
    
    // Check if voice navigation modal should be shown
    const voiceModalShown = localStorage.getItem('portfolio_voice_modal_shown');
    
    // If first time visitor, show prompt after 3 seconds
    if (voiceModalShown !== 'true') {
      const timer = setTimeout(() => {
        setShowVoicePrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      // If they've already enabled voice, restore that preference
      const voicePref = localStorage.getItem('portfolio_voice_enabled');
      if (voicePref === 'true') {
        setVoiceEnabled(true);
      }
    }
  }, []);

  // Toggle voice navigation
  const toggleVoiceNavigation = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    localStorage.setItem('portfolio_voice_enabled', String(newState));
    
    // Show feedback
    if (newState) {
      toast.success('Voice navigation enabled', {
        description: 'Try saying "show projects" or "scroll to contact"'
      });
    } else {
      toast.info('Voice navigation disabled');
    }
  };
  
  // Handle user response to voice prompt
  const handleVoicePromptResponse = (enable: boolean) => {
    setVoiceEnabled(enable);
    setShowVoicePrompt(false);
    localStorage.setItem('portfolio_voice_enabled', String(enable));
    localStorage.setItem('portfolio_voice_modal_shown', 'true');
    
    if (enable) {
      toast.success('Voice navigation enabled', {
        description: 'Try saying "show projects" or "scroll to contact"'
      });
    }
  };

  if (isLoading) return <Loader />;

  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white overflow-hidden"
      >
        <AnimatedEffects />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <AcademicSection />
        <ProjectsSection />
        <ExperienceTimeline />
        <SkillsSection />
        <ContactSection />
        <Footer />
        
        {/* Voice Navigation Component */}
        <VoiceNavigation isEnabled={voiceEnabled} onToggle={toggleVoiceNavigation} />
        
        {/* Voice feature prompt for first-time visitors */}
        <AnimatePresence>
          {showVoicePrompt && (
            <motion.div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-zinc-900 border border-cyan-500/30 rounded-xl max-w-md w-full p-6 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Try AI Voice Navigation</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  This portfolio supports voice commands! You can navigate by saying phrases like "show me projects" or "scroll to contact section".
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    onClick={() => handleVoicePromptResponse(true)}
                  >
                    Enable Voice Navigation
                  </button>
                  <button 
                    className="flex-1 bg-transparent hover:bg-zinc-800 text-gray-400 py-2 px-4 rounded-lg border border-zinc-700 font-medium transition-colors"
                    onClick={() => handleVoicePromptResponse(false)}
                  >
                    Maybe Later
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Example of showing fetched data message */}
        <div className="p-4 text-center text-green-400">{(data as FetchDataResult | undefined)?.message}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;