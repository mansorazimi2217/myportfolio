import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiCpu, FiTool } from "react-icons/fi";
import { Tooltip } from "react-tooltip"; // You need to install `react-tooltip`

const skills = [
  {
    category: "Frontend",
    icon: <FiCode />,
    items: [
      { name: "HTML/CSS", level: 95, tip: "Used in all frontend projects" },
      { name: "JavaScript", level: 90, tip: "3+ years of experience" },
      { name: "React", level: 85, tip: "Used in dynamic SPAs" },
      { name: "Tailwind CSS", level: 85, tip: "Main styling framework" },
      { name: "Bootstrap", level: 80, tip: "Used in legacy UIs" },
      {
        name: "Chackra UI",
        level: 85,
        tip: "all ready react compnents created",
      },
      {
        name: "MUI - Material UI",
        level: 80,
        tip: "The React component library you always wanted",
      },
    ],
  },
  {
    category: "Backend",
    icon: <FiDatabase />,
    items: [
      { name: "Node.js", level: 90, tip: "Used for REST API development" },
      { name: "Express.js", level: 90, tip: "Core framework for backend" },
      { name: "PHP", level: 75, tip: "Used in CMS and backend systems" },
      { name: "Laravel", level: 75, tip: "Used in modern PHP projects" },
      { name: "MySQL", level: 85, tip: "Relational database expertise" },
      { name: "MongoDB", level: 90, tip: "NoSQL experience for APIs" },
      { name: "SQL Server", level: 70, tip: "Basic CRUD and joins" },
    ],
  },
  {
    category: "Programming Skills",
    icon: <FiCpu />,
    items: [
      { name: "C", level: 80, tip: "Fundamentals of programming" },
      { name: "C++", level: 85, tip: "Used in algorithm learning" },
      { name: "Java", level: 90, tip: "Used in university projects" },
      { name: "Python", level: 75, tip: "For scripting and tools" },
      { name: "Algorithms", level: 80, tip: "Problem-solving skills" },
      { name: "Data Structures", level: 80, tip: "Used in all coding work" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: <FiTool />,
    items: [
      { name: "Git", level: 90, tip: "Version control mastery" },
      { name: "GitHub", level: 90, tip: "Used for collaboration & hosting" },
      { name: "Linux", level: 50, tip: "Daily use for development" },
      { name: "Docker", level: 60, tip: "Used in deployment setups" },
      {
        name: "Shopify theme development",
        level: 60,
        tip: "Ecomerce Platform",
      },
    ],
  },
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <section id="skills" className="py-20 bg-[#171F2D] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Skills
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with on a regular basis.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-400 text-white">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {skill.category}
                </h3>
              </div>
              <div className="space-y-4">
                {skill.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span
                        className="text-sm font-medium text-white cursor-pointer"
                        data-tooltip-id={`tooltip-${item.name}`}
                        data-tooltip-content={item.tip}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <Tooltip id={`tooltip-${item.name}`} className="text-sm" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
