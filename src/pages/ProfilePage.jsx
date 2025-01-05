import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaListAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import homeImage from "./home.jpeg";

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
  const [favorites, setFavorites] = useState([]);
  const [University, setUniversity] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const user = {
    fullName: "Nilojitha Mariyathas",
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Dynamically fetch the list of universities based on competition locations
    const universitiesList = [
      ...new Set(competitions.map((comp) => comp.location)),
    ].sort((a, b) => a.localeCompare(b));
    setUniversity(universitiesList);
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

  const handleViewDetails = (id) => navigate(`/competition/${id}`);

  const handleProfileClick = () =>
    setProfileDropdownVisible(!profileDropdownVisible);

  const handleLogout = () => navigate("/login");

  const handleFavoriteToggle = (competitionId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(competitionId)
        ? prevFavorites.filter((id) => id !== competitionId)
        : [...prevFavorites, competitionId]
    );
  };

  const handleShowFavorites = () => setShowFavorites(!showFavorites);

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
      location: "Wayamba University of Sri Lanka",
      description: "Solve real-world tech problems.",
      rating: 2.5,
      image: homeImage,
    },
    {
      id: 6,
      name: "Tech Marathon",
      date: "2025-05-10",
      location: "University of Moratuwa",
      description: "Solve real-world tech problems.",
      rating: 1.5,
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
        return new Date(a.date) - new Date(b.date);
      case "Rating":
        return b.rating - a.rating;
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      <main className="flex-1 p-6 md:p-6">
        <form class="max-w-md mx-auto mt-4">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Universities, Competitons..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-0">
            Explore Competitions
          </h1>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShowFavorites}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mb-2 sm:mb-0 mt-3"
            >
              {showFavorites ? "Show All" : "Show Favorites"}
            </button>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={handleDropdownToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mt-3"
              >
                Filter Competitions
              </button>
            </div>

            {dropdownVisible && (
              <div className="absolute top-12 right-0 w-56 bg-white shadow-lg rounded-lg p-4 z-10">
                <div className="space-y-4">
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
                      <option value="Rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(showFavorites
            ? competitions.filter((comp) => favorites.includes(comp.id))
            : sortedCompetitions
          ).length === 0 ? (
            <p className="text-center text-gray-600">
              No competitions available.
            </p>
          ) : (
            (showFavorites
              ? competitions.filter((comp) => favorites.includes(comp.id))
              : sortedCompetitions
            ).map((competition) => (
              <div
                key={competition.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={competition.image}
                  alt={competition.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {competition.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {competition.date}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {competition.location}
                  </p>
                  <p className="text-sm text-gray-800 mb-4">
                    {competition.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {renderStars(competition.rating)}
                    <button
                      onClick={() => handleFavoriteToggle(competition.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      {favorites.includes(competition.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => handleViewDetails(competition.id)}
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="relative">
          <div className="relative">
            {/* Profile Circle with Initials */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white bg-indigo-600">
              {getInitials(user.fullName)}
            </div>
          </div>

          {/* Profile Dropdown */}
          {profileDropdownVisible && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
              <button
                onClick={() => navigate("/userpage")}
                className="w-full text-left text-blue-900 font-semibold text-lg py-2 rounded-lg hover:bg-blue-100 transition duration-300"
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
