
// import React, { useRef, useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { HiDocumentText } from "react-icons/hi2";
// import { 
//   FaGithub, 
//   FaLinkedinIn, 
//   FaCode, 
//   FaNetworkWired, 
//   FaServer, 
//   FaDatabase,
//   FaStar,
//   FaCodeBranch,
//   FaCalendarAlt,
//   FaFire,
//   FaTrophy,
//   FaChartLine,
//   FaGitAlt,

// } from 'react-icons/fa';
// import {  FaFutbol, FaBook, FaPaintBrush, FaLightbulb } from 'react-icons/fa';

// import { 
//   SiLeetcode, 
//   SiCodechef, 
//   SiCodeforces, 
//   SiGeeksforgeeks, 
//   SiReddit, 
//   SiStackoverflow,
//   SiJavascript,
//   SiPython,
//   SiTypescript,
//   SiReact
// } from 'react-icons/si';

// const aboutImage = "/assets/aboutimg.jpg";

// const TARGET_TEXT = "View Resume";
// const CYCLES_PER_LETTER = 2;
// const SHUFFLE_TIME = 50;
// const CHARS = "!@#$%^&*():{};|,.<>/?";

// // Binary/encryption characters for the border animation
// // const ENCRYPTION_CHARS = "01";
// const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

// // API Configuration
// const GITHUB_USERNAME = "Arunarivalagan743";
// const LEETCODE_USERNAME = "Arun_774";

// // Coding profile data
// const codingProfiles = [
//   { name: "LeetCode", icon: SiLeetcode, color: "#FFA116", url: `https://leetcode.com/u/${LEETCODE_USERNAME}/` },
//   { name: "GeeksforGeeks", icon: SiGeeksforgeeks, color: "#2F8D46", url: "https://www.geeksforgeeks.org/" },
//   { name: "Reddit", icon: SiReddit, color: "#FF4500", url: "https://www.reddit.com/" },
//   { name: "CodeChef", icon: SiCodechef, color: "#5B4638", url: "https://www.codechef.com/" },
//   { name: "CodeForces", icon: SiCodeforces, color: "#1F8ACB", url: "https://codeforces.com/" },
//   { name: "Stack Overflow", icon: SiStackoverflow, color: "#F48024", url: "https://stackoverflow.com/" }
// ];

// // Technical skills data with icons
// const technicalSkills = [
//   { name: "Web Development", icon: FaCode, color: "#00BFFF" },
//   { name: "Data Structures", icon: FaDatabase, color: "#FF6B6B" },
//   { name: "Problem Solving", icon: FaCode, color: "#4CAF50" },
//   { name: "Networking", icon: FaNetworkWired, color: "#9C27B0" },
//   { name: "Backend Development", icon: FaServer, color: "#FF9800" }
// ];

// // Custom hooks for API data
// const useGitHubStats = (username) => {
//   const [stats, setStats] = useState({
//     profile: null,
//     repos: [],
//     languages: {},
//     totalStars: 0,
//     totalForks: 0,
//     contributions: 0,
//     contributionStreak: 0,
//     loading: true,
//     error: null
//   });

//   useEffect(() => {
//     const fetchGitHubData = async () => {
//       try {
//         setStats(prev => ({ ...prev, loading: true, error: null }));
        
//         // Fetch user profile
//         const profileResponse = await fetch(`https://api.github.com/users/${username}`);
//         if (!profileResponse.ok) throw new Error('Failed to fetch profile');
//         const profile = await profileResponse.json();

//         // Fetch repositories
//         const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
//         if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
//         const repos = await reposResponse.json();

//         // Calculate stats
//         const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
//         const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

//         // Fetch languages for top repos
//         const languageStats = {};
//         for (const repo of repos.slice(0, 8)) {
//           try {
//             const langResponse = await fetch(repo.languages_url);
//             if (langResponse.ok) {
//               const languages = await langResponse.json();
//               Object.keys(languages).forEach(lang => {
//                 languageStats[lang] = (languageStats[lang] || 0) + languages[lang];
//               });
//             }
//           } catch (err) {
//             console.warn(`Failed to fetch languages for ${repo.name}`);
//           }
//           // Add delay to avoid rate limiting
//           await new Promise(resolve => setTimeout(resolve, 100));
//         }

//         // Mock contribution data (GitHub GraphQL API would be needed for real data)
//         const mockContributions = Math.floor(Math.random() * 500) + 800;
//         const mockStreak = Math.floor(Math.random() * 50) + 30;

//         setStats({
//           profile,
//           repos,
//           languages: languageStats,
//           totalStars,
//           totalForks,
//           contributions: mockContributions,
//           contributionStreak: mockStreak,
//           loading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('GitHub API Error:', error);
//         setStats(prev => ({ 
//           ...prev, 
//           loading: false, 
//           error: error.message 
//         }));
//       }
//     };

//     if (username) {
//       fetchGitHubData();
//     }
//   }, [username]);

//   return stats;
// };

// const useLeetCodeStats = (username) => {
//   const [leetCodeStats, setLeetCodeStats] = useState({
//     totalSolved: 0,
//     easy: 0,
//     medium: 0,
//     hard: 0,
//     ranking: 0,
//     acceptanceRate: 0,
//     currentStreak: 0,
//     maxStreak: 0,
//     loading: true,
//     error: null
//   });

//   useEffect(() => {
//     const fetchLeetCodeData = async () => {
//       try {
//         setLeetCodeStats(prev => ({ ...prev, loading: true, error: null }));
        
//         // Try multiple LeetCode API endpoints
//         const apiEndpoints = [
//           `https://leetcode-api-faisalshohag.vercel.app/${username}`,
//           `https://alfa-leetcode-api.onrender.com/${username}/solved`,
//           `https://leetcode-stats-api.herokuapp.com/${username}`
//         ];

//         let data = null;
//         for (const endpoint of apiEndpoints) {
//           try {
//             const response = await fetch(endpoint);
//             if (response.ok) {
//               data = await response.json();
//               break;
//             }
//           } catch (err) {
//             console.warn(`Failed to fetch from ${endpoint}`);
//           }
//         }

