import React from 'react';
import { motion } from 'framer-motion';

const AcademicSection = () => {
  const academicData = [
    {
      degree: 'BE - Computer Science Engineering',
      details: 'CGPA: 8.14*',
      year: '2027',
      icon: '🎓',
    },
    {
      degree: 'HSC – State Board',
      details: 'Percentage: 89.5%',
      year: '2023',
      icon: '📚',
    },
    {
      degree: 'SSLC - Matriculation',
      details: 'ALL PASS',
      year: '2021',
      icon: '📜',
    }
  ];

  return (
    <section id="academic" className="py-14 bg-black relative">
      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline">
            Academic Background
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 transform md:-translate-x-1/2"></div>

          <div className="space-y-6 md:space-y-12 relative">
            {academicData.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                data-aos-delay={index * 100}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-6' : 'md:pr-6'} flex justify-center`}>
                  <motion.div 
                    className="bg-blue-200/10 backdrop-blur-md p-4 rounded-2xl border border-blue-400/30 shadow-md shadow-blue-400/10 transition-all duration-500 w-full max-w-xs md:max-w-md hover:shadow-blue-400/30"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: '0 0 25px rgba(0, 191, 255, 0.4)',
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1">{item.degree}</h3>
                    <p className="text-gray-300 text-sm mb-1">{item.details}</p>
                    <p className="text-cyan-400 font-medium text-sm">Year of Passing: {item.year}</p>
                  </motion.div>
                </div>
                
                {/* Timeline node */}
                <div 
                  className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full blue-gradient transform md:-translate-x-1/2 z-10"
                  style={{ boxShadow: '0 0 15px #00BFFF' }}
                >
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full blue-gradient opacity-30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;
