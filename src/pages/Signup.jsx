// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoFile: null,
    previewUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoFile") {
      const file = files[0];
      setFormData({
        ...formData,
        photoFile: file,
        previewUrl: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Password validation rules
  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, previewUrl } = formData;
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: previewUrl || "https://via.placeholder.com/100",
      });

      toast.success("Signup successful! 🎉 Welcome to SkillSwap");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gradient-to-br from-blue-100 to-indigo-100 min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 rounded-full border-4 border-blue-100 overflow-hidden shadow-md">
              {formData.previewUrl ? (
                <img
                  src={formData.previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                  <ImagePlus size={28} />
                  <span className="text-xs mt-1">Add Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              name="photoFile"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter a strong password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full hover:shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline w-full hover:shadow-md"
        >
          Continue with Google
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
