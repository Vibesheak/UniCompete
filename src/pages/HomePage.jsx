import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name");

  const competitions = [
    {
      id: 1,
      name: "Tech Innovation Contest",
      date: "2024-12-20",
      location: "University A",
      description:
        "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
    },
    {
      id: 2,
      name: "Art and Design Exhibition",
      date: "2024-12-25",
      location: "University B",
      description:
        "A creative exhibition showcasing the best in arts, design, and creativity from students around the country.",
    },
    {
      id: 3,
      name: "Science Quiz Challenge",
      date: "2025-01-10",
      location: "University C",
      description:
        "A quiz competition to test your knowledge in various scientific fields. Are you ready for the challenge?",
    },
    {
      id: 4,
      name: "Innovation Showcase",
      date: "2025-02-15",
      location: "University D",
      description:
        "Showcase your innovative ideas and compete with the best minds.",
    },
    {
      id: 5,
      name: "Tech Marathon",
      date: "2025-03-10",
      location: "University E",
      description:
        "A marathon event for tech enthusiasts to solve real-world problems.",
    },
  ];

  const sortedCompetitions = [...competitions].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "location") {
      return a.location.localeCompare(b.location);
    } else if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const handleViewDetailsClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white p-6 shadow-md hidden sm:block">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Competitions
          </h2>
          <ul className="space-y-4">
            <li className="hover:text-blue-600 cursor-pointer">
              Popular Competitions
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Recent Competitions
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Categories</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Explore Competitions
            </h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
              <option value="date">Sort by Date</option>
            </select>
          </header>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCompetitions.map((competition) => (
              <div
                key={competition.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
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
                <button
                  onClick={handleViewDetailsClick}
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