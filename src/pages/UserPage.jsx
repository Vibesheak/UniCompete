import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import homeImage from "./home.jpeg";
import "animate.css";

const UserPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const user = {
    fullName: "Nilojitha Mariyathas",
    email: "n123@gmail.com",
    contactNumber: "123-456-7890",
    address: "123 Main St, Kelaniya",
    university: "University A",
    userType: "Student",
    profilePic: homeImage, // Your imported profile picture
  };

  const handleLogout = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 animate__animated animate__fadeIn">
      <div className="relative bg-white p-12 rounded-3xl shadow-xl text-center w-full sm:w-[400px] md:w-[600px] lg:w-[800px] transform animate__animated animate__fadeIn animate__faster animate__delay-0.5s">
        {/* Blue Box */}
        <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-indigo-300 w-[300px] h-[500px] rounded-2xl shadow-xl transform animate__animated animate__fadeIn animate__faster animate__delay-1s">
          {/* Welcome Text */}
          <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold animate__animated animate__fadeIn animate__infinite animate__delay-1s">
            Welcome, {user.fullName}!
          </div>
          {/* Short Note */}
          <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold animate__animated animate__fadeIn animate__infinite animate__delay-2s">
            We're happy to have you here. Explore the competitions and make the
            most of your time!
          </div>
        </div>

        {/* White Box Content */}
        <div className="relative z-20 text-center ml-80 animate__animated animate__slideInRight animate__delay-0.5s">
          {/* Profile Picture */}
          <div className="mb-8 animate__animated animate__pulse animate__infinite">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-indigo-500 shadow-lg transform hover:scale-110 hover:shadow-xl transition-transform duration-300"
            />
          </div>

          {/* User Information */}
          <h2 className="text-4xl font-serif text-indigo-800 mb-2 animate__animated animate__fadeIn animate__delay-1s">
            {user.fullName}
          </h2>
          <p className="text-xl text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-2s">
            {user.userType} at {user.university}
          </p>

          <div className="space-y-6 text-left mb-8 animate__animated animate__fadeIn animate__delay-3s">
            <div className="flex justify-between">
              <strong className="text-indigo-600 text-lg font-bold">
                Email:
              </strong>
              <p className="text-gray-600 font-medium tracking-wide">
                <span className="text-gray-600 text-xl font-bold">
                  {user.email}
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <strong className="text-indigo-600 text-lg font-bold">
                Contact Number:
              </strong>
              <p className="text-gray-600 font-bold">{user.contactNumber}</p>
            </div>
            <div className="flex justify-between">
              <strong className="text-indigo-600 text-lg font-bold">
                Address:
              </strong>
              <p className="text-gray-600 font-bold">{user.address}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-x-6 mt-8">
            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-110 hover:shadow-xl transition-all duration-300 animate__animated  animate-bounce animate__infinite animate__delay-1s"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transform hover:scale-110 hover:shadow-xl transition-all duration-300 animate__animated  animate-bounce animate__infinite animate__delay-1s"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
