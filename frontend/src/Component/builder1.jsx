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




const Builder1 = () => {
  
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
  
/*
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[contact,setContact] = useState("");
*/


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

const HandleExperience = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder2");
}

const GoBack = () => {
    localStorage.setItem("form",JSON.stringify(formData));
    navigate("/builder");
}



const templateRef = useRef(null);
// console.log(templateRef.current);



  ///
  //  h-screen : OCCUPY FULL HEIGHT OF THE SCREEN 
  return (
  <div className="min-h-screen bg-white flex flex-col lg:flex-row gap-6 px-4 py-6">

    <div className="lg:w-3/5 w-full">
  
    <div className="mt-3 mb-4">
      <h2 className="text-3xl font-black text-[#018790] tracking-tight mb-3">
        Add in your education and skills.
      </h2>
      <h1 className="text-xl text-gray-500 tracking-tight">
       Tell them how brilliant you are! 
      </h1>
    </div>

   
    <div className="bg-[#F4F4F4] rounded-lg   lg:p-8 overflow-auto ">
      <form  className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          
          {formData.education.map((edu, index) => (
            <div key={index} className=" border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <input className="input bg-white border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" placeholder="College" value={edu.college} onChange={(e) => handleEducation(index, "college", e.target.value)} />
          <input className="input  bg-white border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducation(index, "degree", e.target.value)} />
          <input className="input  bg-white border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" placeholder="CG" value={edu.cg} onChange={(e) => handleEducation(index, "cg", e.target.value)} />
          <input className="input  bg-white border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" placeholder="Start Year" value={edu.start_year} onChange={(e) => handleEducation(index, "start_year", e.target.value)} />
          <input className="input  bg-white border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" placeholder="End Year" value={edu.end_year} onChange={(e) => handleEducation(index, "end_year", e.target.value)} />
           </div>
          ))}
          </div>

            <div>
            <button type="button" className="btn-secondary w-fit" onClick={addEducation}>+ Add Education</button>
           <button type="button" className="btn-secondary w-fit mx-4" onClick={removeEducation}>+ Remove Education</button>
          </div>

           {/* SKILLS */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-gray-700">Skills / Techstack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.skills.map((skill, index) => (
              <input key={index} type="text" placeholder="Skill" className=" bg-white input border border-gray-300 px-4 py-3 rounded-md focus:border-[#00B7B5] focus:outline-none transition-colors" value={skill} onChange={(e) => handleSkill(index, e.target.value)} />
            ))}
          </div>
          <div>
               <button type="button" className="btn-secondary w-fit" onClick={addSkill}>+ Add Skill</button>
          <button type="button" className="btn-secondary w-fit mx-4" onClick={removeSkill}>+ Remove Skill</button>
          </div>
      
        </div>
         <div className='mt-4 ml-1.5 mb'>
          <button type="button" className="  px-7 py-2 rounded-md border-2 border-[#00B7B5] text-[#00B7B5] text-lg hover:bg-[#00B7B5]/20 transition w-fit" onClick={HandleExperience}>Add Experience Next</button>
          <button type="button" className=" mx-5 px-7 py-2 rounded-md border-2 border-[#00B7B5] text-[#00B7B5] text-lg hover:bg-[#00B7B5]/20 transition w-fit" onClick={GoBack}>Go Back</button>
        </div>
      </form>
      
    </div>
   
  </div>

 
    {/* right preview */}
   <div className='lg:w-2/5 mt-25 mb-4 '>
 
    <div
      ref={templateRef}
      className="border border-gray-400  overflow-auto max-h-[85vh] border-dashed border-gray-300 rounded-md  bg-gray-50 "
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

export default Builder1