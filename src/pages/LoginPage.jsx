import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "",
    institute: "",
  });

  const handleRegisterLink = () => {
    setIsLogin(false);
    setErrors({}); // Reset errors when switching
  };

  const handleLoginLink = () => {
    setIsLogin(true);
    setErrors({}); // Reset errors when switching
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

  const validateRegistration = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.role) errors.role = "Role is required.";
    if (!formData.institute) errors.institute = "Institute is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = isLogin ? validateLogin() : validateRegistration();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Save user data to localStorage (or sessionStorage) after successful login
      localStorage.setItem("user", JSON.stringify(formData));
      // After login, navigate back to the /profile page
      navigate("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white h-full">
      <div className="relative w-full max-w-lg p-4 rounded-xl shadow-2xl bg-blue-200">
        <div className="p-4 rounded-lg shadow-xl bg-white">
          {isLogin ? (
            <form
              onSubmit={handleSubmit}
              className="form-box transition-all transform hover:scale-105 duration-500 ease-in-out"
            >
              <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-4">
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
          ) : (
            <form
              onSubmit={handleSubmit}
              className="form-box transition-all transform hover:scale-105 duration-500 ease-in-out"
            >
              <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-4">
                Register
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
              <div className="input-box relative mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <MdEmail className="absolute left-4 top-4 text-gray-400" />
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
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <IoMdPhonePortrait className="absolute left-4 top-4 text-gray-400" />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="input-box mb-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">Select Role</option>
                  <option value="student">UserSelect</option>
                  <option value="teacher">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
              <div className="input-box mb-4">
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">
                    -- Select Your University or Institute --
                  </option>
                  <optgroup label="State Universities">
                    <option value="Colombo">University of Colombo</option>
                    <option value="Peradeniya">University of Peradeniya</option>
                    <option value="Kelaniya">University of Kelaniya</option>
                    <option value="Moratuwa">University of Moratuwa</option>
                    <option value="Jaffna">University of Jaffna</option>
                    <option value="Sri Jayewardenepura">
                      University of Sri Jayewardenepura
                    </option>
                    <option value="Ruhuna">University of Ruhuna</option>
                    <option value="Eastern">
                      Eastern University, Sri Lanka
                    </option>
                    <option value="South Eastern">
                      South Eastern University of Sri Lanka
                    </option>
                    <option value="Wayamba">
                      Wayamba University of Sri Lanka
                    </option>
                  </optgroup>
                  <optgroup label="Professional Institutes">
                    <option value="IESL">
                      Institute of Engineers Sri Lanka (IESL)
                    </option>
                    <option value="CIMA">
                      Chartered Institute of Management Accountants (CIMA)
                    </option>
                    <option value="CA">
                      Institute of Chartered Accountants of Sri Lanka (CA Sri
                      Lanka)
                    </option>
                    <option value="SLIIT">
                      Sri Lanka Institute of Information Technology (SLIIT)
                    </option>
                    <option value="NIBM">
                      National Institute of Business Management (NIBM)
                    </option>
                    <option value="BCAS">BCAS Campus</option>
                    <option value="APIIT">
                      Asia Pacific Institute of Information Technology (APIIT)
                    </option>
                  </optgroup>
                </select>
                {errors.institute && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.institute}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
              >
                Register
              </button>
              <div className="register-link text-center mt-4">
                <p className="text-indigo-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={handleLoginLink}
                    className="text-indigo-400 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
