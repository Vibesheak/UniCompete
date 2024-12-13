import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});

  const handleRegisterLink = () => setIsLogin(false);
  const handleLoginLink = () => setIsLogin(true);

  const validateLogin = () => {
    const errors = {};
    const username = document.querySelector(
      "input[placeholder='Username']"
    ).value;
    const password = document.querySelector(
      "input[placeholder='Password']"
    ).value;

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";

    return errors;
  };

  const validateRegistration = () => {
    const errors = {};
    const username = document.querySelector(
      "input[placeholder='Username']"
    ).value;
    const password = document.querySelector(
      "input[placeholder='Password']"
    ).value;
    const email = document.querySelector("input[placeholder='Email']").value;
    const phone = document.querySelector(
      "input[placeholder='Phone Number']"
    ).value;

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";
    if (!email) errors.email = "Email is required.";
    if (!phone) errors.phone = "Phone number is required.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = isLogin ? validateLogin() : validateRegistration();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {" "}
      {/* Solid background color */}
      <div className="relative w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white bg-opacity-90">
        <div className="p-8 rounded-lg shadow-xl bg-white">
          {isLogin && (
            <form
              onSubmit={handleSubmit}
              className="form-box transition-all transform hover:scale-105 duration-500 ease-in-out"
            >
              <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">
                Login
              </h1>
              <div className="input-box relative mb-6">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div className="input-box relative mb-6">
                <input
                  type="password"
                  placeholder="Password"
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
          )}
          {!isLogin && (
            <form
              onSubmit={handleSubmit}
              className="form-box transition-all transform hover:scale-105 duration-500 ease-in-out"
            >
              <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">
                Register
              </h1>
              <div className="input-box relative mb-6">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div className="input-box relative mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <RiLockPasswordFill className="absolute left-4 top-4 text-gray-400" />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="input-box relative mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <MdEmail className="absolute left-4 top-4 text-gray-400" />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="input-box relative mb-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <IoMdPhonePortrait className="absolute left-4 top-4 text-gray-400" />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="input-box mb-6">
                <select
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                >
                  <option value="">-- Select Your Role --</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="input-box mb-6">
                <select
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                >
                  <option value="">-- Select Your Institute --</option>
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
