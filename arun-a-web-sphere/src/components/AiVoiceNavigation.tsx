import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaLanguage, FaSearch, FaRobot } from 'react-icons/fa';
import { HiVolumeUp } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { MdTranslate, MdOutlineSmartToy } from 'react-icons/md';
import { toast } from '@/components/ui/sonner';

interface VoiceNavigationProps {
  isEnabled: boolean;
  onToggle: () => void;
}

// Supported languages with their codes and names
const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' }
];

// Command translations for different languages
const COMMAND_TRANSLATIONS: Record<string, Record<string, string[]>> = {
  'en-US': {
    home: ['home', 'go home', 'main page', 'top', 'start', 'beginning', 'landing page'],
    about: ['about', 'about me', 'who are you', 'introduction', 'bio', 'personal info', 'profile'],
    projects: ['projects', 'portfolio', 'work', 'project', 'works', 'showcase', 'creations', 'applications'],
    skills: ['skills', 'technologies', 'tech stack', 'expertise', 'abilities', 'knowledge', 'capabilities', 'tools'],
    contact: ['contact', 'get in touch', 'reach out', 'message', 'email', 'connect', 'send message', 'contact form'],
    academic: ['academic', 'education', 'qualification', 'academics', 'study', 'school', 'college', 'university', 'degree'],
    experience: ['experience', 'work experience', 'professional experience', 'career', 'job history', 'employment'],
    resume: ['resume', 'cv', 'download resume', 'view resume', 'curriculum vitae', 'my resume', 'get resume'],
    github: ['github', 'open github', 'github profile', 'code repository', 'git', 'show code'],
    linkedin: ['linkedin', 'open linkedin', 'professional profile', 'connect', 'job profile'],
    leetcode: ['leetcode', 'open leetcode', 'coding challenges', 'coding practice', 'algorithm practice'],
    help: ['help', 'commands', 'show commands', 'what can i say', 'available commands', 'command list', 'instructions'],
    close: ['close', 'close help', 'dismiss', 'exit', 'hide', 'hide help', 'go back']
  },
  'es-ES': {
    home: ['inicio', 'pagina principal', 'casa', 'primera página', 'comenzar'],
    about: ['sobre mi', 'acerca de', 'quien eres', 'información personal', 'perfil'],
    projects: ['proyectos', 'portafolio', 'trabajo', 'obras', 'aplicaciones', 'creaciones'],
    skills: ['habilidades', 'tecnologías', 'competencias', 'conocimientos', 'herramientas', 'capacidades'],
    contact: ['contacto', 'contactar', 'mensaje', 'correo', 'conectar', 'enviar mensaje'],
    academic: ['académico', 'educación', 'estudios', 'universidad', 'colegio', 'grado'],
    experience: ['experiencia', 'experiencia laboral', 'carrera', 'historial laboral', 'empleo'],
    resume: ['currículum', 'cv', 'ver currículum', 'descargar currículum', 'hoja de vida'],
    github: ['github', 'abrir github', 'codigo', 'repositorio', 'ver código'],
    linkedin: ['linkedin', 'abrir linkedin', 'perfil profesional', 'perfil laboral'],
    leetcode: ['leetcode', 'abrir leetcode', 'desafíos de codificación', 'práctica de algoritmos'],
    help: ['ayuda', 'comandos', 'mostrar comandos', 'instrucciones', 'lista de comandos'],
    close: ['cerrar', 'cerrar ayuda', 'salir', 'ocultar', 'volver']
  },
  // Other languages translations remain the same
};

// Enhanced with more alternate command phrases for other languages...

// Default to English if language not available
const getCommandsForLanguage = (langCode: string) => {
  return COMMAND_TRANSLATIONS[langCode] || COMMAND_TRANSLATIONS['en-US'];
};

