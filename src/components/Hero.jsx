import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FiDownload, FiMail, FiCode } from "react-icons/fi";
import img from "../assets/img.png";
import pdf from "../assets/pdf.pdf";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const roles = ["web developer", "Programmer"];
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const blobRefs = useRef([]);

  // Typewriter effect with more dynamic typing
  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      const fullText = currentRole;

      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50); // Faster when deleting

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100 + Math.random() * 100); // Randomize typing speed
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(100 + Math.random() * 100); // Variable typing speed

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500 + Math.random() * 1000); // Random pause
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
      const duration = 20 + Math.random() * 10;
      const xRange = 20 + Math.random() * 30;
      const yRange = 20 + Math.random() * 30;

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
    hidden: { y: 30, opacity: 0 },
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

  return (
    <section
      id="home"
      ref={ref}
      className="pb-20 md:pb-0 pt-30 md:pt-0 min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-gray-200"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-gray-900 to-secondary-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-500/10"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
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
        className="container mx-auto px-6 xl:px-30 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-6 text-primary-400"
              variants={itemVariants}
            >
              Hi, I'm a ,
              <span className="text-primary-500 relative">
                {displayedText}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary-500"
                  animate={{
                    opacity: [0, 1, 0],
                    width: ["0%", "100%", "0%"],
                    left: ["0%", "0%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 max-w-lg text-gray-400 leading-relaxed"
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
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-primary-600/50 flex items-center gap-2"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail /> Contact Me
              </motion.a>
              <motion.a
                href={pdf}
                download
                className="px-6 py-3 border-2 border-primary-600 text-primary-300 hover:text-white font-medium rounded-lg transition-all hover:bg-primary-900/50 flex items-center gap-2"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiDownload /> Download CV
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 border-2 border-secondary-600 text-secondary-300 hover:text-white font-medium rounded-lg transition-all hover:bg-secondary-900/50 flex items-center gap-2"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiCode /> View Work
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Animated blobs */}
              <div
                ref={(el) => (blobRefs.current[0] = el)}
                className="absolute -top-6 -left-6 w-32 h-32 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              ></div>
              <div
                ref={(el) => (blobRefs.current[1] = el)}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              ></div>
              <div
                ref={(el) => (blobRefs.current[2] = el)}
                className="absolute -top-12 -right-4 w-32 h-32 bg-tertiary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              ></div>

              {/* Interactive profile card */}
              <motion.div
                className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-64 bg-gradient-to-br from-primary-700 via-gray-900 to-secondary-700 flex items-center justify-center relative overflow-hidden">
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
                    className="w-64 h-64 rounded-full border-4 border-white object-cover shadow-xl"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: [1, 1.03, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Mohammad Mansoor Azimi
                  </h3>
                  <p className="text-gray-400 mb-4">Full Stack Developer</p>

                  <div className="flex justify-center gap-4">
                    <motion.div
                      className="px-4 py-1 bg-gray-700/50 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-primary-400">3+</span> Years Exp
                    </motion.div>
                    <motion.div
                      className="px-4 py-1 bg-gray-700/50 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
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
