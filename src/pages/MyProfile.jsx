import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Camera, UserCircle2, Mail } from "lucide-react";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading your profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
      >
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 text-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-blue-100 mt-1">Manage your personal details</p>
        </div>

        
        <div className="p-8 md:p-10 flex flex-col items-center gap-6">
          
          <div className="relative">
            <img
              src={photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              title="Change photo (coming soon)"
            >
              <Camera size={18} />
            </button>
          </div>

          
          <form
            onSubmit={handleUpdateProfile}
            className="w-full md:w-2/3 space-y-5 mt-6"
          >
            
            <div>
              <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                <UserCircle2 className="text-blue-600" size={18} />
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            
            <div>
              <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                <Mail className="text-blue-600" size={18} />
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-md shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
