import React from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  // Replace this with the actual user data fetched from context, state, or API
  const user = {
    fullName: "Nilojitha Mariyathas",
    email: "n123@gmail.com",
    contactNumber: "123-456-7890",
    address: "123 Main St, Kelaniya",
    university: "A University",
    userType: "Student",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing tokens, user context, etc.)
    navigate("/login"); // Navigate to the login page
  };

  const handleHome = () => {
    navigate(-1); // Go back to the previous page in history
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-4xl bg-blue-100 shadow-lg rounded-lg p-6 flex flex-col md:flex-row"
        style={{ height: "80vh" }}
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center border-b md:border-b-0 md:border-r-4 border-gray-500 pr-0 md:pr-6 pb-6 md:pb-0">
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md mb-4 flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: "#6B7280" }} // Default background color
          >
            {getInitials(user.fullName)}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 text-center mb-2">
            {user.fullName}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{user.userType}</p>

          {/* Home Button */}
          <button
            onClick={handleHome}
            className="mt-6 w-3/4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go Back
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-3/4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 pl-0 md:pl-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            User Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-sm font-semibold text-gray-500">Email</p>
              <p className="text-base md:text-lg font-medium text-gray-800">
                {user.email}
              </p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-sm font-semibold text-gray-500">Contact</p>
              <p className="text-base md:text-lg font-medium text-gray-800">
                {user.contactNumber}
              </p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-sm font-semibold text-gray-500">Address</p>
              <p className="text-base md:text-lg font-medium text-gray-800">
                {user.address}
              </p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-sm font-semibold text-gray-500">University</p>
              <p className="text-base md:text-lg font-medium text-gray-800">
                {user.university}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
