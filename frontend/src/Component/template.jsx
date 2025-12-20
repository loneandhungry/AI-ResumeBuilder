import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { useRef } from 'react'
import classicImg from "../assets/classic.jpeg"
import modernImg  from "../assets/modern.jpeg"

const Template = () => {
    const navigate = useNavigate();
    
    const modern = () => {
        navigate("/builder" , {
          state : 
          {template: "modern"}
    });
    }

    const classic = () => {
           navigate("/builder" , {
          state : 
          {template: "classic"}
    });
    }

  return (
 <>
  
<div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-20">

  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#018790] text-center mb-12">
    Choose a Template
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Modern Template Card */}
    <div className="bg-white border-2 border-[#b1c6c8] rounded-xl overflow-hidden flex flex-col items-center text-center">
      <img
        src={modernImg}
        alt="Modern Resume Template"
        className="w-full h-40 sm:h-44 object-cover"
      />
      <div className="p-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#018790]">
          Modern Template
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Simple and professional design for modern roles.
        </p>
        <button
          onClick={modern}
          className="px-6 py-2.5 border border-[#018790] text-[#018790] rounded-md font-medium hover:bg-[#018790] hover:text-white transition"
        >
          Select Template
        </button>
      </div>
    </div>

    {/* Classic Template Card */}
    <div className="bg-white border-2 border-[#b1c6c8] rounded-xl overflow-hidden flex flex-col items-center text-center">
      <img
        src={classicImg}
        alt="Classic Resume Template"
        className="w-full h-40 sm:h-44 object-cover"
      />
      <div className="p-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#018790]">
          Classic Template
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Clean and timeless layout for traditional resumes.
        </p>
        <button
          onClick={classic}
          className="px-6 py-2.5 border border-[#018790] text-[#018790] rounded-md font-medium hover:bg-[#018790] hover:text-white transition"
        >
          Select Template
        </button>
      </div>
    </div>

  </div>
</div>

     
</>
  )
}

export default Template