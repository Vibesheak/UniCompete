import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import homeVideo from "./HomeBack4.mp4";
import logo from "./logo.png";

const HeaderAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimeoutRef = useRef(null);

  const getInitials = (fullName) => {
    return fullName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
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
            style={{ clipPath: "ellipse(80% 78% at 50% 0%)", zIndex: -1 }}
          />
          <div className="absolute -top-[10%] -left-[5%] w-[110%]" style={{ zIndex: 1 }}>
            <div className="h-[450px] py-10 flex items-center justify-evenly w-full mx-auto">
              {/* Left Side: Navigation Links */}
              <div className="flex justify-evenly w-1/3">
                <Link
                  to="/"
                  className={`${
                    isActive("/") ? "text-blue-800 font-bold text-xl" : "text-gray-800"
                  } hover:text-blue-500 transition-all duration-300`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className={`${
                    isActive("/login") ? "text-blue-800 font-bold text-xl" : "text-gray-800"
                  } hover:text-blue-500 transition-all duration-300`}
                >
                  Login
                </Link>
              </div>

              {/* Center: Logo Above Heading */}
              <div className="flex flex-col items-center justify-center gap-y-1">
                <img src={logo} alt="Eventura Logo" className="absolute bottom-[230px] w-[100px] h-auto" />
                <h1 className="text-4xl font-extrabold text-center leading-tight">
                  <Link to="/" className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-transparent bg-clip-text text-6xl md:text-7xl font-extrabold tracking-tight">
                    Eventura
                  </Link>
                </h1>
              </div>

              {/* Right Side: Profile & Universities */}
              <div className="flex justify-evenly w-1/3 items-center">
                <Link
                  to="/about"
                  className={`${
                    isActive("/about") ? "text-blue-800 font-bold text-xl" : "text-gray-800"
                  } hover:text-blue-500 transition-all duration-300`}
                >
                  About Us
                </Link>
                
                <button onClick={() => setIsSidebarOpen(true)} className={`${
                    isUniversityPage ? "text-blue-800 font-bold text-xl" : "text-gray-800"
                  } hover:text-blue-500 transition-all duration-300 flex items-center`}
                >
                  Universities ▼
                </button>

                {/* User Profile Circle */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg cursor-pointer"
                  onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}
                >
                  {userInitials}
                </div>

                {/* Profile Dropdown */}
                {profileDropdownVisible && (
                  <div className="absolute top-[55%] right-40 w-48 bg-blue-500 shadow-lg rounded-lg p-4 z-10">
                    <button onClick={() => navigate("/userpage")} className="w-full text-left text-white font-semibold text-lg py-2 rounded-lg hover:bg-blue-100 transition duration-300">
                      Profile
                    </button>
                    <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar for Universities */}
          {isSidebarOpen && (
            <div className="fixed top-[90px] left-0 h-[750px] w-64 bg-transparent shadow-lg p-5 flex flex-col space-y-4 z-50 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-900 hover:text-blue-900 text-2xl">✕</button>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                {universitiesname.map((university, index) => (
                  <Link key={index} to={`/university/${university}`} className="text-purple-800 block text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-100">
                    University of {university}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;