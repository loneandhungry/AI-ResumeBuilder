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
  const[refresh,setRefreh] = useState(false);


  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
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
  }, [ ]); 


useEffect(() => {
  const getResume = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/resume/all`,
        { withCredentials: true }
      );
      const reverse = [...res.data].reverse();
      setResumes(reverse);
    } catch (err) {
      console.log(err);
    }
  };

  getResume();
  
}, [refresh]);

const handleEdit = (resume) => {
  localStorage.setItem("form", JSON.stringify(resume));
  localStorage.setItem("template", resume.template);
    navigate("/builder", 
    )
};
const signout = async() =>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signout`,
        {},
        {withCredentials: true
    });
    navigate("/", {replace: true});
}


const createResume = () =>{
    navigate("/template" , {
        state: {
            profile: profile
        }
    })
  }

  const deleteResume = async (resume) => {
    const resumeId = resume._id;
    try{
      console.log(resumeId);
      const response =await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/resumeDelete/${resumeId}`,
        {withCredentials: true}
      );
    (refresh=== false) ? setRefreh(true) :setRefreh(false);
  
    } catch(err){
      console.log(err);
    }
    return null;
  }

const time = (time) => {
              let diff = Math.floor((new Date() - new Date(time))/60000); //returned in milliseconds
              if(diff < 1) return "Just now"
              if(diff < 60) return `${diff} mins ago`
              if(Math.floor(diff/60) <48) return `${Math.floor(diff/60)} hours ago`
              else return `${new Date(time).toLocaleDateString("en-IN")}`
}


 return(
  <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

    {/* HERO GREETING */}
    <div className="max-w-7xl mx-auto mb-8 sm:mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#018790] leading-none tracking-tight">
            Hi, {user} 👋
          </h1>
          <div className="h-1 w-20 bg-[#00B7B5] rounded-full mt-4"></div>
        </div>

        <button
          onClick={signout}
          className="w-fit px-6 py-3 text-sm font-semibold
            border-2 border-[#018790] text-[#018790]
            rounded-lg hover:bg-[#018790] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Sign Out
        </button>
      </div>

      <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl font-normal leading-relaxed">
        Here are the resumes you've created. Continue editing or start a new one.
      </p>
    </div>

    {/* CONTENT */}
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Resumes
        </h2>

        <button
          onClick={createResume}
          className="w-fit px-8 py-3 bg-[#00B7B5] text-white text-base font-semibold rounded-lg hover:bg-[#018790] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          + Create Resume
        </button>
      </div>

      {/* RESUME GRID */}
      {resumes.length === 0 ? (
        <div className="bg-white border-2 border-[#018790]/10 rounded-2xl p-12 sm:p-16 text-center shadow-lg">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 font-medium">
            You haven't created any resumes yet.
          </p>
          <button
            onClick={createResume}
            className="px-8 py-4 bg-[#00B7B5] text-white text-lg font-semibold rounded-lg hover:bg-[#018790] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-[#F4F4F4] border-2 border-[#018790]/10 rounded-md shadow-s hover:shadow-xl transition-all duration-300 p-6 transform hover:scale-[1.02]"
            >
              <div>
                <h3 className="text-xl font-bold text-[#018790] truncate mb-1">
                  Resume ID
                </h3>
                <p className="text-sm text-gray-500 break-all">
                  {resume._id}
                </p>
                <h3 className="text-lg font-semibold text-[#018790] truncate">
          Last Edited : {time(resume.updatedAt)}
        </h3>
        <p className="text-sm text-gray-500 break-all mt-1">
        

         
        </p>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2.5 rounded-lg
                    bg-[#00B7B5] text-white text-sm font-semibold
                    hover:bg-[#018790] transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => handleEdit(resume)}
                >
                  Edit Resume
                </button>

                <button
                  className="flex-1 px-4 py-2.5 rounded-md
                    border-2 border-[#00B7B5] text-[#00B7B5] text-sm font-semibold
                    hover:bg-[#00B7B5]/10 transition-all duration-300 "
                  onClick={() => handleEdit(resume)}
                >
                  Download
                </button >
              </div>
              <div>
                <button className="mt-3 px-4 py-2.5 rounded-md
                    border-2 border-[#cd5151] text-[#cd5151] text-sm font-semibold
                    hover:bg-[#cd5151]/10 transition-all duration-300 w-full"
                    onClick={() => deleteResume(resume)}>
                   Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);



};

export default Landing