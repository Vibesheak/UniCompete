import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "./profile.jpg"; // Ensure your profile image is here

function ProfilePage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    profilePic: profile, // Updated to use profilePic instead of profile
    email: "john.doe@example.com",
    location: "New York, USA",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleViewDetailsClick = (id) => {
    navigate(`/competition/${id}`);
  };

  const handleLogin = () => {
    // Simulate login (this would normally be handled by an API)
    setIsLoggedIn(true);
    setUser({
      name: "Nilojitha Mariyathas",
      profilePic: profile, // Ensure this is set to a profile picture
      email: "n123.doe@example.com",
      location: "New York, USA",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    navigate("/login"); // Navigate to the login page
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("");
    return initials.toUpperCase();
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
          </header>

          {/* Sort Competitions */}
          <div className="flex justify-between items-center mb-8">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>

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
                  onClick={() => handleViewDetailsClick(competition.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Profile Circle in Top-Right Corner */}
      <div
        className="absolute top-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold">
            {getInitials(user.name)}
          </span>
        )}
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">{user.location}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white w-full mt-2 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
