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
        "http://localhost:5000/signup",
        {
          username: formData.username,
          password: formData.password
        },
        { withCredentials: true }
      );

      alert(response.data.msg);

      if (response.data.msg === "Your username and password is saved.") {
        navigate("/login", {
          state: { user: data }
        });
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.msg || "SignUp Failed");
    }
  };

  const LoginFxn = () => {
    navigate("/login", {
      state: { user: data }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-[#018790]/20 rounded-lg shadow-sm p-8">

        <h1 className="text-3xl font-bold text-[#018790] text-center mb-2">
          Builder.IO
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Create an account to start building your resume
        </p>

        <form className="space-y-5" onSubmit={signupFxn}>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-[#018790]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B7B5]"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-[#018790]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B7B5]"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-[#00B7B5] text-white font-medium rounded-md hover:bg-[#018790] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <button
            onClick={LoginFxn}
            className="text-[#018790] font-medium hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;
