import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import girlstudent from '../assets/girl student.jpg'

const Home = () => {
      const navigate = useNavigate();
      const createButton = () =>{
        navigate("/template")
      }

const Account = async() => {
  try{
   const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
   navigate("/landing")
}catch(err){
  localStorage.setItem("where", 1 );
  navigate("/login")
}
    
}

  return (
   <>
 
  <nav className="fixed top-0 left-0 w-full bg-[#F4F4F4] border-b border-[#018790]/20 z-50">
    <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
      
      {/* Logo */}
      <div className="text-xl font-bold text-[#018790] ">
          Builder.IO
      </div>

 
      <div className="flex items-center gap-4">
        <button onClick = {Account}
          className="px-4 py-2 text-sm font-medium text-[#018790] border border-[#018790] rounded-md hover:bg-[#018790] hover:text-white transition"
        >
          My Account
        </button>

        <a
          href=""
          className="text-sm font-medium text-[#018790] hover:underline"
        >
          About Us
        </a>

        <a
          href=""
          className="text-sm font-medium text-[#018790] hover:underline"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>

 
  <main className="min-h-screen bg-[#F4F4F4] flex items-center pt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
      
 
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#018790] leading-tight">
          Builder.IO
         </h1>

       <h2 className="text-xl md:text-2xl text-gray-700 max-w-lg font-medium">
          Create professional resumes faster — powered by AI.
        </h2>

        <button
          onClick={createButton}
          className="px-6 py-3 bg-[#00B7B5] text-white font-lg rounded-md hover:bg-[#018790] transition"
        >
          Create Resume
        </button>
      </div>

  
      <div className="w-full h-72 md:h-96 bg-white 
  border border-[#018790]/20 
  rounded-xl shadow-md
  overflow-hidden 
  hover:shadow-lg transition">
         <img
        src={girlstudent}
           alt="Resume Builder Preview"
        className="w-full h-full object-cover"
  />
      </div>

    </div>
  </main>
</>

  )
}

export default Home