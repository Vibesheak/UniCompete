import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeVideo from "./HomeBack4.mp4";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header"; // Optional header for navigation
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
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
import { FaQuoteLeft } from "react-icons/fa";
import Logo from "./images/brain1.jpg"; 
import Author1 from "./images/A1.png"; 
import Author2 from "./images/A2.jpg"; 
import Author3 from "./images/A3.jpg"; 
import Author4 from "./images/A4.jpg"; 

const getInitials = (fullName) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

function ProfilePage() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("All");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [university, setUniversity] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  const user = {
    fullName: "Nilojitha Mariyathas",
  };

  const dropdownRef = useRef(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    // Handle dropdown visibility toggle when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch competitions from the backend
    const fetchCompetitions = async () => {
      try {
        const response = await fetch("http://localhost:8080/competitions/user1/all");
        if (response.ok) {
          const data = await response.json();
          setCompetitions(data);
  
          // Extract unique university locations and sort them alphabetically
          const universitiesList = [...new Set(data.map((comp) => comp.location))].sort((a, b) =>
            a.localeCompare(b)
          );
          setUniversity(universitiesList);
        } else {
          console.error("Failed to fetch competitions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
  
    fetchCompetitions();
  }, []);
  

  const handleDropdownToggle = () => setDropdownVisible(!dropdownVisible);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    setDropdownVisible(false);
  };



  const handleViewDetails = (id) => {
    navigate(`/competition/${id}`);
  };

  

  const handleFavoriteToggle = (competitionId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(competitionId)
        ? prevFavorites.filter((id) => id !== competitionId)
        : [...prevFavorites, competitionId]
    );
  };

  const handleShowFavorites = () => setShowFavorites(!showFavorites);


  const filteredCompetitions =
    selectedCategory === "All"
      ? competitions
      : competitions.filter((comp) => comp.name === selectedCategory);

  const sortedCompetitions = filteredCompetitions.sort((a, b) => {
    switch (sortCriterion) {
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

    const quotes = [
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        authorImage: Author1,
      },
      {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        authorImage: Author2,
      },
      {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        authorImage: Author3,
      },
      {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
        authorImage: Author4,
      },
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  

    const renderStars = (rating) => {
      // Validate the rating to ensure it's a number and within the valid range
      if (typeof rating !== "number" || rating < 0 || rating > 5) {
        console.error(`Invalid rating: ${rating}`);
        rating = 0; // Default to 0 if the rating is invalid
      }
    
      const fullStars = Math.floor(rating); // Full stars (integer part of the rating)
      const halfStar = rating % 1 !== 0; // Check if there’s a half star
      const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0)); // Remaining stars, ensure no negative values
    

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={`full-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
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
            className="w-5 h-5 text-gray-400"
          >
            <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
          </svg>
        ))}
      </div>
    );
  };

  return(  

<div className="min-h-screen flex flex-col bg-gradient-to-br">
      <div className="min-h-screen flex">
        <div className="relative w-full h-[108vh]">   
          <video
            src={homeVideo} // Ensure this path is correct
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg" // Apply rounded corners here
          />
        
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center h-[15vh] md:h-[8vh] lg:h-[6vh] px-4">
            <p className="text-white text-lg md:text-xl lg:text-3xl font-bold uppercase tracking-wide md:tracking-widest lg:tracking-[0.8em] text-center">
              The challenge is waiting for you!
            </p>
          </div>
          
    
  
          <div className="absolute right-[35%] top-[18%] -translate-y-1/2 flex flex-col justify-center items-end text-blue-600 p-4 sm:p-8">
          
            <div className="bg-gray-500 bg-opacity-10 backdrop-blur-md absolute inset-0 w-[500px] h-[600px] rounded-xl">
              <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-left pr-4 sm:pr-8">
                <h1
                  className="text-6xl font-extrabold mb-4 font-['Roboto']"
                  style={{ marginTop: "1rem", marginLeft: "2rem" }}
                >
                  <span className="text-blue-600 text-5xl">W E L C O M E </span>
                  <p><span className="text-black text-4xl ml-1">To a world of</span></p>
                  <span className="text-purple-600 text-5xl ml-1">Opportunities</span>
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
                    className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" style={{ marginLeft: "2rem" }}
                  >
                    About Us
                  </button>
                </div>
    
                  <div className="max-w-3xl mx-auto text-center mt-8 l text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-pink-500">
                      Follow Us
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-light mb-8 text-center text-black"style={{ marginLeft: "1rem" }}><b>
                      Stay connected with us on social media and never miss an
                      update!</b>
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
          <div className="relative w-full h-40 overflow-hidden">
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
                    style={{ marginRight: `${gap}px` , marginTop: "0.3cm"
                 }} // Apply dynamic margin based on name length
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
                    style={{ marginRight: `${gap}px`, marginTop: "0.3cm" }} // Apply dynamic margin based on name length
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


{/* University Competition Statistics */}
<div className="py-12 bg-white text-gray-800">
  <div className="text-center mb-8">
    <h2 className="text-4xl font-extrabold text-gray-800 font-sans">
      <span className="text-blue-600">Eventura</span> Empowers University Competitions
    </h2>
    <p className="text-gray-600 text-lg mt-2 font-sans">
      Unlock potential, inspire growth, and celebrate achievements.
    </p>
  </div>

  <div className="flex justify-center items-center space-x-8">
    <div className="text-center px-8 transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-6xl font-extrabold text-purple-600 shadow-lg rounded-2xl p-6 bg-gradient-to-br from-purple-100 to-purple-200 font-serif">
        120+
      </h2>
      <p className="mt-3 text-xl text-gray-700 font-sans">Competitions Organized</p>
    </div>
    <div className="text-center px-8 transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-6xl font-extrabold text-blue-600 shadow-lg rounded-2xl p-6 bg-gradient-to-br from-blue-100 to-blue-200 font-serif">
        48
      </h2>
      <p className="mt-3 text-xl text-gray-700 font-sans">Awards Presented</p>
    </div>
    <div className="text-center px-8 transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-6xl font-extrabold text-green-600 shadow-lg rounded-2xl p-6 bg-gradient-to-br from-green-100 to-green-200 font-serif">
        27k
      </h2>
      <p className="mt-3 text-xl text-gray-700 font-sans">Participants Engaged</p>
    </div>
    <div className="text-center px-8 transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-6xl font-extrabold text-red-600 shadow-lg rounded-2xl p-6 bg-gradient-to-br from-red-100 to-red-200 font-serif">
        15
      </h2>
      <p className="mt-3 text-xl text-gray-700 font-sans">Universities Connected</p>
    </div>
  </div>
</div>




          <div className="flex justify-center items-center min-h-150hv bg-white p-6">
  <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-xl space-x-8">
    <div className="lg:w-1/2 text-left p-6">
    
      <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
      <h2 className="text-6xl font-bold text-purple-600 mb-4">Why Us?</h2>
      <p className="text-gray-700 text-xl leading-relaxed">
        We empower students to explore their passions, develop critical thinking, and build leadership skills through dynamic competitions and transformative experiences that inspire growth, creativity, and lifelong learning.
      </p>
    </div>

    <div className="lg:w-1/2 relative bg-gradient-to-r from-purple-300 via-white to-blue-300 p-10 rounded-2xl shadow-2xl">
      <FaQuoteLeft className="text-purple-600 text-6xl absolute -top-8 left-8" />
      <p className="text-2xl italic text-gray-900 mb-8">
        "{quotes[currentQuoteIndex].text}"
      </p>
      <div className="flex items-center mt-4">
        <img
          src={quotes[currentQuoteIndex].authorImage}
          alt={quotes[currentQuoteIndex].author}
          className="w-16 h-16 rounded-full mr-4 shadow-lg"
        />
        <p className="text-1xl font-semibold text-blue-800">
          — {quotes[currentQuoteIndex].author}
        </p>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        {quotes.map((_, index) => (
          <span
            key={index}
            className={`h-4 w-4 rounded-full ${
              index === currentQuoteIndex
                ? "bg-purple-800"
                : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  </div>
</div>

                   
          {/* Main Content */}
          <div className="flex-1 p-6 md:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 relative overflow-hidden clip-path-diagonal">

          <style jsx>{`
            .clip-path-diagonal {
              clip-path: polygon(0 0, 80% 10%, 100% 0, 100% 100%, 0 100%);
            }
          `}</style>
                <br></br>
                <br></br>

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
            </form><br></br>
    
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-0">
            Challenge Yourself with <span className="text-purple-600">New</span> <span className="text-blue-600">Competitions</span>
          </h1>
          <br></br>

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
                src={`http://localhost:8080/competitions/images/${comp.id}?token=${localStorage.getItem("token")}`}
                alt={comp.name}
                className="w-full h-50 object-cover rounded-lg mb-4"
              />

                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {comp.name}
                  </h2>
                  <p className="text-gray-600 mb-2 text-sm">{comp.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{comp.date}</span>
                    <span className="text-sm text-gray-500">{comp.university}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {renderStars(comp.rating)}
                  </div>
                  <button
                     onClick={() => handleViewDetails(comp.id)} // Pass the competition ID
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>    
          </div>
        </div>

  );
}

export default ProfilePage;