//         if (data) {
//           setLeetCodeStats({
//             totalSolved: data.totalSolved || data.solvedProblem || 185,
//             easy: data.easySolved || data.easySolved || 95,
//             medium: data.mediumSolved || data.mediumSolved || 75,
//             hard: data.hardSolved || data.hardSolved || 15,
//             ranking: data.ranking || 35000,
//             acceptanceRate: data.acceptanceRate || 72.5,
//             currentStreak: Math.floor(Math.random() * 15) + 5,
//             maxStreak: Math.floor(Math.random() * 30) + 25,
//             loading: false,
//             error: null
//           });
//         } else {
//           throw new Error('All LeetCode APIs unavailable');
//         }
//       } catch (error) {
//         console.warn('LeetCode API Error, using enhanced mock data:', error);
//         // Enhanced fallback mock data
//         setLeetCodeStats({
//           totalSolved: 185,
//           easy: 95,
//           medium: 75,
//           hard: 15,
//           ranking: 35000,
//           acceptanceRate: 72.5,
//           currentStreak: 12,
//           maxStreak: 28,
//           loading: false,
//           error: null
//         });
//       }
//     };

//     if (username) {
//       fetchLeetCodeData();
//     }
//   }, [username]);

//   return leetCodeStats;
// };

// const AboutSection = () => {
//   const intervalRef = useRef(null);
//   const encryptionIntervalRef = useRef(null);
//   const buttonIntervalRef = useRef(null);
//   const [text, setText] = useState(TARGET_TEXT);
//   const [encryptedBorder, setEncryptedBorder] = useState("");
//   const [isEncrypting, setIsEncrypting] = useState(false);
//   const [buttonEncrypted, setButtonEncrypted] = useState("");
//   const [isButtonEncrypting, setIsButtonEncrypting] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeTab, setActiveTab] = useState('about');
//   const [hoverProfile, setHoverProfile] = useState(null);

//   // API Data
//   const githubStats = useGitHubStats(GITHUB_USERNAME);
//   const leetcodeStats = useLeetCodeStats(LEETCODE_USERNAME);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Generate initial encrypted border text
//   useEffect(() => {
//     generateEncryptedBorder();
//     generateButtonEncryption();
    
//     const interval = setInterval(() => {
//       animateEncryption();
//       if (isMobile) {
//         animateButtonEncryption();
//       }
//     }, 10000);
    
//     return () => {
//       clearInterval(interval);
//       if (encryptionIntervalRef.current) clearInterval(encryptionIntervalRef.current);
//       if (buttonIntervalRef.current) clearInterval(buttonIntervalRef.current);
//     };
//   }, [isMobile]);
  
//   const generateEncryptedBorder = () => {
//     const length = isMobile ? 50 : 100;
//     let result = "";
    
//     // for (let i = 0; i < length; i++) {
//     //   result += ENCRYPTION_CHARS.charAt(Math.floor(Math.random() * ENCRYPTION_CHARS.length));
//     // }
    
//     setEncryptedBorder(result);
//   };

//   const generateButtonEncryption = () => {
//     const length = isMobile ? 30 : 60;
//     let result = "";
    
//     // for (let i = 0; i < length; i++) {
//     //   result += ENCRYPTION_CHARS.charAt(Math.floor(Math.random() * ENCRYPTION_CHARS.length));
//     // }
    
//     setButtonEncrypted(result);
//   };
  
//   const animateEncryption = () => {
//     if (isEncrypting) return;
    
//     setIsEncrypting(true);
//     let iterations = 0;
//     const maxIterations = 20;
    
//     if (encryptionIntervalRef.current) clearInterval(encryptionIntervalRef.current);
//     encryptionIntervalRef.current = setInterval(() => {
//       generateEncryptedBorder();
//       iterations++;
      
//       if (iterations >= maxIterations) {
//         clearInterval(encryptionIntervalRef.current);
//         setIsEncrypting(false);
//       }
//     }, 100);
//   };

//   const animateButtonEncryption = () => {
//     if (isButtonEncrypting) return;
    
//     setIsButtonEncrypting(true);
//     let iterations = 0;
//     const maxIterations = 15;
    
//     if (buttonIntervalRef.current) clearInterval(buttonIntervalRef.current);
//     buttonIntervalRef.current = setInterval(() => {
//       generateButtonEncryption();
//       iterations++;
      
//       if (iterations >= maxIterations) {
//         clearInterval(buttonIntervalRef.current);
//         setIsButtonEncrypting(false);
//       }
//     }, 100);
//   };

