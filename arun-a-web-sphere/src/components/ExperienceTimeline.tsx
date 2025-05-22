import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiExternalLink, FiAward } from 'react-icons/fi';

// Adjust path relative to this file
const udemyWebImage = "/assets/udemyWeb.jpg";
const githubFoundationImage = "/assets/githubFoundationImage.png";

const certifications = [
  {
    title: 'Web Development Bootcamp by Angela Yu',
    date: 'Nov 2024',
    description: 'Completed comprehensive full-stack web development course covering HTML, CSS, JavaScript, Node.js, React, MongoDB, etc.',
    certificateLink: 'https://udemy-certificate.s3.amazonaws.com/image/UC-65fc7142-cfad-4ba7-b1b7-1de0bc064198.jpg',
    certificateImage: udemyWebImage,
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB'],
    bgColorClass: 'from-blue-600/20 to-cyan-500/20',
    iconColorClass: 'text-blue-400',
  },
  {
    title: 'GitHub Foundation Badge',
    date: 'May 2025',
    description: 'Earned GitHub Foundation Badge demonstrating proficiency in GitHub workflows and collaboration tools.',
    certificateLink: 'https://www.credly.com/badges/ddd1e9be-a341-479e-870c-bc8c47cc721f/public_url',
    certificateImage: githubFoundationImage,
    skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
    bgColorClass: 'from-purple-600/20 to-indigo-500/20',
    iconColorClass: 'text-purple-400',
  },
];

const CertificationTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
      </div>
      
     

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Professional</span> Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          <p className="text-gray-400 mt-6 text-center max-w-2xl">
            Credentials that validate my expertise and commitment to continuous learning in the technology field.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-500/80 via-cyan-500/50 to-transparent"></div>

          <div className="space-y-12 relative">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Date section */}
                <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center items-start">
                  <motion.div 
                    className={`bg-gradient-to-br ${cert.bgColorClass} backdrop-blur-md px-5 py-2 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiCalendar className={cert.iconColorClass} />
                    <span className="text-white font-medium">{cert.date}</span>
                  </motion.div>
                </div>

                {/* Content section - the main certificate card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                  <motion.div
                    className="relative bg-zinc-900/80 backdrop-blur-lg rounded-xl border border-zinc-800 shadow-lg overflow-hidden"
                    whileHover={{ 
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 191, 255, 0.1)',
                      borderColor: 'rgba(0, 191, 255, 0.3)',
                    }}
                    layoutId={`cert-container-${index}`}
                  >
                    {/* Card header */}
                    <div className={`bg-gradient-to-r ${cert.bgColorClass} px-6 py-4`}>
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold text-white"
                        layoutId={`cert-title-${index}`}
                      >
                        {cert.title}
                      </motion.h3>
                    </div>

                    {/* Card content */}
                    <div className="p-6">
                      <p className="text-gray-300 mb-4">{cert.description}</p>
                      
                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="bg-blue-500/10 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Preview and toggle button */}
                      <div className="flex justify-between items-center">
                        <motion.button
                          className="text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors"
                          onClick={() => toggleExpand(index)}
                          whileHover={{ x: expandedIndex === index ? -5 : 5 }}
                        >
                          {expandedIndex === index ? 'Hide Preview' : 'View Preview'}
                          <FiArrowRight className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`} />
                        </motion.button>
                        
                        <a 
                          href={cert.certificateLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-blue-500/30"
                        >
                          <FiExternalLink /> 
                          Verify
                        </a>
                      </div>
                      
                      {/* Expandable certificate preview */}
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-zinc-800 pt-4">
                              <motion.img 
                                src={cert.certificateImage} 
                                alt="Certificate" 
                                className="rounded-md w-full h-auto border border-zinc-700 shadow-md"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 top-4 md:top-6 transform md:-translate-x-1/2 z-10">
                  <motion.div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </motion.div>
                  {/* Pulsing effect */}
                  <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-30"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Decorative badge icon at bottom */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
            }}
          >
            <FiAward className="text-3xl text-blue-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationTimeline;