import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "./home.jpeg";

function HomePage() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filters, setFilters] = useState({ category: "All", sort: "All" });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = () => setDropdownVisible(!dropdownVisible);

  const handleSelectCategory = (category) => {
    setFilters((prevFilters) => ({ ...prevFilters, category }));
    setDropdownVisible(false);
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: e.target.value }));
  };

  const handleViewDetails = () => navigate("/login");

  const handleUniversityClick = (university) => {
    navigate(`/university/${university}`);
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
      location: "University F",
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

    // Other competitions...
  ];

  const universities = [
    ...new Set(competitions.map((comp) => comp.location)),
  ].sort((a, b) => a.localeCompare(b));

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
      case "Location":
        return a.location.localeCompare(b.location);
      case "Rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Universities</h2>
        <ul>
          {universities.map((university) => (
            <li key={university}>
              <button
                onClick={() => handleUniversityClick(university)}
                className="block w-full text-left px-4 py-2 mb-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {university}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
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
                    <option value="Location">Location</option>
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
  );
}

export default HomePage;
