
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  SiJavascript, SiC, SiHtml5, SiCss3, SiReact, SiRedux,
  SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiMongodb,
  SiPostgresql, SiFirebase, SiGit, SiPostman, SiFigma
} from 'react-icons/si';
import { FaNodeJs, FaReact, FaGithub, FaJava } from 'react-icons/fa';
import { BsFillFileEarmarkWordFill } from 'react-icons/bs';

const SkillsSection = () => {
  // Updated skill categories with proficiency levels
  const skillCategories = [
    {
      title: "Languages",
      color: "#ED8B00",
      skills: [
        { name: "Java", icon: FaJava, color: "#ED8B00", proficiency: 85 },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90 },
        { name: "C", icon: SiC, color: "#00599C", proficiency: 75 }
      ]
    },
    {
      title: "Frontend",
      color: "#61DAFB",
      skills: [
        { name: "HTML", icon: SiHtml5, color: "#E34F26", proficiency: 92 },
        { name: "CSS", icon: SiCss3, color: "#1572B6", proficiency: 88 },
        { name: "React.js", icon: FaReact, color: "#61DAFB", proficiency: 90 },
        { name: "Redux", icon: SiRedux, color: "#764ABC", proficiency: 82 }
      ]
    },
    {
      title: "Styling",
      color: "#06B6D4",
      skills: [
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", proficiency: 95 },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", proficiency: 85 }
      ]
    },
    {
      title: "Backend",
      color: "#339933",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933", proficiency: 88 },
        { name: "Express.js", icon: SiExpress, color: "#ffffff", proficiency: 85 }
      ]
    },
    {
      title: "Database",
      color: "#47A248",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248", proficiency: 87 },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", proficiency: 78 },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28", proficiency: 82 }
      ]
    },
    {
      title: "Tools",
      color: "#F05032",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032", proficiency: 90 },
        { name: "GitHub", icon: FaGithub, color: "#FFFFFF", proficiency: 93 },
        { name: "Postman", icon: SiPostman, color: "#FF6C37", proficiency: 85 },
        { name: "Figma", icon: SiFigma, color: "#F24E1E", proficiency: 77 },
        { name: "MS Office", icon: BsFillFileEarmarkWordFill, color: "#2B579A", proficiency: 80 }
      ]
    }
  ];

  // Modern box-shaped progress bar component
  const BoxProgressBar = ({ skill }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    // Calculate number of filled boxes based on proficiency
    const totalBoxes = 10;
    const filledBoxes = Math.round(skill.proficiency / 10);
    
    return (
      <motion.div 
        ref={ref}
        className="flex flex-col items-center p-4  rounded-lg backdrop-blur-sm border border-zinc-700/50 transition-all"
        whileHover={{ 
          backgroundColor: `rgba(30, 30, 36, 0.8)`,
          borderColor: `${skill.color}50`,
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        {/* Icon section - larger and more visible */}
        <div className="mb-3 p-3 rounded-lg bg-zinc-900/80" style={{ 
          boxShadow: `0 0 15px ${skill.color}20`
        }}>
          <skill.icon className="text-5xl" style={{ color: skill.color }} />
        </div>
        
        {/* Skill name */}
        <h4 className="text-md font-medium text-white mb-2">{skill.name}</h4>
        
        {/* Box-shaped progress indicator */}
        <div className="grid grid-cols-10 gap-1 w-full mt-2">
          {[...Array(totalBoxes)].map((_, index) => (
            <motion.div
              key={index}
              className="h-2 rounded-sm"
              initial={{ opacity: 0.3, backgroundColor: "#3f3f46" }}
              animate={isInView ? {
                opacity: index < filledBoxes ? 1 : 0.3,
                backgroundColor: index < filledBoxes ? skill.color : "#3f3f46",
                transition: { 
                  delay: index * 0.05,
                  duration: 0.3
                }
              } : {}}
            />
          ))}
        </div>
        
        {/* Proficiency percentage */}
        <div className="mt-2 text-xs font-semibold" style={{ color: skill.color }}>
          {skill.proficiency}%
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20relative">
      <div className="absolute inset-0 opacity-5">
        {/* Background code pattern */}
        <div 
          className="h-full w-full opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300BFFF' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        {/* Section heading with modern styling */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Skills</span> & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 mx-auto"></div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            My technical toolkit includes these technologies that I've mastered through hands-on experience in various projects.
          </p>
        </div>
        
        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Category heading with colored accent */}
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-6 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                <div className="h-px grow ml-4 bg-gradient-to-r from-zinc-800 to-transparent"></div>
              </div>
              
              {/* Skills grid with box progress bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <BoxProgressBar key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;