import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import myImage from '../assets/me.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-black pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl"></div>
      </div>

      {/* Missile animation */}
      <motion.div
        className="absolute h-1 w-20 bg-gradient-to-r from-yellow-500 to-transparent"
        initial={{ x: "-100%", y: "100%" }}
        animate={{
          x: "200%",
          y: "0%",
          transition: {
            duration: 1,
            delay: 5,
            repeat: Infinity,
            repeatDelay: 12
          }
        }}
        style={{ top: '30%', left: '-10%' }}
      >
        <div className="absolute right-0 w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
      </motion.div>

      {/* Explosion animation */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 2.5],
          opacity: [0, 0.8, 0],
          transition: {
            duration: 2,
            delay: 6,
            repeat: Infinity,
            repeatDelay: 12
          }
        }}
        style={{
          top: '25%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(255,177,66,1) 0%, rgba(255,89,0,1) 50%, transparent 70%)'
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 md:mb-0"
            data-aos="zoom-in"
          >
            <Avatar className="w-48 h-48 border-4 border-primary/30 shadow-xl shadow-primary/20">
              <AvatarImage src={myImage} alt="Profile" />
              <AvatarFallback className="bg-primary/10 text-4xl">AA</AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="flex flex-col items-start justify-center space-y-6 md:w-2/3" data-aos="fade-up">
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-poppins leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF]">Arun A</span>
            </motion.h1>

            {/* Typing Animation Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TypeAnimation
                sequence={[
                  'MERN Stack Developer', 2000,
                  'CSE Student', 2000,
                  'Full Stack Enthusiast', 2000,
                ]}
                wrapper="h2"
                cursor={true}
                repeat={Infinity}
                className="text-2xl md:text-3xl font-medium text-[#00BFFF]"
              />
            </motion.div>

            <motion.p
              className="text-lg text-gray-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              A Computer Science Engineering student passionate about full stack development and crafting efficient, scalable web solutions with a clean coding approach.
            </motion.p>

            <div className="flex flex-wrap gap-8 items-center mt-8">
              <motion.button
                className="blue-gradient text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={handleScrollToContact}
              >
                Let's Talk
              </motion.button>

              <motion.div
                className="flex space-x-6 text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <FaGithub />
                </a>
                <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <SiLeetcode />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
