// src/pages/SkillDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out" });

    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.skillId === parseInt(id));
        setSkill(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading skill:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("🎉 Session booked successfully!");
    setForm({ name: "", email: "" });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!skill)
    return (
      <p className="text-center py-20 text-gray-600 text-lg">
        Skill not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto grid md:grid-cols-2 gap-10 items-start"
      >
        {/* Left Column – Skill Info */}
        <div
          data-aos="fade-right"
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <img
            src={skill.image}
            alt={skill.skillName}
            className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
          />

          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            {skill.skillName}
          </h2>
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
            {skill.category}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium">
              👤 {skill.providerName}
            </span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium">
              💰 ${skill.price}
            </span>
            <span className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
              ⭐ {skill.rating}
            </span>
            <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium">
              🪑 Slots: {skill.slotsAvailable || "Available"}
            </span>
          </div>
        </div>

        {/* Right Column – Booking Form */}
        <motion.div
          data-aos="fade-left"
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Book a Session
          </h3>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Reserve a personalized session with <b>{skill.providerName}</b>.
            Enter your details below to confirm your booking.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              Confirm Booking
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500 text-center">
            💡 You’ll receive an email confirmation with your session details.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SkillDetails;
