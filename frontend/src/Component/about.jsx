import React from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const Account = async() => {
  try{
   const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
   navigate("/landing")
}catch(err){
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
    <div>

        <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#018790]/10 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">
          
         
          <div  onClick = {()=>{
            navigate("/");
          }}
          className="cursor-pointer text-3xl font-bold text-[#018790] tracking-tight">
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

   <div className="max-w-6xl mx-auto px-6 py-16">
  
  {/* Header */}
  <div className="text-center mb-16">
    <h1 className="text-4xl sm:text-5xl font-black text-[#018790] py-10 mb-4 tracking-tight">
      About Builder.IO
    </h1>
    <div className="h-1 w-24 bg-[#00B7B5] rounded-full mx-auto mb-6"></div>
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
      Create Resume in 4 Simple Steps
    </h2>
  </div>

  {/* Steps */}
  <div className="space-y-8">
    
    {/* Step 1 */}
    <div className="bg-white border-2 border-[#018790]/20 rounded-2xl p-8 shadow-lg ">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#018790] to-[#00B7B5] rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0">
          1
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#018790] mb-3">
            Choose a Template
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Choose the perfect template design from a variety of professional, ATS-friendly resumes. 
            The perfect template, suitable for your role!
          </p>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="bg-white border-2 border-[#018790]/20 rounded-2xl p-8 shadow-lg ">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#018790] to-[#00B7B5] rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0">
          2
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#018790] mb-3">
            Fill in the Details
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Fill in all your resume details such as education, experience and projects.
          </p>
        </div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="bg-white border-2 border-[#018790]/20 rounded-2xl p-8 shadow-lg ">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#018790] to-[#00B7B5] rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0">
          3
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#018790] mb-3">
            Enhance!!
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Enhance your resume descriptions using our "Enhance AI" feature. Make it perfect!
          </p>
        </div>
      </div>
    </div>

    {/* Step 4 */}
    <div className="bg-white border-2 border-[#018790]/20 rounded-2xl p-8 shadow-lg ">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#018790] to-[#00B7B5] rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0">
          4
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#018790] mb-3">
            Download It
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Download your resume in PDF form, create, edit and store multiple resumes. Any time you wanna 
            come back and make changes, we are here for you!
          </p>
        </div>
      </div>
    </div>

  </div>
</div>

<div className="flex justify-center pb-10 ">
  <button 
    onClick={() => {
      navigate("/template");
    }}
    className= "px-8  py-4 bg-[#00B7B5] text-white text-lg font-semibold rounded-lg hover:bg-[#018790] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    Create Resume Now
  </button>
</div>

    </div>
  )
}

export default About