const VoiceNavigation: React.FC<VoiceNavigationProps> = ({ isEnabled, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [suggestedCommands, setSuggestedCommands] = useState<string[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isMounted = useRef(true);
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Advanced commands
  const buildCommands = () => {
    const langCommands = getCommandsForLanguage(selectedLanguage.code);
    
    // Basic section navigation commands
    const sectionCommands = [
      ...langCommands.home.map(phrase => ({ phrase, action: () => scrollToSection('home') })),
      ...langCommands.about.map(phrase => ({ phrase, action: () => scrollToSection('about') })),
      ...langCommands.projects.map(phrase => ({ phrase, action: () => scrollToSection('projects') })),
      ...langCommands.skills.map(phrase => ({ phrase, action: () => scrollToSection('skills') })),
      ...langCommands.contact.map(phrase => ({ phrase, action: () => scrollToSection('contact') })),
      ...langCommands.academic.map(phrase => ({ phrase, action: () => scrollToSection('academic') })),
      ...langCommands.experience.map(phrase => ({ phrase, action: () => scrollToSection('experience') }))
    ];
    
    // Action commands
    const actionCommands = [
      ...langCommands.resume.map(phrase => ({ phrase, action: () => openResume() })),
      ...langCommands.github.map(phrase => ({ phrase, action: () => openLink('github') })),
      ...langCommands.linkedin.map(phrase => ({ phrase, action: () => openLink('linkedin') })),
      ...langCommands.leetcode.map(phrase => ({ phrase, action: () => openLink('leetcode') }))
    ];
    
    // Help commands
    const helpCommands = [
      ...langCommands.help.map(phrase => ({ phrase, action: () => setShowHelp(true) })),
      ...langCommands.close.map(phrase => ({ phrase, action: () => setShowHelp(false) }))
    ];
    
    // Special commands (these work regardless of language)
    const specialCommands = [
      { phrase: 'change language', action: () => setShowLanguageSelector(true) },
      { phrase: 'switch language', action: () => setShowLanguageSelector(true) },
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
      { phrase: 'hide chat', action: () => setShowAIChat(false) }
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
      { phrase: 'look for', action: (text: string) => handleSearch(text) }
    ];
    
    return [...sectionCommands, ...actionCommands, ...helpCommands, ...specialCommands, ...gestureCommands, ...searchCommands];
  };
  
  // Rebuild commands when language changes
  const commands = buildCommands();
  
  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('voice_navigation_language');
    if (savedLang) {
      const lang = SUPPORTED_LANGUAGES.find(l => l.code === savedLang);
      if (lang) {
        setSelectedLanguage(lang);
      }
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
  
  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('voice_navigation_language', selectedLanguage.code);
  }, [selectedLanguage]);
  
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
      recognition.lang = selectedLanguage.code;
      
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
  
  const findSimilarCommands = (text: string): string[] => {
    // Get all unique command phrases
    const allPhrases = commands.map(cmd => cmd.phrase);
    const uniquePhrases = [...new Set(allPhrases)];
    
    // Find phrases that are somewhat similar to what was said
    return uniquePhrases.filter(phrase => {
      // Simple similarity check - if the phrase contains any word from the command
      // or the command contains the phrase
      const phraseWords = phrase.split(' ');
      const textWords = text.split(' ');
      
      return phraseWords.some(word => textWords.includes(word)) ||
             textWords.some(word => phraseWords.includes(word));
    }).slice(0, 3); // Limit to 3 suggestions
  };
  
  const handleVoiceCommand = (text: string) => {
    // Clear any existing timeout
    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current);
    }

    // Handle search commands specially
    const searchCommands = ['search', 'find', 'look for'];
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
    const foundCommand = commands.find(cmd => text.includes(cmd.phrase));
    
    if (foundCommand) {
      showToast('success', `Executing: ${foundCommand.phrase}`);
      // Check if it's a search command that needs a parameter
      if (['search', 'find', 'look for'].includes(foundCommand.phrase)) {
        foundCommand.action(text);
      } else {
        // For non-search commands, pass empty string to ensure compatibility
        foundCommand.action('');
      }

      // Clear suggested commands after successful command execution
      setSuggestedCommands([]);
    } else {
      // Find similar commands as suggestions
      const similarCommands = findSimilarCommands(text);
      setSuggestedCommands(similarCommands);
      
      showToast('error', 'Command not recognized.');

      // Speak back what was heard
      speakText(`I heard: ${text}, but I don't recognize this command.`);
      
      // Set a timeout to clear suggestions after 5 seconds
      commandTimeoutRef.current = setTimeout(() => {
        setSuggestedCommands([]);
      }, 5000);
    }
  };

  const handleSearch = (searchTerm: string) => {
    showToast('info', `Searching for: ${searchTerm}`);
    
    // Determine what to search for based on keywords
    if (searchTerm.includes('project') || searchTerm.includes('work')) {
      scrollToSection('projects');
      speakText(`Searching for projects related to ${searchTerm}`);
    } else if (searchTerm.includes('skill') || searchTerm.includes('tech')) {
      scrollToSection('skills');
      speakText(`Looking up skills related to ${searchTerm}`);
    } else if (searchTerm.includes('contact') || searchTerm.includes('email')) {
      scrollToSection('contact');
      speakText(`Showing contact information`);
    } else if (searchTerm.includes('education') || searchTerm.includes('academic')) {
      scrollToSection('academic');
      speakText(`Finding academic information`);
    } else {
      // Generic search - could implement a more robust search in the future
      speakText(`I'm searching for ${searchTerm} but don't have specific results yet.`);
    }
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
        url = 'https://leetcode.com/';
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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to match language of speech output to selected language
      // Get the voice that best matches the selected language
      const voices = window.speechSynthesis.getVoices();
      const languageVoice = voices.find(voice => voice.lang === selectedLanguage.code);
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
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
  
  const changeLanguage = (lang: typeof SUPPORTED_LANGUAGES[0]) => {
    setSelectedLanguage(lang);
    setShowLanguageSelector(false);
    showToast('success', `Language changed to ${lang.name}`);
    
    // Try to speak in the new language
    try {
      const welcomeMessages: Record<string, string> = {
        'en-US': 'Voice navigation enabled in English',
        'es-ES': 'Navegación por voz activada en español',
        'hi-IN': 'हिंदी में वॉयस नेविगेशन सक्षम',
        'ta-IN': 'தமிழில் குரல் வழிசெலுத்தல் இயக்கப்பட்டது',
        'fr-FR': 'Navigation vocale activée en français',
        'de-DE': 'Sprachnavigation auf Deutsch aktiviert',
        'zh-CN': '语音导航已在中文中启用',
        'ja-JP': '日本語で音声ナビゲーションが有効になりました',
        'ko-KR': '한국어로 음성 내비게이션이 활성화되었습니다',
        'ar-SA': 'تم تمكين التنقل الصوتي باللغة العربية'
      };
      
      const message = welcomeMessages[lang.code] || welcomeMessages['en-US'];
      speakText(message);
    } catch (e) {
      console.error('Error speaking in new language:', e);
    }
  };

  // Simple AI Chat implementation
  const handleAIChat = (message: string) => {
    // In a real implementation, this would call an AI API
    // This is just a demo with predefined responses
    const responses = {
      greeting: ["Hello! How can I help you navigate Arun's portfolio?", "Hi there! I'm Arun's AI assistant. What would you like to know?"],
      project: ["Arun has worked on several projects including TicketPark (cinema booking), DarkCart (e-commerce), and more. Check the projects section!"],
      skills: ["Arun specializes in the MERN stack (MongoDB, Express, React, Node.js) and has expertise in web development."],
      education: ["Arun is pursuing BE Computer Science Engineering (2023-2027)."],
      experience: ["Arun has experience with full-stack development and various web technologies."],
      default: ["I'm here to help you navigate the portfolio. Try asking about Arun's projects, skills, or experience."]
    };

    if (message.match(/hi|hello|hey/i)) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (message.match(/project|work|portfolio/i)) {
      return responses.project[0];
    } else if (message.match(/skill|technology|stack|expertise/i)) {
      return responses.skills[0];
    } else if (message.match(/education|study|degree|college/i)) {
      return responses.education[0];
    } else if (message.match(/experience|job|career|work/i)) {
      return responses.experience[0];
    } else {
      return responses.default[0];
    }
  };
  
  return (
    <>
      {/* Language selector button */}
      <motion.div
        className="fixed right-5 bottom-36 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.button
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border bg-zinc-800/80 border-cyan-500/30 text-cyan-400 backdrop-blur-md"
          onClick={() => setShowLanguageSelector(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLanguage className="text-2xl" />
        </motion.button>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500/80 flex items-center justify-center text-[8px] text-white font-bold">
          {selectedLanguage.flag}
        </div>
      </motion.div>
      
      {/* AI Chat button */}
      <motion.div
        className="fixed right-5 bottom-52 z-50"
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
                    {selectedLanguage.flag} {selectedLanguage.name}
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
                          // Check if it's a search command that needs a parameter
                          if (['search', 'find', 'look for'].includes(cmdObj.phrase)) {
                            cmdObj.action(transcript);
                          } else {
                            // For non-search commands, pass empty string to ensure compatibility
                            // with commands that might expect parameters
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
      
      {/* AI Chat modal */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            className="fixed right-5 bottom-72 z-50 w-80 h-96 bg-zinc-900/95 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl"
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
            
            <div className="p-3 h-[calc(100%-110px)] overflow-y-auto">
              <div className="space-y-3">
                <div className="flex">
                  <div className="max-w-[80%] bg-zinc-800 text-white px-3 py-2 rounded-lg">
                    <p className="text-sm">Hi there! I'm Arun's AI assistant. Ask me about his skills, projects, or experience.</p>
                  </div>
                </div>
                
                {/* Here you would render chat messages */}
                {/* This is just a placeholder for the AI chat feature */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-cyan-600 text-white px-3 py-2 rounded-lg">
                    <p className="text-sm">What projects has Arun worked on?</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="max-w-[80%] bg-zinc-800 text-white px-3 py-2 rounded-lg">
                    <p className="text-sm">Arun has developed several projects including TicketPark (cinema booking system), DarkCart (e-commerce platform), and more. You can see them all in the projects section!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <button className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Language selector modal */}
      <AnimatePresence>
        {showLanguageSelector && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLanguageSelector(false)}
          >
            <motion.div
              className="bg-zinc-900 border border-cyan-500/20 rounded-xl max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <MdTranslate className="text-cyan-400 text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Select Language</h3>
                </div>
                <button 
                  className="p-2 hover:bg-zinc-800 rounded-full" 
                  onClick={() => setShowLanguageSelector(false)}
                >
                  <IoClose className="text-zinc-400 text-lg" />
                </button>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${
                        selectedLanguage.code === lang.code 
                          ? 'bg-cyan-500/20 border border-cyan-500/40' 
                          : 'bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700'
                      }`}
                      onClick={() => changeLanguage(lang)}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className={`${selectedLanguage.code === lang.code ? 'text-cyan-300' : 'text-white'}`}>
                        {lang.name}
                      </span>
                      
                      {selectedLanguage.code === lang.code && (
                        <span className="ml-auto bg-cyan-500 w-2 h-2 rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help modal with commands */}
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
              className="bg-zinc-900 border border-cyan-500/20 rounded-xl max-w-md w-full max-h-[80vh] overflow-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiVolumeUp className="text-cyan-400 text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Voice Commands</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center px-2 py-1 bg-cyan-500/10 rounded-full">
                    <span className="text-sm mr-1">{selectedLanguage.flag}</span>
                    <span className="text-xs text-cyan-400">{selectedLanguage.name}</span>
                  </div>
                  <button 
                    className="p-2 hover:bg-zinc-800 rounded-full" 
                    onClick={() => setShowHelp(false)}
                  >
                    <IoClose className="text-zinc-400 text-lg" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-zinc-400">
                    Say these commands while the microphone is active:
                  </p>
                  <button 
                    className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-lg hover:bg-cyan-500/30 transition-colors"
                    onClick={() => setShowLanguageSelector(true)}
                  >
                    Change Language
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-medium mb-2">Navigation</h4>
                    <ul className="space-y-2">
                      {Object.entries(getCommandsForLanguage(selectedLanguage.code)).slice(0, 7).map(([key, phrases]) => (
                        <li key={key} className="text-white text-sm">
                          <div className="flex flex-wrap gap-2 items-center">
                            {phrases.slice(0, 2).map((phrase, i) => (
                              <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                                "{phrase}"
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-medium mb-2">Actions</h4>
                    <ul className="space-y-2">
                      {Object.entries(getCommandsForLanguage(selectedLanguage.code)).slice(7, 11).map(([key, phrases]) => (
                        <li key={key} className="text-white text-sm">
                          <div className="flex flex-wrap gap-2 items-center">
                            {phrases.slice(0, 2).map((phrase, i) => (
                              <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                                "{phrase}"
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-medium mb-2">Special Commands</h4>
                    <ul className="space-y-2">
                      <li className="text-white flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "change language"
                        </span>
                      </li>
                      <li className="text-white flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "dark mode"
                        </span>
                        <span className="text-zinc-400">/</span>
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "light mode"
                        </span>
                      </li>
                      <li className="text-white flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "search [term]"
                        </span>
                      </li>
                      <li className="text-white flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "scroll up/down"
                        </span>
                      </li>
                      <li className="text-white flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "ai assistant"
                        </span>
                      </li>
                      <li className="text-white flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "awesome"
                        </span>
                        <span className="text-zinc-400">/</span>
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "cool"
                        </span>
                        <span className="text-zinc-400">/</span>
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono">
                          "wow"
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-cyan-500/10 rounded-lg p-4">
                  <p className="text-sm text-cyan-400 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    <span>Click the microphone button to start or stop voice recognition</span>
                  </p>
                </div>
              </div>
              
              <div className="p-4 border-t border-zinc-800 flex justify-end">
                <button
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
                  onClick={() => setShowHelp(false)}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceNavigation;