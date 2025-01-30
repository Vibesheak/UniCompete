import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const location = useLocation();
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUniversityDropdown = () =>
    setIsUniversityDropdownOpen(!isUniversityDropdownOpen);

  const isActive = (path) => location.pathname === path;
  const isUniversityPage = location.pathname.startsWith("/university");

  return (
    <header className="bg-blue-600   text-white p-4 shadow-md flex items-center relative">
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="text-white text-3xl focus:outline-none mr-4"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Webpage Name with Animation */}
      <motion.h1
        className="text-2xl font-bold flex-1 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-5xl md:text-6xl font-extrabold tracking-tight transition-all duration-300 transform ${
            isHovered
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-transparent bg-clip-text"
              : "text-white"
          }`}
        >
          Eventura
        </Link>
      </motion.h1>

      {/* Search Bar */}
      <form className="w-full max-w-lg mx-auto mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="  w-[400px] h-[15px] block w-full p-4 ps-12 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Universities, Competitions..."
            required
          />
        </div>
      </form>

      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[90px] left-0 h-[750px] w-64 bg-opacity-10 shadow-lg p-5 flex flex-col space-y-4 z-50 backdrop-blur-md"
        >
          {[
            { label: "Home", path: "/" },
            { label: "Login", path: "/login" },
            { label: "About Us", path: "/about" },
          ].map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 * (index + 1) }}
            >
              <Link
                to={item.path}
                className={`text-blue-900 text-2xl font-semibold hover:text-blue-400 transition-all
 ${isActive(item.path) ? "text-indigo-500" : ""}`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {/* University Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={toggleUniversityDropdown}
              className={`text-blue-900 text-2xl font-semibold w-full text-left ${
                isUniversityPage ? "text-indigo-500" : ""
              }`}
            >
              Universities ▼
            </button>
            {isUniversityDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-2"
              >
                {universities.map((university, index) => (
                  <motion.div
                    key={university}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + 0.1 * index }}
                  >
                    <Link
                      to={`/university/${university}`}
                      className="block text-blue-900 text-sm hover:text-blue-300"
                    >
                      {`University of ${university}`}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
