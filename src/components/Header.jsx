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
    <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 shadow-xl relative bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 opacity-40 animate-pulse"></div>

      <nav className="container mx-auto flex justify-between items-center relative z-10">
        <Link
          to="/"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-4xl font-extrabold tracking-wide text-transparent bg-clip-text transition-all duration-300 transform hover:scale-110 ${
            isHovered
              ? "bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 text-white"
              : "bg-gradient-to-r from-white via-white to-white text-transparent"
          }`}
        >
          Eventura
        </Link>
        <div className="flex space-x-10 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
