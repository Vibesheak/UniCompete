import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import homeImage from "./home.jpeg"; // Replace with an actual image if needed
import universityImage from "./profile.jpg"; // Replace with an actual image if needed
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import social media icons

function UniversityPage() {
  const { university } = useParams(); // Get the university name from the URL
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Filter competitions by the selected university
    const allCompetitions = [
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
        rating: 2.5,
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
      // Add other competitions as needed...
    ];

    const universityCompetitions = allCompetitions.filter(
      (comp) => comp.location === university
    );

    setCompetitions(universityCompetitions);
  }, [university]);

  // Function to render star rating with full and half stars
  const renderRatingStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Half star if the remainder is >= 0.5
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0); // Empty stars

    return (
      <div className="flex items-center">
        {/* Full stars */}
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

        {/* Half star */}
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

        {/* Empty stars */}
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

  // Handle the "View Details" button click to navigate to login page
  const handleViewDetailsClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold text-center">
          Competitions at {university}
        </h1>
      </header>

      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Left side: University Profile */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <img
            src={universityImage}
            alt="University Profile"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {university}
          </h2>
          <p className="text-gray-600 text-center mb-2">
            Location: {university}
          </p>
          <p className="text-gray-600 text-center mb-4">
            Rating: {renderRatingStars(Math.random() * 5)}{" "}
            {/* Random rating for demo */}
          </p>
          <div className="text-left text-gray-600 mb-4">
            <p>
              <strong>Address:</strong> 123 University St, City, Country
            </p>
            <p>
              <strong>Email:</strong> contact@{university.toLowerCase()}.edu
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
            </a>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>
        </div>

        {/* Divider */}
        <div className="w-px bg-black hidden md:block"></div>

        {/* Right side: Competitions */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {competitions.length > 0 ? (
              competitions.map((comp) => (
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
                  <p className="text-gray-600 mb-2 text-sm">
                    {comp.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{comp.date}</span>
                    <span className="text-sm text-gray-500">
                      {comp.location}
                    </span>
                  </div>
                  <div className="mb-4">
                    {renderRatingStars(comp.rating)}{" "}
                    {/* Display rating stars */}
                  </div>
                  <button
                    onClick={handleViewDetailsClick} // Use the navigate function here
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-700">
                No competitions found for this university.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;
