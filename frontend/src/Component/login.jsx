import React from 'react'
import { replace, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    let data = localStorage.getItem("form");

    console.log(data);
    /// LOGIN FUNCTION
    const LoginFunction = async(e) =>{
      console.log(formData);
      e.preventDefault();  //STOPS FROM RELOADING
      

      //

    try{
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signin`,{
        username: formData.username,
        password: formData.password
      },
    {
      withCredentials: true  //In Axios, the withCredentials property is a boolean flag 
      // that indicates whether the browser should include credentials 
      // (such as cookies, Authorization headers, or TLS client certificates) in cross-origin requests. 
    })
    alert(response.data.msg); 
       // AXIOS does not send the response message directly. 
    if(response.data.msg === "Successful Login!" ){     //axios.get
       if(localStorage.getItem("where") == "0"  ){      /////DOUBTTT
      navigate("/builder3", 
      { state : data ,
        replace: true
      }
    )
    localStorage.removeItem("where");
    }else{
      navigate("/landing", {
      state: { user: data },
      replace: true                    ///USED TO CLEAR NAVIGATE HISTORY, SO THAT ON PRESSING BACK THE USER DOESNT COME BACK TO THIS PAGE, 
                 });                   // AND REDIRECTS TO THE DEFAULT PAGE
     localStorage.removeItem("where");
}

    }

   } catch(err){
     console.log(err); 
     alert(err?.response?.data?.msg || "Login Failed")  //Check if there is response.data.msg, 
     // if not we give a general message.

    }
     
    }

    const SignUpFxn = () => {
    navigate("/signup", {
      state: { user: data },
      replace: true
    });
  };

    const [formData, setFormData] = useState({
      username : "",
      password : ""
   
    })

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
          Login to <span className="text-[#018790] font-semibold">Continue Building</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-[#018790]/20 rounded-xl shadow-xl p-8 hover: transition-shadow duration-300">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              LoginFunction(e);
            }}
          >
            {/* Username Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#00B7B5] transition-colors"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="text"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#00B7B5] transition-colors"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-4 bg-[#018790] text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-[17px] text-gray-600 text-center mt-6">
            Don't have an account?{" "}
            <button
              onClick={SignUpFxn}
              className="text-[#018790] font-bold hover:text-[#00B7B5] transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  </>
);
}

export default Login