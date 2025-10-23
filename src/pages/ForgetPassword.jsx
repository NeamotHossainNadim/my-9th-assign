// src/pages/ForgetPassword.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";

const ForgetPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  // Prefill email if passed from login page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("✅ Password reset email sent! Redirecting to Gmail...");
      setTimeout(() => {
        window.location.href = "https://mail.google.com/";
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full text-white mb-3">
            <FaEnvelopeOpenText size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Enter your registered email, and we’ll send you a password reset
            link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-md shadow-md hover:opacity-90 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Back to{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
