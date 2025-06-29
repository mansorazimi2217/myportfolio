import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FiDownload, FiMail, FiCode } from "react-icons/fi";
import img from "../assets/img.png";
import pdf from "../assets/pdf.pdf";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const roles = ["Web Developer", "Programmer", "software Engineer"];
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const blobRefs = useRef([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Enhanced typewriter effect with slower, smoother transitions
  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      const fullText = currentRole;

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(80); // Slower when deleting for better visibility

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(150 + Math.random() * 100); // Randomize typing speed
        }
      } else {
        setDisplayedText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(120 + Math.random() * 80); // Slower, more variable typing speed

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500); // Longer pause before deleting
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, currentRoleIndex, isDeleting, typingSpeed]);

  // Floating blobs animation
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      animateBlobs();
    }
  }, [inView, controls]);

  const animateBlobs = () => {
    blobRefs.current.forEach((blob, index) => {
      if (!blob) return;

      const duration = isMobile ? 40 : isTablet ? 35 : 30;
      const xRange = isMobile ? 15 : isTablet ? 20 : 25;
      const yRange = isMobile ? 15 : isTablet ? 20 : 25;

      blob.animate(
        [
          { transform: "translate(0, 0)" },
          {
            transform: `translate(${
              Math.random() > 0.5 ? "-" : ""
            }${xRange}px, ${Math.random() > 0.5 ? "-" : ""}${yRange}px)`,
          },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: isMobile ? 15 : isTablet ? 20 : 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.98 },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const profileImageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.4,
      },
    },
    float: {
      y: [0, -10, 0],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      y: -15,
      rotate: [0, -3, 3, 0],
      transition: {
        y: { type: "spring", stiffness: 300, damping: 10 },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pb-16 sm:pb-20 md:pb-0 pt-20 sm:pt-24 md:pt-30 min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-gray-200"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-gray-900 to-secondary-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>

        {/* Floating particles */}
        {[...Array(isMobile ? 8 : isTablet ? 12 : 16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-500/10"
            style={{
              width: `${
                Math.random() * (isMobile ? 3 : isTablet ? 4 : 5) + 2
              }px`,
              height: `${
                Math.random() * (isMobile ? 3 : isTablet ? 4 : 5) + 2
              }px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [
                0,
                (Math.random() - 0.5) * (isMobile ? 30 : isTablet ? 45 : 60),
              ],
              x: [
                0,
                (Math.random() - 0.5) * (isMobile ? 30 : isTablet ? 45 : 60),
              ],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-0 sm:px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div
            className={`${
              isTablet ? "w-5/6" : "lg:w-1/2"
            } order-2 lg:order-1 mt-8 sm:mt-10 lg:mt-0 w-full mx-auto`}
          >
            <motion.div variants={titleVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl font-bold mb-4 md:mb-6 text-white">
                Hi, I'm a{" "}
                <span className="text-primary-400 relative inline-block min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]">
                  {displayedText}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: [0, 1, 0],
                      originX: [0, 0, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-lg text-gray-400 leading-relaxed"
              variants={itemVariants}
            >
              I craft{" "}
              <span className="text-primary-400 font-medium">
                immersive digital experiences
              </span>{" "}
              with clean, efficient code. Specializing in full-stack
              development, I build scalable web applications with intuitive
              interfaces and robust backends.
            </motion.p>

            <motion.div
              className={`flex ${
                isMobile ? "flex-col" : "flex-row"
              } gap-3 sm:gap-4 mb-8 w-full`}
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="w-full px-4 sm:px-5 md:px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-primary-600/50 flex items-center justify-center gap-2 text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiMail size={18} /> Contact Me
              </motion.a>
              <motion.a
                href={pdf}
                download
                className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-primary-600 text-primary-300 hover:text-white font-medium rounded-lg transition-all hover:bg-primary-900/50 flex items-center justify-center gap-2 text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiDownload size={18} /> Download CV
              </motion.a>
              <motion.a
                href="#projects"
                className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-secondary-600 text-secondary-300 hover:text-white font-medium rounded-lg transition-all hover:bg-secondary-900/50 flex items-center justify-center gap-2 text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiCode size={18} /> View Work
              </motion.a>
            </motion.div>
          </div>

          <div
            className={`${
              isTablet ? "w-2/3" : "lg:w-1/2"
            } order-1 lg:order-2 relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto`}
          >
            <motion.div
              className="relative w-full"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              {/* Animated blobs */}
              <div
                ref={(el) => (blobRefs.current[0] = el)}
                className={`absolute ${
                  isMobile
                    ? "-top-4 -left-4 w-20 h-20"
                    : isTablet
                    ? "-top-5 -left-5 w-28 h-28"
                    : "-top-6 -left-6 w-32 h-32"
                } bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70`}
              ></div>
              <div
                ref={(el) => (blobRefs.current[1] = el)}
                className={`absolute ${
                  isMobile
                    ? "-bottom-4 -right-4 w-20 h-20"
                    : isTablet
                    ? "-bottom-6 -right-6 w-28 h-28"
                    : "-bottom-8 -right-8 w-32 h-32"
                } bg-secondary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70`}
              ></div>
              <div
                ref={(el) => (blobRefs.current[2] = el)}
                className={`absolute ${
                  isMobile
                    ? "-top-6 -right-2 w-20 h-20"
                    : isTablet
                    ? "-top-8 -right-3 w-28 h-28"
                    : "-top-12 -right-4 w-32 h-32"
                } bg-tertiary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70`}
              ></div>

              {/* Profile card with enhanced animation */}
              <motion.div
                className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
                whileHover={isMobile ? {} : "hover"}
                transition={{ type: "spring", stiffness: 300 }}
                variants={imageVariants}
                animate="visible"
              >
                <div
                  className={`${
                    isMobile ? "h-48" : isTablet ? "h-56" : "h-64"
                  } bg-gradient-to-br from-primary-700 via-gray-900 to-secondary-700 flex items-center justify-center relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                    }}
                  />

                  <motion.img
                    src={img}
                    alt="Profile"
                    className={`${
                      isMobile
                        ? "w-36 h-36"
                        : isTablet
                        ? "w-44 h-44"
                        : "w-56 h-56"
                    } rounded-full border-4 border-white/90 object-cover shadow-xl`}
                    initial="hidden"
                    animate={["visible", "float"]}
                    variants={profileImageVariants}
                    whileHover={isMobile ? {} : { scale: 1.03 }}
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                    Mohammad Mansoor Azimi
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-2 sm:mb-3 md:mb-4">
                    Full Stack Developer
                  </p>

                  <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                    <motion.div
                      className="px-2 sm:px-3 py-1 bg-gray-700/50 rounded-full text-xs sm:text-sm"
                      whileHover={{ scale: isMobile ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-primary-400">3+</span> Years Exp
                    </motion.div>
                    <motion.div
                      className="px-2 sm:px-3 py-1 bg-gray-700/50 rounded-full text-xs sm:text-sm"
                      whileHover={{ scale: isMobile ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-secondary-400">10+</span> Projects
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
