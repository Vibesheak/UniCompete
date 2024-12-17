import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import profile from "./profile.jpg";
import homeImage from "./home.jpeg"; // Ensure your profile image is here

// Function to get initials from the user's name
const getInitials = (fullName) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

function ProfilePage() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("All");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const user = {
    fullName: "Nilojitha Mariyathas",
    address: "123 Main St, Kelaniya, SriLanka",
    email: "n123@example.com",
    contactNumber: "+1234567890",
    userType: "User", // Can be "User" or "Admin"
    university: "University A",
    profile: profile, // Placeholder image, can be changed to a URL if available
  };
  // Ref for the dropdown container to detect clicks outside
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false); // Close dropdown after selecting category
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    setDropdownVisible(false); // Close dropdown after selecting sort option
  };

  const handleViewDetails = (id) => {
    navigate(`/competition/${id}`);
  };
  const handleProfileClick = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear session, redirect to login)
    navigate("/login");
  };

  const competitions = [
    {
      id: 1,
      name: "Tech Innovation Contest",
      date: "2024-12-20",
      location: "University A",
      description: "Showcase innovative AI solutions.",
      rating: 5.0,
      image: homeImage,
    },
    {
      id: 2,
      name: "Art and Design Exhibition",
      date: "2024-12-25",
      location: "University B",
      description: "A creative arts exhibition.",
      rating: 3.0,
      image: homeImage,
    },
    {
      id: 3,
      name: "Science Quiz Challenge",
      date: "2025-01-10",
      location: "University C",
      description: "Test scientific knowledge.",
      rating: 2.0,
      image: homeImage,
    },
    {
      id: 4,
      name: "Innovation Showcase",
      date: "2025-02-15",
      location: "University D",
      description: "Display your ideas and innovations.",
      rating: 4.5,
      image: homeImage,
    },
    {
      id: 5,
      name: "Tech Marathon",
      date: "2025-03-10",
      location: "University E",
      description: "Solve real-world tech problems.",
      rating: 2.5,
      image: homeImage,
    },
    {
      id: 6,
      name: "Tech Marathon",
      date: "2025-05-10",
      location: "University C",
      description: "Solve real-world tech problems.",
      rating: 1.5,
      image: homeImage,
    },
    {
      id: 7,
      name: "Tech Innovation Contest",
      date: "2024-12-18",
      location: "University E",
      description: "Showcase innovative AI solutions.",
      rating: 4.5,
      image: homeImage,
    },
  ];

  const uniqueCompetitionNames = [
    "All",
    ...Array.from(new Set(competitions.map((comp) => comp.name))),
  ];

  const filteredCompetitions =
    selectedCategory === "All"
      ? competitions
      : competitions.filter((comp) => comp.name === selectedCategory);

  const sortedCompetitions = filteredCompetitions.sort((a, b) => {
    switch (sortCriterion) {
      case "Name":
        return a.name.localeCompare(b.name);
      case "Date":
        return new Date(a.date) - new Date(b.date); // Sort by Date (recent first)
      case "Location":
        return a.location.localeCompare(b.location);
      case "Rating":
        return b.rating - a.rating; // Sort by Rating (descending)
      default:
        return 0;
    }
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={`full-${index}`}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      <div className="flex">
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center flex-grow">
              Explore Competitions
            </h1>

            {/* Sort/Filter Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={handleDropdownToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Filter Competitions
              </button>
              {dropdownVisible && (
                <div className="absolute top-12 right-0 w-56 bg-white shadow-lg rounded-lg p-4 z-10">
                  <div className="space-y-4">
                    {/* Category Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Select Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => handleSelectCategory(e.target.value)}
                        className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {uniqueCompetitionNames.map((competitionName) => (
                          <option key={competitionName} value={competitionName}>
                            {competitionName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort By Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortCriterion}
                        onChange={handleSortChange}
                        className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="All">All</option>
                        <option value="Name">Name</option>
                        <option value="Date">Date</option>
                        <option value="Location">Location</option>
                        <option value="Rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedCompetitions.length === 0 ? (
              <p className="text-center text-gray-600">
                No competitions found.
              </p>
            ) : (
              sortedCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className="bg-white p-6 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.3),0_6px_6px_rgba(0,0,0,0.2)]"
                >
                  <img
                    src={competition.image} // This is the imported image
                    alt={competition.name}
                    className="w-full h-32 object-cover rounded-lg mb-4 shadow-lg transition-transform transform hover:scale-105"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {competition.name}
                  </h2>
                  <p className="text-gray-600 mb-2 text-sm">
                    {competition.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {competition.date}
                    </span>
                    <span className="text-sm text-gray-500">
                      {competition.location}
                    </span>
                  </div>
                  <div className="mb-4">{renderStars(competition.rating)}</div>

                  <button
                    onClick={() => handleViewDetails(competition.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="relative">
          {/* Profile Circle with Initials or Image */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white ${
              user.profile
                ? "bg-blue-500" // If profile picture exists, show a blue background
                : "bg-indigo-600" // Default background if no picture
            }`}
          >
            {user.profile ? (
              <img
                src={user.profile}
                alt={`Profile of ${user.fullName}`}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => (e.target.src = "path/to/default/profile.jpg")}
              />
            ) : (
              <span>{getInitials(user.fullName)}</span> // Show initials if no picture
            )}
          </div>

          {profileDropdownVisible && (
            <div className="absolute top-14 right-0 bg-blue-50 shadow-xl rounded-lg p-6 w-72 z-10 transition-all transform scale-100 opacity-100">
              <h3 className="font-semibold text-xl text-blue-900">
                {user.fullName}
              </h3>
              <p className="text-sm text-blue-700 mt-2">Email: {user.email}</p>
              <p className="text-sm text-blue-700 mt-1">
                Contact: {user.contactNumber}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Address: {user.address}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                University: {user.university}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Role: {user.userType}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
