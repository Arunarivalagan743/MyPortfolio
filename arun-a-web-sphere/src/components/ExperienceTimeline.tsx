// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiArrowRight, FiCalendar, FiExternalLink, FiAward } from 'react-icons/fi';

// // Adjust path relative to this file
// const udemyWebImage = "/assets/udemyWeb.jpg";
// const githubFoundationImage = "/assets/githubFoundationImage.png";

// const certifications = [
//   {
//     title: 'Web Development Bootcamp by Angela Yu',
//     date: 'Nov 2024',
//     description: 'Completed comprehensive full-stack web development course covering HTML, CSS, JavaScript, Node.js, React, MongoDB, etc.',
//     certificateLink: 'https://udemy-certificate.s3.amazonaws.com/image/UC-65fc7142-cfad-4ba7-b1b7-1de0bc064198.jpg',
//     certificateImage: udemyWebImage,
//     skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB'],
//     bgColorClass: 'from-blue-600/20 to-cyan-500/20',
//     iconColorClass: 'text-blue-400',
//   },
//   {
//     title: 'GitHub Foundation Badge',
//     date: 'May 2025',
//     description: 'Earned GitHub Foundation Badge demonstrating proficiency in GitHub workflows and collaboration tools.',
//     certificateLink: 'https://www.credly.com/badges/ddd1e9be-a341-479e-870c-bc8c47cc721f/public_url',
//     certificateImage: githubFoundationImage,
//     skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
//     bgColorClass: 'from-purple-600/20 to-indigo-500/20',
//     iconColorClass: 'text-purple-400',
//   },
// ];

// const CertificationTimeline: React.FC = () => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

//   const toggleExpand = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <section id= "skills" className="py-20 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden opacity-20">
//         <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
//       </div>
      
     

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div 
//           className="flex flex-col items-center mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//             <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white flex items-center gap-3">
//             <span>
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Certifi</span>
//               <span className="text-white">cations</span>
//             </span> 
//             </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
//           <p className="text-gray-400 mt-6 text-center max-w-2xl">
//             Credentials that validate my expertise and commitment to continuous learning in the technology field.
//           </p>
//         </motion.div>

//         <div className="relative">
//           {/* Timeline vertical line */}
//           <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-500/80 via-cyan-500/50 to-transparent"></div>

//           <div className="space-y-12 relative">
//             {certifications.map((cert, index) => (
//               <motion.div 
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                 className={`relative flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
//               >
//                 {/* Date section */}
//                 <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center items-start">
//                   <motion.div 
//                     className={`bg-gradient-to-br ${cert.bgColorClass} backdrop-blur-md px-5 py-2 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg`}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <FiCalendar className={cert.iconColorClass} />
//                     <span className="text-white font-medium">{cert.date}</span>
//                   </motion.div>
//                 </div>

//                 {/* Content section - the main certificate card */}
//                 <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
//                   <motion.div
//                     className="relative bg-zinc-900/80 backdrop-blur-lg rounded-xl border border-zinc-800 shadow-lg overflow-hidden"
//                     whileHover={{ 
//                       boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 191, 255, 0.1)',
//                       borderColor: 'rgba(0, 191, 255, 0.3)',
//                     }}
//                     layoutId={`cert-container-${index}`}
//                   >
//                     {/* Card header */}
//                     <div className={`bg-gradient-to-r ${cert.bgColorClass} px-6 py-4`}>
//                       <motion.h3 
//                         className="text-xl md:text-2xl font-bold text-white"
//                         layoutId={`cert-title-${index}`}
//                       >
//                         {cert.title}
//                       </motion.h3>
//                     </div>

//                     {/* Card content */}
//                     <div className="p-6">
//                       <p className="text-gray-300 mb-4">{cert.description}</p>
                      
//                       {/* Skills tags */}
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {cert.skills.map((skill, skillIndex) => (
//                           <span 
//                             key={skillIndex} 
//                             className="bg-blue-500/10 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/20"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
                      
//                       {/* Preview and toggle button */}
//                       <div className="flex justify-between items-center">
//                         <motion.button
//                           className="text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors"
//                           onClick={() => toggleExpand(index)}
//                           whileHover={{ x: expandedIndex === index ? -5 : 5 }}
//                         >
//                           {expandedIndex === index ? 'Hide Preview' : 'View Preview'}
//                           <FiArrowRight className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`} />
//                         </motion.button>
                        
