import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import banner from "./Banner4.mp4";

function AdminCompetitionDetails() {
  const { id } = useParams();
  const { id: competitionId } = useParams(); // Extract competition ID
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false); // State for showing calendar
  const [calendarDate, setCalendarDate] = useState(null); // State for selected date
  const calendarRef = useRef(null); // Reference to the calendar to handle clicks outside
  const [likes, setLikes] = useState(0);
  const [expandedSection, setExpandedSection] = useState("");
  const [reviews, setReviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [registrations, setRegistrations] = useState([

  ]); // Sample registrations

  useEffect(() => {
    const fetchCompetitionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/competitions/user/id/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
  
        if (response.ok) {
          const data = await response.json();
          setCompetition(data);
        } else {
          console.error("Failed to fetch competition details");
          setCompetition(null);
        }
      } catch (error) {
        console.error("Error fetching competition details:", error);
        setCompetition(null);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token from localStorage
        if (!token) {
          console.error("Token not found. Please log in.");
          return;
        }
    
        const response = await fetch(`http://localhost:8080/feedbacks/competition/id/${competitionId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Include the JWT token
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const reviews = await response.json();
          setReviews(reviews); // Update the state with fetched reviews
        } else if (response.status === 403) {
          console.error("Access forbidden. Ensure you have the required permissions.");
        } else {
          console.error("Failed to fetch reviews:", response.status);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/applications/user/applications/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
  
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
  
    fetchApplications();
    fetchCompetitionDetails();
    fetchReviews();
  }, [id]);



  const updateApplicationStatus = async (username, status) => {
    try {
      const response = await fetch(`http://localhost:8080/applications/update-status/${id}/${username}?status=${status}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const updatedApplication = await response.json();
        setApplications(applications.map(app => 
          app.username === username ? { ...app, status } : app
        ));
      } else {
        console.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  

  

  // const fetchCompetitionDetails = (id) => {

  //   const competitionData = competitions.find(
  //     (comp) => comp.id === parseInt(id)
  //   );
  //   if (competitionData) {
  //     setCompetition(competitionData);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setCompetition(null); // Handle case where competition is not found
  //   }
  // };

  // useEffect(() => {
  //   fetchCompetitionDetails(id);
  // }, [id]);

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
      <div className="max-w-8xl mx-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden ">
          <video
                      src={banner}
                      autoPlay
                      loop
                      muted
                      //alt="Competition Banner"
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
              - {competition.university}
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





        <div className="grid grid-cols-3 gap-8 mt-9">
  {/* Overview */}
  <div className="relative group row-span-2 lg:col-span-1">
    <div className="absolute w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative w-full h-full bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-yellow-500 hover:border-yellow-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-50 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2a10 10 0 0110 10H2A10 10 0 0112 2z"
          />
        </svg>
      </div>
      <h2 className="relative z-10 text-lg font-semibold text-yellow-600 mb-2">Overview</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "overview"
          ? competition.description
          : `${competition.description.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-yellow-500 font-medium mt-4 underline hover:text-yellow-700"
        onClick={() => toggleSection("overview")}
      >
        {expandedSection === "overview" ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>

  {/* Schedule */}
  <div className="relative group col-span-4 lg:col-span-1">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-blue-500 hover:border-blue-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-60 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
          />
        </svg>
      </div>
      <h2 className="relative z-10 text-lg font-semibold text-blue-600 mb-2">Schedule</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "schedule"
          ? `Registration Deadline: ${competition.registrationDeadline}, Event Date: ${competition.date}`
          : "Check schedule details..."}
      </p>
      <button
        className="relative z-10 text-blue-500 font-medium mt-4 underline hover:text-blue-700"
        onClick={() => toggleSection("schedule")}
      >
        {expandedSection === "schedule" ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>

  {/* Rules */}
  <div className="relative group row-span-2 lg:col-span-1">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-200 to-red-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative w-full h-full bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-red-500 hover:border-red-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-60 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 10h16M4 14h16"
          />
        </svg>
      </div>
      <h2 className="relative z-10 text-lg font-semibold text-red-600 mb-2">Rules</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "rules"
          ? competition.rules
          : `${competition.rules.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-red-500 font-medium mt-4 underline hover:text-red-700"
        onClick={() => toggleSection("rules")}
      >
        {expandedSection === "rules" ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>

  {/* Prizes */}
  <div className="relative group col-span-4 lg:col-span-1">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-200 to-green-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-green-500 hover:border-green-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-60 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 5V3H8v2m8 0a5 5 0 015 5v2a5 5 0 01-5 5H8a5 5 0 01-5-5V10a5 5 0 015-5m8 0H8m8 10v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2m10-7H4"
          />
        </svg>
      </div>
      <h2 className="relative z-10 text-lg font-semibold text-green-600 mb-2">Prizes</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "prizes"
          ? competition.prizes
          : `${competition.prizes.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-green-500 font-medium mt-4 underline hover:text-green-700"
        onClick={() => toggleSection("prizes")}
      >
        {expandedSection === "prizes" ? "Read Less" : "Read More"}
      </button>
    </div>
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






        <div className="mt-6 overflow-x-auto">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Applications</h2>
  {applications.length > 0 ? (
    <table className="min-w-full bg-white rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Username</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id} className="border-b hover:bg-gray-50 transition-colors duration-300">
            <td className="py-3 px-6 text-sm text-gray-700">{app.username}</td>
            <td className="py-3 px-6 text-sm text-gray-700">{app.email}</td>
            <td className="py-3 px-6 text-sm text-gray-700">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                app.status === "Accepted" ? "bg-green-100 text-green-600" :
                app.status === "Rejected" ? "bg-red-100 text-red-600" :
                "bg-yellow-100 text-yellow-600"
              }`}>
                {app.status}
              </span>
            </td>
            <td className="py-3 px-6 text-sm">
              <button
                onClick={() => updateApplicationStatus(app.username, "Accepted")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => updateApplicationStatus(app.username, "Rejected")}
                className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform duration-300"
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-700">No applications found.</p>
  )}

          

          {/* Reviews Table */}
<div className="mt-6 overflow-x-auto">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Reviews</h2>
  {reviews.length > 0 ? (
    <table className="min-w-full bg-white rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Username</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Rating</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Review</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review, index) => (
          <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-300">
            <td className="py-3 px-6 text-sm text-gray-700">{review.userName}</td>
            <td className="py-3 px-6 text-sm text-gray-700">{review.comment}</td>
            <td className="py-3 px-6 text-sm text-gray-700">
              <div className="flex items-center">
                {/* Loop through stars */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${review.rating >= star ? "text-yellow-500" : "text-gray-300"}`}
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
                ))}
                <span className="ml-2 font-semibold text-gray-700">{review.rating}/5</span>
              </div>
            </td>
            <td className="py-3 px-6 text-sm text-gray-700">{review.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-700">No reviews available.</p>
  )}
</div>


          
        </div>
      </div>
    </div>
  );
}

export default AdminCompetitionDetails;
