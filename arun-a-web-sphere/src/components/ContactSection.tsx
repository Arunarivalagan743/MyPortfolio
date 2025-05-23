








import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { HiDocumentText } from "react-icons/hi2";

const MySwal = withReactContent(Swal);

// Encryption animation utility - using the same characters from AboutSection
const CHARS = "!@#$%^&*():{};|,.<>/?";
const scrambleText = (text: string, progress: number) => {
  let result = "";
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() > progress) {
      result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    } else {
      result += text[i];
    }
  }
  
  return result;
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    reason: "Work",
    message: "", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [resumeText, setResumeText] = useState("View Resume");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });

  // Encryption/decryption animation for resume text
  useEffect(() => {
    if (isDecrypting && decryptProgress < 1) {
      const timer = setTimeout(() => {
        setDecryptProgress(prev => prev + 0.1);
        setResumeText(scrambleText("View Resume", decryptProgress));
      }, 50);
      return () => clearTimeout(timer);
    }
    
    if (decryptProgress >= 1) {
      setResumeText("View Resume");
      setIsDecrypting(false);
      setDecryptProgress(0);
    }
  }, [isDecrypting, decryptProgress]);

  const handleResumeHover = () => {
    if (!isDecrypting) {
      setIsDecrypting(true);
    }
  };
  
  const openResumeModal = () => {
    setShowResumeModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // ...other existing code...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitProgress(0);
    
    // Create a visual progress indicator that advances even without server response
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => Math.min(prev + 5, 90));
    }, 300);

    // Create an abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout
    
    try {
      const response = await fetch("https://myportfolio-2-kry9.onrender.com/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Origin": window.location.origin 
        },
        mode: 'cors',
        body: JSON.stringify(formData),
        signal: controller.signal // Add abort signal
      });

      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setSubmitProgress(100);

      if (!response.ok) throw new Error("Failed to send message");

      await MySwal.fire({
        icon: "success",
        title: "Message sent successfully!",
        text: "Thank you for reaching out. I'll get back to you soon.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#0f0f1e",
        color: "#ffffff",
        iconColor: "#00BFFF"
      });

      setFormData({ fullName: "", email: "", reason: "Work", message: "" });
    } catch (error: any) {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setSubmitProgress(0);
      
      // Specific error for timeout
      const errorMessage = error.name === 'AbortError' 
        ? "Request timed out. The server might be busy. Please try again later."
        : error.message || "Something went wrong";
      
      console.error("Form submission error:", error);
      
      await MySwal.fire({
        icon: "error",
        title: "Submission failed",
        text: errorMessage,
        confirmButtonText: "Try Again",
        background: "#0f0f1e",
        color: "#ffffff",
        confirmButtonColor: "#00BFFF"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("Sending form data:", formData);

  // ...rest of component...

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: "0 5px 15px rgba(0, 191, 255, 0.4)" },
    tap: { scale: 0.97 },
    loading: {
      scale: [1, 1.03, 1],
      transition: { repeat: Infinity, duration: 1.5 }
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-[length:50px_50px] pointer-events-none"></div>
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/5 h-2/5 bg-cyan-500/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-cyan-400/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-cyan-300/15 rounded-full filter blur-[120px]"></div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 5 + 1,
              height: Math.random() * 5 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: index % 3 === 0 ? '#00BFFF' : index % 3 === 1 ? '#1E90FF' : '#06B6D4',
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 md:mb-16">
             <div className="flex flex-col items-center mb-12">
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                 Let's Contact
                    </motion.h2>
                  </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF]">Amazing</span> Together
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Have a project in mind or want to discuss opportunities? I'm just a message away.
          </motion.p>
        </div>

        <div ref={formRef} className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Contact form card */}
          <motion.div 
            className="lg:flex-[3] w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="h-full bg-neutral-800/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-zinc-800/50 relative overflow-hidden">
              {/* Card decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-[#1E90FF]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#1E90FF]/20 to-cyan-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-white font-medium text-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full p-3 pl-4 rounded-lg bg-zinc-900/80 text-white border border-zinc-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-500"
                          placeholder="Your name"
                          disabled={isSubmitting}
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full"
                          initial={{ width: "0%" }}
                          whileInView={{ width: formData.fullName ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white font-medium text-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 pl-4 rounded-lg bg-zinc-900/80 text-white border border-zinc-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-500"
                          placeholder="your.email@example.com"
                          disabled={isSubmitting}
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full"
                          initial={{ width: "0%" }}
                          whileInView={{ width: formData.email ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="reason" className="text-white font-medium text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Reason for Contact
                    </label>
                    <div className="relative">
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full p-3 pl-4 rounded-lg bg-zinc-900/80 text-white border border-zinc-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none cursor-pointer"
                        disabled={isSubmitting}
                      >
                        <option value="Work">Work Opportunity</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Hiring">Hiring</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white font-medium text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full p-4 rounded-lg bg-zinc-900/80 text-white border border-zinc-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none placeholder:text-gray-500"
                        placeholder="Tell me about your project or inquiry..."
                        disabled={isSubmitting}
                      />
                      <motion.span 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: formData.message ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                <motion.button
  type="submit"
  disabled={isSubmitting}
  className="w-full border border-cyan-500 bg-neutral-800 text-cyan-300 hover:text-white py-3.5 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 relative overflow-hidden group shadow-lg hover:shadow-cyan-500/30"
  variants={buttonVariants}
  whileHover={!isSubmitting ? "hover" : undefined}
  whileTap={!isSubmitting ? "tap" : undefined}
  animate={isSubmitting ? "loading" : ""}
>
  {/* Animated gradient line */}
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
  
  {/* Progress bar for submission */}
  {isSubmitting && (
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" 
      style={{ width: `${submitProgress}%`, transition: 'width 0.3s ease-in-out' }}>
    </div>
  )}
  
  {isSubmitting ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-cyan-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="relative z-10">Sending ({submitProgress}%)...</span>
    </>
  ) : (
    <>
      <span className="relative z-10">Send Message</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 relative z-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </>
  )}