//                         <a 
//                           href={cert.certificateLink} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-blue-500/30"
//                         >
//                           <FiExternalLink /> 
//                           Verify
//                         </a>
//                       </div>
                      
//                       {/* Expandable certificate preview */}
//                       <AnimatePresence>
//                         {expandedIndex === index && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="overflow-hidden"
//                           >
//                             <div className="mt-4 border-t border-zinc-800 pt-4">
//                               <motion.img 
//                                 src={cert.certificateImage} 
//                                 alt="Certificate" 
//                                 className="rounded-md w-full h-auto border border-zinc-700 shadow-md"
//                                 initial={{ y: 20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.2 }}
//                               />
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Timeline node */}
//                 <div className="absolute left-0 md:left-1/2 top-4 md:top-6 transform md:-translate-x-1/2 z-10">
//                   <motion.div 
//                     className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30`}
//                     whileHover={{ scale: 1.2 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     <div className="w-2 h-2 rounded-full bg-white"></div>
//                   </motion.div>
//                   {/* Pulsing effect */}
//                   <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-30"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
        
//         {/* Decorative badge icon at bottom */}
//         <div className="flex justify-center mt-16">
//           <motion.div
//             className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30"
//             whileHover={{ 
//               scale: 1.1,
//               boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
//             }}
//           >
//             <FiAward className="text-3xl text-blue-400" />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CertificationTimeline;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAward, 
  FaGraduationCap, 
  FaCode, 
  FaExternalLinkAlt,
  FaChevronLeft,
  FaGithub, 
  FaChevronRight
} from 'react-icons/fa';
import { SiCoursera, SiUdemy, SiFreecodecamp, SiGoogle} from 'react-icons/si';

import { SiNvidia } from 'react-icons/si'; // Using SiNvidia as a replacement for NPTEL

// Replace the existing certifications array with this one
const certifications = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    organization: "Udemy",
    date: "November 2024",
    icon: SiUdemy,
    color: "#A435F0",
    image: "/assets/udemyWeb.jpg",
    category: "development",
    description: "Completed comprehensive full-stack web development course covering HTML, CSS, JavaScript, Node.js, React, MongoDB, etc.",
    verificationUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-65fc7142-cfad-4ba7-b1b7-1de0bc064198.jpg",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "MongoDB"]
  },
  {
    id: 2,
    title: "GitHub Foundation Badge",
    organization: "GitHub",
    date: "May 2025",
    icon: FaGithub,
    color: "#2EA44F",
    image: "assets/GitHubFoundations_Badge20250515-27-s3007i_page-0001.jpg",
    category: "development",
    description: "Earned GitHub Foundation Badge demonstrating proficiency in GitHub workflows and collaboration tools.",
    verificationUrl: "https://www.credly.com/badges/ddd1e9be-a341-479e-870c-bc8c47cc721f/public_url",
    skills: ["Git", "GitHub", "Version Control", "Collaboration"]
  },
  {
    id: 3,
    title: "Programming in Java",
    organization: "NPTEL",
    date: "April 2024",
    icon: SiNvidia, // Using SiNvidia as a replacement icon for NPTEL
    color: "#1A73E8",
    image: "/assets/npteljava.jpg",
    category: "computer-science",
    description: "Successfully completed the NPTEL certification course in Java programming with focus on object-oriented development principles.",
  
    skills: ["Java", "OOP", "Data Structures", "Algorithm Implementation"]
  },

 
];

const categories = [
  { id: "all", name: "All Certificates" },
  { id: "development", name: "Web Development" },
  { id: "computer-science", name: "Computer Science" },
  { id: "design", name: "Design" },
  { id: "data-science", name: "Data Science" }
];

const CertificatesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter certificates based on selected category
  const filteredCertificates = selectedCategory === "all" 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  // Open certificate detail modal
  const openCertificateDetail = (cert) => {
    setSelectedCertificate(cert);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close certificate detail modal
  const closeModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Handle carousel navigation
  const nextSlide = () => {
    if (currentIndex < filteredCertificates.length - (isMobile ? 1 : 3)) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to beginning
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCertificates.length - (isMobile ? 1 : 3)); // Loop to end
    }
  };

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header with Animated Underline */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
              <FaAward className="text-cyan-400" />
              <span>My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Certificates</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-zinc-400 mt-6 text-center max-w-2xl">
            Professional certifications and achievements that showcase my expertise and continuous learning journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                selectedCategory === category.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentIndex(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedCategory === category.id && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full -z-10"
                  layoutId="categoryBackground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Certificate Carousel */}
        <div className="relative">
          {filteredCertificates.length > (isMobile ? 1 : 3) && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
                aria-label="Previous certificate"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
                aria-label="Next certificate"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{
                translateX: isMobile 
                  ? `calc(-${currentIndex * 100}%)`
                  : `calc(-${currentIndex * (100 / 3)}%)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {filteredCertificates.map(certificate => (
                <motion.div
                  key={certificate.id}
                  className="min-w-full md:min-w-[calc(33.33%-1rem)] bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800 backdrop-blur-sm hover:border-cyan-500/30 transition-colors duration-300 shadow-lg group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openCertificateDetail(certificate)}
                >
                  {/* Certificate Image with Overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60 z-10"></div>
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${certificate.color}30` }}>
                        <certificate.icon 
                          style={{ color: certificate.color }} 
                          className="text-xl" 
                        />
                      </div>
                      <span className="text-xs font-medium bg-zinc-800/70 backdrop-blur-sm text-white px-2 py-1 rounded-md">
                        {certificate.organization}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="text-xs bg-zinc-800/70 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-md">
                        {certificate.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                      {certificate.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-zinc-800 text-cyan-300 px-2 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-md">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <span className="text-xs text-gray-400">Click to view details</span>
                      <FaExternalLinkAlt className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        {filteredCertificates.length > (isMobile ? 1 : 3) && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ 
              length: Math.ceil(filteredCertificates.length / (isMobile ? 1 : 3))
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / (isMobile ? 1 : 3)) === index
                    ? 'bg-cyan-400 w-6'
                    : 'bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index * (isMobile ? 1 : 3))}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Certificate Detail Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-zinc-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Certificate Header */}
                <div className="relative aspect-video">
                  <img 
                    src={selectedCertificate.image} 
                    alt={selectedCertificate.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent">
                    <button 
                      className="absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700 text-white p-2 rounded-full backdrop-blur-sm"
                      onClick={closeModal}
                      aria-label="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full" style={{ backgroundColor: `${selectedCertificate.color}30` }}>
                        <selectedCertificate.icon 
                          style={{ color: selectedCertificate.color }} 
                          className="text-2xl" 
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-cyan-400">{selectedCertificate.organization}</div>
                        <h2 className="text-2xl font-bold text-white">{selectedCertificate.title}</h2>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5">
                        <FaGraduationCap className="text-cyan-400" />
                        <span className="text-gray-300 text-sm">{selectedCertificate.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg text-white font-medium mb-2">Skills Acquired</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="text-sm bg-zinc-800 text-cyan-300 px-3 py-1.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 my-6"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Certificate ID: CERT-{selectedCertificate.id.toString().padStart(4, '0')}
                      </div>
                      
                      <a
                        href={selectedCertificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                      >
                        <span>Verify Certificate</span>
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Floating Badge Decorations */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <style >{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .writing-vertical-lr {
            writing-mode: vertical-lr;
          }
          
          .writing-vertical-rl {
            writing-mode: vertical-rl;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificatesSection;