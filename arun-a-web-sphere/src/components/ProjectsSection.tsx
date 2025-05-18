import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiHackerearth, SiTailwindcss, SiRedux, SiMongodb, SiExpress, SiFirebase } from 'react-icons/si';

// Define the types for project data
type TechIcon = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
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

// Define animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const ticketparkImg = "/assets/cinipop.jpg";
const pageturnerImg = "/assets/bookmania.jpg";
const darkcartImg = "/assets/ecommrece.jpg";
const truthtellImg = "/assets/falo.png";

// Example data for mainProjects
const mainProjects = [
  {
    title: 'TicketPark',
    icon: '🎟',
    color: '#00BFFF',
    image: ticketparkImg,
    tech: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB' },
      { Icon: SiTailwindcss, color: '#06B6D4' },
      { Icon: SiRedux, color: '#764ABC' },
      { Icon: FaNodeJs, color: '#339933' },
      { Icon: SiMongodb, color: '#47A248' }
    ],
    description: 'Cinema + parking booking system with JWT & Firebase',
    liveLink: 'https://cinematic-popcorn-theatre-experience.vercel.app/',
    githubLink: 'https://github.com/Arunarivalagan743/Cinematic-popcorn-Theatre-Experience'
  },
  {
    title: 'PageTurner',
    icon: '📚',
    color: '#FF6B6B',
    image: pageturnerImg,
    tech: ['React', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB' },
      { Icon: FaNodeJs, color: '#339933' },
      { Icon: SiMongodb, color: '#47A248' }
    ],
    description: 'Book-centric MERN platform',
    liveLink: 'https://bookmakk.netlify.app/',
    githubLink: 'https://github.com/Arunarivalagan743/BooksMania'
  },
  {
    title: 'DarkCart',
    icon: '🛒',
    color: '#8A2BE2',
    image: darkcartImg,
    tech: ['React', 'Tailwind CSS', 'Express', 'Node.js', 'MongoDB'],
    techIcons: [
      { Icon: FaReact, color: '#61DAFB' },
      { Icon: SiTailwindcss, color: '#06B6D4' },
      { Icon: SiExpress, color: '#000000' },
      { Icon: FaNodeJs, color: '#339933' },
      { Icon: SiMongodb, color: '#47A248' }
    ],
    description: 'E-commerce MERN stack app with modern UI',
    liveLink: 'https://example.com/darkcart',
    githubLink: 'https://github.com/gowthamvetri/DarkArt/tree/dev'
  }
];

// Example data for hackathonProjects
const hackathonProjects = [
  {
    title: 'TruthTell',
    icon: '🔍',
    color: '#FFA500',
    image: truthtellImg,
    tech: ['Firebase', 'React'],
    techIcons: [
      { Icon: SiFirebase, color: '#FFCA28' },
      { Icon: FaReact, color: '#61DAFB' }
    ],
    description: 'Placed 12th in HackerEarth Hackathon (April 2025)',
    githubLink: 'https://github.com/Arunarivalagan743/misinfo_detection_project'
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const CardComponent: React.FC<{ project: Project; index: number; isMain: boolean }> = ({ project, index, isMain }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden relative w-80 flex-shrink-0" // fixed width and no shrinking for carousel
    >
      <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-primary transition-all duration-500 flex flex-col">
        <div className="relative w-full h-48 overflow-hidden group cursor-pointer">
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {/* Overlay description */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent
              flex items-center px-4 text-white text-sm font-semibold"
            initial="hidden"
            variants={overlayVariants}
            whileHover="visible"
          >
            {project.description}
          </motion.div>
          
        </div>

        <CardHeader className="pb-2">
          <h3
            className="text-xl font-bold transition-colors"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techIcons.map(({ Icon, color }, i) => (
              <Icon
                key={i}
                className="text-xl"
                style={{ color }}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-2 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center gap-2">
          {isMain && project.liveLink && (
            <Button
              size="sm"
              className="bg-blue-400 hover:bg-blue-500 text-white flex items-center gap-1"
              onClick={() => window.open(project.liveLink, '_blank')}
            >
              <FaExternalLinkAlt size={12} />
              <span>Live</span>
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-400/10 flex items-center gap-1"
            onClick={() => window.open(project.githubLink, '_blank')}
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  // CSS for carousel animation
  const carouselStyle = `
    @keyframes scrollLeft {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-320px * ${mainProjects.length}));
      }
    }
    
    .carousel-scroll {
      animation: scrollLeft 30s linear infinite;
    }
    
    .carousel-scroll:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <section id="projects" className="py-20 bg-black text-white relative">
      {/* Add the animation styles */}
      <style dangerouslySetInnerHTML={{ __html: carouselStyle }} />
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/grid-pattern.svg')",
            backgroundSize: "40px 40px",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-4 pb-2 border-b-2 border-blue-400 inline-block text-white"
          >
            My Projects
          </motion.h2>
        </div>

        {/* Infinite Carousel of Main Projects */}
        <div className="mb-16 relative overflow-hidden">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl font-bold mb-6 text-blue-400 text-center"
          >
            Main Projects
          </motion.h3>

          <div className="overflow-hidden">
            <div className="flex gap-8 carousel-scroll">
              {/* Double the projects to create seamless infinite scroll */}
              {[...mainProjects, ...mainProjects, ...mainProjects].map((project, index) => (
                <CardComponent project={project} index={index} key={index} isMain={true} />
              ))}
            </div>
          </div>
        </div>

        {/* Hackathon Projects (static grid, no scroll) */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-2xl font-bold mb-6 text-blue-400 text-center flex items-center justify-center"
          >
            <SiHackerearth className="mr-2" />
            Hackathon Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonProjects.map((project, index) => (
              <CardComponent project={project} index={index} key={index} isMain={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;