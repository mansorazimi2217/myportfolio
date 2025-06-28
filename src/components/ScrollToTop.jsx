import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <FiArrowUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </motion.button>
  );
};

export default ScrollToTop;
