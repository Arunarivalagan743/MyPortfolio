
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAward, 
  FaGraduationCap, 
  FaCode, 
  FaExternalLinkAlt,
  FaChevronLeft,
  FaGithub, 
  FaChevronRight,
  FaBriefcase,
  FaBuilding, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTools, 
  FaLightbulb,
  FaTshirt,
  FaHotel
} from 'react-icons/fa';
import { SiCoursera, SiUdemy, SiFreecodecamp, SiGoogle} from 'react-icons/si';

import { SiNvidia } from 'react-icons/si'; // Using SiNvidia as a replacement for NPTEL

// Work experience data
const workExperiences = [
 
  {
    id: 3,
    role: "Frontend Developer – User Module Consultant",
    company: "La Patisserie, Coimbatore (Remote – Freelance)",
    logo: "/assets/lapatisserie.png",
    period: "Sep 2025 – Nov 2025",
    location: "Remote",
    type: "Freelance",
    website: "https://lapatisserie.shop",
    description: "Developed a modern, responsive online bakery platform enabling seamless browsing and ordering of 30+ products. Implemented advanced cart, favorites, and recently viewed features with React Context and optimized state management. Integrated secure user authentication, payment gateways, and real-time order tracking. Enhanced frontend performance and accessibility, reducing page load times and improving mobile usability.",
    achievements: [
      "Built a bakery e-commerce platform with React.js and Tailwind CSS",
      "Advanced cart, favorites, and recently viewed features using Context API",
      "Integrated secure authentication and payment gateways",
      "Enabled real-time order tracking for users",
      "Improved accessibility and mobile performance",
      "Live at: la-patisserie-nine.vercel.app"
    ],
    skills: ["React.js", "Tailwind CSS", "Context API", "Payment Integration", "Accessibility", "Performance Optimization"],
    color: "#F59E42"
  },
   {
    id: 1,
    role: "Frontend Engineer",
    company: "Luxor Holiday Homestays",
    logo: "/assets/luxor.png",
    period: "Jun 2025 - Aug 2025",
    location: "Chennai, India",
    type: "Full-time",
    website: "https://www.luxorholidayhomestays.com/",
    description: "Leading the digital transformation of Luxor Holiday Homestays, an exclusive chain of premium vacation properties across Tamil Nadu's most scenic destinations.",
    achievements: [
      "Developed and launched a responsive booking platform that increased direct bookings and reduced dependency on third-party platforms",
      "Implemented an integrated property management system that streamlined operations across multiple properties",
      "Designed an interactive virtual tour feature that increased website engagement",
      "Created a customer loyalty program that resulted in repeat bookings"
    ],
    skills: ["React", "Node.js", "MongoDB", "AWS", "UI/UX Design", "Payment Gateway Integration"],
    color: "#1E40AF"
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "Casual Clothings",
    logo: "/assets/clothing.png",
    period: "Mar 2025 - May 2025",
    location: "Tirupur, India",
    type: "Full-time",
    website: "https://www.casualclothings.shop/",
    description: "Spearheaded the digital presence for Casual Clothings, a premium casual wear brand known for its exceptional quality and contemporary designs.",
    achievements: [
      "Launched a fully responsive e-commerce platform with integrated inventory management system",
      "Implemented personalized recommendation engine that increased average order value",
      "Developed a virtual try-on feature using AR technology that reduced return rates",
      "Optimized checkout process resulting in reduction in cart abandonment"
    ],
    skills: ["React", "Node.js", "MongoDB", "AWS", "UI/UX Design", "Payment Gateway Integration"],
    color: "#0D9488"
  },

];

// Certifications data
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

