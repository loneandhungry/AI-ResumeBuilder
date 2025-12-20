import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [user, setUser] = useState("");
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();
  const[profile, setProfile] = useState({ });


  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/profile",
          { withCredentials: true }
        );

        setUser(res.data.username);
        setProfile(res.data.profile);
        console.log(res.data);
       
      } catch (err) {
        console.log(err);
      }
    };

    response();
  }, []); // Make sure that the this runs only when the page reloads


useEffect(() => {
  const getResume = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/resume/all",
        { withCredentials: true }
      );
      setResumes(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  getResume();
}, []);

const handleEdit = (resume) => {
    navigate("/builder", {state: resume }
    )
};
const signout = async() =>{
    const response = await axios.post("http://localhost:5000/signout",
        {},
        {withCredentials: true
    })
    navigate("/login");
}
const ResumeCard = ({ resume, OnEdit }) => {
  return (
    <div className="bg-white border border-[#018790]/20 rounded-lg shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition">

      {/* Resume Info */}
      <div>
        <h3 className="text-lg font-semibold text-[#018790] truncate">
          Resume ID
        </h3>
        <p className="text-sm text-gray-500 break-all mt-1">
          {resume._id}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button
          className="flex-1 px-4 py-2 rounded-md
            bg-[#00B7B5] text-white text-sm font-medium
            hover:bg-[#018790] transition"
          onClick={() => handleEdit(resume)}
        >
          Edit Resume
        </button>

        <button
          className="flex-1 px-4 py-2 rounded-md
            border border-[#00B7B5] text-[#00B7B5] text-sm font-medium
            hover:bg-[#00B7B5]/10 transition"
          onClick={() => handleEdit(resume)}
        >
          Download
        </button>
      </div>
    </div>
  );
};

const createResume = () =>{
    navigate("/builder" , {
        state: {
            profile: profile
        }
    })
}

 return (
  <div className="min-h-screen bg-[#F4F4F4] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

    {/* HERO GREETING */}
    <div className="max-w-7xl mx-auto mb-10 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#018790] leading-tight">
          Hi, {user} 👋
        </h1>

        <button
          onClick={signout}
          className="w-fit px-5 py-2.5 text-sm font-medium
            border border-[#018790] text-[#018790]
            rounded-md hover:bg-[#018790] hover:text-white transition"
        >
          Sign Out
        </button>
      </div>

      <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl">
        Here are the resumes you’ve created. Continue editing or start a new one.
      </p>
    </div>

    {/* CONTENT */}
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Your Resumes
        </h2>

        <button
          onClick={createResume}
          className="w-fit px-6 py-3 bg-[#00B7B5] text-white font-medium rounded-md hover:bg-[#018790] transition"
        >
          + Create Resume
        </button>
      </div>

      {/* RESUME GRID */}
      {resumes.length === 0 ? (
        <div className="bg-white border border-[#018790]/20 rounded-lg p-8 sm:p-10 text-center text-gray-500">
          <p className="text-base sm:text-lg mb-4">
            You haven’t created any resumes yet.
          </p>
          <button
            onClick={createResume}
            className="px-6 py-3 bg-[#00B7B5] text-white rounded-md hover:bg-[#018790] transition"
          >
            Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white border border-[#018790]/20 rounded-lg shadow-sm hover:shadow-md transition p-5"
            >
              <ResumeCard
                resume={resume}
                OnEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);


};

export default Landing