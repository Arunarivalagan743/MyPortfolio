
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiC, SiHtml5, SiCss3, SiReact, SiRedux,
  SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiMongodb,
  SiPostgresql, SiFirebase, SiGit, SiPostman, SiFigma
} from 'react-icons/si';
import { FaNodeJs, FaReact, FaGithub, FaJava } from 'react-icons/fa';
import { BsFillFileEarmarkWordFill } from 'react-icons/bs';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Java", icon: FaJava, color: "#ED8B00" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "C", icon: SiC, color: "#00599C" }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS", icon: SiCss3, color: "#1572B6" },
        { name: "React.js", icon: FaReact, color: "#61DAFB" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" }
      ]
    },
    {
      title: "Styling",
      skills: [
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#000000" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "MS Office", icon: BsFillFileEarmarkWordFill, color: "#2B579A" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-zinc-950 relative">
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
<h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline text-center mx-auto" data-aos="fade-up">
        Skills and Technologies
      </h2>
        <p className="text-center text-gray-400 mb-12" data-aos="fade-up">
          Here are some of the technologies and tools I have experience with:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <h3 className="text-2xl font-medium mb-4 text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <motion.div 
                    key={skill.name}
                    className="skill-card"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <skill.icon style={{ color: skill.color }} className="text-4xl mb-2" />
                    <span className="text-sm">{skill.name}</span>
                  </motion.div>
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
