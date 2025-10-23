import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";


const skillImages = {
  "Web Development":
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
  "Graphic Design":
    "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=80",
  "Digital Marketing":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "UI/UX Design":
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
  "Photography":
    "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
  "Data Science":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "Cybersecurity":
    "https://images.unsplash.com/photo-1614064641621-4a9f5b2b21a7?auto=format&fit=crop&w=800&q=80",
  "AI & Machine Learning":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "Video Editing":
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7f39a?auto=format&fit=crop&w=800&q=80",
  "Content Writing":
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
};

const SkillCard = ({ skill }) => {
  const { skillId, skillName, providerName, price, rating, category } = skill;

  
  const imageUrl =
    skillImages[skillName] ||
    skillImages[category] ||
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl bg-gradient-to-b from-white to-gray-50 transition-all duration-300 group"
    >
      
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={skillName || "Skill"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
          <Link
            to={`/skills/${skillId}`}
            className="mb-4 bg-white/90 text-blue-700 font-semibold px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            View Details
          </Link>
        </div>

        
        <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
          {category || "Skill"}
        </span>
      </div>

      
      <div className="p-6 flex flex-col justify-between h-52">
        <div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {skillName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            by{" "}
            <span className="font-medium text-gray-700">{providerName}</span>
          </p>
        </div>

        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${price}
          </span>
          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <FaStar size={15} />
            <span>{rating?.toFixed(1) || "4.5"}</span>
          </div>
        </div>

        
        <Link
          to={`/skills/${skillId}`}
          className="mt-5 block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 sm:hidden focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          View Details
        </Link>
      </div>

      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;
