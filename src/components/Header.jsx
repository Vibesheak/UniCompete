import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white p-4 shadow-lg relative">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 opacity-40 animate-pulse"></div>

      {/* Navigation Container */}
      <nav className="container mx-auto flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link
          to="/"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-3xl md:text-5xl font-extrabold tracking-tight text-white transition-all duration-300 transform ${
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
          className={`lg:flex space-x-8 lg:space-x-12 text-lg font-semibold ${
            isMenuOpen
              ? "block absolute top-16 left-0 right-0 bg-blue-900 bg-opacity-95 p-4"
              : "hidden lg:flex"
          }`}
        >
          <Link
            to="/"
            className="block text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            About Us
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
