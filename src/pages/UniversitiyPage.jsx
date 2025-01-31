import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import homeImage from "./images/home.jpeg";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function UniversityPage() {
  const { university } = useParams();
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    console.log("Selected University:", university); // Debug log

    const allCompetitions = [
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

    // Debug log to check all competitions
    console.log("All Competitions:", allCompetitions);

    // Filter competitions based on the selected university with case-insensitive comparison
    const universityCompetitions = allCompetitions.filter((comp) =>
      comp.location.toLowerCase().includes(university.toLowerCase())
    );

    // Debug log to check filtered competitions
    console.log("Filtered Competitions:", universityCompetitions);

    setCompetitions(universityCompetitions);
  }, [university]);

  const renderRatingStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

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

  const handleViewDetailsClick = () => {
    navigate("/login");
  };

  return (
    <div className="relative top-[40px] min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      <header className="bg-blue-600 text-white p-6 ">
        <h1 className="text-3xl font-bold text-center">
          Competitions at {university}
        </h1>
      </header>

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: "#4A5568" }}
          >
            {getInitials(university)}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {university}
          </h2>
          <p className="text-gray-600 text-center mb-2">
            Location: {university}
          </p>
          <p className="text-gray-600 text-center mb-4">
            Rating: {renderRatingStars(Math.random() * 5)}
          </p>

          <div className="text-left text-gray-600 mb-4">
            <p>
              <strong>Address:</strong> University St, Kelaniya, SriLanka
            </p>
            <p>
              <strong>Email:</strong> contact@{university.toLowerCase()}
              .edu.ac.lk
            </p>
            <p>
              <strong>Phone:</strong> +9477123456
            </p>
          </div>

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
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>

        <div className="w-px bg-black hidden md:block"></div>

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
                  <div className="mb-4">{renderRatingStars(comp.rating)}</div>
                  <button
                    onClick={handleViewDetailsClick}
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
