import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';


function RegisterPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "",
    universityName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleRegisterClick = () => {
  //   // Navigate to the login page
  //   navigate("/verify");
  // };

  const validateRegistration = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.role) errors.role = "Role is required.";
    if (!formData.universityName) errors.universityName = "Institute is required.";


    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the highlighted errors and try again.",
        confirmButtonColor: "#d33",
      });
    } else {
      setErrors({});
      setLoading(true); // Start loading
      try {
        const response = await axios.post("http://localhost:8080/auth/register", {
          ...formData,
          roles: [formData.role], // Send role as an array
        });
  
        setLoading(false); // Stop loading
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: response.data,
          confirmButtonColor: "#4CAF50",
        });
  
        navigate("/verify", { state: { email: formData.email } });
      } catch (error) {
        setLoading(false); // Stop loading
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data || "An unexpected error occurred. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center relative inset-0 w-full h-full">
  {/* Light Blue Background Blur */}

      <div className="relative w-full max-w-5xl p-8 rounded-2xl shadow-2xl bg-blue-100">
        <div className="flex flex-col md:flex-row overflow-hidden rounded-xl">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 text-white p-6 relative">
        <div className="absolute inset-y-0 right-0 w-24 bg-white/10 rounded-full blur-3xl"></div>
     

        <div className="flex flex-col items-center justify-center">

            {/* Video Section */}
  <div className="w-100 h-100 mb-4 animate-pulse"style={{ marginTop: "1rem" }}>
  <img
    src="/videos/img2.png" // Replace this with the actual image path
    alt="Description of the image"
    className="w-full h-full object-cover"
  />
</div>

        <h1 className="text-3xl font-bold mb-2 animate-pulse"style={{ marginTop: "1.5rem" }}>W E L C O M E</h1>

 
  <p className="text-lg mb-4 text-center animate-pulse" style={{ marginTop: '1rem' }}>
    Take the first step toward managing and excelling in university competitions - 
    register now and be part of a thriving competitive community!
  </p>
  

</div>


          </div>
  
          <div className="w-full md:w-1/2 bg-blue-100 p-8">
            <form
              onSubmit={handleSubmit}
              className="form-box"
            >
              <h1 className="text-4xl font-semibold text-center text-blue-500 mb-6"><b>
                R E G I S T E R
              </b></h1>
  
              <div className="input-box relative mb-4 ">
                <div className="input-box relative mb-4 backdrop-blur-sm">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
              </div>
  
              <div className="mb-2 text-green-700 text-sm">
                <ul className="list-disc ml-4">
                  <li>Password must include at least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
  
              <div className="input-box relative mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
  
              <div className="input-box relative mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
  
              <div className="input-box relative mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
  
              <div className="input-box relative mb-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <IoMdPhonePortrait className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
  
              <div className="input-box mb-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
  
              <div className="input-box mb-4">
                <select
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    -- Select Your University or Institute --
                  </option>
                  <optgroup label="State Universities">
                    <option value="University of Colombo">University of Colombo</option>
                    <option value="University of Peradeniya">University of Peradeniya</option>
                    <option value="University of Kelaniya">University of Kelaniya</option>
                    <option value="University of Moratuwa">University of Moratuwa</option>
                    <option value="University of Jaffna">University of Jaffna</option>
                    <option value="University of Sri Jayewardenepura">
                      University of Sri Jayewardenepura
                    </option>
                    <option value="University of Ruhuna">University of Ruhuna</option>
                    <option value="Eastern University, Sri Lanka">Eastern University, Sri Lanka</option>
                    <option value="South Eastern University of Sri Lanka">
                      South Eastern University of Sri Lanka
                    </option>
                    <option value="Wayamba University of Sri Lanka">
                      Wayamba University of Sri Lanka
                    </option>
                  </optgroup>
                </select>
                {errors.universityName && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityName}</p>
                )}
              </div>
  
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  backgroundColor: loading ? "#c3c3e5" : "#4f46e5", // Lighter color when loading
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: loading ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow
                  border: "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#3c40c6"; // Darker hover color
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)"; // Deeper shadow
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#4f46e5"; // Reset to original color
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Reset shadow
                  }
                }}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "3px solid #c3c3e5", // Light grey
                        borderTop: "3px solid #ffffff", // White
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        animation: "spin 1s linear infinite",
                        marginRight: "8px", // Space between spinner and text
                      }}
                    ></div>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Processing...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
  
  
  
              <div className="register-link text-center mt-4">
                <p className="text-indigo-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={() => navigate("/login")}
                    className="text-indigo-400 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default RegisterPage;
