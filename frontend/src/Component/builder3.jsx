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




const Builder3 = () => {
  
    const location = useLocation();  //location needs to be declared within the component only, 
    //not outside, becuase it is the LOCATION of the COMPONENENT
    const template = localStorage.getItem("template");
    
    const finalTemplate = template || "modern"; // setting default template
    // to avoid crash if page is refreshed
    const downloadId = (template === "modern") ? "element-to-print-1" : "element-to-print-2";

    const navigate = useNavigate();

    

    const download = () =>{
     var element = document.getElementById("element-to-print");
     html2pdf(element);
}; 
   
    const submitHandler = async(e) =>{
         e.preventDefault()    //STOPS PAGE RELOAD
          localStorage.setItem("form",JSON.stringify(formData)); //LOCALSTORAGE CANNOT STORE OBJECTS
                                 //IT CAN ONLY STORE STRINGS
        data = JSON.parse(localStorage.getItem("form"));
          
         try{
     const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
     if(response.status === 200 ){     //axios.get  
//////////////////////////////////////
    if(!data._id){
      delete data._id;  // SOLVED MAJOR BUG HERE // ._id cannot be empty, if you send it empty, resume wont get
      //saved at all , because schema will only not pass
    
  
     try{
      const saveResume = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/build`,
        {...data},
        {withCredentials: true}
      )
      if(saveResume) {
        alert("Your resume has been created. Please check your downloads.");
       localStorage.removeItem("form");
       localStorage.removeItem("template");
        
      } else{
        alert("Unable to create your resume at this moment");
      }
     }catch(err){
      console.log(err);
     }
    } 
    else {
      console.log("two");
     const resumeID = data._id; 
      try{
      const saveResume = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resumeUpdate/${resumeID}`,
        data,
        {withCredentials: true})
        
       if(saveResume) {
        alert("Your resume has been updated. You can download it now.");
       localStorage.removeItem("form");  //clear localstorage //key should be there in inveterd commas
       localStorage.removeItem("template");
      } else{
        alert("Unable to update your resume at this moment");
      }} catch(err){
          console.log(err);
      }   
/////////////////////////////////
        
  } 
 
   download();
  
    navigate("/landing", {replace:true});
}
}catch(err){
  localStorage.setItem("where",0);
          navigate("/signup", 
            { state : {
           user : formData,
      }})

     }
    }
  



const form =  localStorage.getItem("form") ;
let data = (form) ? JSON.parse(form) : {};// agar form empty ho to parse krne se error ho jaayega

const[button,setButton] = useState(false);

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

const handleProject = (index, field, value) =>{
        let newProject = [...formData.projects];
        newProject[index]  = {...newProject[index] , [field] : value}

        setFormData({...formData , projects: newProject})
}

const addProject = () =>{
    let newProject = [...formData.projects];
    newProject  = [...newProject, { title: "", github:"", techstack:"", description:""}]
    setFormData({...formData, projects: newProject})
}        

const removeProject = () => {
  let newProject = [...formData.projects];
  newProject = newProject.pop();
  setFormData({...formData, projects: newProject});
}



const HandleEnhance = async () => {
  setButton(true);
   if(!formData.projects[0] && !formData.experience[0]){
    alert("Please fill in the description to use this Features.");
    return;
   }
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
    setButton(false);

} catch(err){
  console.log(err);
  alert("Unable to use this feature currently");
}
}

const templateRef = useRef(null);
// console.log(templateRef.current);

const GoBack = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder2");
}


  ///
  //  h-screen : OCCUPY FULL HEIGHT OF THE SCREEN 
  return (
  <div className="min-h-screen bg-white flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">

    {/* LEFT SECTION - Form */}
    <div className="lg:w-3/5 w-full">
      <div className="mt-3 mb-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#018790] tracking-tight mb-2 sm:mb-3">
          Add in your projects
        </h2>
        <h1 className="text-sm sm:text-base text-gray-500 tracking-tight">
          Projects that prove your skills.
        </h1>
      </div>

      <div className="bg-[#F4F4F4] rounded-lg border border-[#018790]/20 p-4 sm:p-6 lg:p-8 overflow-auto max-h-[70vh] sm:max-h-[80vh] lg:max-h-[90vh]">
        <form onSubmit={submitHandler} className="flex flex-col gap-4 sm:gap-6">

          {/* PROJECTS */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-gray-700">Projects</h3>
            {formData.projects.map((proj, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <input
                    className="input border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="Title"
                    value={proj.title}
                    onChange={(e) => handleProject(index, "title", e.target.value)}
                  />
                  <input
                    className="input border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="GitHub"
                    value={proj.github}
                    onChange={(e) => handleProject(index, "github", e.target.value)}
                  />
                  <input
                    className="input border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                    placeholder="Techstack"
                    value={proj.techstack}
                    onChange={(e) => handleProject(index, "techstack", e.target.value)}
                  />
                </div>
                <textarea
                  className="input border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors min-h-[120px] resize-none"
                  placeholder="Project description (can be enhanced using AI)"
                  value={proj.description}
                  onChange={(e) => handleProject(index, "description", e.target.value)}
                />
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" className="btn-secondary w-fit" onClick={addProject}>
                + Add Project
              </button>
              <button type="button" className="btn-secondary w-fit" onClick={removeProject}>
                + Remove Project
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

          {/* SOCIAL */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-gray-700">Social</h3>
            <input
              className="input border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-white focus:border-[#00B7B5] focus:outline-none transition-colors"
              placeholder="LinkedIn Profile"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>

          {/* SUBMIT + GO BACK */}
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="submit"
              className="w-full sm:w-fit px-6 py-3 bg-[#00B7B5] text-white font-medium rounded-md hover:bg-[#018790] transition"
            >
              Download Resume
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

export default Builder3