</motion.button>
                </form>
              </div>
            </div>
          </motion.div>
          
          {/* Info and resume column */}
          <motion.div 
            className="lg:flex-[2] w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="h-full flex flex-col space-y-6">
              {/* Contact info card */}
              <div className="bg-neutral-800/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-zinc-800/50 relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tr from-cyan-500/15 to-[#1E90FF]/5 rounded-full blur-2xl"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Connect With Me</h3>
                
                <div className="space-y-6 relative z-10">
                  <motion.div 
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="bg-gradient-to-tr from-cyan-500/20 to-[#1E90FF]/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base">Email</h4>
                      <a 
                        href="mailto:arun.a.dev@example.com" 
                        className="text-gray-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                      >
                        arunarivalagan774@gmail.com
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="bg-gradient-to-tr from-cyan-500/20 to-[#1E90FF]/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base">Location</h4>
                      <p className="text-gray-400">
                        Tamil Nadu, India
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="bg-gradient-to-tr from-cyan-500/20 to-[#1E90FF]/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base">Social Media</h4>
                      <div className="flex space-x-3 mt-2">
                      
                        <a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </a>
                     
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Resume Card with Encryption Animation - styled like AboutSection */}
              <motion.div 
                className="bg-neutral-800/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-zinc-800/50 flex-1 flex flex-col justify-center relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 25px rgba(0, 191, 255, 0.2)" }}
              >
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#1E90FF]/10 rounded-full blur-3xl"></div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    className="relative mb-6 w-20 h-20"
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full blur-md opacity-40"></div>
                    <div className="relative h-full w-full bg-gradient-to-r from-cyan-500/10 to-[#1E90FF]/10 rounded-full border border-white/10 flex items-center justify-center">
                      <HiDocumentText className="h-10 w-10 text-cyan-300" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">My Resume</h3>
                  <p className="text-gray-400 mb-6">Check out my experience, skills, and qualifications</p>
                  
                  {/* Resume button styled like AboutSection button */}
                  <div className="relative inline-block">
                    {/* Encryption animation border for button */}
                    <div className="absolute -inset-1 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-0"></div>
                      
                      {/* Animated encryption border elements would go here */}
                    </div>
                    
                    <motion.button
                      className="group relative block w-fit overflow-hidden rounded-lg border border-cyan-500 bg-neutral-800 px-6 py-3 font-mono font-medium uppercase text-cyan-300 transition-colors hover:text-white inline-flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 z-30"
                      onMouseEnter={handleResumeHover}
                      onClick={openResumeModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiDocumentText className="text-xl text-cyan-300" />
                      
                      {/* Gradient animated text */}
                      <span
                        className="inline-block min-w-[8ch] text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] whitespace-nowrap"
                      >
                        {resumeText}
                      </span>
                      
                      {/* Glowing hover stripe animation */}
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
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumeModal(false)}
            />
            
            <motion.div 
              className="relative bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] p-2 rounded-lg">
                    <HiDocumentText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Arun A - Resume</h3>
                </div>
                <button 
                  onClick={() => setShowResumeModal(false)}
                  className="text-gray-400 hover:text-white transition-colors rounded-full p-1.5 hover:bg-zinc-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-auto">
                <div className="aspect-[0.77] w-full bg-white rounded-lg overflow-hidden shadow-xl">
                  {/* Resume preview */}
                  <iframe 
                    src="/assets/714023104011 ( 23CS011 ).pdf" 
                    className="w-full h-full"
                    title="Resume Preview"
                  >
                    Your browser does not support iframes.
                  </iframe>
                </div>
              </div>
              
              <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Last updated: May 2025</span>
                
                <div className="flex space-x-3">
                  <motion.button
                    className="inline-flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-gray-200 font-medium transition"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowResumeModal(false)}
                  >
                    <span>Close</span>
                  </motion.button>
                  
                  <motion.a
                    href="/assets/714023104011 ( 23CS011 ).pdf"
                    download="Arun_A_Resume.pdf"
                    className="inline-flex items-center space-x-2 border border-cyan-500 bg-neutral-800 text-cyan-300 hover:text-white px-4 py-2 rounded-lg font-medium transition group relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Glowing hover stripe animation */}
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
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="relative z-10">Download PDF</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS for grid pattern */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;