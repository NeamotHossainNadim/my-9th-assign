import React, { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import Loading from "../components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Explore = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });

    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setFilteredSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading skills:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = skills.filter((skill) =>
      skill.skillName.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "All") {
      results = results.filter(
        (skill) => skill.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (sortBy === "price_low_high") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high_low") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alphabetical") {
      results.sort((a, b) => a.skillName.localeCompare(b.skillName));
    }

    setFilteredSkills([...results]);
  }, [search, category, sortBy, skills]);

  if (loading) return <Loading />;

  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Explore All Skills 
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Discover new talents, sharpen your abilities, and share what you love.
          </p>
        </motion.div>

        <motion.div
          data-aos="fade-up"
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10"
        >
          <div className="relative w-full md:w-1/2">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select
                className="w-full border border-gray-200 rounded-full px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:w-48">
              <select
                className="w-full border border-gray-200 rounded-full px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="price_low_high">Price: Low → High</option>
                <option value="price_high_low">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="alphabetical">A → Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {filteredSkills.length > 0 ? (
          <motion.div
            data-aos="fade-up"
            layout
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.skillId} skill={skill} />
            ))}
          </motion.div>
        ) : (
          <p
            className="text-center text-gray-500 mt-16 text-lg"
            data-aos="fade-up"
          >
            No matching skills found — try a different search or category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
