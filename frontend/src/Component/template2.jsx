import React from 'react'

const Template2 = ({data}) => {  {/* brackets here because we are sending react props, 
    that is in a container of multiple props such as dat */}
    data = data || {} ;
  return (
  <div id= 'element-to-print' className="min-h-screen bg-white flex justify-center p-10">
    <div className="w-full max-w-2xl p-8  font-serif bg-white">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-[18px] font-bold mb-1 text-black">
          {data.name || "Jhon Doe"}
        </h1>

        <p className="text-black text-[11px]">
          <strong>Email:</strong> {data.email || "johnDoe@gmail.com"} |{" "}
          <strong>Contact:</strong> {data.phoneNumber || "99999999"}
        </p>

        
      </div>

      {/* EDUCATION */}
      <div className="mb-6">
        <h2 className="text-[15xl] font-semibold border-b border-black pb-4 mb-3 text-black">
          Education:
        </h2>

        {data.education?.map((edu, index) => (
          <div key={index} className="mb-3 text-sm text-[13xl]">
             <p className='text-[13px]'>  {edu.college || "Indian Institute Of Technlogy"}</p>
            <p className='text-[11px]'> {edu.degree || "BTECH"}</p>
            <p className='text-[11px]'>CGPA: {edu.cg || "9/10"}</p>
            <p className='text-[11px]'>
              Duration: {edu.start_year || "20xx"} - {edu.end_year || "20xx"}
            </p>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="mb-6">
        <h2 className="text-[15px] font-semibold border-b border-black pb-4 mb-3 text-black">
          Skills / Techstack:
        </h2>
        <p className="text-black text-[11px]">
          {`${data.skills} ` || "NodeJS MongoDB"}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-6">
        <h2 className="text-[15px] font-semibold border-b border-black pb-4 mb-3 text-black">
          Experience:
        </h2>

        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-4 text-black">
             <p className="text-[13px] ">
              <strong>Company</strong>: {exp.company || "Company"}
            </p>
            <p className="text-[11px]">
              Role: {exp.role || "Data Analyst"}
            </p>

           

            <p className="text-[11px]">
              Duration:{" "}
              {`(${exp.duration || "10 Years"})`}
            </p>

          
                <p className="text-[11px]  mb-1 text-black">
                  Description:
                </p>

                <ul className="list-disc pl-4 text-[11px] leading-relaxed">
                  {exp.description 
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line, i) => (
                      <li key={i}>
                        {line.replace(/^-\s*/, "")}
                      </li>
                    )) }
                </ul>
              </div>
            
         
        ))}
      </div>

      {/* PROJECTS */}
      <div className="mb-6">
        <h2 className="text-[15px] font-semibold border-b border-black pb-4 mb-3 text-black">
          Projects:
        </h2>

        {data.projects?.map((project, index) => (
          <div key={index} className="mb-4 text-black">
            <p className="text-[13px]">
              <strong>Project Title:</strong>{" "}
              {project.title || "Resume Builder"}
            </p>

            <p className="text-sm text-[11px]">
             Tech Stack: {project.techstack || "Development"}
            </p>

            
             
                <p className="text-[11px] mb-1 text-black">
                  Description:
                </p>

                <ul className="list-disc pl-4 text-[11px] leading-relaxed">
                  {project.description
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line, i) => (
                      <li key={i}>
                        {line.replace(/^-\s*/, "")}
                      </li>
                    ))}
                </ul>
             
           

         
              <p className="text-[11px] mb-1 text-black ">
                GitHub:{project.github || "project.github.com"}
              </p>
           
          </div>
        ))}
      </div>

      {/* SOCIAL */}
      <div className="mb-6">
        <h2 className="text-[15px] font-semibold border-b border-black pb-4 mb-3 text-black">
          Social:
        </h2>

        <p className="text-[11px] text-black">
          LinkedIn Profile: {data.linkedin || "johndoe@linkedin.com"}
        </p>
      </div>

    </div>
  </div>
);


}

export default Template2