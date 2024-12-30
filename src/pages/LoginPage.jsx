import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function LoginPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleRegisterLink = () => {
    navigate("/register"); // Navigate to the Register page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateLogin = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Save user data to localStorage (or sessionStorage) after successful login
      localStorage.setItem("user", JSON.stringify(formData));
      // Navigate to the /profile page after successful submission
      navigate("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white h-full">
      <div className="relative w-full max-w-sm p-4 rounded-xl shadow-2xl bg-blue-200">
        <div className="p-4 rounded-lg shadow-xl bg-white">
          <form
            onSubmit={handleSubmit}
            className="form-box transition-all transform hover:scale-105 duration-500 ease-in-out"
          >
            <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-4">
              Login
            </h1>
            <div className="input-box relative mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <FaUser className="absolute left-4 top-4 text-gray-400" />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="input-box relative mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <RiLockPasswordFill className="absolute left-4 top-4 text-gray-400" />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Login
            </button>
            <div className="register-link text-center mt-4">
              <p className="text-indigo-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={handleRegisterLink}
                  className="text-indigo-400 hover:underline"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
