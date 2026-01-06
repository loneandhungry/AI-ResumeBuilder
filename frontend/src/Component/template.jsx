import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { useRef } from 'react'
import classicImg from "../assets/classic_template.jpeg"
import modernImg  from "../assets/modern_template.jpeg"
import axios from 'axios'

const Template = () => {
    const navigate = useNavigate();
    
    const modern = () => {
      localStorage.setItem("template" , "modern");
        navigate("/builder" , 
         );
    }

    const classic = () => {
      localStorage.setItem("template" , "classic");
           navigate("/builder" );

    }

    const Account = async() => {
  try{
   const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
   navigate("/landing")
}catch(err){
  console.log(err);
  localStorage.setItem("where", 1 );
  navigate("/login");
  
}
    
}

  return (
  <>

<div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4]  py-12">
      <div className=" ">
      
        <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#018790]/10 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">
          
          {/* Logo */}
          <div className="text-3xl font-bold text-[#018790] tracking-tight">
            Builder.IO
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={Account}
              className="px-5 py-2.5 text-sm font-semibold text-[#018790] border-2 border-[#018790] rounded-lg hover:bg-[#018790] hover:text-white transition-all duration-300"
            >
              My Account
            </button>

            <a
              href=""
              className="text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
            >
              About Us
            </a>

            <a
              href=""
              className="text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

        {/* Header Section */}
        <div className="text-center mb-5 pt-13">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#018790] leading-none tracking-tight mb-2">
            Choose a Template
          </h1>
          <div className="h-1 w-20 bg-[#00B7B5] rounded-full mx-auto mb-4"></div>
        </div>

    </div>
 {/* Templates Stack */}
       <main className='bg-[#018790] pt-8 pb-10 -mx-8'>
  
  {/* Subtitle */}
  <p className="text-lg text-white/90 text-center max-w-2xl mx-auto font-medium mb-8 px-4">
    Select the perfect design that matches your professional style
  </p>

  {/* Images Grid */}
  <div className="relative flex flex-wrap gap-8 justify-center w-full px-4">
    
    {/* Modern Template */}
    <div className="relative group">
      <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl group-hover:bg-white/20 transition-all duration-300"></div>
      <img
        onClick={modern}
        src={modernImg}
        alt="Modern Resume Template"
        className="relative w-66 h-[370px] object-contain bg-grey-300 backdrop-blur-sm border-4 border-white/30 hover:border-amber-300 rounded-md shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      />
     
    
    </div>
    
    {/* Classic Template */}
    <div className="relative group">
      <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl group-hover:bg-white/20 transition-all duration-300"></div>
      <img
        onClick={classic}
        src={classicImg}
        alt="Classic Resume Template"
        className="relative w-66 h-[370px] object-contain bg-gray-300 backdrop-blur-sm border-4 border-white/30 hover:border-amber-300 rounded-md shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      />
  
    </div>
    
  </div>

</main>

    </div>

  </>
);
}

export default Template