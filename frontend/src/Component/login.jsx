import React from 'react'
import { useNavigate } from 'react-router-dom'
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
       const response = await axios.post("http://localhost:5000/signin",{
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
   if(localStorage.getItem("where")){
    navigate("/landing", 
      { state : {
        user : data,
      }}
    )
    console.log(data);
    }else{
    navigate("/builder", 
      { state : {
        user : data,
      }}
    )
}

    }

   } catch(err){
     console.log(err); 
     alert(err?.response?.data?.msg || "Login Failed")  //Check if there is response.data.msg, 
     // if not we give a general message.

    }
     
    }

    const [formData, setFormData] = useState({
      username : "",
      password : ""
   
    })

return (
  <>

    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-6">
      
  
      <div className="w-full max-w-md bg-white border border-[#018790]/20 rounded-lg shadow-sm p-8">
        

        <h1 className="text-3xl font-bold text-[#018790] text-center mb-2">
          Builder.IO
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Login to continue building your resume
        </p>


        <form
          className="space-y-5"
          onSubmit={(e) => {
            LoginFunction(e);
          }}
        >
       
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-[#018790]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B7B5]"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
              placeholder="Enter your username"
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-[#018790]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B7B5]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Enter your password"
            />
          </div>

       
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-[#00B7B5] text-white font-medium rounded-md hover:bg-[#018790] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </>
);
}

export default Login