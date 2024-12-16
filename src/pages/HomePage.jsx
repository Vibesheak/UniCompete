import React, { useState } from "react";
import { FaTrophy, FaRegClock, FaCogs, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("popular");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("All");

  const handleCategoryClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const handleViewDetails = () => {
    navigate("/login"); // Navigate to the login page
  };

  const competitions = [
    {
      id: 1,
      name: "Tech Innovation Contest",
      date: "2024-12-20",
      location: "University A",
      description:
        "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Art and Design Exhibition",
      date: "2024-12-25",
      location: "University B",
      description:
        "A creative exhibition showcasing the best in arts, design, and creativity from students around the country.",
      rating: 3.0,
    },
    {
      id: 3,
      name: "Science Quiz Challenge",
      date: "2025-01-10",
      location: "University C",
      description:
        "A quiz competition to test your knowledge in various scientific fields. Are you ready for the challenge?",
      rating: 5.0,
    },
    {
      id: 4,
      name: "Innovation Showcase",
      date: "2025-02-15",
      location: "University D",
      description:
        "Showcase your innovative ideas and compete with the best minds.",
      rating: 4.0,
    },
    {
      id: 5,
      name: "Tech Marathon",
      date: "2025-03-10",
      location: "University E",
      description:
        "A marathon event for tech enthusiasts to solve real-world problems.",
      rating: 4.2,
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
      case "Location":
        return a.location.localeCompare(b.location);
      case "Rating":
        return b.rating - a.rating; // Sort by rating descending
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
        <aside className="w-64 bg-blue-50 p-6 shadow-lg rounded-lg sm:block transition-all duration-300 hover:shadow-xl">
          <ul className="space-y-4 text-gray-800">
            <li
              onClick={() => handleTabClick("popular")}
              className={`${
                activeTab === "popular"
                  ? "bg-blue-300 text-blue-900 rounded-lg px-4 py-2"
                  : "hover:bg-blue-200 hover:bg-opacity-60 rounded-lg px-4 py-2"
              } cursor-pointer transition-all duration-300`}
            >
              <FaTrophy className="inline-block mr-2" />
              Popular Competitions
            </li>
            <li
              onClick={() => handleTabClick("recent")}
              className={`${
                activeTab === "recent"
                  ? "bg-blue-300 text-blue-900 rounded-lg px-4 py-2"
                  : "hover:bg-blue-200 hover:bg-opacity-60 rounded-lg px-4 py-2"
              } cursor-pointer transition-all duration-300`}
            >
              <FaRegClock className="inline-block mr-2" />
              Recent Competitions
            </li>
            <li
              onClick={handleCategoryClick}
              className={`${
                dropdownVisible
                  ? "bg-blue-300 text-blue-900 rounded-lg px-4 py-2"
                  : "hover:bg-blue-200 hover:bg-opacity-60 rounded-lg px-4 py-2"
              } relative cursor-pointer transition-all duration-300`}
            >
              <FaListAlt className="inline-block mr-2" />
              Categories
              {dropdownVisible && (
                <div className="absolute top-12 left-0 w-full bg-blue-100 text-gray-800 shadow-lg rounded-lg p-4 z-10">
                  <ul className="space-y-2">
                    {uniqueCompetitionNames.map((competitionName) => (
                      <li
                        key={competitionName}
                        onClick={() => handleSelectCategory(competitionName)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                      >
                        {competitionName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li
              onClick={() => handleTabClick("settings")}
              className={`${
                activeTab === "settings"
                  ? "bg-blue-300 text-blue-900 rounded-lg px-4 py-2"
                  : "hover:bg-blue-200 hover:bg-opacity-60 rounded-lg px-4 py-2"
              } cursor-pointer transition-all duration-300`}
            >
              <FaCogs className="inline-block mr-2" />
              Settings
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Explore Competitions
            </h1>
            <div className="flex items-center space-x-4">
              <select
                value={sortCriterion}
                onChange={handleSortChange}
                className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">Sort By: All</option>
                <option value="Name">Sort By: Name</option>
                <option value="Date">Sort By: Date</option>
                <option value="Location">Sort By: Location</option>
                <option value="Rating">Sort By: Rating</option>
              </select>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCompetitions.map((competition) => (
              <div
                key={competition.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                    {competition.date}
                  </span>
                  <span className="text-sm text-gray-600">
                    {competition.location}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {competition.name}
                </h2>
                <p className="text-gray-600 mb-4">{competition.description}</p>
                <div className="mb-4">{renderStars(competition.rating)}</div>
                <button
                  onClick={handleViewDetails}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
