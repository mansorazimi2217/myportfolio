// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FiGithub, FiExternalLink } from "react-icons/fi";
// import projects from "../data/projects";
// // import { colgroup } from "framer-motion/client";
// const Projects = () => {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

//   useEffect(() => {
//     setAnimateCard({ y: 50, opacity: 0 });
//     setTimeout(() => {
//       setAnimateCard({ y: 0, opacity: 1 });
//       if (activeFilter === "All") {
//         setFilteredProjects(projects);
//       } else {
//         setFilteredProjects(
//           projects.filter((project) => project.tags.includes(activeFilter))
//         );
//       }
//     }, 300);
//   }, [activeFilter]);

//   const projectCategories = [
//     "All",
//     ...new Set(projects.flatMap((project) => project.tags)),
//   ];

//   return (
//     <section id="projects" className="py-20 bg-gray-900 text-gray-200">
//       <div className="container mx-auto px-6 lg:px-30">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-primary-400 mb-4">
//             My Projects
//           </h2>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//             Here are some of my selected works. Each project comes with unique
//             challenges and solutions.
//           </p>
//         </motion.div>

//         <motion.div
//           className="flex flex-wrap justify-center gap-4 mb-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5, staggerChildren: 0.1 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           {projectCategories.map((category) => (
//             <motion.button
//               key={category}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 activeFilter === category
//                   ? "bg-primary-600 text-white"
//                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveFilter(category)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           animate={animateCard}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
//               whileHover={{ y: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-50px" }}
//             >
//               <div className="h-48 bg-gradient-to-br from-primary-700 to-secondary-700 relative overflow-hidden ">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-contain"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                   <div className="flex gap-4">
//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-gray-700/90 text-gray-200 hover:bg-gray-600 p-2 rounded-full transition-colors"
//                         aria-label="GitHub"
//                       >
//                         <FiGithub size={18} />
//                       </a>
//                     )}
//                     {project.demo && (
//                       <a
//                         href={project.demo}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-gray-700/90 text-gray-200 hover:bg-gray-600 p-2 rounded-full transition-colors"
//                         aria-label="Live Demo"
//                       >
//                         <FiExternalLink size={18} />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-400 mb-4">{project.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 text-xs font-medium rounded-full bg-primary-900 text-primary-400"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projects from "../data/projects";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    setAnimateCard({ y: 50, opacity: 0 });
    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (activeFilter === "All") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(
          projects.filter((project) => project.tags.includes(activeFilter))
        );
      }
      setShowAllProjects(false);
    }, 300);
  }, [activeFilter]);

  const projectCategories = [
    "All",
    ...new Set(projects.flatMap((project) => project.tags)),
  ];

  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 lg:px-30">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-400 mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Here are some of my selected works. Each project comes with unique
            challenges and solutions.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? "bg-primary-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveFilter(category)}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeFilter + showAllProjects} // Force re-animation when filter or showAll changes
        >
          <AnimatePresence mode="wait">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout // Add layout animation for smooth repositioning
              >
                <div className="h-48 bg-gradient-to-br from-primary-700 to-secondary-700 relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-700/90 text-gray-200 hover:bg-gray-600 p-2 rounded-full transition-colors"
                          aria-label="GitHub"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiGithub size={18} />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-700/90 text-gray-200 hover:bg-gray-600 p-2 rounded-full transition-colors"
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary-900 text-primary-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-10">
            <motion.button
              className="px-6 py-3 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              onClick={() => setShowAllProjects(!showAllProjects)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {showAllProjects
                ? "Show Less"
                : `Show All (${filteredProjects.length})`}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