//   const scramble = () => {
//     const cycles = isMobile ? 1 : CYCLES_PER_LETTER;
//     let pos = 0;
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       const scrambled = TARGET_TEXT.split("").map((char, index) => {
//         if (pos / cycles > index) {
//           return char;
//         }
//         return CHARS[Math.floor(Math.random() * CHARS.length)];
//       }).join("");

//       setText(scrambled);
//       pos++;

//       if (pos >= TARGET_TEXT.length * cycles) {
//         stopScramble();
//       }
//     }, SHUFFLE_TIME);
    
//     animateEncryption();
//     animateButtonEncryption();
//   };

//   const stopScramble = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     setText(TARGET_TEXT);
//   };

//   const handleMobileTap = () => {
//     scramble();
//     animateButtonEncryption();
//   };

//   // Get top languages for display
//   const getTopLanguages = () => {
//     if (!githubStats.languages || Object.keys(githubStats.languages).length === 0) {
//       return [
//         { name: 'JavaScript', percentage: 35, icon: SiJavascript, color: '#F7DF1E' },
//         { name: 'TypeScript', percentage: 25, icon: SiTypescript, color: '#3178C6' },
//         { name: 'Python', percentage: 20, icon: SiPython, color: '#3776AB' },
//         { name: 'React', percentage: 20, icon: SiReact, color: '#61DAFB' },
//       ];
//     }

//     const total = Object.values(githubStats.languages as Record<string, number>).reduce((sum, bytes) => sum + Number(bytes || 0), 0);
//         const languageIcons = {
//           JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
//           TypeScript: { icon: SiTypescript, color: '#3178C6' },
//           Python: { icon: SiPython, color: '#3776AB' },
//           React: { icon: SiReact, color: '#61DAFB' },
//           Java: { icon: FaCode, color: '#007396' },
//           HTML: { icon: FaCode, color: '#E34F26' },
//           CSS: { icon: FaCode, color: '#1572B6' },
//         };
    
//         return Object.entries(githubStats.languages as Record<string, number>)
//           .sort(([,a], [,b]) => Number(b) - Number(a))
//           .slice(0, 4)
//           .map(([name, bytes]) => ({
//             name,
//             percentage: Math.round((Number(bytes || 0) / (total || 1)) * 100),
//             icon: (languageIcons as Record<string, {icon: React.ComponentType, color: string}>)[name]?.icon || FaCode,
//             color: (languageIcons as Record<string, {icon: React.ComponentType, color: string}>)[name]?.color || '#6B7280',
//           }));
//   };

//   // GitHub contribution grid visualization
//   const renderGitHubContributionGrid = () => {
//     // Mock contribution data for visualization
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const currentMonth = new Date().getMonth();
//     const displayMonths = months.slice(currentMonth - 5, currentMonth + 1);
    
//     // Generate contributions data (mock)
//     const generateContributions = () => {
//       // 0 = no contribution, 4 = many contributions
//       const result = [];
      
//       for (let week = 0; week < 12; week++) {
//         const weekData = [];
//         for (let day = 0; day < 7; day++) {
//           // Higher probability for levels 1-2 on weekdays, and lower on weekends
//           const isDayOff = day === 0 || day === 6;
//           const levelWeights = isDayOff 
//             ? [8, 1, 0.5, 0.2, 0.1] 
//             : [2, 3, 2, 1.5, 1];
          
//           const totalWeight = levelWeights.reduce((a, b) => a + b, 0);
//           let random = Math.random() * totalWeight;
          
//           let selectedLevel = 0;
//           for (let i = 0; i < levelWeights.length; i++) {
//             if (random < levelWeights[i]) {
//               selectedLevel = i;
//               break;
//             }
//             random -= levelWeights[i];
//           }
          
//           weekData.push(selectedLevel);
//         }
//         result.push(weekData);
//       }
      
//       return result;
//     };
    
//     const contributionData = generateContributions();
    
//     const getContributionColor = (level) => {
//       switch (level) {
//         case 0: return 'bg-zinc-800';
//         case 1: return 'bg-green-900/50';
//         case 2: return 'bg-green-700/70';
//         case 3: return 'bg-green-500/80';
//         case 4: return 'bg-green-400';
//         default: return 'bg-zinc-800';
//       }
//     };

//     return (
//       <div className="flex flex-col">
//         <div className="flex justify-between text-xs text-gray-500 mb-1 px-1">
//           {displayMonths.map(month => <div key={month}>{month}</div>)}
//         </div>
//         <div className="grid grid-cols-12 gap-1">
//           {contributionData.map((week, weekIndex) => (
//             <div key={weekIndex} className="flex flex-col gap-1">
//               {week.map((day, dayIndex) => (
//                 <motion.div
//                   key={`${weekIndex}-${dayIndex}`}
//                   className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(day)}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.01 * (weekIndex + dayIndex), duration: 0.3 }}
//                   title={`${day} contributions`}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // LeetCode streak visualization
//   const renderLeetCodeStreakGrid = () => {
//     const generateDayData = () => {
//       const days = [];
//       const today = new Date();
//       const maxStreak = leetcodeStats.maxStreak || 28;
//       const currentStreak = leetcodeStats.currentStreak || 12;
      
//       // Create 30 days data, with currentStreak consecutive days active
//       for (let i = 29; i >= 0; i--) {
//         const date = new Date(today);
//         date.setDate(date.getDate() - i);
        
//         // Determine if this day is part of the current streak
//         // Current streak days are the most recent consecutive days
//         const isPartOfCurrentStreak = i < currentStreak;
        
//         // Also add some random completed days outside the current streak
//         const isRandomCompleted = Math.random() < 0.2 && i >= currentStreak;
        
//         days.push({
//           date,
//           completed: isPartOfCurrentStreak || isRandomCompleted,
//           day: date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)
//         });
//       }
      
//       return days;
//     };
    
//     const dayData = generateDayData();
    
//     // Group by weeks
//     const weeks = [];
//     for (let i = 0; i < dayData.length; i += 7) {
//       weeks.push(dayData.slice(i, i + 7));
//     }
    
//     return (
//       <div className="flex flex-col">
//         <div className="flex justify-end text-xs text-gray-500 mb-2 space-x-2">
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-sm bg-orange-400"></div>
//             <span>Solved</span>
//           </div>
//         </div>
//         <div className="grid grid-cols-5 gap-1.5">
//           {weeks.map((week, weekIndex) => (
//             <div key={weekIndex} className="flex flex-col gap-1.5">
//               {week.map((day, dayIndex) => (
//                 <motion.div
//                   key={`${weekIndex}-${dayIndex}`}
//                   className={`w-3 h-3 rounded-sm ${
//                     day.completed ? 'bg-orange-400' : 'bg-zinc-800'
//                   }`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.02 * (weekIndex * 7 + dayIndex), duration: 0.3 }}
//                   title={`${day.date.toLocaleDateString()}: ${day.completed ? 'Solved' : 'No activity'}`}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section id="about" className="py-20 bg-gradient-to-b">
//       <div className="container mx-auto px-4">
//         {/* Modern Section Header with Animated Underline */}
//         <div className="flex flex-col items-center mb-16">
//           <motion.div
//             className="relative inline-block"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
//             </h2>
//             <motion.div 
//               className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
//               initial={{ width: 0, left: "50%" }}
//               whileInView={{ width: "100%", left: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </motion.div>
//           <p className="text-zinc-400 mt-6 text-center max-w-2xl">
//             Developer, innovator, and creative problem-solver. My journey in building the web.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
//           {/* Left Column: Image and Coding Profiles */}
//           <motion.div
//             className="md:col-span-2 space-y-8"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             {/* Encrypted Image Container */}
//             <motion.div
//               className="relative"
//               onMouseEnter={animateEncryption}
//               onTouchStart={animateEncryption}
//             >
//               {/* Encryption animation border */}
//               <div className="absolute -inset-1 rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                
//                 {/* Encryption border elements */}
//                 {['top', 'bottom', 'left', 'right'].map((side) => (
//                   <div key={side} className={`absolute ${
//                     side === 'top' ? 'top-0 left-0 right-0 h-4 md:h-6' :
//                     side === 'bottom' ? 'bottom-0 left-0 right-0 h-4 md:h-6' :
//                     side === 'left' ? 'top-0 left-0 bottom-0 w-4 md:w-6 writing-vertical-lr' :
//                     'top-0 right-0 bottom-0 w-4 md:w-6 writing-vertical-rl'
//                   } flex items-center overflow-hidden z-10`}>
//                     <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}
//                       style={side === 'bottom' ? { direction: 'rtl' } : {}}>
//                       {encryptedBorder}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="w-full aspect-square max-h-[400px] bg-zinc-900 rounded-lg overflow-hidden relative">
//                 <img src={aboutImage} alt="About Me" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-700/30 flex items-center justify-center" />
//                 <div className="absolute -bottom-4 -right-4 w-24 h-24 blue-gradient rounded-full opacity-60 blur-lg"></div>
//                 <div className="absolute -top-4 -left-4 w-20 h-20 blue-gradient rounded-full opacity-40 blur-md"></div>
                
//                 {/* Matrix-like falling characters overlay */}
//                 <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
//                   {Array.from({length: 10}).map((_, i) => (
//                     <div 
//                       key={i}
//                       className="absolute top-0 text-cyan-300 font-mono text-xs"
//                       style={{
//                         left: `${i * 10}%`,
//                         animation: `matrixFall ${5 + i * 0.5}s linear infinite`,
//                         animationDelay: `${i * 0.2}s`
//                       }}
//                     >
//                       {Array.from({length: 20}).map((_, j) => (
//                         <div key={j} className="my-1">
//                           {MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="absolute -top-6 -left-6 text-primary text-5xl font-mono opacity-20">{`{`}</div>
//               <div className="absolute -bottom-6 -right-6 text-primary text-5xl font-mono opacity-20">{`}`}</div>
//             </motion.div>

//             {/* Enhanced Coding Profiles Section with Live Stats */}
//             <motion.div
//               className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 border border-zinc-800"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
//                 <span className="text-cyan-400">#</span> Coding Profiles
//               </h3>
              
//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 {codingProfiles.map((profile, index) => (
//                   <motion.a 
//                     key={profile.name}
//                     href={profile.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="relative group flex flex-col items-center justify-center p-3 bg-zinc-800/50 rounded-lg overflow-hidden"
//                     whileHover={{ 
//                       scale: 1.05,
//                       backgroundColor: `rgba(30, 30, 35, 0.9)`,
//                       transition: { duration: 0.2 }
//                     }}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.3, delay: 0.1 * index }}
//                     onHoverStart={() => setHoverProfile(profile.name)}
//                     onHoverEnd={() => setHoverProfile(null)}
//                   >
//                     <profile.icon 
//                       className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-125"
//                       style={{ color: profile.color }} 
//                     />
//                     <span className="text-xs text-gray-300 text-center font-medium">
//                       {profile.name}
//                     </span>
                    
//                     <motion.div
//                       className="absolute inset-0 rounded-lg pointer-events-none"
//                       animate={{
//                         boxShadow: hoverProfile === profile.name 
//                           ? `0 0 0 2px ${profile.color}` 
//                           : `0 0 0 0px transparent`
//                       }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Enhanced LeetCode Stats Display */}
//             </motion.div>

//             {/* Enhanced GitHub Stats Card */}
           
//           </motion.div>
          
//           {/* Right Column: About Content */}
//           <motion.div
//             className="md:col-span-3 space-y-8"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             {/* Tab Navigation */}
//             <div className="flex space-x-1 mb-6 bg-zinc-900/60 backdrop-blur-sm p-1 rounded-lg">
//               {['about', 'education', 'interests', 'achievements'].map((tab) => (
//                 <motion.button
//                   key={tab}
//                   className={`px-4 py-2 rounded-md text-sm font-medium capitalize relative ${
//                     activeTab === tab 
//                       ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white' 
//                       : 'text-gray-400 hover:text-white'
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   {tab}
//                   {activeTab === tab && (
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
//                       layoutId="activeTab"
//                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                     />
//                   )}
//                 </motion.button>
//               ))}
//             </div>
            
//             {/* Content Panel */}
//             <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-zinc-800">
//               <AnimatePresence mode="wait">
//                 {activeTab === 'about' && (
//                   <motion.div 
//                     key="about"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-6"
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
//                         A
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-bold text-white">Arun A</h3>
//                         <p className="text-cyan-400 font-medium">MERN Stack Developer</p>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                       I'm a <span className="text-cyan-400 font-medium">MERN Stack Developer</span> and a B.E Computer Science Engineering student (2027 batch). 
//                       I'm a strong communicator, fast learner, and enthusiastic problem solver with interests in web design, 
//                       data structures, and networking.
//                     </p>
                    
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                       I thrive in team environments and also excel independently. My passion lies in creating 
//                       efficient, scalable web solutions with clean code practices.
//                     </p>

//                     {/* Professional skills bars with animation */}
//                     <div className="space-y-4 pt-2">
//                       <h4 className="text-lg font-semibold text-white mb-3">Technical Expertise</h4>
                      
//                       {technicalSkills.map((skill, index) => (
//                         <motion.div 
//                           key={skill.name}
//                           className="space-y-1"
//                           initial={{ opacity: 0, y: 10 }}
//                           whileInView={{ opacity: 1, y: 0 }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.4, delay: index * 0.1 }}
//                         >
//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center gap-2">
//                               <skill.icon style={{ color: skill.color }} />
//                               <span className="text-gray-300">{skill.name}</span>
//                             </div>
//                           </div>
//                           <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
//                             <motion.div
//                               className="h-full rounded-full"
//                               style={{ backgroundColor: skill.color }}
//                               initial={{ width: 0 }}
//                               whileInView={{ width: `${85 - index * 5}%` }}
//                               viewport={{ once: true }}
//                               transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
//                             />
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
                
//                 {activeTab === 'education' && (
//                   <motion.div 
//                     key="education"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-6"
//                   >
//                     <h3 className="text-xl font-semibold text-white">Academic Journey</h3>
                    
//                     <div className="space-y-8">
//                       <motion.div 
//                         className="relative pl-8 border-l-2 border-cyan-400/30"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.1 }}
//                       >
//                         <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-cyan-400"></div>
//                         <h4 className="text-lg font-medium text-white">B.E Computer Science Engineering</h4>
//                         <p className="text-cyan-400">2023 - 2027</p>
//                         <p className="text-gray-400 mt-2">Currently pursuing my Bachelor's degree with focus on web technologies, data structures and algorithms.</p>
//                       </motion.div>
                      
//                       <motion.div 
//                         className="relative pl-8 border-l-2 border-zinc-700"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                       >
//                         <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-zinc-700"></div>
//                         <h4 className="text-lg font-medium text-white">Higher Secondary Education</h4>
//                         <p className="text-gray-400">2021 - 2023</p>
//                         <p className="text-gray-400 mt-2">Completed with excellence in Mathematics and Computer Science.</p>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 )}
                
//                 {activeTab === 'interests' && (
//                 <motion.div 
//   key="interests"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: -20 }}
//   transition={{ duration: 0.3 }}
//   className="space-y-6"
// >
//   <h3 className="text-xl font-semibold text-white">Beyond Coding</h3>
  
//   <div className="grid grid-cols-2 gap-4">
//     {[
//       { title: "Problem Solving", desc: "I enjoy solving challenging algorithmic problems on LeetCode and CodeForces.", icon: FaTrophy },
//       { title: "Web Design", desc: "Creating beautiful, responsive web interfaces with attention to UX.", icon: FaCode },
//       { title: "Open Source", desc: "Contributing to open-source projects and learning from the community.", icon: FaGithub },
//       { title: "Learning", desc: "Continuously exploring new technologies and programming paradigms.", icon: FaChartLine },
//       { title: "Sports", desc: "Staying active and competitive through cricket, badminton, or fitness routines.", icon: FaFutbol },
//       { title: "Books", desc: "Reading tech, self-growth, and fiction books to expand knowledge and imagination.", icon: FaBook },
//       { title: "Drawing", desc: "Expressing creativity through sketches and digital illustrations.", icon: FaPaintBrush },
//       { title: "Innovative Thinking", desc: "Exploring creative solutions that combine logic, design, and technology.", icon: FaLightbulb },
//     ].map((item, i) => (
//       <motion.div
//         key={i}
//         className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50 hover:border-cyan-500/30 transition-colors"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: i * 0.1 }}
//         whileHover={{ scale: 1.02 }}
//       >
//         <div className="flex items-center gap-2 mb-2">
//           <item.icon className="text-cyan-400" />
//           <h4 className="text-lg font-medium text-cyan-400">{item.title}</h4>
//         </div>
//         <p className="text-gray-400">{item.desc}</p>
//       </motion.div>
//     ))}
//   </div>
// </motion.div>

//                 )}

//                 {activeTab === 'achievements' && (
//                   <motion.div 
//                     key="achievements"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-6"
//                   >
//                     <h3 className="text-xl font-semibold text-white">Development Side</h3>
                    
//                     {/* Properly aligned grid for achievement boxes */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
//                       {/* LeetCode Achievement with Streaks */}
//                       <motion.div
//                         className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg p-4 h-full flex flex-col"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.1 }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-orange-500/20 rounded-lg">
//                             <SiLeetcode className="text-orange-400 text-lg" />
//                           </div>
//                           <div>
//                             <h4 className="text-white font-medium text-sm">LeetCode Mastery</h4>
//                             <p className="text-orange-400 text-xs">Problem Solver</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2 flex-1">
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-300">Problems Solved</span>
//                             <span className="text-orange-400 font-medium">{leetcodeStats.totalSolved}</span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-300">Current Streak</span>
//                             <div className="flex items-center gap-1">
//                               <FaFire className="text-orange-400 text-xs" />
//                               <span className="text-orange-400 font-medium">{leetcodeStats.currentStreak} days</span>
//                             </div>
//                           </div>
//                           <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
//                             <motion.div 
//                               className="bg-gradient-to-r from-orange-400 to-yellow-400 h-1.5 rounded-full"
//                               initial={{ width: 0 }}
//                               animate={{ width: `${Math.min((leetcodeStats.totalSolved / 500) * 100, 100)}%` }}
//                               transition={{ duration: 1, delay: 0.5 }}
//                             />
//                           </div>

//                           {/* LeetCode Streak Visualization */}
//                           <div className="mt-4 pt-3 border-t border-zinc-700/30">
//                             <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
//                               <span>Activity Calendar</span>
//                               <span className="text-orange-400 font-medium">{leetcodeStats.maxStreak} days max</span>
//                             </div>
//                             {renderLeetCodeStreakGrid()}
//                           </div>
//                         </div>
//                       </motion.div>

//                       {/* GitHub Achievement with Contributions */}
//                       <motion.div
//                         className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 h-full flex flex-col"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.2 }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-blue-500/20 rounded-lg">
//                             <FaGithub className="text-blue-400 text-lg" />
//                           </div>
//                           <div>
//                             <h4 className="text-white font-medium text-sm">GitHub Impact</h4>
//                             <p className="text-blue-400 text-xs">Open Source Contributor</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2 flex-1">
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-300">Contributions</span>
//                             <span className="text-blue-400 font-medium">{githubStats.contributions}</span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-300">Repositories</span>
//                             <span className="text-blue-400 font-medium">{githubStats.profile?.public_repos || 0}</span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-300">Contribution Streak</span>
//                             <div className="flex items-center gap-1">
//                               <FaFire className="text-green-400 text-xs" />
//                               <span className="text-green-400 font-medium">{githubStats.contributionStreak} days</span>
//                             </div>
//                           </div>

//                           {/* GitHub Contribution Visualization */}
//                           <div className="mt-4 pt-3 border-t border-zinc-700/30">
//                             <div className="text-xs text-gray-400 mb-2">Contribution Activity</div>
//                             {renderGitHubContributionGrid()}
//                           </div>
//                         </div>
//                       </motion.div>

//                       {/* Combined Coding Streak */}
//                       <motion.div
//                         className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 h-full flex flex-col"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-green-500/20 rounded-lg">
//                             <FaFire className="text-green-400 text-lg" />
//                           </div>
//                           <div>
//                             <h4 className="text-white font-medium text-sm">Consistency Master</h4>
//                             <p className="text-green-400 text-xs">Daily Dedication</p>
//                           </div>
//                         </div>
//                         <div className="flex-1 flex flex-col">
//                           <div className="grid grid-cols-2 gap-4 text-center mb-3">
//                             <div>
//                               <div className="text-2xl font-bold text-green-400">{leetcodeStats.maxStreak}</div>
//                               <div className="text-xs text-gray-400">Max LeetCode Streak</div>
//                             </div>
//                             <div>
//                               <div className="text-2xl font-bold text-blue-400">{githubStats.contributionStreak}</div>
//                               <div className="text-xs text-gray-400">GitHub Streak</div>
//                             </div>
//                           </div>
                          
//                           <div className="mt-auto">
//                             <div className="relative pt-1">
//                               <div className="text-xs text-gray-400 mb-1">Combined Activity Level</div>
//                               <div className="flex mb-2 items-center justify-between">
//                                 <div className="text-xs text-gray-400">LeetCode</div>
//                                 <div className="text-xs text-gray-400">GitHub</div>
//                               </div>
//                               <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-zinc-800">
//                                 <motion.div 
//                                   style={{ width: "45%" }} 
//                                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-400"
//                                   initial={{ width: 0 }}
//                                   animate={{ width: "45%" }}
//                                   transition={{ duration: 1, delay: 0.5 }}
//                                 />
//                                 <motion.div 
//                                   style={{ width: "55%" }} 
//                                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
//                                   initial={{ width: 0 }}
//                                   animate={{ width: "55%" }}
//                                   transition={{ duration: 1, delay: 0.7 }}
//                                 />
//                               </div>
//                             </div>
                            
//                             <div className="text-center text-gray-400 text-xs">
//                               You're in the top <span className="text-green-400 font-bold">15%</span> of active coders
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>

//                       {/* Skill Rating */}
//                       <motion.div
//                         className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 h-full flex flex-col"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.4 }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-purple-500/20 rounded-lg">
//                             <FaTrophy className="text-purple-400 text-lg" />
//                           </div>
//                           <div>
//                             <h4 className="text-white font-medium text-sm">Overall Rating</h4>
//                             <p className="text-purple-400 text-xs">Skill Assessment</p>
//                           </div>
//                         </div>
//                         <div className="flex-1 flex flex-col justify-center">
//                           <div className="text-center">
//                             <div className="text-3xl font-bold text-purple-400 mb-2">1850+</div>
//                             <div className="text-sm text-gray-400">Competitive Rating</div>
//                             <div className="text-xs text-gray-500 mt-1 mb-4">Top 15% Developer</div>
//                           </div>
                          
//                           <div className="space-y-2">
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">Algorithm Skills</span>
//                               <div className="flex">
//                                 {[1, 2, 3, 4, 5].map((i) => (
//                                   <motion.div
//                                     key={i}
//                                     className={`w-3 h-3 mx-0.5 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-zinc-700'}`}
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ delay: 0.5 + i * 0.1 }}
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">Web Development</span>
//                               <div className="flex">
//                                 {[1, 2, 3, 4, 5].map((i) => (
//                                   <motion.div
//                                     key={i}
//                                     className={`w-3 h-3 mx-0.5 rounded-full ${i <= 5 ? 'bg-purple-500' : 'bg-zinc-700'}`}
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ delay: 0.5 + i * 0.1 }}
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">Database Design</span>
//                               <div className="flex">
//                                 {[1, 2, 3, 4, 5].map((i) => (
//                                   <motion.div
//                                     key={i}
//                                     className={`w-3 h-3 mx-0.5 rounded-full ${i <= 3 ? 'bg-purple-500' : 'bg-zinc-700'}`}
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ delay: 0.5 + i * 0.1 }}
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
            
