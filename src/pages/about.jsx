import React, { useState } from "react";
import Header from "../components/Header.jsx";

function About() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [review, setReview] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleStarClick = (star) => setRating(star);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!name || !email || !contact || !review || rating === 0) {
      alert("Please fill in all fields and provide a rating.");
      return;
    }

    // Show success message
    setShowSuccessMessage(true);

    // Clear form fields
    setName("");
    setEmail("");
    setContact("");
    setReview("");
    setRating(0);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-4">
        <div className="-top-[20%]  w-full max-w-4xl p-6 sm:p-8 bg-blue-200 rounded-xl shadow-lg space-y-6 animate__animated animate__fadeIn relative top-[20px]">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
            About Eventura 🎉
          </h1>
          {/* Intro Text */}
          <p className="text-base sm:text-lg text-gray-700 mb-6 text-center leading-relaxed">
            Welcome to Eventura, your go-to platform for discovering global
            competitions in technology, arts, and sciences! 🌍 Whether you're
            competing or watching, we make it easy to find exciting events at
            universities worldwide.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-6 text-center leading-relaxed">
            We value your feedback to help us improve. Share your thoughts and
            suggestions with us! 💬
          </p>
          {/* Review Section */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 text-center">
            Leave a Review
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-blue-100 p-4 sm:p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                👤 Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                📧 Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact Field */}
            <div>
              <label
                htmlFor="contact"
                className="block text-gray-700 font-medium mb-2"
              >
                📱 Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your contact number"
              />
            </div>

            {/* Review Field */}
            <div>
              <label
                htmlFor="review"
                className="block text-gray-700 font-medium mb-2"
              >
                📝 Your Review
              </label>
              <textarea
                id="review"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your review here..."
              />
            </div>

            {/* Rating Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-center">
                🌟 Rating
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => handleStarClick(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= rating ? "#FFD700" : "#E5E7EB"}
                    viewBox="0 0 20 20"
                    className="w-8 h-8 cursor-pointer transition-all duration-300 transform hover:scale-110"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15l-3.5 2 1-4.5L3 8h4.5L10 3l2.5 5H17l-4.5 4.5L13.5 17z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105 duration-300"
            >
              Submit Review 🚀
            </button>
          </form>
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mt-6 text-center text-green-600 font-semibold">
              Your review has been successfully submitted! 🎉
            </div>
          )}
          \
        </div>
      </div>
    </>
  );
}

export default About;
