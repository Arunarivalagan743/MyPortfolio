import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBookOpen, HiDocumentText } from 'react-icons/hi';

const AcademicSection = () => {
  const academicData = [
    {
      degree: 'BE - Computer Science Engineering',
      institution: 'Sri Shakthi Institute of Engineering and Technology',
      details: 'CGPA: 8.29',
      year: '2027',
      icon: <HiAcademicCap className="w-7 h-7" />,
      color: 'from-blue-600 to-blue-400',
         location: 'Coimbatore, India'
    },
    {
      degree: 'Higher Secondary (Computer Science)',
      institution: 'TNSS Gandhiji Vidhyalaya Higher Secondary School',
      details: 'Percentage: 89.5%',
      year: '2023',
      icon: <HiBookOpen className="w-7 h-7" />,
      color: 'from-green-600 to-green-400',
      location: 'Tirupur, India'
    },
  ];

  return (
    <section id="academic" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 -top-32 sm:-top-40 md:-top-48 -right-32 sm:-right-40 md:-right-48 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 -bottom-32 sm:-bottom-40 md:-bottom-48 -left-32 sm:-left-40 md:-left-48 rounded-full bg-indigo-500/5 blur-3xl"></div>
      
      {/* Decorative grid pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(#00BFFF_1px,transparent_1px),linear-gradient(to_right,#00BFFF_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">Academic</span> Qualifications
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl w-full">
            {academicData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Education card */}
              <motion.div
                className="group relative bg-white backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 h-full overflow-hidden"
                whileHover={{ 
                  y: -3,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background accent */}
                <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br opacity-10"></div>
                
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl mb-4 sm:mb-5 bg-gradient-to-r ${item.color} bg-opacity-10`}>
                  <div className="text-white text-xl sm:text-2xl">
                    {item.icon}
                  </div>
                </div>
                
                {/* Year marker */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-blue-100 to-cyan-100 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium text-cyan-600">
                  {item.year}
                </div>
                
                {/* Content */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                    {item.degree}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.institution}</p>
                  {item.location && <p className="text-gray-500 text-xs">{item.location}</p>}
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <p className="flex items-center text-cyan-600 font-medium text-xs sm:text-sm md:text-base">
                      {item.details}
                    </p>
                  </div>
                </div>
                
                {/* Animated corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-500 to-transparent opacity-20 transform rotate-45 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500"></div>
                </div>
              </motion.div>
              
              {/* Sequential numbering */}
              <div className="absolute -top-3 sm:-top-4 -left-2 md:-left-4 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 border-2 border-white">
                {index + 1}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
      
      {/* Bottom decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
};

export default AcademicSection;