//             {/* Enhanced Button Section */}
//             <div className="pt-4 flex flex-col sm:flex-row gap-4">
//               <div className="relative inline-block">
//                 {/* Encryption animation border for button */}
//                 <div className="absolute -inset-1 md:-inset-1 rounded-lg overflow-hidden">
//                   <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                  
//                   {['top', 'bottom', 'left', 'right'].map((side) => (
//                     <div 
//                       key={side}
//                       className={`absolute ${
//                         side === 'top' ? 'top-0 left-0 right-0 h-3 md:h-4' :
//                         side === 'bottom' ? 'bottom-0 left-0 right-0 h-3 md:h-4' :
//                         side === 'left' ? 'top-0 left-0 bottom-0 w-3 md:w-4 writing-vertical-lr' :
//                         'top-0 right-0 bottom-0 w-3 md:w-4 writing-vertical-rl'
//                       } flex items-center overflow-hidden z-10`}
//                     >
//                       <div 
//                         className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}
//                         style={side === 'bottom' ? { direction: 'rtl' } : {}}
//                       >
//                         {buttonEncrypted}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//      …

//                 <a
//                   href="/assets/714023104011 ( 23CS011 ).pdf"
//                   download
//                   onClick={isMobile ? handleMobileTap : undefined}
//                   onMouseEnter={() => {
//                     if (!isMobile) {
//                       scramble();
//                       animateButtonEncryption();
//                     }
//                   }}
//                   onMouseLeave={!isMobile ? stopScramble : undefined}
//                   onTouchStart={handleMobileTap}
//                   className="group relative block w-full sm:w-auto overflow-hidden rounded-lg border border-cyan-500 bg-neutral-800 px-4 py-2 sm:px-6 sm:py-3 font-mono font-medium uppercase text-cyan-300 transition-colors hover:text-white inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 z-30"
//                 >
//                   <HiDocumentText className="text-xl text-cyan-300" />
//                   <span className="inline-block min-w-[8ch] text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] whitespace-nowrap">
//                     {text}
//                   </span>
//                   <motion.span
//                     initial={{ y: "100%" }}
//                     animate={{ y: "-100%" }}
//                     transition={{
//                       repeat: Infinity,
//                       repeatType: "mirror",
//                       duration: 1,
//                       ease: "linear",
//                     }}
//                     className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-cyan-400/0 from-40% via-cyan-400 to-cyan-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
//                   />
//                 </a>
//               </div>
              
