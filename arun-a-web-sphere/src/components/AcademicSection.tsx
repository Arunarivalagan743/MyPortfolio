import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiAcademicCap, HiBookOpen, HiDocumentText, HiBadgeCheck, HiX, HiExternalLink } from 'react-icons/hi';
import { SiMongodb, SiCoursera, SiUdemy } from 'react-icons/si';
import { FaGithub, FaJava } from 'react-icons/fa';

const AcademicSection = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Certificates" },
    { id: "development", name: "Web Development" },
    { id: "computer-science", name: "Computer Science" },
    { id: "data-science", name: "Data Science" }
  ];

  const certifications = [
    {
      title: 'Supervised Machine Learning: Regression and Classification',
      issuer: 'DeepLearning.AI & Stanford University (Coursera)',
      date: 'January 2026',
      credentialId: '0K4JFAXQ6LK7',
      icon: <SiCoursera className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-400',
      verifyUrl: 'https://coursera.org/verify/0K4JFAXQ6LK7',
      image: '/assets/Coursera_machine_learning_page-0001.jpg',
      category: 'data-science',
      description: 'Completed Stanford University\'s machine learning course covering regression, classification, and neural networks.',
      skills: ['Machine Learning', 'Python', 'Regression', 'Classification']
    },
    {
      title: 'MongoDB Node.js Developer Path',
      issuer: 'MongoDB, Inc',
      date: 'January 2026',
      credentialId: 'MDBbksh82vax3',
      icon: <SiMongodb className="w-6 h-6" />,
      color: 'from-green-600 to-green-400',
      verifyUrl: '#',
      image: '/assets/MongodbNodedeveloperpath.jpg',
      category: 'development',
      description: 'Completed MongoDB Node.js Developer certification demonstrating expertise in MongoDB with Node.js applications.',
      skills: ['MongoDB', 'Node.js', 'Database Design', 'Aggregation']
    },
    {
      title: 'Web Development Bootcamp',
      issuer: 'Udemy',
      date: 'November 2024',
      credentialId: 'UC-65fc7142',
      icon: <SiUdemy className="w-6 h-6" />,
      color: 'from-purple-600 to-purple-400',
      verifyUrl: 'https://udemy-certificate.s3.amazonaws.com/image/UC-65fc7142-cfad-4ba7-b1b7-1de0bc064198.jpg',
      image: '/assets/udemyWeb.jpg',
      category: 'development',
      description: 'Completed comprehensive full-stack web development course covering HTML, CSS, JavaScript, Node.js, React, MongoDB.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    },
    {
      title: 'GitHub Foundation Badge',
      issuer: 'GitHub',
      date: 'May 2025',
      credentialId: 'ddd1e9be-a341',
      icon: <FaGithub className="w-6 h-6" />,
      color: 'from-gray-700 to-gray-500',
      verifyUrl: 'https://www.credly.com/badges/ddd1e9be-a341-479e-870c-bc8c47cc721f/public_url',
      image: '/assets/GitHubFoundations_Badge20250515-27-s3007i_page-0001.jpg',
      category: 'development',
      description: 'Earned GitHub Foundation Badge demonstrating proficiency in GitHub workflows and collaboration tools.',
      skills: ['Git', 'GitHub', 'Version Control', 'Collaboration']
    },
    {
      title: 'Programming in Java',
      issuer: 'NPTEL',
      date: 'April 2024',
      credentialId: 'NPTEL24CS',
      icon: <FaJava className="w-6 h-6" />,
      color: 'from-orange-600 to-red-500',
      verifyUrl: '#',
      image: '/assets/npteljava.jpg',
      category: 'computer-science',
      description: 'Successfully completed the NPTEL certification course in Java programming with focus on object-oriented development.',
      skills: ['Java', 'OOP', 'Data Structures', 'Algorithm Implementation']
    }
  ];

  const filteredCertifications = certifications.filter(cert => 
    selectedCategory === "all" || cert.category === selectedCategory
  );

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

        {/* Certifications Section */}
        <motion.div 
          className="flex flex-col items-center mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            <HiBadgeCheck className="text-cyan-500" />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">My Certifications</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          <p className="text-gray-600 mt-4 sm:mt-5 md:mt-6 text-center max-w-2xl text-sm sm:text-base px-4">
            Professional certifications and achievements that showcase my expertise and continuous learning journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 md:mb-12">
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl w-full">
            <AnimatePresence mode="popLayout">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative"
                >
                  <motion.div
                    className="group relative bg-white backdrop-blur-lg rounded-xl overflow-hidden border border-gray-100 hover:border-cyan-200 transition-colors cursor-pointer h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedCert(certifications.findIndex(c => c.title === cert.title))}
                  >
                    {/* Certificate Image */}
                    <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Date marker */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-cyan-600">
                        {cert.date}
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-cyan-500/90 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white capitalize">
                        {cert.category.replace('-', ' ')}
                      </div>
                      
                      {/* View button */}
                      <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-cyan-500 hover:bg-cyan-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Certificate
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-5">
                      {/* Icon container */}
                      <div className={`inline-flex items-center justify-center p-1.5 sm:p-2 md:p-2.5 rounded-lg mb-2 sm:mb-3 bg-gradient-to-r ${cert.color}`}>
                        <div className="text-white text-base sm:text-lg md:text-xl">
                          {cert.icon}
                        </div>
                      </div>
                      
                      <div className="space-y-1 sm:space-y-1.5">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 text-[10px] sm:text-xs">{cert.issuer}</p>
                        <p className="text-gray-500 text-[10px] sm:text-xs line-clamp-2">{cert.description}</p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 pt-2">
                          {cert.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[8px] sm:text-[10px]">
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="px-1.5 sm:px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-[8px] sm:text-[10px]">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between">
                          <p className="text-gray-400 text-[9px] sm:text-[10px] truncate max-w-[60%]">
                            ID: {cert.credentialId}
                          </p>
                          {cert.verifyUrl !== '#' && (
                            <a 
                              href={cert.verifyUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-[10px] sm:text-xs font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Verify <HiExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Badge icon */}
                  <div className="absolute -top-2 sm:-top-3 -left-1 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 border-2 border-white z-10">
                    <HiBadgeCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Certificate Image Modal */}
        <AnimatePresence>
          {selectedCert !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <HiX className="w-5 h-5 text-gray-700" />
                </button>
                <img
                  src={certifications[selectedCert].image}
                  alt={certifications[selectedCert].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-white border-t">
                  <h3 className="font-bold text-gray-900">{certifications[selectedCert].title}</h3>
                  <p className="text-sm text-gray-600">{certifications[selectedCert].issuer}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
};

export default AcademicSection;