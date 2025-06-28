import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Animated Logo with 3D effect */}
        <motion.a
          href="#home"
          className="flex items-center group relative"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredItem("logo")}
          onHoverEnd={() => setHoveredItem(null)}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 mr-3 flex items-center justify-center relative overflow-hidden"
            animate={{
              rotate: hoveredItem === "logo" ? [0, 360] : 0,
              scale: hoveredItem === "logo" ? 1.1 : 1,
            }}
            transition={{
              rotate: {
                repeat: hoveredItem === "logo" ? Infinity : 0,
                duration: 8,
                ease: "linear",
              },
              scale: { duration: 0.3 },
            }}
          >
            <motion.span
              className="text-white font-bold text-lg z-10"
              animate={{
                scale: hoveredItem === "logo" ? 1.2 : 1,
              }}
            >
              MA
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-0"
              animate={{
                opacity: hoveredItem === "logo" ? 0.5 : 0,
              }}
            />
          </motion.div>
          <motion.span className="text-xl font-bold text-white">
            Mansoor
            <motion.span
              className="text-primary-500"
              animate={{
                textShadow:
                  hoveredItem === "logo"
                    ? "0 0 8px rgba(59, 130, 246, 0.8)"
                    : "none",
              }}
            >
              Azimi
            </motion.span>
          </motion.span>
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-primary-500"
            animate={{
              width: hoveredItem === "logo" ? "100%" : "0%",
              opacity: hoveredItem === "logo" ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        {/* Desktop Navigation with Advanced Effects */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative"
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.a
                href={`#${item.id}`}
                className={`relative px-1 py-2 text-sm font-medium ${
                  activeSection === item.id
                    ? "text-primary-400"
                    : "text-gray-300"
                }`}
                animate={{
                  color:
                    hoveredItem === item.id
                      ? "#ffffff"
                      : activeSection === item.id
                      ? "#60a5fa"
                      : "#d1d5db",
                }}
              >
                {item.name}
                <motion.div
                  className="absolute left-0 top-full h-0.5 w-full bg-gradient-to-r from-primary-400 to-secondary-400"
                  animate={{
                    width:
                      activeSection === item.id
                        ? "100%"
                        : hoveredItem === item.id
                        ? "100%"
                        : "0%",
                    opacity:
                      activeSection === item.id || hoveredItem === item.id
                        ? 1
                        : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    className="absolute left-0 top-full mt-2 w-full h-0.5 bg-white rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu button with animated bars */}
        <motion.button
          className="md:hidden p-2 rounded-full relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            animate={{
              borderColor: isMenuOpen
                ? "rgba(96, 165, 250, 0.5)"
                : "rgba(0, 0, 0, 0)",
              scale: isMenuOpen ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Navigation with Fluid Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-primary-700 to-secondary-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                >
                  <span>{item.name}</span>
                  <motion.div
                    animate={{
                      x: activeSection === item.id ? [0, 5, 0] : 0,
                    }}
                    transition={{
                      repeat: activeSection === item.id ? Infinity : 0,
                      repeatType: "reverse",
                      duration: 1.5,
                    }}
                  >
                    <FiArrowRight
                      className={
                        activeSection === item.id
                          ? "text-white"
                          : "text-gray-400"
                      }
                    />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
