import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bannerImage from "./bannerimage.jpg"; // Correct relative path to the image
import profilePic from "./profile.jpg"; // Assuming the profile picture is the same or imported separately

function CompetitionDetails() {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Nilojitha Mariyathas",
    profilePic: profilePic, // Profile picture
    email: "n123.doe@example.com",
    location: "New York, USA",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchCompetitionDetails = (id) => {
    const competitions = [
      {
        id: 1,
        name: "Tech Innovation Contest",
        date: "2024-12-20",
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
    setCompetition(competitionData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompetitionDetails(id);
  }, [id]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("");
    return initials.toUpperCase();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={competition.image}
            alt="Competition Banner"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-center p-6">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight">
                {competition.name}
              </h1>
              <p className="mt-2 text-lg font-medium">
                {competition.date} - {competition.location}
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                Join Now
              </button>
            </div>
          </div>
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
              onClick={() => {
                setUser({});
                setDropdownOpen(false);
              }}
              className="bg-red-600 text-white w-full mt-2 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}

        {/* Competition Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <p className="text-gray-700 mb-4">{competition.description}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Prizes</h3>
            <p className="text-gray-700 mb-4">{competition.prizes}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Schedule
            </h3>
            <p className="text-gray-700">{competition.schedule}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Rules & Regulations
            </h2>
            <p className="text-gray-700">{competition.rules}</p>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Event Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Registration Deadline</p>
              <span className="font-semibold text-blue-600">
                {competition.schedule.split(",")[0].split(":")[1].trim()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Event Date</p>
              <span className="font-semibold text-blue-600">
                {competition.date}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Competition Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Entries</p>
              <span className="font-semibold text-blue-600">120 Entries</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Likes</p>
              <span className="font-semibold text-blue-600">2000 Likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetitionDetails;
