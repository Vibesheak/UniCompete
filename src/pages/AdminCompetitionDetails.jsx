import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import bannerImage from "./images/bannerimage.jpg";

function AdminCompetitionDetails() {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false); // State for showing calendar
  const [calendarDate, setCalendarDate] = useState(null); // State for selected date
  const calendarRef = useRef(null); // Reference to the calendar to handle clicks outside
  const [likes, setLikes] = useState(0);
  const [expandedSection, setExpandedSection] = useState("");
  const [registrations, setRegistrations] = useState([
    {
      username: "Nilo",
      email: "n@example.com",
      status: "Pending",
      rating: 1.0,
      review: "Looking forward to participating, but need more details.",
    },
    {
      username: "vibe_123",
      email: "v234@example.com",
      status: "Accepted",
      rating: 5,
      review: "Amazing event! Very well organized, had a great time.",
    },
    {
      username: "roman_CC",
      email: "roman@gmail.com",
      status: "Rejected",
      rating: 2.0,
      review: "Disappointed with the event, not what I expected.",
    },
    {
      username: "jana_thana",
      email: "jana@123example.com",
      status: "Pending",
      rating: 3.0,
      review: "Excited for the event! Hope it's as good as advertised.",
    },
  ]); // Sample registrations

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
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 3,
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
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 5,
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
        registerLink: "https://example.com/register", // Replace with the actual registration link
      },
      {
        id: 7,
        name: "Art and Design Exhibition",
        date: "2024-12-25",
        registrationDeadline: "2024-12-10",
        location: "University B",
        description:
          "An exhibition showcasing the best in arts, design, and creativity from students around the country.",
        prizes: "First place: $800, Second place: $400, Third place: $200",
        schedule: "Registration Deadline: 2024-12-10, Event Date: 2024-12-25",
        rules: "Open to all students, Original art only, etc.",
        registerLink: "https://example.com/register", // Replace with the actual registration link
        image: bannerImage,
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
      setCompetition(null); // Handle case where competition is not found
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
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  const handleDateSelect = (date) => {
    setCalendarDate(date); // Set the selected date
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  // Handle registration status change
  const handleStatusChange = (index, status) => {
    const updatedRegistrations = [...registrations];
    updatedRegistrations[index].status = status;
    setRegistrations(updatedRegistrations);
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
                {calendarDate
                  ? calendarDate.toLocaleDateString()
                  : competition.date}
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
          <div className="card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
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

          <div className="card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
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
          <div className="card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
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

          <div className="card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
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

        {/* Registrations Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {registration.username}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {registration.email}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        registration.status === "Accepted"
                          ? "bg-green-100 text-green-600"
                          : registration.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {registration.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-sm">
                    <button
                      onClick={() => handleStatusChange(index, "Accepted")}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform duration-300"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(index, "Rejected")}
                      className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform duration-300"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Reviews Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                    Rating
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {registration.username}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {registration.email}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      <div className="flex items-center">
                        {/* Loop through 5 stars */}
                        {[1, 2, 3, 4, 5].map((star) => {
                          if (registration.rating >= star) {
                            // Full star: if rating >= current star number
                            return (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.27l5.18 3.09-1.64-6.93L19 6.24l-6.91-.58L10 0 7.91 5.66 1 6.24l4.46 5.19-1.64 6.93L10 15.27z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          } else if (
                            registration.rating >= star - 0.5 &&
                            registration.rating < star
                          ) {
                            // Half star: if rating is in the range between current star and half of it
                            return (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.27l5.18 3.09-1.64-6.93L19 6.24l-6.91-.58L10 0 7.91 5.66 1 6.24l4.46 5.19-1.64 6.93L10 15.27z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          } else {
                            // Empty star: if rating is less than current star
                            return (
                              <svg
                                key={star}
                                className="w-5 h-5 text-gray-300"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.27l5.18 3.09-1.64-6.93L19 6.24l-6.91-.58L10 0 7.91 5.66 1 6.24l4.46 5.19-1.64 6.93L10 15.27z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          }
                        })}
                        <span className="ml-2 font-semibold text-gray-700">
                          {registration.rating}/5
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700">
                      {registration.review}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCompetitionDetails;
