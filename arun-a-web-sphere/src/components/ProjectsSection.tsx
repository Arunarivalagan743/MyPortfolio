
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiHackerearth, SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiFlutter, SiPython, SiFirebase, SiGooglecloud, SiFastapi } from 'react-icons/si';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';

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
  features?: string[];
  techSpecs?: {
    category: string;
    items: string[];
  }[];
};

// Simplified animation variants
const progressVariants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: `${i}%`,
    transition: { duration: 1.5, delay: 0.2, ease: "easeOut" }
  })
};

// Enhanced smoother carousel animations
const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 250, damping: 35 },
      opacity: { duration: 0.5 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 250, damping: 35 },
      opacity: { duration: 0.3 }
    }
  }),
};

// Image paths
const ticketparkImg = "/assets/cinipop.jpg";
const darkcartImg = "/assets/ecommrece.jpg";
const truthtellImg = "/assets/falo.png";
const travellaImg = "/assets/travella.png"; 
const healqImg = "/assets/HealQImg.png"; // Will need to be updated with actual image

// Main projects data
const mainProjects = [
  {
    title: 'AI Travella',
    icon: '✈️',
    color: '#4285F4', // Google blue color
    image: travellaImg,
    tech: ['React', 'Tailwind CSS', 'Firebase', 'Google Places API', 'Gemini AI'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React', proficiency: 92 },
      { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS', proficiency: 90 },
      { Icon: SiFirebase, color: '#FFCA28', name: 'Firebase', proficiency: 85 },
      { Icon: SiGooglecloud, color: '#4285F4', name: 'Google Places', proficiency: 80 },
      { Icon: ({ className, style }) => (
        <span className={className} style={style} role="img" aria-label="Gemini AI">🤖</span>
      ), color: '#8E44AD', name: 'Gemini AI', proficiency: 75 }
    ],
    description: 'Advanced AI-powered travel platform that creates personalized itineraries using Google Gemini AI. Features comprehensive trip planning, social sharing, interactive chat assistant, and community features.',
    liveLink: 'https://travellai.me/',
    githubLink: 'https://github.com/Arunarivalagan743/AI_Travella_',
    features: [
      'AI-generated personalized travel itineraries',
      'Hotel recommendations with ratings & amenities',
      'Weather forecasts and safety information',
      'Social features with follow system & trip sharing',
      'Real-time chat with AI travel assistant',
      'User profiles and trip management'
    ],
    techSpecs: [
      {
        category: 'Frontend',
        items: [
          'React 18.3.1',
          'Vite 6.3.5 build system',
          'Tailwind CSS 4.1.8',
          'Framer Motion 12.16.0',
          'React Router DOM 7.6.2',
          'Custom AI integration hooks'
        ]
      },
      {
        category: 'Backend & APIs',
        items: [
          'Google Gemini AI integration',
          'Google Places API for locations',
          'Firebase Firestore database',
          'Firebase Authentication',
          'Firebase Cloud Storage',
          'Vercel serverless deployment'
        ]
      },
      {
        category: 'Social Features',
        items: [
          'Real-time notifications',
          'Follow/unfollow system',
          'Trip sharing capabilities',
          'User profile management',
          'Chat messaging system',
          'Content discovery engine'
        ]
      }
    ]
  },
  {
    title: 'Cinematic Popcorn',
    icon: '🎬',
    color: '#FF69B4',
    image: ticketparkImg,
    tech: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React', proficiency: 85 },
      { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS', proficiency: 90 },
      { Icon: SiRedux, color: '#764ABC', name: 'Redux', proficiency: 75 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 70 }
    ],
    description: 'Comprehensive movie theatre booking platform with real-time seat selection, parking reservation, and secure payment processing. Features include user authentication, admin dashboard, and responsive design.',
    liveLink: 'https://www.cinexp.app',
    githubLink: 'https://github.com/Arunarivalagan743/Cinematic-popcorn-Theatre-Experience',
    features: [
      'Real-time seat selection with visual interface',
      'Movie browsing with detailed information',
      'Parking slot reservation system',
      'Secure payment processing with Stripe',
      'Booking history and profile management',
      'Role-based admin dashboard'
    ],
    techSpecs: [
      {
        category: 'Frontend',
        items: [
          'React 18',
          'Redux Toolkit state management',
          'React Router navigation',
          'Tailwind CSS styling',
          'Vite build tool',
          'Socket.IO Client for real-time updates'
        ]
      },
      {
        category: 'Backend',
        items: [
          'Node.js with Express',
          'MongoDB with Mongoose',
          'JSON Web Tokens authentication',
          'Socket.IO real-time communication',
          'Stripe API payment processing',
          'Node-cron scheduled tasks'
        ]
      },
      {
        category: 'Admin Features',
        items: [
          'Analytics and metrics dashboard',
          'Movie management system',
          'Showtime scheduling automation',
          'Seat and parking inventory',
          'User management with role control',
          'Customer support messaging'
        ]
      }
    ]
  },
  {
    title: 'HealQ',
    icon: '🏥',
    color: '#00C853',
    image: healqImg, // Replace with actual image when available
    tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Express'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React Native', proficiency: 88 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 75 },
      { Icon: SiFirebase, color: '#FFCA28', name: 'Firebase', proficiency: 82 },
      { Icon: SiExpress, color: '#ffffff', name: 'Express', proficiency: 78 }
    ],
    description: 'Comprehensive healthcare platform connecting patients with doctors through a token-based appointment system with secure medical record management and role-based access control.',
    githubLink: 'https://github.com/Arunarivalagan743/HealQ',
    features: [
      'Real-time queue status & wait time tracking',
      'Role-based access for patients, doctors, and admins',
      'Secure medical records management',
      'Firebase Authentication with pre-approved registration',
      'Offline functionality with data synchronization',
      'Priority-based appointment scheduling system'
    ],
    techSpecs: [
      {
        category: 'Mobile Application',
        items: [
          'React Native 0.80.2',
          'React Navigation 7.x',
          'Context API for state management',
          'Firebase Auth integration',
          'React Native Paper UI components',
          'AsyncStorage for local data'
        ]
      },
      {
        category: 'Backend Server',
        items: [
          'Node.js 18+ with Express 4.18+',
          'MongoDB with Mongoose',
          'Firebase Admin SDK & JWT auth',
          'Helmet.js & CORS protection',
          'Nodemailer for notifications',
          'Node-cron for scheduling'
        ]
      }
    ]
  },
];

