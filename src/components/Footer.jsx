import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 mt-16">
      
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">
        
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">
            SkillSwap
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering people to connect, share, and grow by exchanging skills
            in their local communities. Learn something new every day.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/#how-it-works"
                className="hover:text-blue-400 transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start gap-4">
            {[
              {
                href: "https://facebook.com",
                icon: <FaFacebookF />,
                color: "hover:text-blue-500",
              },
              {
                href: "https://twitter.com",
                icon: <FaTwitter />,
                color: "hover:text-sky-400",
              },
              {
                href: "https://instagram.com",
                icon: <FaInstagram />,
                color: "hover:text-pink-500",
              },
              {
                href: "https://linkedin.com",
                icon: <FaLinkedinIn />,
                color: "hover:text-blue-600",
              },
            ].map(({ href, icon, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-gray-800 ${color} transition-all duration-300 hover:scale-110`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-800"></div>

      
      <div className="py-4 text-center text-sm text-gray-500">
        © {currentYear} <span className="font-semibold text-white">SkillSwap</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
