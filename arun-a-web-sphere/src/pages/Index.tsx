

import React, { useEffect } from 'react';
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
// AOS for scroll animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Framer Motion for animations
import { motion, AnimatePresence } from 'framer-motion';
import PublicationsSection from '../components/PublicationsSection';

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
  // useQuery with typed data and error
  const { data, isLoading, error } = useQuery<FetchDataResult, Error>({
    queryKey: ['fetchData'],
    queryFn: fetchData,
  });

  useEffect(() => {
    document.title = "Arun A";
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
    
    // Add viewport meta tag dynamically to ensure proper mobile responsive behavior
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <AnimatePresence>
 <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white text-gray-900 w-full min-h-screen overflow-x-hidden" // <-- add overflow-x-hidden here
>
        {/* <AnimatedEffects /> */}
        <Navbar />
        
        {/* Main content wrapper with proper mobile constraints */}
        <div className="w-full max-w-full mx-auto">
          <HeroSection />
          <AboutSection />
          <AcademicSection />
            <ExperienceTimeline />
          <ProjectsSection />
        
          <PublicationsSection />
          <SkillsSection />
          <ContactSection />
        </div>
        
        <Footer />
        
        {/* Hide this on mobile to save space */}
        <div className="hidden md:block p-4 text-center text-green-600">
          {(data as FetchDataResult | undefined)?.message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;