import React from 'react';
import { motion } from 'framer-motion';


const aboutImage = "/assets/aboutimg.jpg"; // Replace with your image path

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline">
            About Me
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            data-aos="fade-right"
            data-aos-delay="100"
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
              <motion.div 
                className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800"
                whileHover={{ scale: 1.05, borderColor: '#00BFFF' }}
              >
                Web Development
              </motion.div>
              <motion.div 
                className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800"
                whileHover={{ scale: 1.05, borderColor: '#00BFFF' }}
              >
                Data Structures
              </motion.div>
              <motion.div 
                className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800"
                whileHover={{ scale: 1.05, borderColor: '#00BFFF' }}
              >
                Problem Solving
              </motion.div>
              <motion.div 
                className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800"
                whileHover={{ scale: 1.05, borderColor: '#00BFFF' }}
              >
                Networking
              </motion.div>
            </div>
            
            {/* Resume Button */}
            <div className="pt-6">
              <a 
                href="arun-a-web-sphere/src/assets/714023104011 ( 23CS011 ).pdf"  // Update the path to your actual resume file
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition duration-300"
              >
                View Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="w-full h-80 md:h-96 bg-zinc-900 rounded-lg overflow-hidden relative">
           
// ...
<img src={aboutImage} alt="About Me" className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-700/30 flex items-center justify-center">
                
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 blue-gradient rounded-full opacity-60 blur-lg"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 blue-gradient rounded-full opacity-40 blur-md"></div>
            </div>
            
            {/* Code brackets decoration */}
            <div className="absolute -top-6 -left-6 text-primary text-5xl font-mono opacity-20">{`{`}</div>
            <div className="absolute -bottom-6 -right-6 text-primary text-5xl font-mono opacity-20">{`}`}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
