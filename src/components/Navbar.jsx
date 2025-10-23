import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "How It Works", path: "/how-it-works" },
    { title: "Top Providers", path: "/top-providers" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex justify-between items-center">
        
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="SkillSwap Home"
        >
          <motion.img
            whileHover={{ rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZ3JhbW1pbmclMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
            alt="SkillSwap Logo"
            className="w-10 h-10 rounded-xl"
          />
          <span className="font-extrabold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
            SkillSwap
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>
          {user ? (
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-full transition border border-transparent hover:border-gray-200"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-12 bg-white shadow-xl rounded-lg border border-gray-100 w-48 overflow-hidden"
                  >
                    <Link
                      to="/my-profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-gray-200 bg-white shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}

              <div className="border-t border-gray-100 pt-4">
                {user ? (
                  <>
                    <Link
                      to="/my-profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2"
                    >
                      <img
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        {user.displayName?.split(" ")[0] || "User"}
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-center mt-2 text-sm bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-center text-sm border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="text-center text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
