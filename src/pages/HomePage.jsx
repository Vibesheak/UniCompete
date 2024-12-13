import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for competitions
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
  ];

  // Filter competitions based on search query
  const filteredCompetitions = competitions.filter(
    (competition) =>
      competition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competition.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id) => {
    // Navigate to the login page or competition details page
    navigate(`/login`);
  };

  return (
    <div className="home-page bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 tracking-tight mb-4">
          Explore Upcoming Competitions
        </h1>
        <p className="text-xl text-gray-600">
          Discover competitions across universities, register, and showcase your
          talents!
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for competitions or universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          className="px-6 py-3 w-2/3 sm:w-1/2 md:w-1/3 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg"
        />
      </div>

      {/* Competition Cards */}
      <div className="competitions-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {filteredCompetitions.length > 0 ? (
          filteredCompetitions.map((competition) => (
            <div
              key={competition.id}
              className="competition-card bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2"
            >
              {/* Competition Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-1 px-4 rounded-full text-sm font-semibold">
                  {competition.date}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {competition.location}
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                {competition.name}
              </h2>
              <p className="text-gray-500 mb-4">{competition.description}</p>
              <button
                onClick={() => handleViewDetails(competition.id)}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No competitions found.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
