import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <motion.footer
      // Removed y animation for better visibility during testing
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-700 text-gray-300 py-8 "
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        <div className="flex flex-wrap justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 mb-6 md:mb-0"
          >
            <h3 className="text-lg font-bold mb-4 hover:text-blue-500">
              Contact Us
            </h3>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <p className="text-lg hover:text-blue-500">
                123 Kelaniya, Gampaha, Sri Lanka
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="mr-2" />
              <a
                href="tel:+1234567890"
                className="text-lg hover:text-blue-500 underline transition-colors"
              >
                +1 234 567 890
              </a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a
                href="mailto:eventura@universitycomp.com"
                className="text-lg text-blue-400 hover:text-blue-500 underline transition-colors"
              >
                eventura@universitycomp.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-end"
          >
            <h3 className="text-lg font-bold mb-4">
              Find us online and stay updated with our latest activities
            </h3>
            <div className="flex space-x-6 mt-2">
              {[FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-2xl transition-transform duration-300 ${
                      Icon === FaYoutube
                        ? "hover:text-red-400"
                        : "hover:text-blue-600"
                    }`}
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 border-t border-gray-300 pt-4 text-center"
        >
          <p className="text-sm tracking-wide">
            &copy; 2025 University Competition Management Platform. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
