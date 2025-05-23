import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaRobot } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';
import { toast } from '@/components/ui/sonner';

interface VoiceNavigationProps {
  isEnabled: boolean;
  onToggle: () => void;
}

// Chat message type for AI chat
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

// Command translations (English only)
const COMMANDS = {
  home: ['home', 'go home', 'main page', 'top', 'start', 'beginning', 'landing page', 'go to home', 'welcome page', 'front page'],
  about: ['about', 'about me', 'who are you', 'introduction', 'bio', 'personal info', 'profile', 'about section', 'your background', 'tell me about yourself'],
  projects: ['projects', 'portfolio', 'work', 'project', 'works', 'showcase', 'creations', 'applications', 'my projects', 'see projects', 'show projects'],
  skills: ['skills', 'technologies', 'tech stack', 'expertise', 'abilities', 'knowledge', 'capabilities', 'tools', 'programming languages', 'frameworks', 'coding skills'],
  contact: ['contact', 'get in touch', 'reach out', 'message', 'email', 'connect', 'send message', 'contact form', 'contact me', 'talk to me', 'contact details'],
  academic: ['academic', 'education', 'qualification', 'academics', 'study', 'school', 'college', 'university', 'degree', 'educational background', 'courses'],
  experience: ['experience', 'work experience', 'professional experience', 'career', 'job history', 'employment', 'work history', 'professional background', 'jobs'],
  resume: ['resume', 'cv', 'download resume', 'view resume', 'curriculum vitae', 'my resume', 'get resume', 'get cv', 'download cv', 'see resume'],
  github: ['github', 'open github', 'github profile', 'code repository', 'git', 'show code', 'source code', 'code projects', 'github account'],
  linkedin: ['linkedin', 'open linkedin', 'professional profile', 'connect', 'job profile', 'linkedin profile', 'professional network', 'career profile'],
  leetcode: ['leetcode', 'open leetcode', 'coding challenges', 'coding practice', 'algorithm practice', 'competitive programming', 'coding problems'],
  publication: ['publication', 'research', 'papers', 'articles', 'journals', 'published work', 'published papers', 'research papers', 'academic papers'],
  certification: ['certification', 'certificates', 'courses completed', 'professional certification', 'verified skills', 'credentials', 'certified', 'course certificates'],
  help: ['help', 'commands', 'show commands', 'what can i say', 'available commands', 'command list', 'instructions', 'guide', 'how to use', 'assist me'],
  close: ['close', 'close help', 'dismiss', 'exit', 'hide', 'hide help', 'go back', 'cancel', 'nevermind', 'forget it']
};