// Component for Work Experience Timeline
const WorkExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px "></div>
      <div className="absolute bottom-0 left-0 right-0 h-px "></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 "></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 "></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="relative inline-block mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-center gap-2 sm:gap-3">
              <FaBriefcase className="text-blue-400 text-xl sm:text-2xl md:text-3xl" />
              <span className="text-center">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Experience</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-zinc-400 text-center max-w-2xl text-sm sm:text-base px-4">
            My professional journey working with premium brands and delivering exceptional digital experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - Hidden on mobile, visible on tablet+ */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-teal-500/30 to-blue-500/30 transform md:translate-x-px"></div>
          
          {/* Experience cards */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12 relative">
            {workExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative pl-8 sm:pl-10 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-8 lg:pr-12 md:ml-0' : 'md:pl-8 lg:pl-12 md:ml-auto'
                }`}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute top-0 left-0 sm:left-1 md:left-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-gray-900 z-10"
                  style={{ backgroundColor: exp.color, right: index % 2 === 0 ? 'auto' : 'auto', left: index % 2 === 0 ? '0.5rem' : 'auto', [index % 2 === 0 ? 'right' : 'left']: window.innerWidth >= 768 ? '-2.5px' : 'auto' }}
                ></div>
                
                {/* Card */}
                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700 hover:border-opacity-80 shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden group">
                  {/* Product Image Header */}
                  {exp.logo && (
                    <div 
                      className="relative h-40 sm:h-48 md:h-56 lg:h-64 w-full overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (exp.website) {
                          window.open(exp.website, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60"></div>
                      {exp.website && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center px-4">
                            <FaExternalLinkAlt className="text-white text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 mx-auto" />
                            <p className="text-white font-semibold text-xs sm:text-sm md:text-base">Visit Website</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Company logo/icon */}
                      <div 
                        className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                        style={{ backgroundColor: `${exp.color}25` }}
                      >
                        {exp.company === "Luxor Holiday Homestays" ? (
                          <FaHotel className="text-xl sm:text-2xl" style={{ color: exp.color }} />
                        ) : exp.company === "Casual Clothings" ? (
                          <FaTshirt className="text-xl sm:text-2xl" style={{ color: exp.color }} />
                        ) : (
                          <FaCode className="text-xl sm:text-2xl" style={{ color: exp.color }} />
                        )}
                      </div>
                    
                    {/* Role and company */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{exp.role}</h3>
                      <div className="text-sm sm:text-base md:text-lg font-medium flex flex-wrap items-center gap-2 mt-1" style={{ color: exp.color }}>
                        <span>{exp.company}</span>
                        {exp.website && (
                          <a 
                            href={exp.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-1.5 text-xs px-2 py-1 rounded-md bg-opacity-20 hover:bg-opacity-30 transition-all"
                            style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                            aria-label={`Visit ${exp.company} website`}
                          >
                            <span className="hidden sm:inline">Visit</span> <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-700/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <FaCalendarAlt className="text-blue-400 text-xs" />
                      <span className="text-gray-300 text-xs sm:text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-700/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <FaMapMarkerAlt className="text-teal-400 text-xs" />
                      <span className="text-gray-300 text-xs sm:text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-700/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <FaBuilding className="text-purple-400 text-xs" />
                      <span className="text-gray-300 text-xs sm:text-sm">{exp.type}</span>
                    </div>
                    {exp.website && (
                      <a 
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 sm:gap-1.5 bg-gray-700/50 hover:bg-gray-600/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors"
                      >
                        <FaExternalLinkAlt className="text-cyan-400 text-xs" />
                        <span className="text-gray-300 text-xs sm:text-sm">Website</span>
                      </a>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Key achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                      <FaLightbulb className="text-yellow-500 text-sm sm:text-base" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-2 text-gray-300 text-xs sm:text-sm leading-relaxed">
                          <span className="text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                      <FaTools className="text-teal-400 text-sm sm:text-base" />
                      Technologies & Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md"
                          style={{ 
                            backgroundColor: `${exp.color}20`, 
                            color: exp.color,
                            border: `1px solid ${exp.color}40`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Certificates Section Component 
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
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-center gap-2 sm:gap-3 px-4">
              <FaAward className="text-cyan-400 text-xl sm:text-2xl md:text-3xl" />
              <span className="text-center">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Certificates</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-zinc-400 mt-4 sm:mt-6 text-center max-w-2xl text-sm sm:text-base px-4">
            Professional certifications and achievements that showcase my expertise and continuous learning journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 relative ${
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
                className="absolute left-0 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
                aria-label="Previous certificate"
              >
                <FaChevronLeft className="text-sm sm:text-base" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
                aria-label="Next certificate"
              >
                <FaChevronRight className="text-sm sm:text-base" />
              </button>
            </>
          )}

          <div className="overflow-hidden px-1 sm:px-0">
            <motion.div 
              className="flex gap-3 sm:gap-4 md:gap-6"
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
                  className="min-w-full md:min-w-[calc(33.33%-1rem)] bg-zinc-900/80 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800 backdrop-blur-sm hover:border-cyan-500/30 transition-colors duration-300 shadow-lg group cursor-pointer"
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
                    <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-20 flex items-center gap-1.5 sm:gap-2">
                      <div className="p-1.5 sm:p-2 rounded-full" style={{ backgroundColor: `${certificate.color}30` }}>
                        <certificate.icon 
                          style={{ color: certificate.color }} 
                          className="text-base sm:text-lg md:text-xl" 
                        />
                      </div>
                      <span className="text-xs font-medium bg-zinc-800/70 backdrop-blur-sm text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        {certificate.organization}
                      </span>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 z-20">
                      <span className="text-xs bg-zinc-800/70 backdrop-blur-sm text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        {certificate.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-1">
                      {certificate.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-zinc-800 text-cyan-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="text-xs bg-zinc-800 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <span className="text-xs text-gray-400">Click to view details</span>
                      <FaExternalLinkAlt className="text-cyan-400 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
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

// Combined component that exports both sections
const ExperienceTimeline = () => {
  return (
    <>
      <WorkExperienceSection />
      <CertificatesSection />
    </>
  );
};

export default ExperienceTimeline;