//               <motion.a
//                 href={`https://github.com/${GITHUB_USERNAME}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm px-6 py-3 text-gray-300 hover:text-white hover:border-zinc-600 transition-colors duration-300"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <FaGithub className="text-xl" />
//                 <span>GitHub Profile</span>
//               </motion.a>

//               <motion.a
//                 href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm px-6 py-3 text-orange-300 hover:text-orange-200 hover:border-orange-500/50 transition-colors duration-300"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <SiLeetcode className="text-xl" />
//                 <span>LeetCode Profile</span>
//               </motion.a>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Enhanced Global Styles */}
//       <style>{`
//         .writing-vertical-lr {
//           writing-mode: vertical-lr;
//         }
        
//         .writing-vertical-rl {
//           writing-mode: vertical-rl;
//         }
        
//         @keyframes matrixFall {
//           0% {
//             transform: translateY(-100%);
//           }
//           100% {
//             transform: translateY(100%);
//           }
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         @media (max-width: 768px) {
//           .group:active .animate-pulse {
//             animation: pulse 1s infinite;
//           }
          
//           @keyframes pulse {
//             0%, 100% {
//               opacity: 0.7;
//             }
//             50% {
//               opacity: 1;
//             }
//           }
//         }
        
//         .blue-gradient {
//           background: linear-gradient(45deg, #00BFFF, #1E90FF);
//         }
        
//         @keyframes textScramble {
//           0% {
//             content: "${CHARS.charAt(Math.floor(Math.random() * CHARS.length))}";
//           }
//           100% {
//             content: "${CHARS.charAt(Math.floor(Math.random() * CHARS.length))}";
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default AboutSection;



import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDocumentText } from "react-icons/hi2";
import { 
  FaCode, 
  FaNetworkWired, 
  FaServer, 
  FaDatabase
} from 'react-icons/fa';
import { FaFutbol, FaBook, FaPaintBrush, FaLightbulb } from 'react-icons/fa';

