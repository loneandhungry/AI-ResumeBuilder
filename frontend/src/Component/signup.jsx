import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const data = location?.state?.user;
  console.log(data)

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const signupFxn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        {
          username: formData.username,
          password: formData.password
        },
        { withCredentials: true }
      );

      alert(`${response.data.msg}. Please login now.`);

      if (response.data.msg === "Your username and password is saved.") {
        navigate("/login", {
          state: { user: data },
           replace: true
        });
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.msg || "SignUp Failed");
    }
  };

  const LoginFxn = () => {
    navigate("/login", {
      state: { user: data },
      replace: true
    });
  };

  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4] flex items-center justify-center px-6 py-12">
      
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
         
          <h1 className="text-5xl font-black text-[#018790] mb-2 tracking-tight">
            Builder.IO
          </h1>
          <div className="h-1 w-20 bg-[#00B7B5] rounded-full mx-auto mb-3"></div>
          <p className="text-base text-xl text-gray-600 font-normal">
          Create an account and <span className="text-[#018790] font-semibold">Continue Building</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-[#018790]/20 rounded-xl shadow-xl p-8 hover: transition-shadow duration-300">
          <form className="space-y-6" onSubmit={signupFxn}>
            {/* Username Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#00B7B5] transition-colors"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#00B7B5] transition-colors"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-4 bg-[#018790] text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

         
          <p className="text-[17px] text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <button
              onClick={LoginFxn}
              className="cursor-pointer text-[#018790] font-bold hover:text-[#00B7B5] transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </>
);
};

export default Signup;
