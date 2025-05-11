import React from 'react';
import { motion } from 'framer-motion';

const CertificationTimeline = () => {
  const certifications = [
    {
      title: 'Web Development Bootcamp by Angela Yu',
      date: 'Nov 2024',
      description: 'Completed comprehensive full-stack web development course covering HTML, CSS, JavaScript, Node.js, React, MongoDB, etc.',
      certificateLink: '#',
      certificateImage: 'https://via.placeholder.com/300',
    },
    {
      title: 'React Native Development Course',
      date: 'Aug 2024',
      description: 'Learned to build mobile apps using React Native and Expo, including navigation, APIs, and testing.',
      certificateLink: '#',
      certificateImage: 'https://via.placeholder.com/300',
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      date: 'Jan 2025',
      description: 'Completed course on JavaScript algorithms and data structures to enhance coding skills.',
      certificateLink: '#',
      certificateImage: 'https://via.placeholder.com/300',
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline text-center text-white">
            Certifications Timeline
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 items-center mb-12 last:mb-0"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ x: 5 }}
            >
              <div className="md:col-span-1 text-primary font-semibold mb-2 md:mb-0 md:text-right">
                {cert.date}
              </div>

              <div className="md:col-span-4 p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-gray-300">{cert.description}</p>

                <img 
                  src={cert.certificateImage} 
                  alt="Certificate" 
                  className="mt-4 rounded-md max-w-full h-auto border border-white/10"
                />

                <div className="flex justify-end mt-4">
                  <a 
                    href={cert.certificateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-300"
                  >
                    View Certificate
                  </a>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md shadow-blue-400/40">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationTimeline;