import { SiLeetcode } from 'react-icons/si';

const aboutImage = "/assets/aboutimg.jpg";

const TARGET_TEXT = "View Resume";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

// Matrix characters for the border animation
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

// Technical skills data with icons
const technicalSkills = [
  { name: "Web Development", icon: FaCode, color: "#00BFFF" },
  { name: "Data Structures", icon: FaDatabase, color: "#FF6B6B" },
  { name: "Problem Solving", icon: FaCode, color: "#4CAF50" },
  { name: "Networking", icon: FaNetworkWired, color: "#9C27B0" },
  { name: "Backend Development", icon: FaServer, color: "#FF9800" }
];

const AboutSection = () => {
  const intervalRef = useRef(null);
  const encryptionIntervalRef = useRef(null);
  const buttonIntervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);
  const [encryptedBorder, setEncryptedBorder] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [buttonEncrypted, setButtonEncrypted] = useState("");
  const [isButtonEncrypting, setIsButtonEncrypting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate initial encrypted border text
  useEffect(() => {
    generateEncryptedBorder();
    generateButtonEncryption();
    
    const interval = setInterval(() => {
      animateEncryption();
      if (isMobile) {
        animateButtonEncryption();
      }
    }, 10000);
    
    return () => {
      clearInterval(interval);
      if (encryptionIntervalRef.current) clearInterval(encryptionIntervalRef.current);
      if (buttonIntervalRef.current) clearInterval(buttonIntervalRef.current);
    };
  }, [isMobile]);
  
  const generateEncryptedBorder = () => {
    const length = isMobile ? 50 : 100;
    let result = "";
    setEncryptedBorder(result);
  };

  const generateButtonEncryption = () => {
    const length = isMobile ? 30 : 60;
    let result = "";
    setButtonEncrypted(result);
  };
  
  const animateEncryption = () => {
    if (isEncrypting) return;
    
    setIsEncrypting(true);
    let iterations = 0;
    const maxIterations = 20;
    
    if (encryptionIntervalRef.current) clearInterval(encryptionIntervalRef.current);
    encryptionIntervalRef.current = setInterval(() => {
      generateEncryptedBorder();
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(encryptionIntervalRef.current);
        setIsEncrypting(false);
      }
    }, 100);
  };

  const animateButtonEncryption = () => {
    if (isButtonEncrypting) return;
    
    setIsButtonEncrypting(true);
    let iterations = 0;
    const maxIterations = 15;
    
    if (buttonIntervalRef.current) clearInterval(buttonIntervalRef.current);
    buttonIntervalRef.current = setInterval(() => {
      generateButtonEncryption();
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(buttonIntervalRef.current);
        setIsButtonEncrypting(false);
      }
    }, 100);
  };

  const scramble = () => {
    const cycles = isMobile ? 1 : CYCLES_PER_LETTER;
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("").map((char, index) => {
        if (pos / cycles > index) {
          return char;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * cycles) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
    
    animateEncryption();
    animateButtonEncryption();
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
  };

  const handleMobileTap = () => {
    scramble();
    animateButtonEncryption();
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        {/* Section Header with Animated Underline */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
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
            Developer, innovator, and creative problem-solver. My journey in building the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left Column: Image and Coding Profiles */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Image Container */}
            <motion.div
              className="relative"
              onMouseEnter={animateEncryption}
              onTouchStart={animateEncryption}
            >
              {/* Encryption animation border */}
              <div className="absolute -inset-1 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                
                {/* Encryption border elements */}
                {['top', 'bottom', 'left', 'right'].map((side) => (
                  <div key={side} className={`absolute ${
                    side === 'top' ? 'top-0 left-0 right-0 h-4 md:h-6' :
                    side === 'bottom' ? 'bottom-0 left-0 right-0 h-4 md:h-6' :
                    side === 'left' ? 'top-0 left-0 bottom-0 w-4 md:w-6 writing-vertical-lr' :
                    'top-0 right-0 bottom-0 w-4 md:w-6 writing-vertical-rl'
                  } flex items-center overflow-hidden z-10`}>
                    <div className={`whitespace-nowrap font-mono text-[10px] md:text-sm text-cyan-400 opacity-70 ${isEncrypting ? 'animate-pulse' : ''}`}
                      style={side === 'bottom' ? { direction: 'rtl' } : {}}>
                      {encryptedBorder}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full aspect-square max-h-[400px] bg-zinc-900 rounded-lg overflow-hidden relative">
                <img src={aboutImage} alt="About Me" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-700/30 flex items-center justify-center" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 blue-gradient rounded-full opacity-60 blur-lg"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 blue-gradient rounded-full opacity-40 blur-md"></div>
                
                {/* Matrix-like falling characters overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                  {Array.from({length: 10}).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 text-cyan-300 font-mono text-xs"
                      style={{
                        left: `${i * 10}%`,
                        animation: `matrixFall ${5 + i * 0.5}s linear infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    >
                      {Array.from({length: 20}).map((_, j) => (
                        <div key={j} className="my-1">
                          {MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -left-6 text-primary text-5xl font-mono opacity-20">{`{`}</div>
              <div className="absolute -bottom-6 -right-6 text-primary text-5xl font-mono opacity-20">{`}`}</div>
            </motion.div>

            {/* Codolio Profile Link */}
            <motion.div
              className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 border border-zinc-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-cyan-400">#</span> Coding Profile
              </h3>
              
              <motion.a 
                href="https://codolio.com/profile/arun_743"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center p-4 bg-zinc-800/50 rounded-lg overflow-hidden w-full"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: `rgba(30, 30, 35, 0.9)`,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg">
                    <img src="/assets/coding.png" alt="Coding" className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                   
                    
                  </div>
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  whileHover={{ boxShadow: "0 0 0 2px rgba(255, 161, 22, 0.5)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right Column: About Content */}
          <motion.div
            className="md:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-zinc-900/60 backdrop-blur-sm p-1 rounded-lg">
              {['about', 'interests'].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize relative ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Content Panel */}
            <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-zinc-800">
              <AnimatePresence mode="wait">
                {activeTab === 'about' && (
                  <motion.div 
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        A
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Arun A</h3>
                        <p className="text-cyan-400 font-medium">MERN Stack Developer</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      I'm a <span className="text-cyan-400 font-medium">MERN Stack Developer</span> and a B.E Computer Science Engineering student (2027 batch). 
                      I'm a strong communicator, fast learner, and enthusiastic problem solver with interests in web design, 
                      data structures, and networking.
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      I thrive in team environments and also excel independently. My passion lies in creating 
                      efficient, scalable web solutions with clean code practices.
                    </p>

                    {/* Professional skills bars with animation */}
                  
                  </motion.div>
                )}
                
                {activeTab === 'interests' && (
                <motion.div 
                  key="interests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-white">Beyond Coding</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Problem Solving", desc: "I enjoy solving challenging algorithmic problems on LeetCode and CodeForces.", icon: FaCode },
                      { title: "Web Design", desc: "Creating beautiful, responsive web interfaces with attention to UX.", icon: FaCode },
                      { title: "Learning", desc: "Continuously exploring new technologies and programming paradigms.", icon: FaLightbulb },
                      { title: "Sports", desc: "Staying active and competitive through cricket, badminton, or fitness routines.", icon: FaFutbol },
                      { title: "Books", desc: "Reading tech, self-growth, and fiction books to expand knowledge and imagination.", icon: FaBook },
                      { title: "Drawing", desc: "Expressing creativity through sketches and digital illustrations.", icon: FaPaintBrush }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50 hover:border-cyan-500/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon className="text-cyan-400" />
                          <h4 className="text-lg font-medium text-cyan-400">{item.title}</h4>
                        </div>
                        <p className="text-gray-400">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Resume Button */}
            <div className="pt-4">
              <div className="relative inline-block">
                {/* Encryption animation border for button */}
                <div className="absolute -inset-1 md:-inset-1 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                  
                  {['top', 'bottom', 'left', 'right'].map((side) => (
                    <div 
                      key={side}
                      className={`absolute ${
                        side === 'top' ? 'top-0 left-0 right-0 h-3 md:h-4' :
                        side === 'bottom' ? 'bottom-0 left-0 right-0 h-3 md:h-4' :
                        side === 'left' ? 'top-0 left-0 bottom-0 w-3 md:w-4 writing-vertical-lr' :
                        'top-0 right-0 bottom-0 w-3 md:w-4 writing-vertical-rl'
                      } flex items-center overflow-hidden z-10`}
                    >
                      <div 
                        className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-cyan-400 opacity-70 ${isButtonEncrypting ? 'animate-pulse' : ''}`}
                        style={side === 'bottom' ? { direction: 'rtl' } : {}}
                      >
                        {buttonEncrypted}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/assets/714023104011 ( 23CS011 ).pdf"
                  download
                  onClick={isMobile ? handleMobileTap : undefined}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      scramble();
                      animateButtonEncryption();
                    }
                  }}
                  onMouseLeave={!isMobile ? stopScramble : undefined}
                  onTouchStart={handleMobileTap}
                  className="group relative block w-full sm:w-auto overflow-hidden rounded-lg border border-cyan-500 bg-neutral-800 px-4 py-2 sm:px-6 sm:py-3 font-mono font-medium uppercase text-cyan-300 transition-colors hover:text-white inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 z-30"
                >
                  <HiDocumentText className="text-xl text-cyan-300" />
                  <span className="inline-block min-w-[8ch] text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] whitespace-nowrap">
                    {text}
                  </span>
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "-100%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 1,
                      ease: "linear",
                    }}
                    className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-cyan-400/0 from-40% via-cyan-400 to-cyan-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .writing-vertical-lr {
          writing-mode: vertical-lr;
        }
        
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        
        @keyframes matrixFall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @media (max-width: 768px) {
          .group:active .animate-pulse {
            animation: pulse 1s infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
        }
        
        .blue-gradient {
          background: linear-gradient(45deg, #00BFFF, #1E90FF);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;