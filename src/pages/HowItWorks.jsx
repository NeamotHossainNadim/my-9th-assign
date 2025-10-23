import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Sparkles, Share2, Star, Users } from "lucide-react";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  const steps = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "1. Join the Community",
      desc: "Sign up and create your profile to showcase your skills, passions, and what you’d love to learn.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-purple-600" />,
      title: "2. Exchange Skills",
      desc: "Browse through thousands of verified users and swap skills directly—no money, just knowledge sharing.",
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "3. Grow Together",
      desc: "Level up your abilities, get reviews, and build lasting connections through mutual learning experiences.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          How SkillSwap Works
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          SkillSwap makes learning collaborative, easy, and fun. 
          Exchange skills directly with others in your area or online — grow faster together.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100"
          >
            <div className="mb-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        data-aos="fade-up"
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to start swapping skills?
        </h2>
        <p className="text-gray-600 mb-6">
          Join the SkillSwap community and start your learning journey today.
        </p>
        <a
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:shadow-lg transition-all"
        >
          <Sparkles size={18} />
          Get Started
        </a>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
