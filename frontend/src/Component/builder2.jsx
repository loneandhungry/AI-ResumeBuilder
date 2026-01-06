import React from 'react'

import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Template1 from './template1.jsx';
import Template2 from './template2.jsx';
import axios from 'axios';
import html2pdf from 'html2pdf.js'
import { useRef } from 'react';
import Signup from './signup.jsx';


const Builder2= () => {
  
    const location = useLocation();  //location needs to be declared within the component only, 
    //not outside, becuase it is the LOCATION of the COMPONENENT
    const template = localStorage.getItem("template");
    
    const finalTemplate = template || "modern"; // setting default template
    // to avoid crash if page is refreshed
    const downloadId = (template === "modern") ? "element-to-print-1" : "element-to-print-2";

    const navigate = useNavigate();

const[button,setButton] = useState(false);

console.log(location);
const form = localStorage.getItem("form");
let data =  (form) ? JSON.parse(form) : ""; 


const [formData, setFormData] = useState({  ///WE WILL MAKE AN ARRAY OF ITEMS TO BE CHANGED
    _id: data._id || "",
    template: finalTemplate,
    name: data?.name || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
   education: data?.education || [
    {
      college: "",
      degree: "",
       cg: "",
      start_year: "",
      end_year: "",
      
    },
],
   skills: data?.skills || [""],
   experience: data?.experience || [
    {
        company: "",
        role: "",
        duration: "",
        description: "",
        start_date: "",
        end_date: ""
    }
   ],
   projects: data?.projects || [
    {
        title : "",
        github: "",
        techstack: "",
        description: "",
    },
   ],
   linkedin: data?.linkedin || ""

})

const handleExperience = (index, field, value) =>{
        let newExperience = [...formData.experience];
        newExperience[index]  = {...newExperience[index] , [field] : value}

        setFormData({...formData , experience: newExperience})
}

const addExperience = () =>{
    let newExperience = [...formData.experience];
    newExperience = [...newExperience, { company: "", role:"", duration:"", description:"",start_date:"",end_date:""}]
    setFormData({...formData, experience: newExperience})
}

const removeExperience = () => {
  let Experience = [...formData.experience];
  Experience = Experience.slice(0,-1);                   ////Learn Slice function
  setFormData({...formData, experience: Experience});
}

const HandleProject = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder3");
}



const HandleEnhance = async () =>{ 
   if(!formData.projects[0] && !formData.experience[0]){
    alert("Please fill in the description to use this Features.");
    return;
   }
    setButton(true);
    try{
         let newProject = [...formData.projects];
    for(let i = 0 ; i < formData.projects.length ; i++){
       let  title = formData.projects[i].title;
        let description = formData.projects[i].description; if(!description){break;}
        let techstack = formData.projects[i].techstack;
       
        let data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/project`,
            {
               title,
               description,
               techstack
            },
            {withCredentials: true}
        )
        newProject[i] = {...newProject[i] , description: data.data};
    }
{/* Experience Enhance*/}
 let newExperience= [...formData.experience];
   
    for(let i = 0 ; i < formData.experience.length ; i++){
       let  company = formData.experience[i].company;
    let role = formData.experience[i].role;
        let duration = formData.experience[i].duration;
        let description = formData.experience[i].description; 
        if(!description){
            continue;
        }
        let data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/experience`,
            {
               company,
               role,
               duration,
               description
            },
            {withCredentials: true}
        )
        newExperience[i] = {...newExperience[i] , description: data.data};
    }
     setFormData(prev => ({
      ...prev,
      projects: newProject, 
      experience: newExperience
    }));

} catch(err){
  console.log(err);
  alert("Unable to use this feature currently");
}
setButton(false);
}

const GoBack = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder1");
}

const templateRef = useRef(null);
// console.log(templateRef.current);



  ///
  //  h-screen : OCCUPY FULL HEIGHT OF THE SCREEN 
  return (
  <div className="min-h-screen bg-white flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">

    {/* LEFT SECTION - Form */}
    <div className="lg:w-3/5 w-full">
      <div className="mt-3 mb-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#018790] tracking-tight mb-2 sm:mb-3">
          Add your experience
        </h2>
        <h1 className="text-sm sm:text-base text-gray-500 tracking-tight">
          Time to make your past sound impressive!
        </h1>
      </div>

      <div className="bg-[#F4F4F4] rounded-lg lg:p-6 sm:p-4 p-3 overflow-auto max-h-[70vh] sm:max-h-[80vh] lg:max-h-[90vh]">
        <form className="flex flex-col gap-4 sm:gap-6">

          {/* EXPERIENCE */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-gray-700">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <input
                    className="input border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperience(index, "company", e.target.value)}
                  />
                  <input
                    className="input border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleExperience(index, "role", e.target.value)}
                  />
                  <input
                    className="input border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleExperience(index, "duration", e.target.value)}
                  />
                </div>
                <textarea
                  className="input bg-white border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#00B7B5] focus:outline-none transition-colors min-h-[120px] resize-none"
                  placeholder="Describe your work, impact, technologies used..."
                  value={exp.description}
                  onChange={(e) => handleExperience(index, "description", e.target.value)}
                />
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-secondary w-fit" onClick={addExperience}>
                + Add Experience
              </button>
              <button type="button" className="btn-secondary w-fit" onClick={removeExperience}>
                + Remove Experience
              </button>
            </div>
          </div>

          {/* ENHANCE BUTTON */}
          <div>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border w-full sm:w-auto
                ${button === false ? "bg-white" : "bg-[#00B7B5]/10"}
                border-[#00B7B5] text-[#00B7B5] text-base sm:text-lg
                hover:bg-[#00B7B5]/10 transition`}
              onClick={HandleEnhance}
            >
              ✨ Enhance with AI
            </button>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="button"
              className="px-6 py-2 rounded-md border-2 border-[#00B7B5] text-[#00B7B5] text-base sm:text-lg hover:bg-[#00B7B5]/20 transition w-fit"
              onClick={HandleProject}
            >
              Add Projects Next
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-md border-2 border-[#00B7B5] text-[#00B7B5] text-base sm:text-lg hover:bg-[#00B7B5]/20 transition w-fit"
              onClick={GoBack}
            >
              Go Back
            </button>
          </div>

        </form>
      </div>
    </div>

    {/* RIGHT SECTION - Live Preview */}
    <div className="lg:w-2/5 w-full mt-6 lg:mt-0">
      <div
        ref={templateRef}
        className="border border-dashed border-gray-300 rounded-md bg-gray-50 overflow-auto max-h-[50vh] sm:max-h-[70vh] lg:max-h-[85vh] p-2 sm:p-4"
      >
        {finalTemplate === "modern" ? (
          <Template1 data={formData} />
        ) : (
          <Template2 data={formData} />
        )}
      </div>
    </div>

  </div>
);



}

export default Builder2