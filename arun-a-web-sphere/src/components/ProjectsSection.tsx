

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiHackerearth, SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiFirebase, SiFlutter, SiPython } from 'react-icons/si';

// Types remain the same
type TechIcon = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  name: string;
  proficiency: number;
};

type Project = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
  techIcons: TechIcon[];
  liveLink?: string;
  githubLink: string;
};

// Enhanced animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: `${i}%`,
    transition: { duration: 1.5, delay: 0.2, ease: "easeOut" }
  })
};

// Improved carousel animations for smoother transitions
const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 250, damping: 25 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4, ease: "easeInOut" }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 250, damping: 25 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 }
    }
  }),
};

// Image paths
const ticketparkImg = "/assets/cinipop.jpg";
const pageturnerImg = "/assets/bookmania.jpg";
const darkcartImg = "/assets/ecommrece.jpg";
const truthtellImg = "/assets/falo.png";

// Enhanced project data with more distinct colors for differentiation
const mainProjects = [
  {
    title: 'TicketPark',
    icon: '🎟',
    color: '#00BFFF', // Bright blue
    image: ticketparkImg,
    tech: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React', proficiency: 85 },
      { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS', proficiency: 90 },
      { Icon: SiRedux, color: '#764ABC', name: 'Redux', proficiency: 75 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 70 }
    ],
    description: 'Cinema + parking booking system with JWT & Firebase',
    liveLink: 'https://cinematic-popcorn-theatre-experience.vercel.app/',
    githubLink: 'https://github.com/Arunarivalagan743/Cinematic-popcorn-Theatre-Experience'
  },

  {
    title: 'DarkCart',
    icon: '🛒',
    color: '#8A2BE2', // Purple
    image: darkcartImg,
    tech: ['React', 'Tailwind CSS', 'Express', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React', proficiency: 90 },
      { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS', proficiency: 85 },
      { Icon: SiExpress, color: '#ffffff', name: 'Express', proficiency: 78 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 75 }
    ],
    description: 'E-commerce MERN stack app with modern UI',
    liveLink: 'https://example.com/darkcart',
    githubLink: 'https://github.com/gowthamvetri/DarkArt/tree/dev'
  }
];

const hackathonProjects = [
  {
    title: 'TruthTell',
    icon: '🔍',
    color: '#FFA500', // Orange
    image: truthtellImg,
    tech: ['Flutter', 'Python', 'MongoDB', 'NLP', 'RAG'],
    techIcons: [
      { Icon: SiFlutter, color: '#02569B', name: 'Flutter', proficiency: 80 },
      { Icon: SiPython, color: '#3776AB', name: 'Python', proficiency: 75 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 75 },
      { Icon: ({ className, style }) => (
        <span className={className} style={style} role="img" aria-label="NLP">🧠</span>
      ), color: '#FF6B6B', name: 'NLP', proficiency: 70 },
      { Icon: ({ className, style }) => (
        <span className={className} style={style} role="img" aria-label="RAG">📄</span>
      ), color: '#4ECDC4', name: 'RAG', proficiency: 65 }
    ],
    description: 'Placed 12th in HackerEarth Hackathon (April 2025)',
    githubLink: 'https://github.com/Arunarivalagan743/misinfo_detection_project'
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // For smooth color transitions
  const currentColor = mainProjects[activeProjectIndex].color;
  
  // Set up initial visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play setup with smoother transitions
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 6000); // Slightly longer duration for a more relaxed pace
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, activeProjectIndex, isDragging]);

  // Pause auto-play when hovering or dragging
  const handleCarouselHover = (isHovering: boolean) => {
    setIsAutoPlaying(!isHovering);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    setIsAutoPlaying(true);
    
    // Detect swipe direction and change slide
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    setDirection(1);
    setActiveProjectIndex((prev) => 
      prev === mainProjects.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveProjectIndex((prev) => 
      prev === 0 ? mainProjects.length - 1 : prev - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeProjectIndex ? 1 : -1);
    setActiveProjectIndex(index);
  };

  // Component for skill progress bars
  const SkillProgressBar = ({ skill }: { skill: TechIcon }) => {
    const progressRef = useRef(null);
    const isInView = useInView(progressRef, { once: true, margin: "-100px" });
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <skill.Icon className="mr-2" style={{ color: skill.color }} />
            <span className="text-sm font-medium text-gray-300">{skill.name}</span>
          </div>
          <span className="text-xs font-semibold text-cyan-400">{skill.proficiency}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden" ref={progressRef}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            variants={progressVariants}
            custom={skill.proficiency}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </div>
      </div>
    );
  };

  // Enhanced carousel item with color theming
  const ProjectCarouselItem = ({ project }: { project: Project }) => {
    return (
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Project Image with enhanced styling */}
        <div className="w-full md:w-3/5 lg:w-1/2">
          <div 
            className="relative overflow-hidden rounded-xl shadow-lg aspect-video max-w-2xl mx-auto" 
            style={{ 
              boxShadow: `0 10px 25px -5px ${project.color}30, 0 8px 10px -6px ${project.color}20`
            }}
          >
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              style={{ maxHeight: "360px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div 
              className="absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5"
              style={{ backgroundColor: `${project.color}60` }}
            >
              <span className="inline-block">{project.icon}</span>
              <span className="text-xs font-medium text-white">{project.title}</span>
            </div>
            
            {/* Subtle project color overlay */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{ 
                background: `radial-gradient(circle at top right, ${project.color}, transparent 70%)` 
              }}
            />
          </div>
        </div>

        {/* Project Details with color accents */}
        <div className="w-full md:w-2/5 lg:w-1/2">
          <motion.div 
            className="bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-800 p-5 shadow-lg"
            initial={{ borderColor: 'rgb(39, 39, 42)' }}
            animate={{ 
              borderColor: project.color,
              transition: { duration: 0.5 }
            }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: project.color }}>
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="mb-5">
              <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techIcons.map((tech, i) => (
                  <motion.span 
                    key={i}
                    className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-full text-xs"
                    style={{ color: tech.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <tech.Icon />
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 justify-start">
              {project.liveLink && (
                <motion.a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-4 py-2 rounded-lg flex items-center"
                  style={{ backgroundColor: project.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaExternalLinkAlt className="mr-2" size={14} />
                  Live Demo
                </motion.a>
              )}
              <motion.a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <FaGithub className="mr-2" size={16} />
                View Code
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Infinite carousel setup
  const infiniteProjects = [...mainProjects, ...mainProjects, ...mainProjects];
  const visibleIndex = activeProjectIndex % mainProjects.length;

  return (
    <section 
      id="projects" 
      className="py-24  text-white relative overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic color background elements */}
      <motion.div 
        className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full blur-3xl opacity-10"
        animate={{ backgroundColor: currentColor }}
        transition={{ duration: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full blur-3xl opacity-10"
        animate={{ backgroundColor: currentColor }}
        transition={{ duration: 1.5 }}
      />
      
     

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">
            <motion.span 
              className="bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: `linear-gradient(90deg, ${currentColor}, #66e0ff)` 
              }}
              animate={{ 
                backgroundImage: `linear-gradient(90deg, ${currentColor}, #66e0ff)`
              }}
              transition={{ duration: 1 }}
            >
              Featured
            </motion.span> Projects
          </h2>
          <motion.div 
            className="w-24 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${currentColor}, #66e0ff)` }}
            animate={{ 
              background: `linear-gradient(90deg, ${currentColor}, #66e0ff)`
            }}
            transition={{ duration: 1 }}
          />
          <p className="text-gray-400 mt-6 text-center max-w-2xl">
            A collection of my latest work showcasing my skills and experience in web development.
          </p>
        </motion.div>

        {/* Enhanced Smooth Infinite Carousel */}
        <div 
          className="mb-20 relative" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
        >
          {/* Main Carousel */}
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeProjectIndex}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                >
                  <ProjectCarouselItem project={mainProjects[visibleIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Enhanced Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-10">
            {/* Project Indicators with color theme */}
            <div className="flex items-center space-x-3 mx-auto">
              {mainProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === visibleIndex 
                      ? 'w-10' // Active dot is wider
                      : 'w-2.5 opacity-60 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: index === visibleIndex 
                      ? project.color 
                      : '#4b5563'
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Arrow Navigation */}
     {/* Enhanced Arrow Navigation - Mobile Responsive */}
<motion.button 
  onClick={handlePrev}
  className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 backdrop-blur-sm text-white p-2 md:p-3 rounded-full z-10 hidden md:flex items-center justify-center"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9, x: -2 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{ 
    backgroundColor: `${currentColor}80`,
    willChange: 'transform, scale',
  }}
  aria-label="Previous project"
>
  <FaChevronLeft />
</motion.button>
<motion.button 
  onClick={handleNext}
  className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 backdrop-blur-sm text-white p-2 md:p-3 rounded-full z-10 hidden md:flex items-center justify-center"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9, x: 2 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{ 
    backgroundColor: `${currentColor}80`,
    willChange: 'transform, scale',
  }}
  aria-label="Next project"
>
  <FaChevronRight />
</motion.button>

{/* Mobile Navigation Buttons - Fixed at bottom for mobile */}
<div className="flex justify-center space-x-4 mt-4 md:hidden">
  <motion.button
    onClick={handlePrev}
    className="p-3 rounded-full flex items-center justify-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{ backgroundColor: `${currentColor}80` }}
    aria-label="Previous project"
  >
    <FaChevronLeft className="text-white" />
  </motion.button>
  <motion.button
    onClick={handleNext}
    className="p-3 rounded-full flex items-center justify-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{ backgroundColor: `${currentColor}80` }}
    aria-label="Next project"
  >
    <FaChevronRight className="text-white" />
  </motion.button>
</div>
        </div>

        {/* Color-themed Skill Proficiency Section */}
        <motion.div 
          className="backdrop-blur-md rounded-xl border border-zinc-800 p-6 shadow-xl max-w-2xl mx-auto mb-20"
          animate={{ 
            backgroundColor: 'rgba(24, 24, 27, 0.7)',
            borderColor: `${currentColor}50` 
          }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <motion.span 
              className="mr-2"
              animate={{ color: currentColor }}
              transition={{ duration: 0.8 }}
            >
              #
            </motion.span> 
            Technology Proficiency
          </h3>
          
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
              <div className="space-y-4">
                {mainProjects[visibleIndex].techIcons.map((skill, i) => (
                  <SkillProgressBar key={i} skill={skill} />
                ))}
              </div>
            </div>
            
            {/* Development metrics with color theme */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                animate={{ borderColor: `${currentColor}50` }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Development</h4>
                <motion.div 
                  className="text-2xl font-bold"
                  animate={{ color: currentColor }}
                  transition={{ duration: 0.8 }}
                >
                  100%
                </motion.div>
                <p className="text-xs text-gray-500">Completion status</p>
              </motion.div>
              <motion.div 
                className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                animate={{ borderColor: `${currentColor}50` }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Complexity</h4>
                <motion.div 
                  className="text-2xl font-bold"
                  animate={{ color: currentColor }}
                  transition={{ duration: 0.8 }}
                >
                  High
                </motion.div>
                <p className="text-xs text-gray-500">Technical level</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Hackathon section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20"
        >
          <div className="flex items-center justify-center gap-2 mb-10">
            <motion.div 
              className="h-px grow"
              animate={{ 
                background: `linear-gradient(to right, transparent, ${currentColor}50, transparent)`  
              }}
              transition={{ duration: 0.8 }}
            />
            <h3 className="text-2xl font-bold text-center text-white flex items-center gap-2 px-4">
              <motion.span
                animate={{ color: currentColor }}
                transition={{ duration: 0.8 }}
              >
                <SiHackerearth />
              </motion.span>
              <span>Hackathon Projects</span>
            </h3>
            <motion.div 
              className="h-px grow"
              animate={{ 
                background: `linear-gradient(to right, transparent, ${currentColor}50, transparent)`  
              }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hackathonProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-colors duration-300"
              >
                <div className="relative aspect-video" style={{ maxHeight: "220px" }}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500/90 text-white text-xs px-2 py-1 rounded-full">
                    Hackathon
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: project.color }}>{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm text-gray-400 uppercase mb-3 font-medium">Tech Stack</h4>
                    <div className="space-y-4">
                      {project.techIcons.map((skill, i) => (
                        <SkillProgressBar key={i} skill={skill} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: project.color
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaGithub className="mr-2" />
                      View on GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;