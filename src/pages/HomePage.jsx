import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import homeImage from "./images/home.jpeg";
import homeVideo from "./videos/HomeBack-1.mp4";
import logo from "./images/logo3.png";
import KelaniyaUniversity from "./images/Kelaniya.png";
import MoratuwaUniversity from "./images/Moratuwa.png";
import PeradeniyaUniversity from "./images/peradeniya.png";
import JayepuraUniversity from "./images/jayepura.png";
import JaffnaUniversity from "./images/jaffna.png";
import VavuniyaUniversity from "./images/vavuniya.png";
import SouthUniversity from "./images/south.png";
import ColomboUniversity from "./images/colombo.png";
import RuhunaUniversity from "./images/ruhuna.png";
import EasternUniversity from "./images/eastern.png";
import image3 from "./images/ico1.png";
import image5 from "./images/aboutus.png";
import image4 from "./images/login.png";

// import other images similarly

function HomePage() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filters, setFilters] = useState({ category: "All", sort: "All" });
  const [universities, setUniversities] = useState([]);
  const dropdownRef = useRef(null);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added this state for the sidebar
  const location = useLocation();
  let closeTimeout;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Dynamically fetch the list of universities based on competition locations
    const universitiesList = [
      ...new Set(competitions.map((comp) => comp.location)),
    ].sort((a, b) => a.localeCompare(b));
    setUniversities(universitiesList);
  }, []);

  const handleDropdownToggle = () => setDropdownVisible(!dropdownVisible);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsVisible(true);
  }, []);

  const handleSelectCategory = (category) => {
    setFilters((prevFilters) => ({ ...prevFilters, category }));
    setDropdownVisible(false);
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: e.target.value }));
  };

  const handleViewDetails = () => navigate("/login");

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
    clearTimeout(closeTimeout); // Prevent closing if user hovers back quickly
  };

  const closeUniversityDropdown = () => {
    closeTimeout = setTimeout(() => {
      setIsUniversityDropdownOpen(false);
    }, 1000); // Close after 1 second
  };

  const isActive = (path) => location.pathname === path;
  const isUniversityPage = location.pathname.startsWith("/university");

  const competitions = [
    {
      id: 1,
      name: "Tech Innovation Contest",
      date: "2024-12-20",
      location: "University of Peradeniya",
      description: "Showcase innovative AI solutions.",
      rating: 5.0,
      image: homeImage,
    },
    {
      id: 2,
      name: "Art and Design Exhibition",
      date: "2024-12-25",
      location: "University of Kelaniya",
      description: "A creative arts exhibition.",
      rating: 3.0,
      image: homeImage,
    },
    {
      id: 3,
      name: "Science Quiz Challenge",
      date: "2025-01-10",
      location: "University of Ruhuna",
      description: "Test scientific knowledge.",
      rating: 2.0,
      image: homeImage,
    },
    {
      id: 4,
      name: "Innovation Showcase",
      date: "2025-02-15",
      location: "University of Kelaniya",
      description: "Display your ideas and innovations.",
      rating: 4.5,
      image: homeImage,
    },
    {
      id: 5,
      name: "Tech Marathon",
      date: "2025-03-10",
      location: "University of Kelaniya",
      description: "Solve real-world tech problems.",
      rating: 2.5,
      image: homeImage,
    },
    {
      id: 6,
      name: "Tech Marathon",
      date: "2025-05-10",
      location: "University Jaffna",
      description: "Solve real-world tech problems.",
      rating: 4.5,
      image: homeImage,
    },
    {
      id: 7,
      name: "Tech Innovation Contest",
      date: "2024-12-18",
      location: "University Colombo",
      description: "Showcase innovative AI solutions.",
      rating: 4.5,
      image: homeImage,
    },

    // Other competitions...
  ];

  const uniqueCompetitionNames = [
    "All",
    ...new Set(competitions.map((comp) => comp.name)),
  ];

  const filteredCompetitions =
    filters.category === "All"
      ? competitions
      : competitions.filter((comp) => comp.name === filters.category);

  const sortedCompetitions = filteredCompetitions.sort((a, b) => {
    switch (filters.sort) {
      case "Name":
        return a.name.localeCompare(b.name);
      case "Date":
        return new Date(a.date) - new Date(b.date);
      case "Rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const universityImages = [
    { name: "Kelaniya University", image: KelaniyaUniversity },
    { name: "Moratuwa University", image: MoratuwaUniversity },
    { name: "Peradeniya University", image: PeradeniyaUniversity },
    { name: "Jayepura University", image: JayepuraUniversity },
    { name: "Jaffna University", image: JaffnaUniversity },
    { name: "Vavuniya University", image: VavuniyaUniversity },
    { name: "South University", image: SouthUniversity },
    { name: "Colombo University", image: ColomboUniversity },
    { name: "Ruhuna University", image: RuhunaUniversity },
    { name: "Eastern University", image: EasternUniversity },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z"
              fill="url(#half-star)"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br ">
        <div className="min-h-screen flex">
          <div
            className="relative w-full h-[1500px] "
            style={{
              zIndex: 0, // Video stays at the back
            }}
          >
            <video
              src={homeVideo} // Ensure this path is correct
              autoPlay
              loop
              muted
              className="w-full h-full object-cover rounded-lg"
              style={{
                clipPath: "ellipse(80% 78% at 50% 0%)", // Apply the same clip-path for the video
                zIndex: -1,
              }}
            />

            <div
              className="absolute -top-[10%] left-[10%] "
              style={{
                zIndex: 1, // Set text in front of the video
              }}
            >
              <div className="h-[450px] py-10 flex items-center justify-between w-[400%] mx-auto">
                {/* Left Side: Navigation Links */}
                <div className="flex w-1/3 justify-between">
                  {/* Home and Login Links */}
                  <div className="flex space-x-4 w-full">
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
                </div>

                {/* Center: Logo and Heading */}
                <div className="flex items-center justify-center w-1/3">
                  {/* Center Content: Title */}
                  <motion.h1
                    className="text-4xl font-extrabold text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-transparent bg-clip-text text-4xl md:text-4xl font-extrabold tracking-tight transition-all duration-300 transform"
                    >
                      Eventura
                    </Link>
                  </motion.h1>
                </div>

                {/* Right Side: Contact Information */}
                <div className="flex w-1/3 justify-between">
                  {/* About Us and Email */}
                  <div className="flex space-x-4 w-full">
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
                      {universitiesname.map((university, index) => (
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
            </div>
            <div className="absolute right-[40%] top-[25%]  -translate-y-3/4 flex flex-col justify-center items-end text-blue-600 p-4 sm:p-8">
              <div className="bg-gray-500 bg-opacity-10 backdrop-blur-md absolute inset-0 max-w-[450px] max-h-[650px] w-full h-full sm:w-[650px] sm:h-[850px] rounded-xl">
                {/* Content goes here */}

                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-left pr-4 sm:pr-8">
                  <h1
                    className="text-6xl font-extrabold mb-4 font-['Roboto']"
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                  >
                    <span className="text-blue-600 text-6xl">
                      W E L C O M E{" "}
                    </span>
                    <span className="text-black text-4xl sm:text-5xl md:text-6xl ml-2">
                      to a world
                    </span>
                    <span className="text-black text-4xl sm:text-5xl md:text-6xl ml-2">
                      of
                    </span>
                    <br />
                    <span className="text-purple-600 text-2xl sm:text-3xl md:text-4xl ml-2">
                      Opportunities!
                    </span>
                  </h1>
                  <p
                    className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-black font-['Roboto'] "
                    style={{ marginLeft: "2rem" }}
                  >
                    <i>
                      Eventura makes university events fun and easy to manage!
                      Discover, organize, and join exciting competitions and
                      activities from your university and beyond.
                    </i>
                  </p>
                  <br></br>
                  <div className="left-[calc(65%+80px)]">
                    <button
                      onClick={() => navigate("/about")}
                      className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      style={{ marginLeft: "2rem" }}
                    >
                      About Us
                    </button>
                  </div>

                  <div className="max-w-3xl mx-auto text-center mt-8 l text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-pink-500">
                      Follow Us
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-light mb-8 text-center text-black">
                      <b>
                        Stay connected with us on social media and never miss an
                        update!
                      </b>
                    </p>
                    <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8">
                      <a
                        href="https://facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl hover:text-blue-600 transition-colors"
                        title="Facebook"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href="https://twitter.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl text-blue-400 hover:text-blue-600 transition-colors"
                        title="Twitter"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="https://linkedin.com/in/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl text-blue-800 hover:text-blue-600 transition-colors"
                        title="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="https://youtube.com/c/yourchannel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl text-red-600 hover:text-blue-600 transition-colors"
                        title="YouTube"
                      >
                        <FaYoutube />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section with Blue Background */}
        <section className="w-full py-16 -mt-80 ">
          <div className="max-w-screen-xl mx-auto relative h-16">
            {/* Home Section */}
            <div className="absolute -top-[140px] -left-32 w-36 h-36 bg-blue-900 rounded-full overflow-hidden shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-blue-500 hover:scale-110">
              <Link to="/">
                <img
                  src={image3}
                  alt="Image 3"
                  className="w-28 h-28 object-cover object-center cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <span className="absolute top-[5px] mt-2 -left-[4%] transform -translate-x-1/2 text-3xl font-bold text-blue-800 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:text-white px-2 py-1 rounded">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </span>

            {/* Login Section */}
            <div className="absolute -top-[40px] left-[45%] w-36 h-36 bg-blue-900 rounded-full overflow-hidden shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-blue-500 hover:scale-110">
              <Link to="/login">
                <img
                  src={image4}
                  alt="Image 4"
                  className="w-28 h-28 object-cover object-center cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <span className="absolute top-[100px] mt-2 left-[51%] transform -translate-x-1/2 text-3xl font-bold text-blue-800 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:text-white px-2 py-1 rounded">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </span>

            {/* About Us Section */}
            <div className="absolute -top-[130px] -right-32 w-36 h-36 bg-blue-900 rounded-full overflow-hidden shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-blue-500 hover:scale-110">
              <Link to="/about">
                <img
                  src={image5}
                  alt="Image 5"
                  className="w-28 h-28 object-cover object-center cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <span className="absolute top-[10px] mt-2 -right-[17%] transform -translate-x-1/2 text-3xl font-bold text-blue-800 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:text-white px-2 py-1 rounded">
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </span>
          </div>
        </section>

        <div className="relative w-full top-[50px] h-40 overflow-hidden">
          {/* Container for the images and names */}
          <div className="flex animate-move">
            {/* Loop through the university images array */}
            {universityImages.map((item, index) => {
              // Calculate gap based on the length of the name
              const nameLength = item.name.length;
              const gap = Math.min(nameLength * 2, 40); // Limit the gap to a max of 40px for larger names

              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ marginRight: `${gap}px` }} // Apply dynamic margin based on name length
                >
                  {/* Image with animation */}
                  <img
                    src={item.image} // Use the image from the universityImages array
                    alt={item.name} // Use the university name for alt text
                    className="w-24 h-24" // Set the width and height of each image
                  />
                  {/* University name displayed below the image */}
                  <p className="text-center mt-2">{item.name}</p>
                </div>
              );
            })}

            {/* Clone the images to create the infinite loop effect */}
            {universityImages.map((item, index) => {
              const nameLength = item.name.length;
              const gap = Math.min(nameLength * 2, 40); // Limit the gap to a max of 40px for larger names

              return (
                <div
                  key={`full-${index}`}
                  className="flex flex-col items-center"
                  style={{ marginRight: `${gap}px` }} // Apply dynamic margin based on name length
                >
                  {/* Image with animation */}
                  <img
                    src={item.image} // Use the image from the universityImages array
                    alt={item.name} // Use the university name for alt text
                    className="w-24 h-24" // Set the width and height of each image
                  />
                  {/* University name displayed below the image */}
                  <p className="text-center mt-2">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add the animation directly in the component */}
        <style>
          {`
    @keyframes move {
      0% {
        transform: translateX(0); /* Start at the original position */
      }
      100% {
        transform: translateX(-100%); /* Move to the left side */
      }
    }

    .animate-move {
      display: flex;
      animation: move 12s linear infinite;
    }

    .animate-move > div {
      flex-shrink: 0; /* Prevent images from shrinking */
    }
  `}
        </style>

        <br></br>
        {/* Main Content */}
        <div
          className="flex-1 p-6 md:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 -mt-32"
          style={{
            position: "relative", // Ensure the footer has positioning
            top: "120px", // Move it 120px down
          }}
        >
          {/* Content here */}

          <form className="max-w-md mx-auto mt-4">
            {" "}
            {/* Increased bottom margin */}
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Universities, Competitons..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-0">
              Explore Competitions
            </h1>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={handleDropdownToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Filter Competitions
              </button>
              {dropdownVisible && (
                <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleSelectCategory(e.target.value)}
                      className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {uniqueCompetitionNames.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Sort By</label>
                    <select
                      value={filters.sort}
                      onChange={handleSortChange}
                      className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All</option>
                      <option value="Name">Name</option>
                      <option value="Date">Date</option>

                      <option value="Rating">Rating</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCompetitions.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition"
              >
                <img
                  src={comp.image}
                  alt={comp.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {comp.name}
                </h2>
                <p className="text-gray-600 mb-2 text-sm">{comp.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{comp.date}</span>
                  <span className="text-sm text-gray-500">{comp.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  {renderStars(comp.rating)}
                </div>
                <button
                  onClick={handleViewDetails}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
