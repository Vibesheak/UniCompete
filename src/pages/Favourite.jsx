// FavoritesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({ favorites, competitions, handleToggleFavorite }) => {
  const navigate = useNavigate();

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

  const favoriteCompetitions = competitions.filter((comp) =>
    favorites.includes(comp.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Competitions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteCompetitions.length === 0 ? (
          <p>No favorites yet. Click the heart icon to add to favorites.</p>
        ) : (
          favoriteCompetitions.map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition duration-300 relative"
            >
              <img
                src={comp.image}
                alt={comp.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <button
                onClick={() => handleToggleFavorite(comp.id)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                  favorites.includes(comp.id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } hover:scale-110 transition duration-300`}
              >
                {favorites.includes(comp.id) ? "♥" : "♡"}
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {comp.name}
              </h2>
              <p className="text-gray-600 mb-2 text-sm">{comp.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{comp.date}</span>
                <span className="text-sm text-gray-500">{comp.location}</span>
              </div>
              <div className="mb-4">{renderStars(comp.rating)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
