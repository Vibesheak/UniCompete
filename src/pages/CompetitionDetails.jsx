import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import bannerImage from "./bannerimage.jpg";

function CompetitionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(null);
  const calendarRef = useRef(null);
  const [likes, setLikes] = useState(0);
  const [expandedSection, setExpandedSection] = useState("");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  console.log("Competition Object:", competition);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusFormSubmit = (e) => {
    e.preventDefault();
    console.log("Status Form Data Submitted:", formData);
    setShowStatusForm(false); // Hide form after submission
    setFormData({ username: "", email: "", location: "" }); // Reset form data
  };

  const handleViewFormSubmit = (e) => {
    e.preventDefault();
    console.log("View Form Data Submitted:", formData);
    setShowViewForm(false); // Hide form after submission
    setFormData({ username: "", email: "", location: "" }); // Reset form data
  };

  // To store the submitted form data
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    rating: 0,
    reviewText: "",
  });
  const user = {
    fullName: "Nilojitha Mariyathas",
  };
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
  });

  const fetchCompetitionDetails = (id) => {
    const competitions = [
      {
        id: 1,
        name: "Tech Innovation Contest",
        date: "2024-12-20",
        registrationDeadline: "2024-12-15",
        location: "University A",
        description:
          "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
        prizes: "First place: $1000, Second place: $500, Third place: $250",
        schedule: "Registration Deadline: 2024-12-15, Event Date: 2024-12-20",
        rules: "Participants must be students, Original work only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 2,
        name: "Art and Design Exhibition",
        date: "2024-12-25",
        registrationDeadline: "2024-12-10",
        location: "University B",
        description:
          "An exhibition showcasing the best in arts, design, and creativity from students around the country.",
        prizes: "First place: $800, Second place: $400, Third place: $200",
        schedule: "Registration Deadline: 2024-12-10, Event Date: 2024-12-25",
        rules: "Open to all students, Original art only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register",
      },
      {
        id: 3,
        name: "Tech Innovation Contest",
        date: "2024-12-20",
        registrationDeadline: "2024-12-15",
        location: "University A",
        description:
          "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
        prizes: "First place: $1000, Second place: $500, Third place: $250",
        schedule: "Registration Deadline: 2024-12-15, Event Date: 2024-12-20",
        rules: "Participants must be students, Original work only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 4,
        name: "Art and Design Exhibition",
        date: "2024-12-25",
        registrationDeadline: "2024-12-10",
        location: "University B",
        description:
          "An exhibition showcasing the best in arts, design, and creativity from students around the country.",
        prizes: "First place: $800, Second place: $400, Third place: $200",
        schedule: "Registration Deadline: 2024-12-10, Event Date: 2024-12-25",
        rules: "Open to all students, Original art only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register",
      },
      {
        id: 5,
        name: "Tech Innovation Contest",
        date: "2024-12-20",
        registrationDeadline: "2024-12-15",
        location: "University A",
        description:
          "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
        prizes: "First place: $1000, Second place: $500, Third place: $250",
        schedule: "Registration Deadline: 2024-12-15, Event Date: 2024-12-20",
        rules: "Participants must be students, Original work only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 6,
        name: "Art and Design Exhibition",
        date: "2024-12-25",
        registrationDeadline: "2024-12-10",
        location: "University B",
        description:
          "An exhibition showcasing the best in arts, design, and creativity from students around the country.",
        prizes: "First place: $800, Second place: $400, Third place: $200",
        schedule: "Registration Deadline: 2024-12-10, Event Date: 2024-12-25",
        rules: "Open to all students, Original art only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register",
      },
      {
        id: 7,
        name: "Tech Innovation Contest",
        date: "2024-12-20",
        registrationDeadline: "2024-12-15",
        location: "University A",
        description:
          "A contest for tech enthusiasts to showcase innovative solutions in AI, robotics, and software development.",
        prizes: "First place: $1000, Second place: $500, Third place: $250",
        schedule: "Registration Deadline: 2024-12-15, Event Date: 2024-12-20",
        rules: "Participants must be students, Original work only, etc.",
        image: bannerImage,
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
    ];

    const competitionData = competitions.find(
      (comp) => comp.id === parseInt(id)
    );
    if (competitionData) {
      setCompetition(competitionData);
      setLoading(false);
    } else {
      setLoading(false);
      setCompetition(null);
    }
  };

  useEffect(() => {
    fetchCompetitionDetails(id);
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setCalendarDate(date);
    setShowCalendar(false);
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add the review to the reviews list
    setReviews((prevReviews) => [
      ...prevReviews,
      { ...reviewData, id: prevReviews.length + 1 },
    ]);
    // Reset the form
    setReviewData({
      name: "",
      email: "",
      rating: 0,
      reviewText: "",
    });
    setShowReviewForm(false);
  };
  const handleProfileClick = () =>
    setProfileDropdownVisible(!profileDropdownVisible);
  const getInitials = (fullName) => {
    const nameParts = fullName.split(" ");
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  };
  const handleLogout = () => navigate("/login");

  // Format date for display
  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : competition.date;
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-700 py-10">
        Loading competition details...
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="text-center text-xl text-gray-700 py-10">
        Competition not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-500">
          <img
            src={competition.image}
            alt="Competition Banner"
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-6">
            <h1 className="text-3xl font-extrabold animate__animated animate__fadeInUp">
              {competition.name}
            </h1>
            <p className="mt-2 text-lg font-medium flex items-center">
              🗓️{" "}
              <span
                className="ml-2 cursor-pointer"
                onClick={handleDateClick}
                role="button"
                aria-expanded={showCalendar}
                aria-controls="calendar-popup"
              >
                {formatDate(calendarDate)}
              </span>{" "}
              - {competition.location}
            </p>
            {showCalendar && (
              <div
                id="calendar-popup"
                ref={calendarRef}
                className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10"
              >
                <Calendar
                  onChange={handleDateSelect}
                  value={calendarDate || new Date()}
                  className="w-64 p-2 rounded-lg shadow-lg"
                />
              </div>
            )}
            <div key={competition.id} className="competition-card">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-transform duration-300 hover:scale-105"
                onClick={() => {
                  console.log("Register Link:", competition.registerLink); // Log the link
                  if (competition.registerLink) {
                    window.open(competition.registerLink, "_blank");
                  } else {
                    console.error("Register link is missing or invalid.");
                  }
                }}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Competition Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 bg-blue-50 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => toggleSection("overview")}
              aria-expanded={expandedSection === "overview"}
              aria-controls="overview-section"
            >
              📝 Overview
            </h2>
            {expandedSection === "overview" ? (
              <p className="text-gray-700 mt-2">{competition.description}</p>
            ) : (
              <p className="text-gray-700 mt-2">
                {competition.description.substring(0, 100)}...
              </p>
            )}
            <button
              onClick={() => toggleSection("overview")}
              className="text-blue-500 mt-2 hover:underline"
            >
              {expandedSection === "overview" ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="card p-6 bg-blue-50 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => toggleSection("prizes")}
              aria-expanded={expandedSection === "prizes"}
              aria-controls="prizes-section"
            >
              🎁 Prizes
            </h2>
            {expandedSection === "prizes" ? (
              <ul className="text-gray-700 mt-2 space-y-2">
                <li>🏆 First place: $1000</li>
                <li>🥈 Second place: $500</li>
                <li>🥉 Third place: $250</li>
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">
                {competition.prizes.substring(0, 50)}...
              </p>
            )}
            <button
              onClick={() => toggleSection("prizes")}
              className="text-blue-500 mt-2 hover:underline"
            >
              {expandedSection === "prizes" ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 bg-blue-50 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => toggleSection("schedule")}
              aria-expanded={expandedSection === "schedule"}
              aria-controls="schedule-section"
            >
              🗓️ Schedule
            </h2>
            {expandedSection === "schedule" ? (
              <ul className="text-gray-700 mt-2 space-y-2">
                <li>
                  📅 Registration Deadline: {competition.registrationDeadline}
                </li>
                <li>📅 Event Date: {competition.date}</li>
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">
                {competition.schedule.substring(0, 50)}...
              </p>
            )}
            <button
              onClick={() => toggleSection("schedule")}
              className="text-blue-500 mt-2 hover:underline"
            >
              {expandedSection === "schedule" ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="card p-6 bg-blue-50 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => toggleSection("rules")}
              aria-expanded={expandedSection === "rules"}
              aria-controls="rules-section"
            >
              📜 Rules & Regulations
            </h2>
            {expandedSection === "rules" ? (
              <p className="text-gray-700 mt-2">{competition.rules}</p>
            ) : (
              <p className="text-gray-700 mt-2">
                {competition.rules.substring(0, 50)}...
              </p>
            )}
            <button
              onClick={() => toggleSection("rules")}
              className="text-blue-500 mt-2 hover:underline"
            >
              {expandedSection === "rules" ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg shadow-lg mt-6 text-center transition-transform duration-300 hover:scale-105">
          {/* Description */}
          <p className="text-gray-700 text-lg mb-4 font-semibold">
            Please provide your details to view your status.
          </p>

          {/* Button to toggle the form */}
          <button
            onClick={() => {
              setShowStatusForm(!showStatusForm);
              setShowViewForm(false); // Hide the other form
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg ml-8 mb-4 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {showStatusForm ? "Hide Status Form" : "Show Status Form"}
          </button>

          <button
            onClick={() => {
              setShowViewForm(!showViewForm);
              setShowStatusForm(false); // Hide the other form
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-4 ml-8 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {showViewForm ? "Hide Status View  Form" : "Show  Status View Form"}
          </button>

          {showStatusForm && (
            <form
              onSubmit={handleStatusFormSubmit}
              className="mt-6 space-y-6 max-w-md mx-auto bg-blue-200 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue text-center mb-6">
                Submit Your Details
              </h2>

              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          )}

          {showViewForm && (
            <div className="mt-6 p-4 max-w-sm mx-auto bg-blue-200 rounded-lg shadow-lg">
              <p className="text-lg text-gray-800 mb-2">
                <strong className="text-blue-600">Username:</strong>{" "}
              </p>
              <p className="text-lg text-gray-800 mb-2">
                <strong className="text-blue-600">Email:</strong>{" "}
              </p>
              <p className="text-lg text-gray-800 mb-2">
                <strong className="text-blue-600">Location:</strong>{" "}
              </p>
              <p className="text-lg text-gray-800 mb-4">
                <strong className="text-blue-600">Status:</strong>{" "}
              </p>
            </div>
          )}
        </div>

        {/* Review Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg mt-6 transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-600">📝 Reviews</h2>
          {reviews.length === 0 && (
            <p className="text-gray-700 mt-4">
              No reviews yet. Be the first to review!
            </p>
          )}
          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">
                  {review.name} ({review.rating}/5)
                </h3>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-blue-500 mt-4 hover:underline"
          >
            {showReviewForm ? "Cancel Review" : "Write a Review"}
          </button>

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={reviewData.name}
                onChange={handleReviewInputChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={reviewData.email}
                onChange={handleReviewInputChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                value={reviewData.rating}
                onChange={handleReviewInputChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                min="1"
                max="5"
              />
              <textarea
                name="reviewText"
                placeholder="Your Review"
                value={reviewData.reviewText}
                onChange={handleReviewInputChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>

        {/* Like Section */}
        <div className="mt-6 flex items-center space-x-4">
          <button
            onClick={handleLike}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-transform duration-300 hover:scale-105"
          >
            ❤️ Like
          </button>
          <span className="text-lg font-semibold text-gray-800">
            {likes} Likes
          </span>
        </div>
      </div>

      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="relative">
          <div className="relative">
            {/* Profile Circle with Initials */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white bg-indigo-600">
              {getInitials(user.fullName)}
            </div>
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
    </div>
  );
}

export default CompetitionDetails;
