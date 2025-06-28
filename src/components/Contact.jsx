import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { form } from "framer-motion/m";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("jY1tG4Em1ASbrORVp"); // Replace with your EmailJS public key
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData.email);
    try {
      await emailjs.send(
        "service_xcugd5v", // Replace with your EmailJS service ID
        "template_gwq7ymd", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "mansorazimi17@gmail.com", // Your fixed receiver email
        }
      );

      setSubmitMessage("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
      formRef.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitMessage("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            snet a message with email OR contact me as you want!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 text-primary-300">
                      <FiMail size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <a
                      href="mailto:mansorazimi17@gmail.com"
                      className="text-primary-300 hover:text-primary-500 transition-colors"
                    >
                      mansorazimi17@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 text-primary-300">
                      <FiPhone size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Phone</h4>
                    <a
                      href="tel:+1234567890"
                      className="text-primary-300 hover:text-primary-500 transition-colors"
                    >
                      +93-79282795
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 text-primary-300">
                      <FiMapPin size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Location</h4>
                    <p className="text-gray-400">Kabul Afghanistan</p>
                  </div>
                </div>

                {/* Social */}
                <div className="pt-6">
                  <h4 className="text-lg font-bold mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {[
                      {
                        href: "https://github.com/yourusername",
                        icon: <FiGithub size={18} />,
                        label: "GitHub",
                      },
                      {
                        href: "https://linkedin.com/in/yourusername",
                        icon: <FiLinkedin size={18} />,
                        label: "LinkedIn",
                      },
                      {
                        href: "https://twitter.com/yourusername",
                        icon: <FiTwitter size={18} />,
                        label: "Twitter",
                      },
                    ].map(({ href, icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-gray-300 hover:bg-primary-700 hover:text-primary-300 transition-colors"
                        whileHover={{ y: -3 }}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-gray-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1 text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-900 hover:bg-red-600 text-white font-medium rounded-lg shadow-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {submitMessage && (
                  <motion.div
                    className={`p-4 rounded-lg text-sm mt-4 ${
                      submitMessage.includes("Thank you")
                        ? "bg-green-800 text-green-300"
                        : "bg-red-800 text-red-300"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
