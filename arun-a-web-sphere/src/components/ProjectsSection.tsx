import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiHackerearth, SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiFlutter, SiPython } from 'react-icons/si';

// Types
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

// Simplified animation variants
const progressVariants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: `${i}%`,
    transition: { duration: 1.5, delay: 0.2, ease: "easeOut" }
  })
};

// Cleaner carousel animations
const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  }),
};

// Image paths
const ticketparkImg = "/assets/cinipop.jpg";
const darkcartImg = "/assets/ecommrece.jpg";
const truthtellImg = "/assets/falo.png";

// Main projects data
const mainProjects = [
  {
    title: 'TicketPark',
    icon: '🎟',
    color: '#00BFFF',
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
    color: '#8A2BE2',
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

// Hackathon projects data
const hackathonProjects = [
  {
    title: 'TruthTell',
    icon: '🔍',
    color: '#FFA500',
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

  // Get current color for theme
  const currentColor = mainProjects[activeProjectIndex].color;
  
  // Initialize visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, activeProjectIndex, isDragging]);

  // Pause auto-play when hovering
  const handleCarouselHover = (isHovering: boolean) => {
    setIsAutoPlaying(!isHovering);
  };

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    setIsAutoPlaying(true);
    
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  // Navigation handlers
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

  // Skill Progress Component
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

  // Project carousel item component
  const ProjectCarouselItem = ({ project }: { project: Project }) => {
    return (
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Project Image */}
        <div className="w-full md:w-1/2">
          <div 
            className="relative overflow-hidden rounded-xl shadow-lg aspect-video mx-auto"
            style={{ 
              boxShadow: `0 10px 25px -5px ${project.color}30, 0 8px 10px -6px ${project.color}20`
            }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              style={{ maxHeight: "360px" }}
            />
            <div 
              className="absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5"
              style={{ backgroundColor: `${project.color}60` }}
            >
              <span className="inline-block">{project.icon}</span>
              <span className="text-xs font-medium text-white">{project.title}</span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="w-full md:w-1/2">
          <div 
            className="bg-zinc-900/70 backdrop-blur-md rounded-xl border p-5 shadow-lg"
            style={{ borderColor: project.color }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: project.color }}>
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="mb-5">
              <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techIcons.map((tech, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-full text-xs"
                    style={{ color: tech.color }}
                  >
                    <tech.Icon />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-start">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: project.color }}
                >
                  <FaExternalLinkAlt className="mr-2" size={14} />
                  Live Demo
                </a>
              )}
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <FaGithub className="mr-2" size={16} />
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const visibleIndex = activeProjectIndex % mainProjects.length;

  return (
    <section 
      id="projects" 
      className="py-16 md:py-24 text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">
            <span className="bg-clip-text text-transparent" 
              style={{ backgroundImage: `linear-gradient(90deg, ${currentColor}, #66e0ff)` }}>
              Featured
            </span> Projects
          </h2>
          <div className="w-24 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${currentColor}, #66e0ff)` }} />
          <p className="text-gray-400 mt-6 text-center max-w-2xl">
            A collection of my latest work showcasing my skills and experience in web development.
          </p>
        </div>

        {/* Project Carousel */}
        <div 
          className="mb-20 relative" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
        >
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
                >
                  <ProjectCarouselItem project={mainProjects[visibleIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Fixed position navigation controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center space-x-3 mx-auto">
              {mainProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === visibleIndex ? 'w-10' : 'w-2.5 opacity-60 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: index === visibleIndex ? project.color : '#4b5563'
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Fixed position navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none flex justify-between px-2 md:px-4">
            {/* Left Arrow - Fixed position */}
            <button
              onClick={handlePrev}
              className="backdrop-blur-sm rounded-full text-white p-2 md:p-3 pointer-events-auto"
              style={{ 
                backgroundColor: `${currentColor}80`,
                transform: 'translateY(-50%)'
              }}
              aria-label="Previous project"
            >
              <FaChevronLeft />
            </button>
            
            {/* Right Arrow - Fixed position */}
            <button
              onClick={handleNext}
              className="backdrop-blur-sm rounded-full text-white p-2 md:p-3 pointer-events-auto"
              style={{ 
                backgroundColor: `${currentColor}80`,
                transform: 'translateY(-50%)'
              }}
              aria-label="Next project"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Hackathon section */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px grow"
              style={{ background: `linear-gradient(to right, transparent, ${currentColor}50, transparent)` }} />
            <h3 className="text-2xl font-bold text-center text-white flex items-center gap-2 px-4">
              <span style={{ color: currentColor }}>
                <SiHackerearth />
              </span>
              <span>Hackathon Projects</span>
            </h3>
            <div className="h-px grow"
              style={{ background: `linear-gradient(to right, transparent, ${currentColor}50, transparent)` }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hackathonProjects.map((project, index) => (
              <div
                key={index}
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
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-800 hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FaGithub className="mr-2" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;