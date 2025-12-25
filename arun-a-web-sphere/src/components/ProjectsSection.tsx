
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiHackerearth, SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiFlutter, SiPython, SiFirebase, SiGooglecloud, SiFastapi } from 'react-icons/si';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';
import { useIsMobile } from '../hooks/use-mobile';

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
  period?: string;
  tech?: string[];
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
    transition: { duration: 1, delay: 0.1, ease: "easeOut" }
  })
};

// Optimized smooth carousel animations - GPU accelerated
const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
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
    period: 'Apr 2025 – Jun 2025',
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
    description: 'AI-powered travel platform generating personalized itineraries with Google Gemini AI. Includes trip planning, social sharing, and an interactive travel assistant.',
    liveLink: 'https://ai-travella-duag.vercel.app/',
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
    period: 'Oct 2024 – Dec 2024',
    tech: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React', proficiency: 85 },
      { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS', proficiency: 90 },
      { Icon: SiRedux, color: '#764ABC', name: 'Redux', proficiency: 75 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 70 }
    ],
    description: 'Movie theatre booking platform with real-time seat selection, parking reservation, and secure payments. Includes admin dashboard and responsive design.',
    liveLink: 'https://cinimax.vercel.app',
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
    period: 'Jul 2025 – Sep 2025',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Express'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB', name: 'React Native', proficiency: 88 },
      { Icon: FaNodeJs, color: '#339933', name: 'Node.js', proficiency: 80 },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB', proficiency: 75 },
      { Icon: SiFirebase, color: '#FFCA28', name: 'Firebase', proficiency: 82 },
      { Icon: SiExpress, color: '#333333', name: 'Express', proficiency: 78 }
    ],
    description: 'Healthcare platform connecting patients and doctors via a token-based appointment system with secure medical records and role-based access.',
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
const hackathonProjects: Project[] = [
  {
    title: 'Falo - AI Misinformation Shield',
    icon: '�️',
    color: '#4a6cf7',
    image: truthtellImg,
    period: 'Dec 2024 – Apr 2025',
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
    description: 'AI-powered misinformation detection tool. Awarded 12th place in HackerEarth Hackathon (April 2025).',
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
    
    // Lower threshold for quicker response
    if (Math.abs(diff) > 30) {
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
    
    // Lower threshold for quicker swipe detection
    if (Math.abs(info.offset.x) > 30 || Math.abs(info.velocity.x) > 300) {
      if (info.offset.x > 0 || info.velocity.x > 300) {
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
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
          </div>
          <span className="text-xs font-semibold text-cyan-600">{skill.proficiency}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden" ref={progressRef}>
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

  // Project carousel item component - more concise for better mobile experience
  const ProjectCarouselItem = ({ project }: { project: Project }) => {
    const isMobile = useIsMobile();
    
    // Show fewer features on mobile
    const featuresCount = isMobile ? 3 : 6;
    // Show fewer tech specs on mobile
    const showTechSpecs = !isMobile;
    
    return (
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 items-center">
        {/* Project Image */}
        <div className="w-full md:w-1/2">
          <div 
            className="relative overflow-hidden rounded-lg sm:rounded-xl aspect-video mx-auto group cursor-pointer"
            style={{ 
              willChange: 'transform'
            }}
            onClick={() => {
              if (project.liveLink) {
                window.open(project.liveLink, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
              style={{ maxHeight: isMobile ? "180px" : "360px", willChange: 'transform' }}
              loading="eager"
            />
            {project.liveLink && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="text-center">
                  <FaExternalLinkAlt className="text-white text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 mx-auto" />
                  <p className="text-white font-semibold text-xs sm:text-sm md:text-base">Visit Live Demo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="w-full md:w-1/2">
          <div 
            className="bg-white backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1" style={{ color: project.color }}>
              {project.title}
            </h3>
            {project.period && (
              <p className="text-gray-500 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">{project.period}</p>
            )}
            <p className="text-gray-600 mb-2 sm:mb-3 text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">{project.description}</p>
            
            {project.features && project.features.length > 0 && (
              <div className="mb-2 sm:mb-3 hidden sm:block">
                <h4 className="text-[10px] sm:text-sm text-gray-500 uppercase mb-1 sm:mb-1.5 font-medium">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0.5 sm:gap-y-1 mb-2">
                  {project.features.slice(0, featuresCount).map((feature, i) => (
                    <li key={i} className="text-gray-600 text-[11px] sm:text-sm flex items-start gap-1 sm:gap-1.5">
                      <span style={{ color: project.color }} className="text-[10px] sm:text-xs mt-0.5">■</span>
                      <span className="leading-snug line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {showTechSpecs && project.techSpecs && project.techSpecs.length > 0 && (
              <div className="mb-2 sm:mb-3 hidden md:block">
                <h4 className="text-xs md:text-sm text-gray-500 uppercase mb-1 sm:mb-1.5 font-medium">Tech Specs</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {project.techSpecs.map((spec, i) => (
                    <div key={i} className="mb-1">
                      <h5 className="text-xs font-medium" style={{ color: project.color }}>
                        {spec.category}
                      </h5>
                      <ul className="text-xs text-gray-500">
                        <li>{spec.items[0]}</li>
                        {!isMobile && <li>{spec.items[1]}</li>}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-1.5 sm:mb-3">
              <h4 className="text-[10px] sm:text-sm text-gray-500 uppercase mb-1 sm:mb-1.5 font-medium">Tech Stack</h4>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-3">
                {project.techIcons.slice(0, isMobile ? 5 : project.techIcons.length).map((tech, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-0.5 sm:gap-1 bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs"
                    style={{ color: tech.color }}
                  >
                    <tech.Icon className="text-[10px] sm:text-sm" />
                    <span className="hidden sm:inline">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-start">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center hover:opacity-90 transition-opacity text-xs sm:text-sm font-medium"
                  style={{ backgroundColor: project.color }}
                >
                  <FaExternalLinkAlt className="mr-1 sm:mr-1.5" size={10} />
                  <span>Live Demo</span>
                </a>
              )}
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center transition-colors text-xs sm:text-sm font-medium"
              >
                <FaGithub className="mr-1 sm:mr-1.5" size={11} />
                <span>View Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const visibleIndex = activeProjectIndex % mainProjects.length;

  const isMobile = useIsMobile();
  
  return (
    <section 
      id="projects" 
      className="py-8 sm:py-12 md:py-16 text-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      <div className="absolute bottom-0 left-0 -ml-12 sm:-ml-16 -mb-12 sm:-mb-16 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: currentColor }} />
      
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section header */}
        <div className="flex flex-col items-center mb-5 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 text-gray-900 px-2 text-center">
            <span className="bg-clip-text text-transparent" 
              style={{ backgroundImage: `linear-gradient(90deg, ${currentColor}, #66e0ff)` }}>
              Featured
            </span> Projects
          </h2>
          <div className="w-12 sm:w-16 md:w-20 h-0.5 rounded-full mt-1.5 sm:mt-2"
            style={{ background: `linear-gradient(90deg, ${currentColor}, #66e0ff)` }} />
          <p className="text-gray-600 mt-2 sm:mt-3 text-center max-w-xl text-[11px] sm:text-xs md:text-sm px-2">
            {isMobile ? "My latest projects." : "A collection of my latest work showcasing my skills."}
          </p>
        </div>

        {/* Project Carousel - enhanced mobile experience */}
        <div 
          className="mb-8 sm:mb-12 md:mb-16 relative" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Swipe indicator - Only on mobile */}
          <div className="md:hidden mb-3 sm:mb-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <span className="opacity-60">←</span>
              <span>Swipe to explore</span>
              <span className="opacity-60">→</span>
            </p>
          </div>
          
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ willChange: 'transform' }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeProjectIndex}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <ProjectCarouselItem project={mainProjects[visibleIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Improved navigation controls */}
          <div className="flex flex-col items-center mt-6 md:mt-8">
            {/* Swipe indicator - Only on mobile */}
            <div className="md:hidden mb-3 text-center">
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="opacity-60">←</span>
                <span>Swipe to explore</span>
                <span className="opacity-60">→</span>
              </p>
            </div>
            
            {/* Dot indicators */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {mainProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                    index === visibleIndex ? 'w-8 md:w-10' : 'w-2 md:w-3 opacity-60 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: index === visibleIndex ? project.color : '#4b5563'
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none justify-between px-6">
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm rounded-full text-white p-3 pointer-events-auto shadow-lg"
              style={{ 
                backgroundColor: `${currentColor}90`,
              }}
              aria-label="Previous project"
            >
              <FaChevronLeft size={16} />
            </motion.button>
            
            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm rounded-full text-white p-3 pointer-events-auto shadow-lg"
              style={{ 
                backgroundColor: `${currentColor}90`,
              }}
              aria-label="Next project"
            >
              <FaChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        {/* Hackathon section */}
        <div className="mt-8 sm:mt-12 md:mt-14">
          <div className="flex items-center justify-center gap-1.5 mb-4 sm:mb-6">
            <div className="h-px grow max-w-[60px] sm:max-w-none"
              style={{ background: `linear-gradient(to right, transparent, #4a6cf750, transparent)` }} />
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-900 flex items-center gap-1.5 px-2">
              <span style={{ color: "#4a6cf7" }} className="text-lg sm:text-xl md:text-2xl">
                <SiHackerearth />
              </span>
              <span>Hackathon</span>
            </h3>
            <div className="h-px grow max-w-[60px] sm:max-w-none"
              style={{ background: `linear-gradient(to right, transparent, #4a6cf750, transparent)` }} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {hackathonProjects.map((project, index) => {
              const isMobile = useIsMobile();
              // Show fewer features on mobile
              const featuresCount = isMobile ? 3 : 5;
              // Don't show tech specs on mobile
              const showTechSpecs = !isMobile;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-lg overflow-hidden transition-colors duration-200"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex flex-col lg:flex-row">
                    <div 
                      className="relative lg:w-2/5 cursor-pointer group overflow-hidden"
                      onClick={() => {
                        if (project.liveLink) {
                          window.open(project.liveLink, '_blank', 'noopener,noreferrer');
                        } else {
                          window.open(project.githubLink, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                        style={{ maxHeight: isMobile ? "120px" : "220px", willChange: 'transform' }}
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2" style={{ backgroundColor: `${project.color}CC` }}>
                        <div className="text-white px-2 py-0.5 rounded-full font-medium flex items-center text-[10px] sm:text-xs">
                          <span className="mr-1 text-xs sm:text-sm">{project.icon}</span> Hackathon
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          {project.liveLink ? (
                            <>
                              <FaExternalLinkAlt className="text-white text-3xl md:text-4xl mb-2 mx-auto" />
                              <p className="text-white font-semibold text-sm md:text-base">Visit Live Demo</p>
                            </>
                          ) : (
                            <>
                              <FaGithub className="text-white text-3xl md:text-4xl mb-2 mx-auto" />
                              <p className="text-white font-semibold text-sm md:text-base">View on GitHub</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 lg:p-6 lg:w-3/5">
                      <h3 className="text-base sm:text-xl font-bold mb-0.5 sm:mb-1 flex items-center" style={{ color: project.color }}>
                        {project.title}
                      </h3>
                      {project.period && (
                        <p className="text-gray-500 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">{project.period}</p>
                      )}
                      <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">{project.description}</p>
                    
                      {project.features && (
                        <div className="mb-2 sm:mb-4 hidden sm:block">
                          <h4 className="text-xs text-gray-600 uppercase mb-1.5 sm:mb-2 font-medium flex items-center">
                            <span style={{ color: project.color }} className="mr-1.5">✨</span> Key Features
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0.5 sm:gap-y-1">
                            {project.features.slice(0, featuresCount).map((feature, i) => (
                              <li key={i} className="text-gray-500 text-[11px] sm:text-xs flex items-start">
                                <span style={{ color: project.color }} className="mr-1">•</span>
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {showTechSpecs && project.techSpecs && (
                        <div className="mb-4 hidden md:block">
                          <h4 className="text-xs text-gray-600 uppercase mb-2 font-medium flex items-center">
                            <span style={{ color: project.color }} className="mr-1.5">⚙️</span> Tech Specs
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {project.techSpecs.map((category, i) => (
                              <div key={i}>
                                <h5 className="text-xs font-medium" style={{ color: project.color }}>
                                  {category.category}
                                </h5>
                                <ul className="text-gray-500 text-xs">
                                  <li>{category.items[0]}</li>
                                  <li>{category.items[1]}</li>
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-2 sm:mb-4">
                        <h4 className="text-[10px] sm:text-xs text-gray-600 uppercase mb-1 sm:mb-2 font-medium flex items-center">
                          <span style={{ color: project.color }} className="mr-1">🔧</span> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                          {project.techIcons.slice(0, window.innerWidth < 640 ? 4 : project.techIcons.length).map((tech, i) => (
                            <span 
                              key={i}
                              className="inline-flex items-center gap-0.5 sm:gap-1 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs"
                              style={{ color: tech.color }}
                            >
                              <tech.Icon className="text-[10px] sm:text-xs" style={{ color: tech.color }} />
                              <span className="hidden sm:inline">{tech.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white px-3 py-1.5 rounded-lg flex items-center transition-colors text-xs"
                          style={{ backgroundColor: project.color }}
                        >
                          <FaGithub className="mr-1.5" size={12} />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;