import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

   const dropdownRef = useRef(null);

   useEffect(() => {
    // Check if a valid token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
    
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken); // Debugging line
        setUserRole(decodedToken.roles); // Assuming the token has a "role" field
        alert(userRole)
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

   
     const handleProfileClick = () =>
       setProfileDropdownVisible(!profileDropdownVisible);
   
     const handleLogout = () => {
       localStorage.removeItem("token");
       setIsLoggedIn(false); // Update state after logout
       navigate("/login");
     };

     const handleHomeNavigation = () => {
      const token = localStorage.getItem("token");
      if(token){
        const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); 
      const userRole = decodedToken.roles 

      if (userRole.includes("ADMIN")) {
        navigate("/adminpage");
      } else if (userRole.includes("USER")) {
        navigate("/profile");
      } 
      }
      else{
        navigate('/profile');
      }
    };
   

  const universities = [
    "University of Colombo", "University of Peradeniya", "University of Kelaniya", "University of Moratuwa", "University of Jaffna", 
    "University of Sri Jayewardenepura", "University of Ruhuna", "Eastern University, Sri Lanka", "South Eastern University of Sri Lanka", "Wayamba University of Sri Lanka"
  ];

  return (
    <header className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white p-4 shadow-md relative">
      <nav className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <img 
            src="/videos/logo.png"  
            alt="Logo"
            className="h-12 w-16 mr-4"
          />
          <Link
            to="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
        <div className={`lg:flex space-x-6 lg:space-x-8 text-lg font-medium ${isMenuOpen ? "block absolute top-16 left-0 right-0 bg-blue-900 bg-opacity-95 p-4" : "hidden lg:flex"}`}>
        <button 
            onClick={handleHomeNavigation}
            className="block text-white hover:text-blue-300 px-3 py-2 rounded-md"
          >
            Home
          </button>
          <Link to="/login" className="block text-white hover:text-blue-300 px-3 py-2 rounded-md">Login</Link>
          <Link to="/about" className="block text-white hover:text-blue-300 px-3 py-2 rounded-md">About Us</Link>

          
          {/* University Dropdown */}
          <div className="relative" onMouseEnter={() => setIsUniversityDropdownOpen(true)} onMouseLeave={() => setIsUniversityDropdownOpen(false)}>
            <button className="block text-white hover:text-blue-300 px-3 py-2 rounded-md inline-flex items-center gap-x-1.5">
              Universities
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
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
                      {`${university}`}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4 cursor-pointer" ref={dropdownRef}>
  {/* Profile Circle */}
  <div
    className="absolute left-8  w-12 h-12 rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300"
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
        borderTop: "4px solid #8b5cf6", // Highlighted border
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H3m12 0l-4-4m4 4l-4 4m13-7v8a2 2 0 01-2 2H7m0-18h8a2 2 0 012 2v3"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  )}
</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
