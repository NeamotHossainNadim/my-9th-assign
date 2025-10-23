// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { motion } from "framer-motion";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Elegant loading screen while checking auth
  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        ></motion.div>
        <p className="text-sm font-medium">Checking your access...</p>
      </div>
    );
  }

  // If user is not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated → render protected page
  return children;
};

export default ProtectedRoute;
