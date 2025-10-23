import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Star, Award, Users } from "lucide-react";

const TopProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });

    // Simulated API fetch (replace with real API or Firebase query)
    setTimeout(() => {
      setProviders([
        {
          id: 1,
          name: "Jhankar Mahbub",
          skill: "Sr. Web Developer",
          rating: 5.0,
          students: 5500,
          image: "https://media.licdn.com/dms/image/v2/D5603AQEOjP3ON2knRg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1677507599579?e=2147483647&v=beta&t=Ls0zB8ECyR1hp4iepkmhX5a62nP6TlhzCp1_ZEghicI",
        },
        {
          id: 2,
          name: "Abdur Rakib",
          skill: "React Development",
          rating: 4.8,
          students: 3000,
          image: "https://media.licdn.com/dms/image/v2/D5603AQF4GyD7Co0zcA/profile-displayphoto-shrink_400_400/B56ZecdLNrG0Ak-/0/1750676584571?e=1762992000&v=beta&t=afQADB1q4-Ayzeyp7y_zQRQK7Q2xSryCCaFuyukbitU",
        },
        {
          id: 3,
          name: "Abid Ahmed Sobhan",
          skill: "MERN Developer",
          rating: 4.7,
          students: 4000,
          image: "https://media.licdn.com/dms/image/v2/D5603AQEjn5YuqWs6uw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1668986272944?e=1762992000&v=beta&t=_pe9xzdhwoxZ069Z0pTK8z9so5k1OZMnmahoIvbmWaA",
        },
        {
          id: 4,
          name: "Azizul Islam Milton",
          skill: "Team Leader",
          rating: 4.8,
          students: 5000,
          image: "https://media.licdn.com/dms/image/v2/D5603AQFsYPoH4a08sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680809383137?e=1762992000&v=beta&t=aVNxoxutTrEWXkZd2ozz63yl2tyFiTJsoiE-JuOwBog",
        },
      ]);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          Top Skill Providers 
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Meet our most trusted and highest-rated mentors who have empowered
          hundreds of learners through SkillSwap.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {providers.map((p, index) => (
          <motion.div
            key={p.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100"
          >
            <motion.img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-sm border border-gray-200"
              whileHover={{ scale: 1.05 }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{p.skill}</p>
            <div className="flex justify-center items-center gap-1 text-yellow-500 mb-2">
              <Star size={16} />
              <span className="font-medium text-gray-700">{p.rating}</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              <span>{p.students}+ learners</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div data-aos="fade-up" className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Want to become a Top Provider?
        </h2>
        <p className="text-gray-600 mb-6">
          Share your skills with the world and inspire others to grow.
        </p>
        <a
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:shadow-lg transition-all"
        >
          <Award size={18} />
          Join as a Provider
        </a>
      </motion.div>
    </div>
  );
};

export default TopProviders;
