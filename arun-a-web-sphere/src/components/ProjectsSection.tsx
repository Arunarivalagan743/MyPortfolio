import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt
} from 'react-icons/fa';
import { SiMongodb, SiFirebase, SiRedux, SiTailwindcss, SiHackerearth, SiExpress } from 'react-icons/si';

const ProjectsSection = () => {
  const mainProjects = [
    {
      title: 'TicketPark',
      icon: '🎟️',
      color: '#00BFFF',
      image: '/placeholder.svg',
      tech: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
      techIcons: [
        { Icon: FaReact, color: '#61DAFB' },
        { Icon: SiTailwindcss, color: '#06B6D4' },
        { Icon: SiRedux, color: '#764ABC' },
        { Icon: FaNodeJs, color: '#339933' },
        { Icon: SiMongodb, color: '#47A248' }
      ],
      description: 'Cinema + parking booking system with JWT & Firebase',
      liveLink: 'https://example.com/ticketpark',
      githubLink: 'https://github.com/example/ticketpark'
    },
    {
      title: 'PageTurner',
      icon: '📚',
      color: '#FF6B6B',
      image: '/placeholder.svg',
      tech: ['React', 'Node.js', 'MongoDB'],
      techIcons: [
        { Icon: FaReact, color: '#61DAFB' },
        { Icon: FaNodeJs, color: '#339933' },
        { Icon: SiMongodb, color: '#47A248' }
      ],
      description: 'Book-centric MERN platform',
      liveLink: 'https://example.com/pageturner',
      githubLink: 'https://github.com/example/pageturner'
    },
    {
      title: 'DarkCart',
      icon: '🛒',
      color: '#8A2BE2',
      image: '/placeholder.svg',
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
      githubLink: 'https://github.com/example/darkcart'
    }
  ];
  
  const hackathonProjects = [
    {
      title: 'TruthTell',
      icon: '🏆',
      color: '#FFA500',
      image: '/placeholder.svg',
      tech: ['Firebase', 'React'],
      techIcons: [
        { Icon: SiFirebase, color: '#FFCA28' },
        { Icon: FaReact, color: '#61DAFB' }
      ],
      description: 'Placed 12th in HackerEarth Hackathon (April 2025)',
      githubLink: 'https://github.com/example/hackathon'
    },
  ];

  const CardComponent = ({ project, index, isMain }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 25px -5px rgba(0, 191, 255, 0.2), 0 10px 10px -5px rgba(0, 191, 255, 0.1)' 
      }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-primary transition-all duration-500 flex flex-col">
        <div className="relative w-full h-48 overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-full">
            <span className="text-2xl">{project.icon}</span>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 
            className="text-xl font-bold group-hover:text-primary transition-colors"
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
          <p className="text-gray-400">{project.description}</p>
        </CardContent>
        
        <CardFooter className="pt-2 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center gap-2">
          {isMain && (
            <Button 
              size="sm" 
              className="bg-[#00BFFF] hover:bg-[#1E90FF] text-white flex items-center gap-1"
              onClick={() => window.open(project.liveLink, '_blank')}
            >
              <FaExternalLinkAlt size={12} />
              <span>Live</span>
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline"
            className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 flex items-center gap-1"
            onClick={() => window.open(project.githubLink, '_blank')}
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-zinc-950 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(#00BFFF 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline">
            Projects
          </h2>
        </div>

        {/* Main Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-primary/90 text-center" data-aos="fade-up">
            Main Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mainProjects.map((project, index) => (
              <CardComponent project={project} index={index} key={index} isMain />
            ))}
          </div>
        </div>

        {/* Hackathon Projects */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary/90 text-center" data-aos="fade-up">
            <SiHackerearth className="inline-block mr-2" /> 
            Hackathon Projects
          </h3>
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
