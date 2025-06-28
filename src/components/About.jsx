import { motion } from "framer-motion";
import { FiAward, FiBriefcase, FiCode } from "react-icons/fi";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer & Instructor",
    company: "Smart Technology IT Services (STS)",
    period: "2024 - Present",
    description:
      "Delivering technical instruction and developing internal tools. Built a database system and managed the company website to streamline course management and operations.",
    icon: <FiBriefcase />,
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Ministry of Higher Education",
    period: "3-Month Internship",
    description:
      "Gained hands-on experience in web development, contributing to various digital projects within the ministry’s IT department.",
    icon: <FiCode />,
  },
  {
    id: 3,
    role: "Personal & Freelance Projects",
    company: "Independent",
    period: "Ongoing",
    description:
      "Built a pharmacy management desktop application and several small web and mobile projects to strengthen full-stack development skills.",
    icon: <FiAward />,
  },
];

const About = () => {
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
    <section id="about" className="py-20 bg-[#171F2D] text-gray-200">
      <div className="container mx-auto px-6 lg:px-30">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-400 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Here's a little about my background and what I do.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Who am I?</h3>
              <p className="text-gray-400 mb-6">
                I'm a passionate Full Stack Developer with over 4 years of
                experience building web applications. I specialize in JavaScript
                technologies across the whole stack (React.js, Node.js, Express,
                MongoDB).
              </p>
              <p className="text-gray-400 mb-6">
                My approach combines technical expertise with an eye for design
                to create products that are both functional and visually
                appealing. I believe in writing clean, maintainable code and
                staying up-to-date with the latest industry trends.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Name:</h4>
                  <p className="text-gray-400">Mansoor Azimi</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Email:</h4>
                  <p className="text-gray-400">mansorazimi17@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">From:</h4>
                  <p className="text-gray-400">Kabul, Afghanistan</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Freelance:</h4>
                  <p className="text-gray-400">Available</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold text-primary-400 mb-6">
              My Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-900 text-primary-400">
                      {exp.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                    <p className="text-primary-400 mb-2">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-gray-400">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
