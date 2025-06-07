import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBookOpen, HiDocumentText } from 'react-icons/hi';

const AcademicSection = () => {
  const academicData = [
    {
      degree: 'BE - Computer Science Engineering',
      institution: 'Sri Shakthi Institute of Engineering and Technology',
      details: 'CGPA: 8.14',
      year: '2027',
      icon: <HiAcademicCap className="w-7 h-7" />,
      color: 'from-blue-600 to-blue-400',
    },
    {
      degree: 'HSC – State Board',
      institution: 'Gandhi Vidhyalaya Matric Higher Secondary School',
      details: 'Percentage: 89.5%',
      year: '2023',
      icon: <HiBookOpen className="w-7 h-7" />,
      color: 'from-cyan-500 to-cyan-300',
    },
  
  ];

  return (
    <section id="academic" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 -top-48 -right-48 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute w-96 h-96 -bottom-48 -left-48 rounded-full bg-indigo-500/5 blur-3xl"></div>
      
      {/* Decorative grid pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(#00BFFF_1px,transparent_1px),linear-gradient(to_right,#00BFFF_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Academic</span> Qualifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
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
                className="group relative bg-zinc-900/80 backdrop-blur-lg rounded-xl p-6 border border-zinc-800 shadow-lg h-full overflow-hidden"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 191, 255, 0.1)',
                  borderColor: 'rgba(0, 191, 255, 0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background accent */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-10"></div>
                
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-5 bg-gradient-to-r ${item.color} bg-opacity-10`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                
                {/* Year marker */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-cyan-300">
                  {item.year}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.degree}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.institution}</p>
                  <div className="pt-2 mt-2 border-t border-zinc-800/50">
                    <p className="flex items-center text-cyan-400 font-medium">
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
              <div className="absolute -top-4 -left-2 md:-left-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 border-2 border-zinc-900">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
};

export default AcademicSection;