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




const Builder = () => {
  
    const location = useLocation();  //location needs to be declared within the component only, 
    //not outside, becuase it is the LOCATION of the COMPONENENT
    const template = location?.state?.template;

    const finalTemplate = template || "modern"; // setting default template
    // to avoid crash if page is refreshed
    const downloadId = (template === "modern") ? "element-to-print-1" : "element-to-print-2";

    const navigate = useNavigate();

    const Loginhandler = () =>{
        navigate("/login")
    }

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
         download();
         console.log(formData);
       
          
//////////////////////////////////////
     try{
      const saveResume = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profilebuild`,
        {profile: {...formData}},
        {withCredentials: true}
      )
      if(saveResume) {
        alert("Your resume has been created. Please check your downloads.");
      } else{
        alert("Unable to create your resume at this moment");
      }
     }catch(err){
      console.log(err);
     }
/////////////////////////////////
  try{
    const save = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profileBuild`,
     { formData},
     { withCredentials: true }
    ) }
    catch(err){
      console.log(err);
    }
              
        
  } 
}catch(err){
          navigate("/signup", 
            { state : {
           user : formData,
      }})
     
    }

    ///
   
   navigate("/landing");

    }
  
/*
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[contact,setContact] = useState("");
*/

console.log(location);
const data = location?.state || JSON.parse(localStorage.getItem("form")) ;


const [formData, setFormData] = useState({  ///WE WILL MAKE AN ARRAY OF ITEMS TO BE CHANGED
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

const handleEducation = (index,field,value) =>{
       let newEducation = [...formData.education];
       newEducation[index] = {...newEducation[index] , [field] : value}

       console.log(value);
       setFormData({...formData, education: newEducation})
};

const addEducation = () => {
    let newEducation = [...formData.education];
    newEducation = [...newEducation , {college: "" , degree: "", cg: "", start_year: "", end_year: ""}];
    setFormData({...formData, education: newEducation});
}

const HandleEnhance = async () => {
   if(!formData.projects[0].description && !formData.experience[0].description){
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
        let description = formData.experience[i].description; if(!description){break;}
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
console.log(templateRef.current);



  ///
  //  h-screen : OCCUPY FULL HEIGHT OF THE SCREEN 
  return (
  <div className="min-h-screen bg-[#F4F4F4] flex flex-col lg:flex-row gap-6 px-4 py-6">

    {/* LEFT: LIVE PREVIEW */}
    <div className="lg:w-7/12 w-full bg-white rounded-lg shadow-sm border border-[#018790]/20 p-6 overflow-auto">
      <h2 className="text-xl font-semibold text-[#018790] mb-4">
        Live Preview
      </h2>

      <div
        ref={templateRef}
        className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50"
      >
        {finalTemplate === "modern" ? (
          <Template1 data={formData} />
        ) : (
          <Template2 data={formData} />
        )}
      </div>
    </div>

    {/* RIGHT: FORM */}
    <div className="lg:w-5/12 w-full bg-white rounded-lg shadow-sm border border-[#018790]/20 p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
        <h2 className="text-xl font-semibold text-[#018790]">
          Fill Your Details
        </h2>

        <button
          type="button"
          onClick={HandleEnhance}
          className="px-4 py-2 rounded-md text-lg border border-[#00B7B5] text-[#00B7B5] hover:bg-[#00B7B5]/10 transition"
        >
          ✨ Enhance with AI
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-6">

        {/* PERSONAL INFO */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Name" className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" placeholder="Email" className="input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="text" placeholder="Phone Number" className="input" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
          </div>
        </div>

        {/* EDUCATION */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-gray-700">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <input className="input" placeholder="College" value={edu.college} onChange={(e) => handleEducation(index, "college", e.target.value)} />
              <input className="input" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducation(index, "degree", e.target.value)} />
              <input className="input" placeholder="CG" value={edu.cg} onChange={(e) => handleEducation(index, "cg", e.target.value)} />
              <input className="input" placeholder="Start Year" value={edu.start_year} onChange={(e) => handleEducation(index, "start_year", e.target.value)} />
              <input className="input" placeholder="End Year" value={edu.end_year} onChange={(e) => handleEducation(index, "end_year", e.target.value)} />
            </div>
          ))}
          <button type="button" className="btn-secondary w-fit" onClick={addEducation}>+ Add Education</button>
        </div>

        {/* SKILLS */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-gray-700">Skills / Techstack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.skills.map((skill, index) => (
              <input key={index} type="text" placeholder="Skill" className="input" value={skill} onChange={(e) => handleSkill(index, e.target.value)} />
            ))}
          </div>
          <button type="button" className="btn-secondary w-fit" onClick={addSkill}>+ Add Skill</button>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-gray-700">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <input className="input" placeholder="Company" value={exp.company} onChange={(e) => handleExperience(index, "company", e.target.value)} />
                <input className="input" placeholder="Role" value={exp.role} onChange={(e) => handleExperience(index, "role", e.target.value)} />
                <input className="input" placeholder="Duration" value={exp.duration} onChange={(e) => handleExperience(index, "duration", e.target.value)} />
              </div>
              <textarea className="input min-h-[80px]" placeholder="Describe your work, impact, technologies used..." value={exp.description} onChange={(e) => handleExperience(index, "description", e.target.value)} />
            </div>
          ))}
          <button type="button" className="btn-secondary w-fit" onClick={addExperience}>+ Add Experience</button>
        </div>

        {/* PROJECTS */}
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-gray-700">Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <input className="input" placeholder="Title" value={proj.title} onChange={(e) => handleProject(index, "title", e.target.value)} />
                <input className="input" placeholder="GitHub" value={proj.github} onChange={(e) => handleProject(index, "github", e.target.value)} />
                <input className="input" placeholder="Techstack" value={proj.techstack} onChange={(e) => handleProject(index, "techstack", e.target.value)} />
              </div>
              <textarea className="input min-h-[90px]" placeholder="Project description (can be enhanced using AI)" value={proj.description} onChange={(e) => handleProject(index, "description", e.target.value)} />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" className="btn-secondary w-fit" onClick={addProject}>+ Add Project</button>
            <button type="button" className="px-4 py-2 rounded-md border border-[#00B7B5] text-[#00B7B5] text-lg hover:bg-[#00B7B5]/10 transition w-fit" onClick={HandleEnhance}>✨ Enhance with AI</button>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-gray-700">Social</h3>
          <input className="input" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
        </div>

        {/* SUBMIT */}
        <button type="submit" className="w-full sm:w-fit px-6 py-3 bg-[#00B7B5] text-white font-medium rounded-md hover:bg-[#018790] transition">
          Download Resume
        </button>

      </form>
    </div>
  </div>
);


}

export default Builder