import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkillDetails from "./pages/SkillDetails";
import MyProfile from "./pages/MyProfile";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import HowItWorks from "./pages/HowItWorks";
import TopProviders from "./pages/TopProviders";
import Explore from "./pages/Explore";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/top-providers" element={<TopProviders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          
          <Route
            path="/skills/:id"
            element={
              <ProtectedRoute>
                <SkillDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
