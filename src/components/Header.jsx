import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./images/logo2.jpg";

const Header = () => {
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
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

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  return (
    <header className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white p-4 shadow-md relative">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white p-4 shadow-md relative"></div>
      <nav className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Eventura Logo"
            className="absolute bottom-[230px] w-[100px] h-auto"
          />
          <Link
            to="/"
            className="font-bold text-3xl md:text-4xl tracking-tight text-white transition-all duration-300"
          >
            EVENTURA
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isMenuOpen
              ? "block absolute top-16 left-0 right-0 bg-blue-900 bg-opacity-95 p-4"
              : "hidden lg:flex"
          } space-x-6 lg:space-x-8 text-lg font-medium`}
        >
          <Link
            to="/"
            className="block text-white hover:text-blue-300 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block text-white hover:text-blue-300 px-3 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-blue-300 px-3 py-2 rounded-md"
          >
            About Us
          </Link>

          {/* University Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsUniversityDropdownOpen(true)}
            onMouseLeave={() => setIsUniversityDropdownOpen(false)}
          >
            <button className="block text-white hover:text-blue-300 px-3 py-2 rounded-md inline-flex items-center gap-x-1.5">
              Universities
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isUniversityDropdownOpen && (
              <div className="absolute bg-white dark:bg-gray-700 rounded-lg shadow-md w-56 mt-2">
                <div className="p-2">
                  {universities.map((university) => (
                    <Link
                      key={university}
                      to={`/university/${university}`}
                      className="block text-gray-900 dark:text-white px-4 py-1 text-sm rounded-md hover:bg-blue-600 hover:bg-opacity-20"
                    >
                      {university}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div
            className="absolute top-4 right-4 cursor-pointer"
            ref={dropdownRef}
          >
            {/* Profile Circle */}
            <div
              className="absolute left-8 w-12 h-12 rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300"
              onClick={handleProfileClick}
              title="Profile"
              style={{
                boxShadow: "0px 4px 15px rgba(128, 90, 213, 0.6)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.67 0-8 1.336-8 4v2h16v-2c0-2.664-5.33-4-8-4z" />
              </svg>
            </div>

            {/* Profile Dropdown */}
            {profileDropdownVisible && (
              <div
                className="absolute top-16 right-1 w-48 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-xl p-4 z-20 border border-gray-200 animate-fade-in"
                style={{
                  borderTop: "4px solid #8b5cf6",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {/* Profile Button */}
                <button
                  onClick={() => navigate("/userpage")}
                  className="w-full text-left text-gray-900 font-semibold text-md py-2 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.67 0-8 1.336-8 4v2h16v-2c0-2.664-5.33-4-8-4z" />
                  </svg>
                  <span>Profile</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 transition duration-300 mt-4 flex items-center justify-center space-x-2"
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
