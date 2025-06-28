import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <FiSun className="w-5 h-5 text-yellow-400" />
      )}
    </motion.button>
  );
};
