import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // To manage the delay

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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUniversityDropdown = () =>
    setIsUniversityDropdownOpen(!isUniversityDropdownOpen);

  const handleDropdownMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout
    }
    setIsUniversityDropdownOpen(true); // Show the dropdown immediately
  };

  const handleDropdownMouseLeave = () => {
    const id = setTimeout(() => {
      setIsUniversityDropdownOpen(false); // Close the dropdown after delay
    }, 300); // Delay in milliseconds (adjust as needed)
    setTimeoutId(id); // Save the timeout ID
  };

  return (
    <header className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white p-4 shadow-md relative">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 opacity-30 animate-pulse"></div>

      {/* Navigation Container */}
      <nav className="container mx-auto flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link
          to="/"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-3xl md:text-4xl font-medium tracking-tight text-white transition-all duration-300 transform ${
            isHovered
              ? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-transparent bg-clip-text"
              : "text-white"
          }`}
        >
          Eventura
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Links */}
        <div
          className={`lg:flex space-x-6 lg:space-x-8 text-lg font-medium ${
            isMenuOpen
              ? "block absolute top-16 left-0 right-0 bg-blue-900 bg-opacity-95 p-4"
              : "hidden lg:flex"
          }`}
        >
          <Link
            to="/"
            className="block text-white hover:text-blue-300 transition-all duration-200 transform hover:scale-105 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block text-white hover:text-blue-300 transition-all duration-200 transform hover:scale-105 px-3 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-blue-300 transition-all duration-200 transform hover:scale-105 px-3 py-2 rounded-md"
          >
            About Us
          </Link>

          {/* University Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleDropdownMouseEnter} // Show on hover
            onMouseLeave={handleDropdownMouseLeave} // Hide after delay
          >
            <button
              className="block text-white hover:text-blue-300 transition-all duration-200 transform hover:scale-105 px-3 py-2 rounded-md inline-flex items-center gap-x-1.5"
              aria-expanded={isUniversityDropdownOpen}
              aria-controls="university-dropdown"
            >
              Universities
              <svg
                className="-mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                style={{ width: "1.25rem", height: "1.25rem" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isUniversityDropdownOpen && (
              <div
                id="university-dropdown"
                className="z-10 absolute bg-white dark:bg-gray-700 rounded-lg shadow-md w-56 dark:divide-gray-600 mt-2 transition-all duration-200 ease-in-out opacity-100 scale-100"
              >
                <div className="p-2">
                  {universities.map((university) => (
                    <Link
                      key={university}
                      to={`/university/${university}`}
                      className="block text-gray-900 dark:text-white hover:text-blue-300 px-4 py-1 text-sm rounded-md hover:bg-blue-600 hover:bg-opacity-20 transition-all duration-200"
                    >
                      {`University of ${university}`}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
