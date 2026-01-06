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
  console.log(err);
  localStorage.setItem("where", 1 );
  navigate("/login");
  
}
}

const About = ()=> {
  navigate("/about");
}

const Contact = ()=> {
  navigate("/contact");
}

 return (
  <>
    {/* NAVBAR */}
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#018790]/10 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-8">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl sm:text-3xl md:text-3xl font-bold text-[#018790] tracking-tight"
        >
          Builder.IO
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={Account}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-[#018790] border-2 border-[#018790] rounded-lg hover:bg-[#018790] hover:text-white transition-all duration-300"
          >
            My Account
          </button>

          <a
            onClick={About}
            className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
          >
            About Us
          </a>

          <a
            onClick={Contact}
            className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>

    {/* HERO SECTION */}
    <main className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4] flex items-center pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 px-4 sm:px-8 py-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#018790] leading-tight tracking-tight">
              Builder.IO
            </h1>
            <div className="h-1 w-20 sm:w-24 bg-[#00B7B5] rounded-full"></div>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-xl font-normal leading-relaxed">
            Create. Edit. Optimize resumes — all in one AI-powered workspace.
          </h2>

          <button
            onClick={createButton}
            className="w-full sm:w-auto px-8 py-4 bg-[#02adaa] text-white text-lg font-semibold rounded-lg hover:bg-[#018790] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Build Resume Now
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#018790]">10K+</div>
              <div className="text-sm sm:text-base text-gray-500">Resumes Created</div>
            </div>
            <div className="h-px sm:h-12 w-full sm:w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#018790]">AI</div>
              <div className="text-sm sm:text-base text-gray-500">Powered</div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - IMAGE */}
        <div className="shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 transform hover:scale-[1.02] transition-transform">
          <div className="w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br from-[#018790]/5 to-[#00B7B5]/5 flex items-center justify-center rounded-xl">
            <img
              src={girlstudent}
              alt="Resume Builder Preview"
              className="w-full h-full object-cover rounded-xl border border-[#018790]/20 shadow-md hover:shadow-lg transition"
            />
          </div>
        </div>
      </div>
    </main>

    {/* HOW IT WORKS SECTION */}
    <main className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4] flex flex-col items-center justify-center px-4 sm:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-[#018790] mb-3 sm:mb-4 tracking-tight">
            How It Works
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-[#00B7B5] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { label: "Pick a template.", color: "#018790", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
            { label: "Fill in the details.", color: "#00B7B5", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
            { label: "Enhance your Resume.", color: "#018790", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
            { label: "Build, edit and download multiple resumes.", color: "#00B7B5", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
          ].map((card, index) => (
            <div
              key={index}
              onClick={() => navigate("/template")}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-[#018790]/10 flex flex-col items-center"
            >
              <div className={`bg-gradient-to-br from-[${card.color}]/5 to-[#00B7B5]/5 rounded-xl p-6 mb-4 sm:mb-6 flex items-center justify-center h-32 sm:h-40 w-full`}>
                <svg className="w-16 h-16 sm:w-24 sm:h-24 text-[${card.color}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
              <p className="text-center text-base sm:text-lg font-semibold text-gray-800">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>

    {/* GET STARTED SECTION */}
    <main className="bg-[#018790] py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
            Get Started Today
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-[#00B7B5] rounded-full mx-auto"></div>
          <p className="text-lg sm:text-xl text-white/90 mt-4 sm:mt-6 max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
            Join thousands of professionals creating stunning resumes with our AI-powered platform
          </p>
          <button
            onClick={createButton}
            className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-white text-[#018790] text-lg sm:text-xl font-bold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Build Resume
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Cards */}
          {[
            { title: "My Account", desc: "Manage your profile and access all your resumes", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", onClick: Account },
            { title: "About Us", desc: "Learn more about our mission and vision", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", onClick: About },
            { title: "Contact", desc: "Get in touch with our support team", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", onClick: Contact },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={card.onClick}
              className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#00B7B5] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{card.title}</h3>
                <p className="text-white/80 mb-4 sm:mb-6 font-normal">{card.desc}</p>
                <button className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-[#018790] font-semibold rounded-lg hover:bg-[#00B7B5] hover:text-white transition-all duration-300">
                  {card.title === "Contact" ? "Contact Us" : card.title === "About Us" ? "Learn More" : "Go to Account"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </>
);

}

export default Home