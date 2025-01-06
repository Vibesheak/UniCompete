import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
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
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: response.data,
          confirmButtonColor: "#4CAF50",
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token); // Store the JWT token
          localStorage.setItem("expiresIn", data.expiresIn); // Optional: Store expiry time

          // Decode the JWT token to extract user roles
          const decodedToken = jwtDecode(data.token);
          console.log(decodedToken);
          const userRole = decodedToken.roles;

          // Navigate based on the role
          if (userRole.includes("ADMIN")) {
            navigate("/adminpage");
          } else {
            navigate("/profile");
          }
        } else {
          const errorText = await response.text();
          Swal.fire({
            icon: "error",
            title: "Error Occurred",
            text: errorText,
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data || error,
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center relative inset-0 w-full h-full">
      {/* Light Blue Background Blur */}

      <div className="relative w-full max-w-8xl p-8 rounded-2xl shadow-2xl bg-blue-100">
        <div className="flex flex-col md:flex-row overflow-hidden rounded-xl">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 via-blue-100 to-blue-100 text-white p-6 relative">
            <div className="absolute inset-y-0 right-0 w-24 bg-white/10 rounded-full blur-3xl"></div>

            <div className="flex flex-col items-center justify-center">
              <h1
                className="text-3xl font-bold mb-2 animate-pulse text-blue-800"
                style={{ marginTop: "3rem" }}
              >
                W E L C O M E
              </h1>

              <p
                className="text-lg mb-4 text-center animate-pulse text-blue-800"
                style={{ marginTop: "1rem" }}
              >
                Log in now to access the ultimate hub for university
                competitions. Manage your participation, track progress, and
                connect with a thriving competitive community!
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-blue-100 p-8">
            <form onSubmit={handleSubmit} className="form-box">
              <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                <b>L O G I N</b>
              </h1>

              <div className="input-box relative mb-4">
                <div className="input-box relative mb-4">
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
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
              <button className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
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
    </div>
  );
}
export default LoginPage;
