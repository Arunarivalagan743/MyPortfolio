
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="py-10 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-primary">
              Arun<span className="text-white">.dev</span>
            </h3>
            <p className="text-gray-400 mt-2">MERN Stack Developer | CSE Student</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex space-x-6 text-xl">
              <a href="https://github.com/Arunarivalagan743" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <FaGithub />
              </a>
              <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiLeetcode />
              </a>
            </div>
            
            <a 
              href="mailto:arun@example.com" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              arun@example.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Arun A. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
