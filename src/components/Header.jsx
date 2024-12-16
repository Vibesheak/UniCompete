import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <header className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white p-6 shadow-lg relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 opacity-40 animate-pulse"></div>

      <nav className="container mx-auto flex justify-between items-center relative z-10">
        <Link
          to="/"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-5xl font-extrabold tracking-tight text-white bg-clip-text transition-all duration-300 transform ${
            isHovered
              ? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white"
              : "text-white"
          }`}
        >
          Eventura
        </Link>

        <div className="flex space-x-8 lg:space-x-12 text-lg font-semibold">
          <Link
            to="/"
            className="text-white hover:text-white transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-white transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-white transition-all duration-300 transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-20"
          >
            About Us
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
