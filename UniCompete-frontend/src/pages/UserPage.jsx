import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import homeImage from "./images/A1.png";
import "animate.css";
import { jwtDecode } from "jwt-decode";

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedCompetitionIds, setAppliedCompetitionIds] = useState([]);
  const [appliedCompetitions, setAppliedCompetitions] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Decode the token to extract username
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username; // Ensure correct claim

        if (!username) {
          setError("Invalid token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        console.log("Extracted username:", username); // Debugging

        // Fetch user details from backend
        const userResponse = await axios.get(
          `http://localhost:8080/auth/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        // Fetch applied competition IDs
        const competitionIdResponse = await axios.get(
          `http://localhost:8080/applications/user/competitions/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const competitionIds = competitionIdResponse.data;
        setAppliedCompetitionIds(competitionIds);

        // Fetch competition details
        const competitionDetails = await Promise.all(
          competitionIds.map(async (id) => {
            const response = await axios.get(
              `http://localhost:8080/competitions/user/id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data;
          })
        );

        setAppliedCompetitions(competitionDetails);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-100 animate__animated animate__fadeIn">
      {/* Main Container */}
      <div className="relative flex flex-row justify-center w-full max-w-8xl p-6 space-x-10 animate__animated animate__fadeIn animate__faster animate__delay-0.5s">
        
        {/* Left Side: Welcome Box (Smaller Box Overlapping Profile Box) */}
        <div className="absolute left-[60px] top-[-30px] bg-gradient-to-b from-blue-500 to-purple-500 w-[200px] h-[160px] rounded-xl shadow-lg p-4 text-white text-center flex flex-col justify-center items-center z-10">
          <h2 className="text-l font-bold">Welcome,</h2>
          <h2 className="text-l font-bold">{user.username}!</h2>
          <p className="text-xs mt-2">
            Explore competitions and make the most of your time!
          </p>
        </div>

        {/* Middle: Profile Section with Buttons Below */}
        <div className="relative left-[-50px] top-[-4px] bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[400px] h-[550px] text-center flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <img
              src={homeImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
            />
            <h2 className="text-xl font-bold text-gray-900 mt-3">
              {user.username}
            </h2>
            <p className="text-sm text-indigo-600 font-semibold">
              Student at {user.universityName}
            </p>
          </div>

          {/* User Info */}
          <div className="text mt-4 space-y-3">
          <div className="flex justify-between text-sm">
              <span className="font-bold">Username:</span>
              <span>{user.username}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold ">Email:</span>
              <span className="text-indigo-700">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold">University:</span>
              <span>{user.universityName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold">Contact:</span>
              <span>{user.phonenumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold">Applied Competitions:</span>
              <span>{appliedCompetitions.length}</span>
            </div>
          </div>

          {/* Buttons inside Profile Box */}
          <div className="flex justify-center space-x-3 mt-6">
            <button
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>

{/* Right Side: Applied Competitions */}
<div className="bg-white bg-opacity-30 backdrop-blur-md p-5 rounded-2xl shadow-lg w-[700px] h-[550px] overflow-y-auto">
  <h1 className="text-xl font-semibold text-purple-700 mb-4 border-b pb-3">
    Applied Competitions
  </h1>

  <div className="space-y-3">
    {appliedCompetitions.length > 0 ? (
      appliedCompetitions.map((comp, index) => (
        <div 
          key={index} 
          className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md space-x-4"
        >
          {/* Competition Poster */}
          <img
            src={`http://localhost:8080/competitions/images/${comp.id}?token=${localStorage.getItem("token")}`}
            alt={comp.name}
            className="w-28 h-28 object-cover rounded-lg shadow-md"
          />

          {/* Competition Details */}
          <div className="flex-1">
            <h4 className="text-lg font-bold">{comp.name}</h4>
            <p className="text-sm text-gray-600">{comp.date}</p>
            <p className="text-sm text-gray-600">{comp.university}</p>
          </div>

          {/* Status Badge (On the Right Side) */}
          <div className="flex justify-end w-32">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                comp.status === "Accepted"
                  ? "bg-green-200 text-green-700"
                  : comp.status === "Pending"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {comp.status}
            </span>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No competitions applied.</p>
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default UserPage;
