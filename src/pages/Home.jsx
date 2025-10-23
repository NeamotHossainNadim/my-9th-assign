import React, { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });

    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading skills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-10">
      <section
        className="relative text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 rounded-3xl shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        
        <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZ3JhbW1pbmclMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600')] opacity-10"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Empower Your Future with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
              SkillSwap
            </span>{" "}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100">
            Learn, share, and exchange skills with talented people worldwide.
            Grow together — one skill at a time.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-transform duration-300 hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </section>

      
      <section className="mt-20">
        <div className="text-center mb-10" data-aos="fade-down">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Popular Skills 
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Explore trending skills and learn from the best providers.
          </p>
        </div>

        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          data-aos="fade-up"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.skillId} skill={skill} />
          ))}
        </div>

        <div className="text-center mt-12" data-aos="zoom-in">
          <Link
            to="/explore"
            className="inline-block border border-blue-600 text-blue-600 font-medium px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View More Skills →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
