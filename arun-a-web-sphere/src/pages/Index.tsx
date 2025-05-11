
import React, { useEffect } from 'react';
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

// Import AOS for scroll animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import the Framer Motion library for animations
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Update the title
    document.title = "Arun A | MERN Developer";

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

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
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
