import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import banner from "./Banner4.mp4";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";


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
  const [status, setStatus] = useState("Pending");
  const { id: competitionId } = useParams(); // Extract competition ID
  const [submittedData, setSubmittedData] = useState({ username: "", email: "", Phonenumber: "", status: "" });
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
const [reviewFormVisible, setReviewFormVisible] = useState(false);
const [showReviewsVisible, setShowReviewsVisible] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const isUserAlreadyApplied = async (username, competitionId) => {
    const jwtToken = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/applications/user/applications/${competitionId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    const applications = await response.json();
    return applications.some((app) => app.username === username);
  };
  
  const handleStatusFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const alreadyApplied = await isUserAlreadyApplied(formData.username, competitionId);
      if (alreadyApplied) {
        setLoading(false); // Stop loading
        Swal.fire({
          icon: "error",
          title: "Application Already Submitted",
          text: "You have already submitted an application for this competition.",
          confirmButtonColor: "#d33",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        return;
      }
  
      // Continue with submission
      const jwtToken = localStorage.getItem("token");
      const dataToSubmit = { ...formData, competitionId };
      const response = await fetch("http://localhost:8080/applications/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Application submitted successfully!");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to submit application: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    }
  };
  
  
  

  const handleViewFormSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Ensure the user is logged in.");
        return;
      }
  
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const username = decodedPayload.sub;
      const dataToSubmit = { ...formData, competitionId };

  
      const response = await fetch(
        `http://localhost:8080/applications/user/applications/${competitionId}/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setSubmittedData({
          username: data.username || "N/A",
          email: data.email || "N/A",
          Phonenumber: data.phonenumber || "N/A",
          status: data.status || "N/A",
        });
        
      } else {

        console.error("Error fetching application status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // To store the submitted form data
  const [reviewData, setReviewData] = useState({
    userName: "",
    email: "",
    rating: 0,
    comment: "",
  });
  
  const user = {
    fullName: "Nilojitha Mariyathas",
  };



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
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching competition details:", error);
        setCompetition(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionDetails();
  }, [id]);

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);

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

  // const handleLike = () => {
  //   setLikes(likes + 1);
  // };

  // const toggleSection = (section) => {
  //   setExpandedSection((prev) => (prev === section ? "" : section));
  // };

  // const handleClickOutside = (event) => {
  //   if (calendarRef.current && !calendarRef.current.contains(event.target)) {
  //     setShowCalendar(false);
  //   }
  // };

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
    const { userName, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [userName]: value,
    }));
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
  

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
        const jwtToken = localStorage.getItem("token");

        if (!jwtToken) {
            Swal.fire("Error!", "User not authenticated. Please log in.", "error");
            return;
        }

        console.log("JWT Token:", jwtToken); // Debugging token

        const response = await fetch("http://localhost:8080/feedbacks/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`, // Ensure correct token format
            },
            body: JSON.stringify({
                ...reviewData,
                competitionId: id,
            }),
        });

        console.log("Response Status:", response.status);

        if (response.status === 403) {
            Swal.fire("Error!", "You are not authorized to add a review", "error");
            return;
        }

        if (response.ok) {
            setReviewFormVisible(false);
            Swal.fire("Success!", "Review added successfully", "success");
            fetchReviews();
        } else {
            const errorData = await response.json();
            Swal.fire("Error!", errorData.message || "Failed to add review", "error");
        }
    } catch (error) {
        console.error("Error submitting review:", error);
        Swal.fire("Error!", "An unexpected error occurred", "error");
    }
};




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
        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-500">
          <video
            src={banner}
            autoPlay
            loop
            muted
            //alt="Competition Banner"
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center p-6">
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
                Register Here !
              </button>
            </div>
          </div>
        </div>






        <div className="grid grid-cols-3 gap-8 mt-9">
  {/* Overview */}
  <div className="relative group row-span-2 lg:col-span-1">
  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-purple-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative w-full h-full bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-purple-500 hover:border-purple-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-300 opacity-60 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-purple-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
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
      <h2 className="relative z-10 text-lg font-semibold text-purple-600 mb-2">Overview</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "overview"
          ? competition.description
          : `${competition.description.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-purple-500 font-medium mt-4 underline hover:text-purple-700"
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-300 opacity-60 rounded-xl blur-md pointer-events-none"></div>
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
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-purple-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative w-full h-full bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-purple-500 hover:border-purple-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-300 opacity-60 rounded-xl blur-md pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-purple-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
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
      <h2 className="relative z-10 text-lg font-semibold text-purple-600 mb-2">Rules</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "rules"
          ? competition.rules
          : `${competition.rules.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-purple-500 font-medium mt-4 underline hover:text-purple-700"
        onClick={() => toggleSection("rules")}
      >
        {expandedSection === "rules" ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>

  {/* Prizes */}
  <div className="relative group col-span-4 lg:col-span-1">
  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-500 opacity-20 rounded-xl transform rotate-3 group-hover:rotate-6 transition duration-300"></div>
    <div className="relative bg-white p-6 shadow-inner rounded-xl flex flex-col items-center border-2 animate-border-gradient border-blue-500 hover:border-blue-700 hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-300 opacity-60 rounded-xl blur-md pointer-events-none"></div>
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
            d="M16 5V3H8v2m8 0a5 5 0 015 5v2a5 5 0 01-5 5H8a5 5 0 01-5-5V10a5 5 0 015-5m8 0H8m8 10v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2m10-7H4"
          />
        </svg>
      </div>
      <h2 className="relative z-10 text-lg font-semibold text-blue-600 mb-2">Prizes</h2>
      <p className="relative z-10 text-gray-600 text-center">
        {expandedSection === "prizes"
          ? competition.prizes
          : `${competition.prizes.substring(0, 60)}...`}
      </p>
      <button
        className="relative z-10 text-blue-500 font-medium mt-4 underline hover:text-blue-700"
        onClick={() => toggleSection("prizes")}
      >
        {expandedSection === "prizes" ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>
</div>



    

         <div className="bg-blue-50 p-8 rounded-lg shadow-lg mt-6 text-center transition-transform duration-300 hover:scale-105">
          {/* Description */}
          <p className="text-gray-700 text-lg mb-4 font-semibold">
            Please provide your details to view your status.
          </p>

 
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
              handleViewFormSubmit();
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
                type="tel"
                name="phonenumber"
                placeholder="Phone Number"
                required
                value={formData.Phonenumber}
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


          {showViewForm && submittedData &&(
             
             <div className="flex flex-col items-center justify-center mt-4">
             <div className="p-6 bg-blue-100 rounded-lg shadow-md max-w-md text-center">
               <p className="text-lg text-gray-800 mb-2">
                 <strong className="text-blue-600">Username:</strong> {submittedData.username}
               </p>
               <p className="text-lg text-gray-800 mb-2">
                 <strong className="text-blue-600">Email:</strong> {submittedData.email}
               </p>
               <p className="text-lg text-gray-800 mb-2">
                 <strong className="text-blue-600">Phonenumber:</strong> {submittedData.Phonenumber}
               </p>
               <p className="text-lg text-gray-800 mb-4 flex justify-center items-center">
                 <strong className="text-blue-600 mr-2">Status:</strong>
                 <span
                   className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${
                     submittedData.status === "Pending"
                       ? "bg-yellow-50 text-yellow-800 border border-yellow-300"
                       : submittedData.status === "Accepted"
                       ? "bg-green-50 text-green-800 border border-green-300"
                       : "bg-red-50 text-red-800 border border-red-300"
                   }`}
                 >
                   {submittedData.status === "Pending" && (
                     <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
                   )}
                   {submittedData.status === "Accepted" && (
                     <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                   )}
                   {submittedData.status === "Rejected" && (
                     <span className="w-4 h-4 bg-red-400 rounded-full"></span>
                   )}
                   <span>{submittedData.status}</span>
                 </span>
               </p>
             </div>
           </div>
           

          )}
        </div>
        
{/* Reviews Section */}
<div className="bg-blue-50 p-6 rounded-lg shadow-lg mt-6 ">
  <h2 className="text-2xl font-semibold text-blue-600">📝 Reviews</h2>

  <div className="flex justify-between mt-4">
    <button
      onClick={() => setReviewFormVisible(!reviewFormVisible)}
      className="text-blue-500 hover:underline"
    >
      {reviewFormVisible ? "Cancel Review" : "Write a Review"}
    </button>
    <button
      onClick={() => {
        setShowReviewsVisible(!showReviewsVisible);
        if (!showReviewsVisible) fetchReviews(); // Fetch reviews when opening
      }}
      className="text-blue-500 hover:underline"
    >
      {showReviewsVisible ? "Hide Reviews" : "Show Reviews"}
    </button>
  </div>

  {/* Review Form */}
  {reviewFormVisible && (
    <form onSubmit={handleReviewSubmit} className="mt-4">
      <input
        type="text"
        name="userName"
        placeholder="userName"
        value={reviewData.userName}
        onChange={(e) =>
          setReviewData({ ...reviewData, userName: e.target.value })
        }
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={reviewData.email}
        onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={reviewData.rating}
        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
        min="1"
        max="5"
      />
      <textarea
        name="comment"
        placeholder="Your Review"
        value={reviewData.comment}
        onChange={(e) =>
          setReviewData({ ...reviewData, comment: e.target.value })
        }
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

{/* Display Reviews */}
{showReviewsVisible && (
  <div className="mt-1 space-y-3">
    {reviews.length === 0 ? (
      <p className="text-gray-700 text-lg text-center font-small">
        No reviews yet. Be the first to leave one!
      </p>
    ) : (
      reviews.map((review, index) => (
        <div
          key={index}
          className="border border-gray-300 p-3 rounded-lg shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:shadow-xl transition-transform duration-300 transform hover:scale-101"
        >
          {/* User Info */}
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg shadow-lg mr-4">
              {review.userName ? review.userName.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="font-bold text-blue-600 text-lg">
                {review.userName || "Anonymous User"}
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* Review Content */}
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-gray-800 text-md font-medium mb-2 md:mb-0">
              "{review.comment || "No Comment"}"
            </p>
            <span
              className="inline-block px-4 py-2 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300 shadow-lg"
              title={`Rating: ${review.rating || 0}/5`}
            >
              ⭐ {review.rating || 0}/5
            </span>
          </div>
        </div>
      ))
    )}
  </div>
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
    </div>
  );
}

export default CompetitionDetails;
