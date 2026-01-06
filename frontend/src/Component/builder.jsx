import React, { useEffect } from 'react'

import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Template1 from './template1.jsx';
import Template2 from './template2.jsx';
import axios from 'axios';
import html2pdf from 'html2pdf.js'
import { useRef } from 'react';
import Signup from './signup.jsx';

const Builder = () => {

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
         try{
     const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
     if(response.status === 200 ){     //axios.get  
//////////////////////////////////////
    if(!data._id){
     try{
      const saveResume = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/build`,
        {profile: {...formData}},
        {withCredentials: true}
      )
      if(saveResume) {
        alert("Your resume has been created. Please check your downloads.");
   //     localStorage.removeItem("form"); //clear localstorage //kep should be there in inveterd commas
      } else{
        alert("Unable to create your resume at this moment");
      }
     }catch(err){
      console.log(err);
     }
    } 
    else {
     const resumeID = data._id; console.log(resumeID);
      try{
      const saveResume = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resumeUpdate/${resumeID}`,
        formData,
        {withCredentials: true})
        
       if(saveResume) {
        alert("Your resume has been updated. You can download it now.");
   //     localStorage.removeItem("form");
      } else{
        alert("Unable to update your resume at this moment");
      }} catch(err){
          console.log(err);
      }   
/////////////////////////////////
        
  } 
 
   download();
 //  localStorage.removeItem("form");
    navigate("/landing", {replace:true});
}
}catch(err){
  localStorage.setItem("where",0);
          navigate("/signup", 
            { state : {
           user : formData,
      }})

     
    }

    ///
   
 

    }
  



const form =  localStorage.getItem("form") ;
let data = (form) ? JSON.parse(form) : {};// agar form empty ho to parse krne se error ho jaayega
//

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

const handleSkill = (index,value) => {
    let skill = [...formData.skills];
    skill[index] = value;
    setFormData({...formData, skills: skill})
}

const addSkill = () => {
    let newSkills = [...formData.skills];
    newSkills = [...newSkills,""]
    setFormData({...formData , skills: newSkills})
}

const removeSkill = () => {
  let skill = [...formData.skills];
  let newSkills = [];
  for(let i = 0 ; i<skill.length();i++){
   if(i!= skill.length-1) newSkill.push(skill[i]);
  }
  setFormData({...formData, skills: newSkills})
}

const handleEducation = (index,field,value) =>{
       let newEducation = [...formData.education];
       newEducation[index] = {...newEducation[index] , [field] : value}

      
       setFormData({...formData, education: newEducation})
};

const addEducation = () => {
    let newEducation = [...formData.education];
    newEducation = [...newEducation , {college: "" , degree: "", cg: "", start_year: "", end_year: ""}];
    setFormData({...formData, education: newEducation});
}

const removeEducation = () => {
  let Education = [...formData.education];
  let newEducation = [];
  for(let i = 0 ; i<Education.length; i++){
    if(i != Education.length-1){newEducation.push(Education[i])};
  }
  setFormData({...formData, education: newEducation});
}

const HandleEducation = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder1");
}

const HandleEnhance = async () => {
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

} catch(err){
  console.log(err);
  alert("Unable to use this feature currently");
}
}

const templateRef = useRef(null);
// console.log(templateRef.current);



  ///
  //  h-screen : OCCUPY FULL HEIGHT OF THE SCREEN 
  return (
  <div className="min-h-screen bg-white flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">

    {/* LEFT SECTION - Form */}
    <div className="lg:w-3/5 w-full">
      <div className="mt-10 mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#018790] tracking-tight mb-2 sm:mb-3">
          Add the header content
        </h2>
        <h1 className="text-sm sm:text-base text-gray-500 tracking-tight">
          Add in your name, email, and contact. Make sure they are correct! The interviewers need to reach you!
        </h1>
      </div>

      <div className="bg-[#F4F4F4] rounded-lg shadow-sm border border-[#018790]/20 p-4 sm:p-6 lg:p-8 overflow-auto max-h-[70vh] sm:max-h-[80vh] lg:max-h-[90vh]">
        <form className="flex flex-col gap-4 sm:gap-6">
          {/* PERSONAL INFO */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-gray-700">Personal Information</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="input border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="input border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="input border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="px-5 sm:px-7 py-2 sm:py-3 rounded-md border-2 border-[#00B7B5] text-[#00B7B5] text-base sm:text-lg hover:bg-[#00B7B5]/20 transition w-fit"
              onClick={HandleEducation}
            >
              Add Education Next
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

export default Builder