import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FaQuoteLeft, 
  FaUsers, 
  FaExternalLinkAlt,
  FaChevronRight,
  FaSearch,
  FaDownload,
  FaUniversity,
  FaAward,
  FaBarcode
} from 'react-icons/fa';
import { RiFileList3Line, RiNewspaperLine, RiLinksFill } from 'react-icons/ri';
import { MdOutlineScience, MdVerified } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';

// Corrected publications data
const publications = [
  {
    id: 1,
    title: "Cinematic Popcorn Park: Revolutionizing Movie Time with Integrated Ticketing and Smart Parking",
    authors: ["Arun A"],
    journal: "International Scientific Journal of Engineering & Management (ISJEM)",
    date: "May 2025",
    abstract: "This paper presents an innovative solution for enhancing the movie-going experience through integrated ticketing and smart parking systems. The proposed 'Cinematic Popcorn Park' framework streamlines the entire process from ticket booking to parking allocation, significantly reducing wait times and improving customer satisfaction. Our implementation utilizes IoT sensors, mobile application integration, and predictive analytics to optimize resource allocation and traffic flow management, resulting in a 45% reduction in parking-related delays and a 62% improvement in overall customer experience ratings.",
    keywords: ["Smart Parking", "Integrated Ticketing", "IoT", "Mobile Applications", "User Experience"],
    doi: "10.55041/ISJEM03505",
    pdfUrl: "https://isjem.com/volume-04-issue-05-may-2025/",
    citationCount: 12,
    image: "/assets/publicationCiniMatic_page-0002.jpg",
    category: "iot",
    publisher: "EdTech Publishers (OPC) Private Limited",
    impact: 7.839,
    issn: "2583-6129",
    volume: "04",
    issue: "05"
  }
];

// Updated categories
const categories = [
  { id: "all", name: "All Publications" },
  { id: "iot", name: "IoT & Smart Systems" },
  { id: "web-development", name: "Web Development" },
  { id: "distributed-systems", name: "Distributed Systems" }
];

const PublicationsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  
  // Filter publications based on category and search query
  const filteredPublications = publications.filter(pub => {
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Track if sections are in view
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="publications" className="py-20 relative overflow-hidden">
     
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with a more academic/research aesthetic */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-3"
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
            <span className="mx-2 text-cyan-400 text-sm font-medium tracking-wider uppercase">Academic Contributions</span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </motion.div>
          
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
              <HiOutlineAcademicCap className="text-cyan-400" />
              <span>Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Publications</span></span>
            </h2>
            <motion.div 
              className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-zinc-400 mt-6 text-center max-w-2xl">
            Peer-reviewed publications contributing to the advancement of technology and computer science
          </p>
        </div>
        
        {/* Search and Filter Controls with updated design */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-md -z-10"></div>
            <input
              type="text"
              placeholder="Search by title, keyword, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-cyan-500/50 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:ring-1 focus:ring-cyan-500/30 focus:outline-none transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCategory === category.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg -z-10 border border-cyan-500/30"
                    layoutId="categoryBackgroundPub"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Publications in Academic Journal Card Format */}
        {filteredPublications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RiFileList3Line className="text-5xl text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-lg">No publications found matching your criteria</p>
          </div>
        ) : (
          <div ref={sectionRef}>
            {filteredPublications.map((publication, index) => (
              <motion.div
                key={publication.id}
                className="relative rounded-2xl overflow-hidden shadow-2xl group mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Journal information header */}
                <div className="bg-gradient-to-r from-blue-900/70 to-cyan-900/70 backdrop-blur-md py-4 px-6 border-b border-cyan-500/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                        <RiNewspaperLine className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{publication.journal}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <span>Vol. {publication.volume}</span>
                          <span>|</span>
                          <span>Issue {publication.issue}</span>
                          <span>|</span>
                          <span>{publication.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                      <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1 rounded-full">
                        <FaBarcode className="text-cyan-400" />
                        <span className="text-xs text-gray-300">{publication.issn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1 rounded-full">
                        <FaAward className="text-amber-400" />
                        <span className="text-xs text-gray-300">IF: {publication.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-x border-b border-zinc-800">
                  <div className="md:flex">
                    {/* Publication Content */}
                    <div className="md:w-2/3 p-6 md:p-8">
                      {/* Mobile image - only visible on small screens */}
                      <div className="md:hidden mb-6 w-full">
                        <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg border border-zinc-700/50">
                          <img 
                            src={publication.image || "/assets/default-publication.jpg"} 
                            alt={`${publication.title} publication`} 
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              e.currentTarget.src = "/assets/default-publication.jpg";
                              e.currentTarget.onerror = null;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-40"></div>
                        </div>
                      </div>

                      <div className="md:flex gap-6">
                        {/* Desktop image - only visible on medium screens and up */}
                        <div className="hidden md:block flex-shrink-0 mb-4 md:mb-0">
                          <div className="relative w-40 h-56 overflow-hidden rounded-lg shadow-lg border border-zinc-700/50 group/image">
                            <img 
                              src={publication.image || "/assets/default-publication.jpg"} 
                              alt={`${publication.title} publication`} 
                              className="w-full h-full object-cover transform group-hover/image:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.src = "/assets/default-publication.jpg";
                                e.currentTarget.onerror = null;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent opacity-40 group-hover/image:opacity-20 transition-opacity duration-700"></div>
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                            {publication.title}
                          </h3>
                          
                          {/* Authors with badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-5">
                            {publication.authors.map((author, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1"
                              >
                                <FaUsers className="text-blue-400 text-xs" />
                                <span className="text-sm text-zinc-200">{author}</span>
                                {idx === 0 && (
                                  <span className="text-[10px] bg-cyan-900/60 text-cyan-300 px-1.5 py-0.5 rounded-full">
                                    Primary Author
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Abstract with gradient cutoff */}
                          <div className="relative">
                            <p className="text-zinc-300 text-sm mb-6 line-clamp-3">
                              {publication.abstract}
                            </p>
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                          </div>
                          
                          {/* Keywords with improved styling */}
                          <div className="mb-6">
                            <h5 className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Keywords</h5>
                            <div className="flex flex-wrap gap-2">
                              {publication.keywords.map((keyword, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-300 px-2 py-1 rounded-md border border-cyan-700/20"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Citation and technical details */}
                      <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1.5 rounded-lg">
                              <MdOutlineScience className="text-cyan-400" />
                              <span className="text-sm text-white font-medium">{publication.citationCount}</span>
                              <span className="text-xs text-gray-400">citations</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1.5 rounded-lg">
                              <RiLinksFill className="text-cyan-400" />
                              <span className="text-xs text-gray-300">DOI: {publication.doi}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              className="bg-zinc-800 hover:bg-zinc-700 text-cyan-300 p-2 rounded-lg transition-colors flex items-center gap-2"
                              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                            >
                              <span className="text-xs">Details</span>
                              <FaChevronRight className={`transition-transform ${showTechnicalDetails ? 'rotate-90' : ''}`} />
                            </motion.button>
                            
                            <motion.a
                              href={publication.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors flex items-center gap-2"
                            >
                              <span className="text-xs">View</span>
                              <FaExternalLinkAlt className="text-xs" />
                            </motion.a>
                          </div>
                        </div>
                        
                        {/* Technical details with animated expansion */}
                        <AnimatePresence>
                          {showTechnicalDetails && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-zinc-800 pt-4 mt-2">
                                <h5 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Publication Details</h5>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between bg-zinc-800/30 px-3 py-1.5 rounded-md">
                                      <span className="text-xs text-zinc-400">Publisher</span>
                                      <span className="text-xs text-zinc-200">{publication.publisher}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-zinc-800/30 px-3 py-1.5 rounded-md">
                                      <span className="text-xs text-zinc-400">ISSN</span>
                                      <span className="text-xs text-zinc-200">{publication.issn}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between bg-zinc-800/30 px-3 py-1.5 rounded-md">
                                      <span className="text-xs text-zinc-400">Impact Factor</span>
                                      <span className="text-xs text-cyan-300">{publication.impact}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-zinc-800/30 px-3 py-1.5 rounded-md">
                                      <span className="text-xs text-zinc-400">Publication Date</span>
                                      <span className="text-xs text-zinc-200">{publication.date}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Citation format */}
                                <div className="mt-4">
                                  <h6 className="text-xs font-semibold text-zinc-400 mb-2">How to Cite</h6>
                                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-md p-3">
                                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                                      <span className="text-cyan-400">{publication.authors.join(", ")}</span>. ({publication.date.split(" ")[1]}). 
                                      "{publication.title}". <span className="italic">{publication.journal}</span>, 
                                      {publication.volume}({publication.issue}). DOI: {publication.doi}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Publication Abstract and Details */}
                    <div className="md:w-1/3 bg-gradient-to-br from-zinc-900 to-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800 p-6 relative">
                      <div className="absolute top-0 left-0 right-0 h-[1px] md:h-full md:w-[1px] bg-gradient-to-r md:bg-gradient-to-b from-transparent via-cyan-800/20 to-transparent"></div>
                      
                      <div className="flex flex-col h-full">
                        <h5 className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                          <FaQuoteLeft className="text-cyan-500/40" />
                          Abstract
                        </h5>
                        
                        <div className="flex-1">
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            {publication.abstract}
                          </p>
                          
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-cyan-500/30 text-white py-2 px-4 rounded-md transition-all"
                          >
                            <FaDownload className="text-cyan-400" />
                            <span className="text-sm">Download Publication</span>
                          </a>
                          
                          <div className="mt-8 flex items-center gap-2">
                            <MdVerified className="text-green-400" />
                            <span className="text-xs text-gray-400">Peer-reviewed & Published</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Citation Stats with more academic design */}
        <motion.div 
          className="mt-16 relative backdrop-blur-md rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Gradient border */}

          

           
        </motion.div>
      </div>
      
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
};

export default PublicationsSection;