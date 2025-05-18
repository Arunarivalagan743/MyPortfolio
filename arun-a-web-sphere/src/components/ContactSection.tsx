import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    reason: "Work",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formRotate, setFormRotate] = useState(0); // for 3D rotation on submit

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger rotation animation by increasing rotation angle
    setFormRotate((prev) => prev + 360);

    try {
      const response = await fetch("https://myportfolio-2-kry9.onrender.com/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});


      if (!response.ok) throw new Error("Failed to send message");

      await MySwal.fire({
        icon: "success",
        title: "Message sent successfully!",
        text: "Thank you for reaching out. We’ll get back to you soon.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setFormData({ fullName: "", email: "", reason: "Work" });
    } catch (error: any) {
      await MySwal.fire({
        icon: "error",
        title: "Submission failed",
        text: error.message || "Something went wrong",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 8px rgba(0, 191, 255, 0.5)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 191, 255, 0.4)" },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-700/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-2 accent-underline text-white">
            Get In Touch
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, rotateY: formRotate }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Full Name
                </label>
                <motion.input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-primary focus:ring focus:ring-primary/20 outline-none transition"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-primary focus:ring focus:ring-primary/20 outline-none transition"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Reason for Contact
                </label>
                <motion.select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-primary focus:ring focus:ring-primary/20 outline-none transition"
                  disabled={isSubmitting}
                >
                  <option value="Work">Work</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Hiring">Hiring</option>
                  <option value="Other">Other</option>
                </motion.select>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                variants={buttonVariants}
                whileHover={!isSubmitting ? "hover" : undefined}
                whileTap={!isSubmitting ? "tap" : undefined}
                animate={isSubmitting ? "loading" : ""}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
