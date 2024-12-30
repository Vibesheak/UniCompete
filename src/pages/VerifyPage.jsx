import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyPage() {
  const location = useLocation();
  const { email } = location.state || {}; // Get email from location state
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Sample OTP for testing purposes
  const sampleOtp = "123456";

  useEffect(() => {
    if (!email) {
      setMessage("Email not found. Please register first.");
    }
  }, [email]);

  const handleSendOtp = () => {
    // Simulating sending OTP by setting a message
    setMessage(`An OTP has been sent to ${email}.`);
  };

  const handleVerifyOtp = () => {
    // Check if the entered OTP matches the sample OTP
    if (otp === sampleOtp) {
      setMessage("OTP verified successfully!");
      alert("OTP verified successfully! Redirecting to login.");
      // Redirect to the login page if OTP is correct
      navigate("/login");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white h-full">
      <div className="relative w-full max-w-lg p-4 rounded-xl shadow-2xl bg-blue-200">
        <div className="p-4 rounded-lg shadow-xl bg-white">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
            Verify Your Email
          </h1>
          <p className="text-gray-700 mb-4 text-center">
            We’ve sent an OTP to <span className="font-semibold">{email}</span>.
            Please enter the OTP below to verify your account.
          </p>
          <button
            onClick={handleSendOtp}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Send OTP
          </button>
          <p className="text-gray-700 mb-4 text-center mt-4">{message}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
{
  /*
    import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyPage() {
  const location = useLocation();
  const { email } = location.state || {}; // Get email from location state
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setMessage("Email not found. Please register first.");
    }
  }, [email]);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-otp", {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp,
      });
      setMessage(response.data.message);
      if (response.data.message === "OTP verified successfully!") {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          We’ve sent an OTP to <span className="font-semibold">{email}</span>.
          Please enter the OTP below to verify your account.
        </p>
        <button
          onClick={handleSendOtp}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Send OTP
        </button>
        <p className="text-gray-700 mb-4 text-center mt-4">{message}</p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyPage;

    
    */
}
