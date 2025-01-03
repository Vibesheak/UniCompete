import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaListAlt,
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Importing necessary icons
import profile from "./profile.jpg";
import homeImage from "./home.jpeg"; // Ensure your profile image is here

// Function to get initials from the user's name
const getInitials = (fullName) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

function AdminPage() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("All");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [favorites, setFavorites] = useState([]); // Initialize favorites state
  const [showFavorites, setShowFavorites] = useState(false);
  const [competitions, setCompetitions] = useState([
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
      date: "2024-12-05",
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

    // Add more competitions
  ]);
  const [showAddCompetitionModal, setShowAddCompetitionModal] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [newCompetition, setNewCompetition] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    rating: 0,
    image: "",
  });

  const user = {
    fullName: "Nilojitha Mariyathas",
    address: "123 Main St, Kelaniya, SriLanka",
    email: "n123@example.com",
    contactNumber: "+1234567890",
    userType: "Admin",
    university: "University A",
    profile: profile,
  };

  const dropdownRef = useRef(null);
  const handleUniversityClick = (university) =>
    navigate(`/university/${university}`);

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

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    setDropdownVisible(false);
  };

  const handleViewDetails = (id) => {
    navigate(`/admincompetition/${id}`);
  };

  const handleProfileClick = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleFavoriteToggle = (competitionId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(competitionId)) {
        return prevFavorites.filter((id) => id !== competitionId);
      } else {
        return [...prevFavorites, competitionId];
      }
    });
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleAddCompetition = () => {
    if (editingCompetition) {
      // If editing, update the competition
      setCompetitions(
        competitions.map((comp) =>
          comp.id === editingCompetition.id
            ? { ...newCompetition, id: comp.id }
            : comp
        )
      );
    } else {
      // Add new competition
      setCompetitions([...competitions, { ...newCompetition, id: Date.now() }]);
    }
    setShowAddCompetitionModal(false);
    setNewCompetition({
      name: "",
      date: "",
      location: "",
      description: "",
      rating: 0,
      image: "",
    });
    setEditingCompetition(null);
  };

  const handleEditCompetition = (id) => {
    const competitionToEdit = competitions.find((comp) => comp.id === id);
    setEditingCompetition(competitionToEdit);
    setNewCompetition({ ...competitionToEdit });
    setShowAddCompetitionModal(true);
  };

  const handleDeleteCompetition = (id) => {
    setCompetitions(competitions.filter((comp) => comp.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      // You can store the file in state or handle it accordingly
      setNewCompetition((prevState) => ({
        ...prevState,
        picture: file,
      }));
    }
  };

  const filterCompetitions = () => {
    let filteredCompetitions = competitions;

    // Filter by category
    if (selectedCategory !== "All") {
      filteredCompetitions = filteredCompetitions.filter(
        (comp) => comp.name === selectedCategory
      );
    }

    // Sort by criterion
    if (sortCriterion !== "All") {
      filteredCompetitions = filteredCompetitions.sort((a, b) => {
        if (sortCriterion === "Name") {
          return a.name.localeCompare(b.name);
        } else if (sortCriterion === "Date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortCriterion === "Location") {
          return a.location.localeCompare(b.location);
        } else if (sortCriterion === "Rating") {
          return b.rating - a.rating;
        }
        return 0;
      });
    }

    // Show only favorites if showFavorites is true
    if (showFavorites) {
      filteredCompetitions = filteredCompetitions.filter((comp) =>
        favorites.includes(comp.id)
      );
    }

    return filteredCompetitions;
  };
  const universities = [
    ...new Set(competitions.map((comp) => comp.location)),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 shadow-md p-4">
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
      <div className="flex-1 p-6 md:p-6">
        <form className="max-w-md mx-auto mt-10px">
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

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center flex-grow">
            Explore Competitions
          </h1>

          <button
            onClick={() => setShowAddCompetitionModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-4 mt-5"
          >
            Add Competition
          </button>

          {/* Button to show only favorites */}
          <button
            onClick={handleShowFavorites}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-4 mt-5"
          >
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>

          {/* Sort/Filter Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mt-5"
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
                      {[
                        "All",
                        ...Array.from(
                          new Set(competitions.map((comp) => comp.name))
                        ),
                      ].map((competitionName) => (
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

        {/* Competitions List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filterCompetitions().map((competition) => (
            <div
              key={competition.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <img
                src={competition.image}
                alt={competition.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{competition.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Date:</strong> {competition.date}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Location:</strong> {competition.location}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleViewDetails(competition.id)}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFavoriteToggle(competition.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    {favorites.includes(competition.id) ? (
                      <FaHeart className="w-6 h-6" />
                    ) : (
                      <FaRegHeart className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditCompetition(competition.id)}
                    className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCompetition(competition.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="mt-2">{renderStars(competition.rating)}</div>
            </div>
          ))}
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
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                getInitials(user.fullName)
              )}
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
        {/* Add/Edit Competition Modal */}
        {showAddCompetitionModal && (
          <div className="fixed inset-0 flex justify-center items-center z-20 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-96">
              <h2 className="text-2xl font-semibold mb-4">
                {editingCompetition ? "Edit" : "Add"} Competition
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCompetition.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={newCompetition.date}
                    onChange={handleInputChange}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newCompetition.location}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newCompetition.description}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    name="registrationLink"
                    value={newCompetition.registrationLink}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                    placeholder="Enter registration URL"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Upload Picture (JPG or PNG)
                  </label>
                  <input
                    type="file"
                    name="picture"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowAddCompetitionModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompetition}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {editingCompetition ? "Save Changes" : "Add Competition"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