const VoiceNavigation: React.FC<VoiceNavigationProps> = ({ isEnabled, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [suggestedCommands, setSuggestedCommands] = useState<string[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Added: Chat message state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm Arun's AI assistant. Ask me about his skills, projects, or experience.",
      timestamp: new Date()
    }
  ]);
  
  const recognitionRef = useRef<any>(null);
  const isMounted = useRef(true);
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new chat messages appear
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Advanced commands with more keywords
  const buildCommands = () => {
    // Basic section navigation commands
    const sectionCommands = [
      ...COMMANDS.home.map(phrase => ({ phrase, action: () => scrollToSection('home') })),
      ...COMMANDS.about.map(phrase => ({ phrase, action: () => scrollToSection('about') })),
      ...COMMANDS.projects.map(phrase => ({ phrase, action: () => scrollToSection('projects') })),
      ...COMMANDS.skills.map(phrase => ({ phrase, action: () => scrollToSection('skills') })),
      ...COMMANDS.contact.map(phrase => ({ phrase, action: () => scrollToSection('contact') })),
      ...COMMANDS.academic.map(phrase => ({ phrase, action: () => scrollToSection('academic') })),
      ...COMMANDS.experience.map(phrase => ({ phrase, action: () => scrollToSection('experience') })),
      ...COMMANDS.certification.map(phrase => ({ phrase, action: () => scrollToSection('certification') })),
      ...COMMANDS.publication.map(phrase => ({ phrase, action: () => scrollToSection('publication') }))
    ];
    
    // Action commands
    const actionCommands = [
      ...COMMANDS.resume.map(phrase => ({ phrase, action: () => openResume() })),
      ...COMMANDS.github.map(phrase => ({ phrase, action: () => openLink('github') })),
      ...COMMANDS.linkedin.map(phrase => ({ phrase, action: () => openLink('linkedin') })),
      ...COMMANDS.leetcode.map(phrase => ({ phrase, action: () => openLink('leetcode') }))
    ];
    
    // Help commands
    const helpCommands = [
      ...COMMANDS.help.map(phrase => ({ phrase, action: () => setShowHelp(true) })),
      ...COMMANDS.close.map(phrase => ({ phrase, action: () => setShowHelp(false) }))
    ];
    
    // Special commands
    const specialCommands = [
      { phrase: 'dark mode', action: () => toggleTheme('dark') },
      { phrase: 'light mode', action: () => toggleTheme('light') },
      { phrase: 'toggle theme', action: () => toggleTheme() },
      { phrase: 'scroll down', action: () => smoothScroll('down') },
      { phrase: 'scroll up', action: () => smoothScroll('up') },
      { phrase: 'page top', action: () => smoothScroll('top') },
      { phrase: 'page bottom', action: () => smoothScroll('bottom') },
      { phrase: 'chat', action: () => setShowAIChat(true) },
      { phrase: 'ai assistant', action: () => setShowAIChat(true) },
      { phrase: 'assistant', action: () => setShowAIChat(true) },
      { phrase: 'close assistant', action: () => setShowAIChat(false) },
      { phrase: 'hide chat', action: () => setShowAIChat(false) },
      
      // Added technology specific commands
      { phrase: 'show frontend skills', action: () => handleTechnologySearch('frontend') },
      { phrase: 'show backend skills', action: () => handleTechnologySearch('backend') },
      { phrase: 'show database skills', action: () => handleTechnologySearch('database') },
      { phrase: 'show tools', action: () => handleTechnologySearch('tools') },
      { phrase: 'show frameworks', action: () => handleTechnologySearch('frameworks') },
    ];
    
    // Gesture commands for fun
    const gestureCommands = [
      { phrase: 'awesome', action: () => showAnimation('thumbs-up') },
      { phrase: 'cool', action: () => showAnimation('star') },
      { phrase: 'wow', action: () => showAnimation('confetti') },
      { phrase: 'amazing', action: () => showAnimation('heart') },
      { phrase: 'great', action: () => showAnimation('thumbs-up') },
      { phrase: 'excellent', action: () => showAnimation('star') },
      { phrase: 'beautiful', action: () => showAnimation('heart') },
      { phrase: 'impressive', action: () => showAnimation('confetti') }
    ];

    // Search commands
    const searchCommands = [
      { phrase: 'search', action: (text: string) => handleSearch(text) },
      { phrase: 'find', action: (text: string) => handleSearch(text) },
      { phrase: 'look for', action: (text: string) => handleSearch(text) },
      { phrase: 'show me', action: (text: string) => handleSearch(text.replace('show me', '').trim()) }
    ];
    
    return [...sectionCommands, ...actionCommands, ...helpCommands, ...specialCommands, ...gestureCommands, ...searchCommands];
  };
  
  // Build commands
  const commands = buildCommands();
  
  useEffect(() => {
    // Initialize voices for speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Just to ensure voices are loaded
        window.speechSynthesis.getVoices();
      };
    }
    
    return () => {
      isMounted.current = false;
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isEnabled && isListening) {
      stopListening();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isEnabled]);
  
  const startListening = () => {
    if (!isEnabled) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('error', 'Voice recognition is not supported in your browser');
      return;
    }
    
    try {
      // Initialize the SpeechRecognition API
      // @ts-ignore - TypeScript doesn't have types for webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        if (isMounted.current) {
          setIsListening(true);
          setTranscript('Listening...');
        }
      };
      
      recognition.onresult = (event: any) => {
        if (isMounted.current) {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          
          setTranscript(currentTranscript.toLowerCase());
          
          // Check if we have a final result
          if (event.results[0].isFinal) {
            handleVoiceCommand(currentTranscript.toLowerCase());
          }
        }
      };
      
      recognition.onerror = (event: any) => {
        if (isMounted.current) {
          if (event.error === 'no-speech') {
            showToast('info', 'No speech detected. Please try again.');
          } else {
            showToast('error', `Speech recognition error: ${event.error}`);
          }
          setIsListening(false);
        }
      };
      
      recognition.onend = () => {
        if (isMounted.current) {
          setIsListening(false);
          setTranscript('');
        }
      };
      
      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error('Speech recognition error:', error);
      showToast('error', 'Error starting voice recognition');
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setTranscript('');
    setSuggestedCommands([]);
  };

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    if (type === 'success') {
      toast.success(message, { duration: 2000 });
    } else if (type === 'error') {
      toast.error(message, { duration: 2000 });
    } else {
      toast.info(message, { duration: 2000 });
    }
  };
  
  // Improved fuzzy matching for command similarity
  const findSimilarCommands = (text: string): string[] => {
    // Get all unique command phrases
    const allPhrases = commands.map(cmd => cmd.phrase);
    const uniquePhrases = [...new Set(allPhrases)];
    
    // Simple word-based similarity score
    const getSimScore = (phrase: string, input: string): number => {
      const phraseWords = phrase.toLowerCase().split(' ');
      const inputWords = input.toLowerCase().split(' ');
      
      // Count matching words
      let matches = 0;
      for (const word of phraseWords) {
        if (inputWords.includes(word)) matches++;
      }
      
      // Also check for partial word matches
      for (const word of phraseWords) {
        for (const inputWord of inputWords) {
          if (word.length > 3 && inputWord.length > 3) {
            if (word.includes(inputWord) || inputWord.includes(word)) {
              matches += 0.5;
            }
          }
        }
      }
      
      return matches;
    };
    
    // Calculate scores for each phrase
    const scoredPhrases = uniquePhrases.map(phrase => ({
      phrase,
      score: getSimScore(phrase, text)
    }));
    
    // Filter phrases with some similarity and sort by score
    return scoredPhrases
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.phrase)
      .slice(0, 3); // Limit to top 3 suggestions
  };
  
  const handleVoiceCommand = (text: string) => {
    // Clear any existing timeout
    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current);
    }

    // Handle search commands specially
    const searchCommands = ['search', 'find', 'look for', 'show me'];
    for (const searchCmd of searchCommands) {
      if (text.startsWith(searchCmd)) {
        const searchTerm = text.substring(searchCmd.length).trim();
        if (searchTerm) {
          handleSearch(searchTerm);
          return;
        }
      }
    }

    // Find a matching command by checking if any command phrase is included in the spoken text
    const foundCommand = commands.find(cmd => {
      // Exact match
      if (text === cmd.phrase) return true;
      
      // Text contains the command phrase as a standalone phrase
      const regex = new RegExp(`\\b${cmd.phrase}\\b`, 'i');
      return regex.test(text);
    });
    
    if (foundCommand) {
      showToast('success', `Executing: ${foundCommand.phrase}`);
      
      // Handle search commands specially
      if (['search', 'find', 'look for', 'show me'].includes(foundCommand.phrase)) {
        foundCommand.action(text.replace(foundCommand.phrase, '').trim());
      } else {
        foundCommand.action('');
      }

      // Clear suggested commands after successful command execution
      setSuggestedCommands([]);
    } else {
      // Find similar commands as suggestions
      const similarCommands = findSimilarCommands(text);
      setSuggestedCommands(similarCommands);
      
      if (similarCommands.length === 0) {
        showToast('error', 'Command not recognized. Try saying "help" for available commands.');
        
        // Try to respond via chat if not a command
        if (text.length > 3) {
          setShowAIChat(true);
          
          // Add user message to chat
          const userMessage: ChatMessage = {
            role: 'user',
            content: text,
            timestamp: new Date()
          };
          
          setChatMessages(prev => [...prev, userMessage]);
          
          // Generate AI response
          setTimeout(() => {
            const aiResponse = handleAIChat(text);
            
            const assistantMessage: ChatMessage = {
              role: 'assistant',
              content: aiResponse,
              timestamp: new Date()
            };
            
            setChatMessages(prev => [...prev, assistantMessage]);
          }, 800);
        } else {
          // Speak back what was heard for very short inputs
          speakText(`I heard: ${text}, but I don't recognize this command.`);
        }
      } else {
        showToast('info', 'Did you mean one of these commands?');
      }
      
      // Set a timeout to clear suggestions after 5 seconds
      commandTimeoutRef.current = setTimeout(() => {
        setSuggestedCommands([]);
      }, 5000);
    }
  };

  // Enhanced search handler with more specific technology search
  const handleSearch = (searchTerm: string) => {
    showToast('info', `Searching for: ${searchTerm}`);
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Determine what to search for based on keywords
    if (searchTermLower.includes('project') || searchTermLower.includes('work') || searchTermLower.includes('port')) {
      scrollToSection('projects');
      speakText(`Navigating to projects section for ${searchTerm}`);
    } 
    else if (searchTermLower.includes('front') || searchTermLower.includes('ui') || searchTermLower.includes('user interface')) {
      handleTechnologySearch('frontend');
    }
    else if (searchTermLower.includes('back') || searchTermLower.includes('server')) {
      handleTechnologySearch('backend');
    }
    else if (searchTermLower.includes('data') || searchTermLower.includes('sql') || searchTermLower.includes('mongo')) {
      handleTechnologySearch('database');
    }
    else if (searchTermLower.includes('frame') || searchTermLower.includes('react') || searchTermLower.includes('angular')) {
      handleTechnologySearch('frameworks');
    }
    else if (searchTermLower.includes('skill') || searchTermLower.includes('tech') || searchTermLower.includes('language')) {
      scrollToSection('skills');
      speakText(`Looking up skills related to ${searchTerm}`);
    } 
    else if (searchTermLower.includes('contact') || searchTermLower.includes('email') || searchTermLower.includes('touch')) {
      scrollToSection('contact');
      speakText(`Showing contact information`);
    } 
    else if (searchTermLower.includes('education') || searchTermLower.includes('academic') || searchTermLower.includes('study') || searchTermLower.includes('college')) {
      scrollToSection('academic');
      speakText(`Finding academic information`);
    } 
    else if (searchTermLower.includes('experience') || searchTermLower.includes('job') || searchTermLower.includes('work history') || searchTermLower.includes('career')) {
      scrollToSection('experience');
      speakText(`Showing work experience`);
    }
    else if (searchTermLower.includes('certificate') || searchTermLower.includes('certification') || searchTermLower.includes('course')) {
      scrollToSection('certification');
      speakText(`Showing certifications`);
    }
    else if (searchTermLower.includes('publication') || searchTermLower.includes('research') || searchTermLower.includes('paper') || searchTermLower.includes('journal')) {
      scrollToSection('publication');
      speakText(`Showing publications`);
    }
    else {
      // Generic search - show results in chat
      setShowAIChat(true);
      
      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: `Search for: ${searchTerm}`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      
      // Simulate AI thinking
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = handleAIChat(searchTerm);
        
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, assistantMessage]);
      }, 1000);
      
      speakText(`I've searched for "${searchTerm}" and here are the results.`);
    }
  };
  
  // New technology search handler
  const handleTechnologySearch = (category: string) => {
    scrollToSection('skills');
    
    // Display specific results in chat
    setShowAIChat(true);
    
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: `Show me your ${category} skills`,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Technology categories
    const techInfo: Record<string, string> = {
      frontend: "For frontend development, I'm skilled in:\n• React.js\n• Next.js\n• TypeScript\n• JavaScript\n• HTML5/CSS3\n• TailwindCSS\n• Material UI\n• Framer Motion\n• Responsive Design\n• Web Accessibility",
      backend: "My backend skills include:\n• Node.js\n• Express.js\n• MongoDB\n• RESTful API design\n• API Integration\n• Authentication/Authorization\n• Server-side rendering\n• Performance optimization",
      database: "Database technologies I work with:\n• MongoDB\n• MySQL\n• PostgreSQL\n• Firebase Firestore\n• Redis\n• Data modeling\n• Database optimization",
      frameworks: "Frameworks I'm proficient in:\n• React.js\n• Next.js\n• Express.js\n• TailwindCSS\n• Material UI\n• Bootstrap\n• Jest for testing",
      tools: "Development tools I use:\n• Git & GitHub\n• VS Code\n• Figma\n• Postman\n• Chrome DevTools\n• Vercel\n• Webpack\n• npm/yarn\n• Docker basics"
    };
    
    // Simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const response = techInfo[category] || 
        "I can show you skills in these categories: frontend, backend, database, frameworks, and tools.";
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
      speakText(`Here are my ${category} skills`);
    }, 800);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      speakText(`Navigating to ${sectionId} section`);
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast('error', `Section "${sectionId}" not found`);
    }
  };
  
  const openResume = () => {
    speakText('Opening resume');
    const resumeLink = document.querySelector('a[download][href*="resume"]') as HTMLAnchorElement;
    if (resumeLink) {
      resumeLink.click();
    } else {
      window.open('/assets/714023104011 ( 23CS011 ).pdf', '_blank');
    }
  };
  
  const openLink = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'github':
        url = 'https://github.com/Arunarivalagan743';
        break;
      case 'linkedin':
        url = 'https://www.linkedin.com/in/arun-a-25b6a5289';
        break;
      case 'leetcode':
        url = 'https://leetcode.com/u/Arun_774/';
        break;
      default:
        showToast('error', `Unknown platform: ${platform}`);
        return;
    }
    
    speakText(`Opening ${platform}`);
    window.open(url, '_blank');
  };
  
  const smoothScroll = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    const currentPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    
    switch(direction) {
      case 'up':
        window.scrollTo({
          top: Math.max(0, currentPosition - windowHeight / 2),
          behavior: 'smooth'
        });
        speakText('Scrolling up');
        break;
      case 'down':
        window.scrollTo({
          top: Math.min(documentHeight, currentPosition + windowHeight / 2),
          behavior: 'smooth'
        });
        speakText('Scrolling down');
        break;
      case 'top':
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        speakText('Going to top of page');
        break;
      case 'bottom':
        window.scrollTo({
          top: documentHeight,
          behavior: 'smooth'
        });
        speakText('Going to bottom of page');
        break;
    }
  };
  
  const toggleTheme = (theme?: string) => {
    // This assumes you have a theme toggling mechanism set up
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
      speakText('Dark mode activated');
    } else if (theme === 'light') {
      html.classList.remove('dark');
      speakText('Light mode activated');
    } else {
      // Toggle current theme
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        speakText('Light mode activated');
      } else {
        html.classList.add('dark');
        speakText('Dark mode activated');
      }
    }
  };
  
  const showAnimation = (type: string) => {
    // Display fun animations based on voice comments
    switch(type) {
      case 'confetti':
        // Trigger confetti animation
        showToast('success', 'Wow! That deserves confetti! 🎉');
        // You could implement a full confetti animation here
        break;
      case 'thumbs-up':
        showToast('success', 'Thanks! Glad you like it! 👍');
        break;
      case 'star':
        showToast('success', 'Cool! Thanks for the feedback! ⭐');
        break;
      case 'heart':
        showToast('success', 'Thank you for the love! ❤️');
        break;
    }
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Chat message handling function
  const handleChatSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Generate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = handleAIChat(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    }, 800);
  };

  // Enhanced AI Chat implementation with more detailed responses
  const handleAIChat = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // More robust response mapping with detailed information about Arun
    if (lowerMessage.match(/hi|hello|hey|howdy|greetings|hi there/i)) {
      return "Hello! I'm Arun's AI assistant. How can I help you today? You can ask about my skills, projects, education, or anything else you'd like to know!";
    }
    
    if (lowerMessage.includes('name')) {
      return "I'm Arun's portfolio AI assistant. Arun is a web developer specializing in modern full-stack development!";
    }
    
    if (lowerMessage.match(/who|about you|about arun|tell me about|introduce/i)) {
      return "Arun is a passionate full-stack developer with expertise in the MERN stack (MongoDB, Express, React, Node.js). He's currently pursuing BE Computer Science Engineering (2023-2027) and is focused on building responsive, user-friendly web applications.";
    }
    
    if (lowerMessage.match(/project|portfolio|work|app|application|develop|create/i)) {
      return "Arun has developed several impressive projects including:\n\n• TicketPark - A feature-rich movie ticket booking platform with real-time seat selection\n• DarkCart - A responsive e-commerce platform with payment integration\n• PageTurner - A book reading and management application\n• Voice Navigation - An accessibility-focused voice command system (the one you're using now!)\n\nYou can view details and live demos in the projects section.";
    }
    
    if (lowerMessage.match(/frontend|front|front-end|ui|user interface/i)) {
      return "As a frontend developer, Arun is skilled in:\n\n• React.js & Next.js\n• TypeScript & JavaScript\n• HTML5/CSS3 & TailwindCSS\n• Material UI & Framer Motion\n• Responsive Design\n• Web Accessibility\n• State Management (Redux, Context API)\n• Performance Optimization";
    }
    
    if (lowerMessage.match(/backend|back|back-end|server/i)) {
      return "Arun's backend development skills include:\n\n• Node.js & Express.js\n• RESTful API design\n• MongoDB & Mongoose\n• Authentication/Authorization\n• Server-side rendering\n• API Integration\n• Performance optimization\n• Security best practices";
    }
    
    if (lowerMessage.match(/database|data|sql|mongo|storage/i)) {
      return "Arun works with these database technologies:\n\n• MongoDB (NoSQL)\n• MySQL (SQL)\n• PostgreSQL\n• Firebase Firestore\n• Redis for caching\n• Database optimization & data modeling";
    }
    
    if (lowerMessage.match(/tool|software|develop|environment|ide|editor/i)) {
      return "Arun uses these development tools:\n\n• Git & GitHub for version control\n• VS Code as primary IDE\n• Figma for design\n• Postman for API testing\n• Chrome DevTools\n• Vercel & Netlify for deployment\n• npm/yarn for package management\n• Webpack & Vite";
    }
    
    if (lowerMessage.match(/framework|library|react|next|express/i)) {
      return "Frameworks and libraries Arun is proficient in:\n\n• React.js for UI development\n• Next.js for server-side rendering\n• Express.js for backend\n• TailwindCSS & Material UI for styling\n• Framer Motion for animations\n• Jest & React Testing Library for testing";
    }
    
    if (lowerMessage.match(/skill|tech|stack|language|framework|knowledge|know|ability/i)) {
      return "Arun's key technical skills include:\n\n• Frontend: React.js, Next.js, TypeScript, TailwindCSS\n• Backend: Node.js, Express.js, RESTful APIs\n• Database: MongoDB, MySQL, PostgreSQL\n• Version Control: Git/GitHub\n• Languages: JavaScript, TypeScript, HTML/CSS, Python basics\n• Tools: VS Code, Figma, Postman, Chrome DevTools\n\nYou can ask for more details about any specific skill area!";
    }
    
    if (lowerMessage.match(/education|study|school|college|degree|academic|university|qualification/i)) {
      return "Arun is pursuing a Bachelor of Engineering in Computer Science (2023-2027). He has focused on web development and software engineering courses, and continuously enhances his skills through online learning platforms and practical projects.";
    }
    
    if (lowerMessage.match(/experience|work|job|career|professional|employ/i)) {
      return "Arun has experience with full-stack development through various projects and freelancing work. He has built multiple web applications from scratch, handling both frontend and backend development. He's passionate about creating clean, efficient, and user-friendly web experiences.";
    }
    
    if (lowerMessage.match(/certificate|certification|course|learn/i)) {
      return "Arun has completed several certifications including:\n\n• Full Stack Web Development (MERN Stack)\n• Advanced React Patterns and Performance\n• Modern JavaScript Development\n• Responsive Web Design\n• Data Structures and Algorithms\n\nHe's committed to continuous learning and staying updated with industry best practices.";
    }
    
    if (lowerMessage.match(/publication|research|paper|journal|article/i)) {
      return "Arun has contributed to technical publications including:\n\n• Research paper on 'Optimizing React Performance in Large-Scale Applications'\n• Technical blog articles on web development best practices\n• Open source documentation contributions";
    }
    
    if (lowerMessage.match(/interest|hobby|like|enjoy|passion/i)) {
      return "Besides coding, Arun is interested in UI/UX design, exploring new technologies, problem-solving on coding platforms, and contributing to open-source projects. He enjoys participating in coding communities and hackathons to expand his skills.";
    }
    
    if (lowerMessage.match(/contact|reach|connect|hire|email|message/i)) {
      return "You can contact Arun through the contact form in the Contact section, or via email at arunarivalagan774@gmail.com. He's open to work opportunities, collaborations, or just connecting with fellow developers!";
    }
    
    if (lowerMessage.match(/github|git|code|repository|source/i)) {
      return "You can check out Arun's GitHub at https://github.com/Arunarivalagan743 to see his code repositories and contributions.";
    }
    
    if (lowerMessage.match(/linkedin|social|profile|professional/i)) {
      return "Connect with Arun on LinkedIn at https://www.linkedin.com/in/arun-a-25b6a5289 for professional networking.";
    }
    
    if (lowerMessage.match(/resume|cv|curriculum/i)) {
      return "You can view or download Arun's resume from the About section. It contains details about his skills, education, and experience.";
    }
    
    if (lowerMessage.match(/voice|speech|navigation|command|ai|assistant/i)) {
      return "You're currently using Arun's Voice Navigation system! It allows you to navigate the portfolio using voice commands. Say 'help' to see available commands, or you can talk to me directly through this chat interface.";
    }
    
    if (lowerMessage.match(/help|command|function|do|feature|capability|able/i)) {
      return "I can help you learn about Arun's projects, skills, education, and how to contact him. You can also use voice commands by clicking the microphone button. Try saying 'home', 'projects', 'skills', or 'contact' to navigate, or ask me specific questions about Arun's background!";
    }

    if (lowerMessage.match(/thank|thanks|appreciate|great|good|helpful/i)) {
      return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about Arun?";
    }
    
    // Fallback response for search-like queries
    if (lowerMessage.startsWith("search") || lowerMessage.startsWith("find") || lowerMessage.startsWith("look for")) {
      const searchTerm = lowerMessage.replace(/search|find|look for/gi, '').trim();
      return `I've searched for "${searchTerm}" in Arun's portfolio. The best place to find this information would be in the skills or projects section. Can I help you navigate there?`;
    }
    
    // Default response
    return "I'm not sure I understand that question. You can ask me about Arun's projects, skills, education, or how to contact him. Or try using specific voice commands like 'help' to see all available options!";
  };
  
  return (
    <>
      {/* AI Chat button */}
      <motion.div
        className="fixed right-5 bottom-36 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border ${
            showAIChat ? 'bg-cyan-500 border-cyan-300 text-white' : 'bg-zinc-800/80 border-cyan-500/30 text-cyan-400'
          } backdrop-blur-md`}
          onClick={() => setShowAIChat(!showAIChat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRobot className="text-xl" />
        </motion.button>
      </motion.div>
      
      {/* Floating voice control button */}
      <motion.div
        className="fixed right-5 bottom-20 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border ${
            isEnabled 
              ? isListening 
                ? 'bg-cyan-500 border-cyan-300 text-white' 
                : 'bg-zinc-800/80 border-cyan-500/30 text-cyan-400' 
              : 'bg-zinc-800/80 border-zinc-700 text-gray-400'
          } backdrop-blur-md`}
          onClick={isEnabled ? toggleVoice : onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEnabled ? (
            isListening ? (
              <FaMicrophone className="text-lg animate-pulse" />
            ) : (
              <FaMicrophone className="text-lg" />
            )
          ) : (
            <FaMicrophoneSlash className="text-lg" />
          )}
          
          {/* Ripple effect when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
        
        {/* Small badge to show status when enabled but not listening */}
        {isEnabled && !isListening && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full">
            <motion.div 
              className="absolute inset-0 bg-cyan-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )}
      </motion.div>
      
      {/* Voice command indicator with suggestions */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            className="fixed left-5 bottom-20 z-50 max-w-xs bg-zinc-900/90 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-3 shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <FaMicrophone className="text-cyan-400 text-sm" />
                </div>
                
                {/* Sound wave animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/50"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-cyan-400 font-medium">Voice Command</p>
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">
                    🇺🇸 English
                  </span>
                </div>
                <p className="text-sm text-white font-medium truncate max-w-[180px]">
                  {transcript || "Listening..."}
                </p>
              </div>
            </div>
            
            {/* Command suggestions */}
            {suggestedCommands.length > 0 && (
              <motion.div 
                className="mt-2 border-t border-zinc-800/50 pt-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-cyan-400/80 mb-1">Did you mean:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedCommands.map((cmd, i) => (
                    <motion.button
                      key={i}
                      className="px-2 py-0.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs rounded"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        const cmdObj = commands.find(c => c.phrase === cmd);
                        if (cmdObj) {
                          if (['search', 'find', 'look for', 'show me'].includes(cmdObj.phrase)) {
                            cmdObj.action(transcript);
                          } else {
                            cmdObj.action('');
                          }
                          setSuggestedCommands([]);
                        }
                      }}
                    >
                      "{cmd}"
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Chat modal - Updated with functional chat interface */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            className="fixed right-5 bottom-72 z-50 w-80 h-96 bg-zinc-900/95 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <MdOutlineSmartToy className="text-cyan-400 text-lg" />
                </div>
                <h3 className="text-white font-medium">AI Assistant</h3>
              </div>
              <button 
                onClick={() => setShowAIChat(false)}
                className="p-1.5 hover:bg-zinc-800 rounded-full"
              >
                <IoClose className="text-zinc-400" />
              </button>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto">
              <div className="space-y-3">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-3 py-2 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-zinc-800 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      <p className="text-[10px] opacity-70 mt-1 text-right">
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-3 py-2 rounded-lg bg-zinc-800 text-white">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
            </div>
            
            <div className="p-3 border-t border-zinc-800">
              <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white transition-colors"
                  disabled={!chatInput.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help panel - Show available commands */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="bg-zinc-900 border border-cyan-500/20 rounded-xl max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <FaMicrophone className="text-cyan-400 text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Voice Commands</h3>
                </div>
                <button 
                  className="p-2 hover:bg-zinc-800 rounded-full" 
                  onClick={() => setShowHelp(false)}
                >
                  <IoClose className="text-zinc-400" />
                </button>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2">Navigation</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• "home" - Go to home section</li>
                      <li>• "about" - Go to about section</li>
                      <li>• "projects" - Go to projects section</li>
                      <li>• "skills" - Go to skills section</li>
                      <li>• "contact" - Go to contact section</li>
                      <li>• "academic" - Go to education section</li>
                      <li>• "experience" - Go to work experience</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2">Actions</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• "resume" - View or download resume</li>
                      <li>• "github" - Open GitHub profile</li>
                      <li>• "linkedin" - Open LinkedIn profile</li>
                      <li>• "chat" or "assistant" - Open AI chat</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2">Search</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• "search [term]" - Search for specific content</li>
                      <li>• "show frontend skills" - View frontend skills</li>
                      <li>• "show backend skills" - View backend skills</li>
                      <li>• "show database skills" - View database skills</li>
                      <li>• "show frameworks" - View framework skills</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2">System</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• "dark mode" / "light mode" - Change theme</li>
                      <li>• "scroll up" / "scroll down" - Navigate page</li>
                      <li>• "help" - Show this help panel</li>
                      <li>• "close" - Close current panel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceNavigation;
