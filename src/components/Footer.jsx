import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-[#171F2D] border-t border-gray-800 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-2">Mansoor Azimi</h3>
            <p className="text-gray-400">Full Stack Developer</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-6 mb-4">
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiMail size={20} />
              </motion.a>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} All Rights Reserved
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
