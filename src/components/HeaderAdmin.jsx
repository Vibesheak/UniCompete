import React, { useState } from "react";
import logo from "./images/logo3.png";
import { Link, useLocation } from "react-router-dom";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added this state for the sidebar
  const location = useLocation();
  let closeTimeout;

  const universities = [
    "Colombo",
    "Peradeniya",
    "Kelaniya",
    "Moratuwa",
    "Jaffna",
    "Sri Jayewardenepura",
    "Ruhuna",
    "Eastern",
    "South Eastern",
    "Wayamba",
  ];

  const toggleUniversityDropdown = () => {
    setIsUniversityDropdownOpen(true);
    clearTimeout(closeTimeout); // Prevent closing if user hovers back quickly
  };

  const closeUniversityDropdown = () => {
    closeTimeout = setTimeout(() => {
      setIsUniversityDropdownOpen(false);
    }, 1000); // Close after 1 second
  };

  const isActive = (path) => location.pathname === path;
  const isUniversityPage = location.pathname.startsWith("/university");

  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 w-full h-[250px] py-10 flex items-center justify-center relative">
      <div className="bg-white w-[70%] max-w-screen-xl shadow-2xl rounded-2xl py-6 px-8 flex items-center flex-col sm:flex-row justify-between absolute -bottom-16 sm:-bottom-10">
        {/* Left Side: Logo */}
        <div className="flex items-center mb-6 sm:mb-0 sm:mr-8">
          <img
            src={logo}
            alt="Logo"
            className="h-[200px] w-[200px] transform hover:scale-110"
          />
        </div>

        {/* Center Content: Title */}
        <motion.h1
          className="text-2xl font-bold flex-1 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-transparent bg-clip-text text-6xl md:text-7xl font-extrabold tracking-tight transition-all duration-300 transform"
          >
            Eventura
          </Link>
        </motion.h1>

        {/* Right Side Content */}
        <div className="flex flex-col justify-between h-full sm:pl-5 md:pl-10">
          {/* Top Section: Contact Information */}
          <div className="text-gray-700 mb-4 sm:mb-0">
            <div className="flex flex-wrap space-x-4 sm:space-x-8 justify-center sm:justify-start">
              <motion.h1
                className="text-2xl font-bold flex-1 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm sm:text-lg flex items-center">
                  <MailIcon className="h-5 w-5 text-blue-500 mr-2 cursor-pointer hover:text-blue-700" />
                  <a
                    href="mailto:eventura@universitycomp.com"
                    className="hover:underline"
                  >
                    eventura@universitycomp.com
                  </a>
                </p>
              </motion.h1>
              <motion.h1
                className="text-2xl font-bold flex-1 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm sm:text-lg flex items-center">
                  <PhoneIcon className="h-5 w-5 text-green-500 mr-2 cursor-pointer hover:text-green-700" />
                  <a href="tel:+1234567890" className="hover:underline">
                    +1234567890
                  </a>
                </p>
              </motion.h1>
            </div>
          </div>

          {/* Line Separator */}
          <motion.h1
            className="text-2xl font-bold flex-1 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-t-2 sm:border-t-4 border-blue-800 my-6 mx-auto w-[80%] sm:w-[90%] md:w-[100%]"></div>
          </motion.h1>
          {/* Bottom Section: Navigation Links */}
          <nav>
            <ul className="flex flex-wrap space-x-4 sm:space-x-8 justify-center sm:justify-start text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <li>
                  <Link
                    to="/"
                    className={`${
                      isActive("/")
                        ? "text-blue-800 font-bold"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    Home
                  </Link>
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <li>
                  <Link
                    to="/login"
                    className={`${
                      isActive("/login")
                        ? "text-blue-800 font-bold"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    Login
                  </Link>
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <li>
                  <Link
                    to="/about"
                    className={`${
                      isActive("/aboutus")
                        ? "text-blue-800 font-bold text-xl"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    About Us
                  </Link>
                </li>
              </motion.div>

              {/* Universities Sidebar Toggle */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <li>
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={`${
                      isUniversityPage
                        ? "text-blue-800 font-bold"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center`}
                  >
                    Universities ▼
                  </button>
                </li>
              </motion.div>
            </ul>
          </nav>
        </div>
      </div>

      {/* Sidebar for Universities */}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-[50px] left-0 h-[750px] w-64 bg-transparent shadow-lg p-5 flex flex-col space-y-4 z-50 backdrop-blur-md"
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-900 hover:text-blue-900 text-2xl "
              >
                ✕
              </button>
            </div>

            {/* University List */}
            <div className="mt-4 flex flex-col space-y-2">
              {universities.map((university, index) => (
                <motion.div
                  key={university}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={`/university/${university}`}
                    className={` text-purple-800 block text-lg font-medium px-4 py-2 rounded-md transition-all duration-300
                ${
                  isActive(`/university/${university}`)
                    ? "bg-blue-800 text-white" // Active university link with different blue
                    : "text-blue-500 hover:bg-blue-100"
                }`}
                  >
                    University of {university}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
