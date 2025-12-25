
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
import { useIsMobile } from '@/hooks/use-mobile';

import { SiNvidia } from 'react-icons/si'; // Using SiNvidia as a replacement for NPTEL

// Work experience data
const workExperiences = [
 
  {
    id: 3,
    role: "Full Stack Developer – Desserts Platform (User & Admin Consultant)",
    company: "La Patisserie, Coimbatore",
    logo: "/assets/lapatisserie.png",
    period: "Sep 2025 – Nov 2025",
    location: "Remote",
    type: "Freelance",
    website: "https://thelapatisserie.vercel.app",
    description: "Designed and deployed a MERN-based e-commerce platform with clearly separated user and admin workflows. Implemented product listings, cart, wishlist, order management, and RESTful backend APIs.",
    achievements: [
      "Built MERN-based e-commerce platform with user and admin workflows",
      "Implemented product listings, cart, wishlist, and order management",
      "Built admin-configurable delivery zone validation",
      "Integrated Razorpay payment gateway",
      "Deployed to production: thelapatisserie.vercel.app"
    ],
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "Razorpay", "REST APIs"],
    color: "#F59E42"
  },
   {
    id: 1,
    role: "Frontend Developer – Villa Booking Platform (User Modules Consultant)",
    company: "Luxor Holiday Homestays, Chennai",
    logo: "/assets/luxor.png",
    period: "Jun 2025 – Aug 2025",
    location: "Chennai, India",
    type: "Full-time",
    website: "https://www.luxorholidayhomestays.com/",
    description: "Developed the React frontend including homepage, villa listings, detail pages, and contact modules. Created reusable UI components and managed state for smooth navigation and user experience.",
    achievements: [
      "Developed React frontend with homepage and villa listings",
      "Created reusable UI components for smooth navigation",
      "Optimized image loading and search performance",
      "Improved page load times significantly"
    ],
    skills: ["React", "Tailwind CSS", "UI/UX Design", "Performance Optimization"],
    color: "#1E40AF"
  },
  {
    id: 2,
    role: "Full Stack Developer – Clothing Platform (User & Admin Consultant)",
    company: "Casual Clothings Fashion Pvt Ltd, Tirupur",
    logo: "/assets/clothing.png",
    period: "Jan 2025 – May 2025",
    location: "Tirupur, India",
    type: "Full-time",
    website: "https://www.casualclothings.shop/",
    description: "Built a MERN-based clothing and T-shirt ordering platform with role-based admin controls. Implemented inventory management, order lifecycle tracking, and product CRUD operations.",
    achievements: [
      "Built MERN-based clothing platform with admin controls",
      "Implemented inventory and order lifecycle tracking",
      "Developed bulk and custom order workflows",
      "Supported large-scale purchases at casualclothings.shop"
    ],
    skills: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs", "Admin Dashboard"],
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
    <section id="experience" className="py-8 sm:py-12 md:py-16 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px "></div>
      <div className="absolute bottom-0 left-0 right-0 h-px "></div>
      
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-5 sm:mb-8 md:mb-12"
        >
          <div className="relative inline-block mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5 sm:gap-2">
              <FaBriefcase className="text-blue-500 text-lg sm:text-xl md:text-2xl" />
              <span className="text-center">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Experience</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            />
          </div>
          <p className="text-gray-600 text-center max-w-xl text-[11px] sm:text-xs md:text-sm px-2">
            My professional journey delivering exceptional digital experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - Hidden on mobile, visible on tablet+ */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-teal-500/30 to-blue-500/30 md:-translate-x-px"></div>
          
          {/* Experience cards */}
          <div className="space-y-4 sm:space-y-6 md:space-y-10 relative">
            {workExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative pl-8 sm:pl-10 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-8 lg:pr-12 md:ml-0' : 'md:pl-8 lg:pl-12 md:ml-auto'
                }`}
              >
                {/* Timeline dot - positioned correctly for all screen sizes */}
                <div 
                  className={`absolute top-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white z-10 shadow-md
                    left-1.5 sm:left-2
                    md:left-auto ${index % 2 === 0 ? 'md:-right-[7px]' : 'md:-left-[7px]'}`}
                  style={{ backgroundColor: exp.color }}
                ></div>
                
                {/* Card */}
                <div className="bg-white rounded-xl overflow-hidden group">
                  {/* Product Image Header - compact */}
                  {exp.logo && (
                    <div 
                      className="relative h-28 sm:h-36 md:h-44 lg:h-52 w-full overflow-hidden cursor-pointer"
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
                  
                  <div className="p-2.5 sm:p-3 md:p-4 lg:p-5">
                    <div className="flex flex-row items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      {/* Company logo/icon */}
                      <div 
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${exp.color}20` }}
                      >
                        {exp.company === "Luxor Holiday Homestays" ? (
                          <FaHotel className="text-base sm:text-lg md:text-xl" style={{ color: exp.color }} />
                        ) : exp.company === "Casual Clothings" ? (
                          <FaTshirt className="text-base sm:text-lg md:text-xl" style={{ color: exp.color }} />
                        ) : (
                          <FaCode className="text-base sm:text-lg md:text-xl" style={{ color: exp.color }} />
                        )}
                      </div>
                    
                    {/* Role and company */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight truncate">{exp.role}</h3>
                      <div className="text-xs sm:text-sm md:text-base font-medium flex flex-wrap items-center gap-1.5 mt-0.5" style={{ color: exp.color }}>
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
                  
                  {/* Details - compact badges */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      <FaCalendarAlt className="text-blue-500 text-[10px] sm:text-xs" />
                      <span className="text-gray-600 text-[10px] sm:text-xs">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      <FaMapMarkerAlt className="text-teal-500 text-[10px] sm:text-xs" />
                      <span className="text-gray-600 text-[10px] sm:text-xs">{exp.location}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <FaBuilding className="text-purple-500 text-xs" />
                      <span className="text-gray-600 text-xs">{exp.type}</span>
                    </div>
                  </div>
                  
                  {/* Description - always compact */}
                  <p className="text-gray-600 mb-2 sm:mb-3 text-[11px] sm:text-xs md:text-sm leading-snug line-clamp-2">
                    {exp.description}
                  </p>
                  
                  {/* Key achievements - always show 2 */}
                  <div className="mb-2 sm:mb-3">
                    <h4 className="text-gray-900 font-semibold mb-1 sm:mb-1.5 flex items-center gap-1 text-[11px] sm:text-xs md:text-sm">
                      <FaLightbulb className="text-yellow-500 text-[10px] sm:text-xs" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {exp.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="flex gap-1 text-gray-600 text-[10px] sm:text-xs leading-snug">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span className="line-clamp-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Skills - compact, show 4 */}
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1 flex items-center gap-1 text-[11px] sm:text-xs md:text-sm">
                      <FaTools className="text-teal-500 text-[10px] sm:text-xs" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exp.skills.slice(0, 4).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] sm:text-[10px] md:text-xs px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: `${exp.color}15`, 
                            color: exp.color,
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
    <section id="certificates" className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header with Animated Underline */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3 px-4">
              <FaAward className="text-cyan-500 text-xl sm:text-2xl md:text-3xl" />
              <span className="text-center">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Certificates</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-gray-600 mt-4 sm:mt-6 text-center max-w-2xl text-sm sm:text-base px-4">
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
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
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
                className="absolute left-0 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all border border-gray-200"
                aria-label="Previous certificate"
              >
                <FaChevronLeft className="text-sm sm:text-base" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all border border-gray-200"
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
                  className="min-w-full md:min-w-[calc(33.33%-1rem)] bg-white rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openCertificateDetail(certificate)}
                >
                  {/* Certificate Image with Overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
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
                      <span className="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        {certificate.organization}
                      </span>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 z-20">
                      <span className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        {certificate.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {certificate.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-cyan-50 text-cyan-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Click to view details</span>
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
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Certificate Header */}
                <div className="relative aspect-video">
                  <img 
                    src={selectedCertificate.image} 
                    alt={selectedCertificate.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent">
                    <button 
                      className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full backdrop-blur-sm"
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
                        <h2 className="text-2xl font-bold text-gray-900">{selectedCertificate.title}</h2>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5">
                        <FaGraduationCap className="text-cyan-500" />
                        <span className="text-gray-600 text-sm">{selectedCertificate.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg text-gray-900 font-medium mb-2">Skills Acquired</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="text-sm bg-cyan-50 text-cyan-600 px-3 py-1.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-6"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
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