// Hackathon projects data
const hackathonProjects = [
  {
    title: 'Falo - AI Misinformation Shield',
    icon: '�️',
    color: '#4a6cf7',
    image: truthtellImg,
    tech: ['Flutter', 'Python', 'FastAPI', 'Machine Learning', 'NLP'],
    techIcons: [
      { Icon: SiFlutter, color: '#02569B', name: 'Flutter', proficiency: 85 },
      { Icon: SiPython, color: '#3776AB', name: 'Python', proficiency: 80 },
      { Icon: SiFastapi, color: '#009688', name: 'FastAPI', proficiency: 75 },
      { Icon: ({ className, style }) => (
        <span className={className} style={style} role="img" aria-label="ML">🧠</span>
      ), color: '#FF6B6B', name: 'Machine Learning', proficiency: 78 },
      { Icon: ({ className, style }) => (
        <span className={className} style={style} role="img" aria-label="NLP">�</span>
      ), color: '#4ECDC4', name: 'NLP', proficiency: 72 }
    ],
    description: 'Your intelligent guardian against misinformation in the digital wilderness. Awarded 12th place in HackerEarth Hackathon (April 2025).',
    githubLink: 'https://github.com/GokulanV7/Falo-app',
    features: [
      'AI-powered misinformation detection with 95%+ accuracy',
      'Voice intelligence for hands-free operation',
      'Lightning-fast analysis in under 2 seconds',
      'Text analysis, URL verification, and credibility scoring',
      'Bias detection and multi-language support (15+ languages)',
      'Cross-platform compatibility (iOS, Android, Web)',
      'Privacy-first design with zero data retention policy'
    ],
    techSpecs: [
      {
        category: 'Frontend',
        items: [
          'Flutter mobile application with responsive design',
          'Advanced voice recognition & natural language processing',
          'Conversational AI interface with intelligent responses',
          'Smart dark mode & full accessibility support',
          'Offline mode capability for basic verification'
        ]
      },
      {
        category: 'Backend',
        items: [
          'FastAPI server with authentication & rate limiting',
          'Advanced NLP processing pipeline with ML models',
          'Web scraper for content extraction & verification',
          'Intelligent knowledge base & search indexing',
          'Real-time credibility database updates'
        ]
      },
      {
        category: 'AI Engine',
        items: [
          'Deep learning models for pattern recognition',
          'Content categorization & confidence scoring',
          'Source credibility analysis & evaluation',
          'Linguistic marker detection for misinformation',
          'Continuous learning from verification history'
        ]
      }
    ]
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get current color for theme
  const currentColor = mainProjects[activeProjectIndex].color;
  
  // Initialize visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play functionality - longer interval for better UX
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 8000);
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

  // Enhanced touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Could implement real-time drag effect here if needed
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    setIsAutoPlaying(true);
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe distance is significant enough, change slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Drag handlers - simplified for better performance
  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    setIsAutoPlaying(true);
    
    if (Math.abs(info.offset.x) > 50) {
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

  // Project carousel item component - removed icon from project box
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
            
            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1 mb-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span style={{ color: project.color }} className="text-xs mt-1">■</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.techSpecs && project.techSpecs.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 uppercase mb-2 font-medium">Technical Specifications</h4>
                <div className="space-y-3">
                  {project.techSpecs.map((spec, i) => (
                    <div key={i} className="mb-2">
                      <h5 className="text-xs font-medium mb-1" style={{ color: project.color }}>
                        {spec.category}
                      </h5>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1">
                        {spec.items.map((item, j) => (
                          <li key={j} className="text-gray-300 text-xs flex items-start gap-1.5">
                            <span style={{ color: project.color }} className="text-xxs mt-1">▪</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
      {/* Background elements - enhanced for depth */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      
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

        {/* Project Carousel - enhanced mobile experience */}
        <div 
          className="mb-20 relative" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08} // More natural feeling
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
                  transition={{ ease: "easeInOut" }}
                >
                  <ProjectCarouselItem project={mainProjects[visibleIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Improved navigation controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center space-x-3 mx-auto">
              {mainProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === visibleIndex ? 'w-12' : 'w-3 opacity-60 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: index === visibleIndex ? project.color : '#4b5563'
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Improved navigation arrows with better positioning */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none flex justify-between px-2 md:px-6">
            {/* Left Arrow - Fixed position */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm rounded-full text-white p-2.5 md:p-3.5 pointer-events-auto shadow-lg"
              style={{ 
                backgroundColor: `${currentColor}90`,
              }}
              aria-label="Previous project"
            >
              <FaChevronLeft />
            </motion.button>
            
            {/* Right Arrow - Fixed position */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm rounded-full text-white p-2.5 md:p-3.5 pointer-events-auto shadow-lg"
              style={{ 
                backgroundColor: `${currentColor}90`,
              }}
              aria-label="Next project"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>

        {/* Hackathon section */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px grow"
              style={{ background: `linear-gradient(to right, transparent, #4a6cf750, transparent)` }} />
            <h3 className="text-3xl font-bold text-center text-white flex items-center gap-3 px-4">
              <span style={{ color: "#4a6cf7" }} className="text-4xl">
                <SiHackerearth />
              </span>
              <span>Hackathon Projects</span>
            </h3>
            <div className="h-px grow"
              style={{ background: `linear-gradient(to right, transparent, #4a6cf750, transparent)` }} />
          </div>

          <div className="grid grid-cols-1 gap-10 max-w-7xl mx-auto">
            {hackathonProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-800 overflow-hidden hover:border-blue-500/50 transition-colors duration-300 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="relative lg:w-2/5">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                    <div className="absolute top-4 right-4" style={{ backgroundColor: `${project.color}CC` }}>
                      <div className="text-white px-4 py-2 rounded-full font-medium flex items-center">
                        <span className="mr-2 text-xl">{project.icon}</span> Hackathon Project
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:w-3/5">
                    <h3 className="text-2xl font-bold mb-3 flex items-center" style={{ color: project.color }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
                  
                    {project.features && (
                      <div className="mb-6">
                        <h4 className="text-sm text-gray-300 uppercase mb-3 font-medium flex items-center">
                          <span style={{ color: project.color }} className="mr-2">✨</span> Key Features
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-400">
                          {project.features.map((feature, i) => (
                            <li key={i} className="text-sm">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.techSpecs && (
                      <div className="mb-6">
                        <h4 className="text-sm text-gray-300 uppercase mb-3 font-medium flex items-center">
                          <span style={{ color: project.color }} className="mr-2">⚙️</span> Technical Specs
                        </h4>
                        <div className="space-y-4">
                          {project.techSpecs.map((category, i) => (
                            <div key={i} className="mb-3">
                              <h5 className="text-sm font-medium mb-1" style={{ color: project.color }}>
                                {category.category}
                              </h5>
                              <ul className="list-disc list-inside space-y-1 text-gray-400 pl-3">
                                {category.items.map((item, j) => (
                                  <li key={j} className="text-sm">{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h4 className="text-sm text-gray-300 uppercase mb-3 font-medium flex items-center">
                        <span style={{ color: project.color }} className="mr-2">🔧</span> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techIcons.map((tech, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded-full text-sm"
                            style={{ color: tech.color }}
                          >
                            <tech.Icon className="mr-1" style={{ color: tech.color }} />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                        style={{ backgroundColor: project.color }}
                      >
                        <FaGithub className="mr-2" />
                        View on GitHub
                      </motion.a>
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

export default ProjectsSection;