import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import homeVideo from "./videos/HomeBack-1.mp4";
import logo from "./images/logo3.png";

const HeaderAdmin = () => {
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimeoutRef = useRef(null); // Using useRef to store the timeout

  const getInitials = (fullName) => {
    const nameParts = fullName.split(" ");
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  };

  const user = {
    fullName: "Nilojitha Mariyathas",
  };

  const userInitials = getInitials(user.fullName);

  const handleLogout = () => {
    navigate("/login");
  };

  const universitiesname = [
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
    clearTimeout(closeTimeoutRef.current); // Prevent closing if user hovers back quickly
  };

  const closeUniversityDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsUniversityDropdownOpen(false);
    }, 1000); // Close after 1 second
  };

  const isActive = (path) => location.pathname === path;
  const isUniversityPage = location.pathname.startsWith("/university");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br">
      <div className="min-h-screen flex">
        <div className="relative w-full h-[1500px]" style={{ zIndex: 0 }}>
          <video
            src={homeVideo}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg"
            style={{
              clipPath: "ellipse(80% 78% at 50% 0%)",
              zIndex: -1,
            }}
          />
          <div
            className="absolute -top-[10%] -left-[5%] w-[110%]"
            style={{ zIndex: 1 }}
          >
            <div className="h-[450px] py-10 flex items-center justify-evenly w-full mx-auto">
              {/* Left Side: Navigation Links */}
              <div className="flex justify-evenly w-1/3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to="/"
                    className={`${
                      isActive("/")
                        ? "text-blue-800 font-bold text-xl"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to="/login"
                    className={`${
                      isActive("/login")
                        ? "text-blue-800 font-bold text-xl"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    Login
                  </Link>
                </motion.div>
              </div>

              {/* Center: Logo Above Heading */}
              <div className="flex flex-col items-center justify-center gap-y-1">
                <img
                  src={logo}
                  alt="Eventura Logo"
                  className="absolute bottom-[230px] w-[100px] h-auto"
                />
                <motion.h1
                  className="text-4xl font-extrabold text-center leading-tight"
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
              </div>

              {/* Right Side: Contact Information */}
              <div className="flex justify-evenly w-1/3 items-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to="/about"
                    className={`${
                      isActive("/about")
                        ? "text-blue-800 font-bold text-xl"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105`}
                  >
                    About Us
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-x-3"
                >
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={`${
                      isUniversityPage
                        ? "text-blue-800 font-bold text-xl"
                        : "text-gray-800"
                    } hover:text-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center`}
                  >
                    Universities ▼
                  </button>

                  {/* User Initials Circle */}
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg cursor-pointer"
                    onClick={() =>
                      setProfileDropdownVisible(!profileDropdownVisible)
                    }
                  >
                    {userInitials}
                  </div>

                  {/* Profile Dropdown */}
                  {profileDropdownVisible && (
                    <div className="absolute top-[55%] right-40 w-48 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-400 shadow-lg rounded-lg p-4 z-10">
                      <button
                        onClick={() => navigate("/userpage")}
                        className="w-full text-left text-white font-semibold text-lg py-2 rounded-lg hover:bg-blue-100 transition duration-300"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
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
                className="fixed top-[90px] left-0 h-[750px] w-64 bg-transparent shadow-lg p-5 flex flex-col space-y-4 z-50 backdrop-blur-md"
              >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-900 hover:text-blue-900 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* University List */}
                <div className="mt-4 flex flex-col space-y-2">
                  {universitiesname.map((university, index) => (
                    <motion.div
                      key={university}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={`/university/${university}`}
                        className={`text-purple-800 block text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 ${
                          isActive(`/university/${university}`)
                            ? "bg-blue-800 text-white"
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
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
