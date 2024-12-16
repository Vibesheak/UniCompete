import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import bannerImage from "./bannerimage.jpg";

function CompetitionDetails() {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false); // State for showing calendar
  const [calendarDate, setCalendarDate] = useState(null); // State for selected date
  const calendarRef = useRef(null); // Reference to the calendar to handle clicks outside
  const [likes, setLikes] = useState(0);
  const [expandedSection, setExpandedSection] = useState("");

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
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-transform duration-300 hover:scale-105"
              onClick={handleLike}
            >
              Join Now
            </button>
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
      </div>
    </div>
  );
}

export default CompetitionDetails;
