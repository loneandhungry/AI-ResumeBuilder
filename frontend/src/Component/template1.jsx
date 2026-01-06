import React from 'react'


const Template1 = ({data}) => {
    data = data || {};
return (
  <div
    id="element-to-print"
    className="min-h-screen bg-white flex justify-center px-6 py-10 font-serif tracking-tight"
  >
    <div className="w-full max-w-3xl px-8 py-6  text-black">

      {/* Header */}
      <div className="border-b border-black pb-3 mb-5">
        <h1 className="text-[18px] font-bold tracking-tight">
          {data.name || "Jhon Doe"}
        </h1>

        <div className="mt-1 text-[11px] flex flex-wrap gap-x-3">
          <span>Email: {data.email || "johnDoe@gmail.com"}</span>
          <span>Contact: {data.phoneNumber || "999999999"}</span>
        </div>
      </div>

      {/* Education */}
<div className="mb-5">
  <h2 className="text-[15px] font-semibold uppercase tracking-wide border-b pb-3 border-black mb-3">
    Education
  </h2>

  {data.education?.map((edu, index) => (
    <div
      key={index}
      className="mb-3 grid grid-cols-3 gap-x-4 text-[11px] leading-snug"
    >
      {/* Institution & Degree */}
      <div className="col-span-2">
        <p className="text-[15px] ">{edu.college || "Birla Institue Of Technology"}</p>
        <p className="text-[13px]">{edu.degree || "BTECH"}</p>
      </div>

      {/* CGPA & Duration */}
      <div className=" text-[11px] text-right">
        <p>CGPA: {edu.cg || "9"}</p>
        <p>
          {edu.start_year || "20xx"} – {edu.end_year || "20xx"}
        </p>
      </div>
    </div>
  ))}
</div>


      {/* Skills */}
      <div className="mb-5">
        <h2 className="text-[15px] font-semibold uppercase tracking-wide border-b pb-3 border-black mb-3">
          Skills
        </h2>

        <div className="flex flex-wrap gap-x-3 gap-y-1 ">
          {data.skills?.map((skill, index) => (
            <span
           key={index}
           className="text-[11px]"
           >
             {skill || "React"}
           </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <h2 className="text-[15px] font-semibold uppercase tracking-wide border-b pb-3 border-black mb-3">
          Experience
        </h2>

        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
           <p className="">
  <span className="font-medium text-[11px]">{exp.role || "Data Analyst"}</span>
  { (
    <>
      {" — "}
      <span className="font-bold text-[13px]">{exp.company ||"Company"}</span>
    </>
  )}
</p>


            <p className='text-[11px]'>
              Duration:{" "}
              {`(${exp.duration || "10 Years"})`}
            </p>
             <p className=" text-black text-[11px]">
                  Description:
                </p>

            { (
              <ul className="list-disc pl-5 text-[11px] leading-relaxed">
                {exp.description
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>
                      {line.replace(/^-\s*/, "")}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-[15px] font-semibold uppercase tracking-wide border-b pb-3 border-black mb-3">
          Projects
        </h2>

        {data.projects?.map((project, index) => (
          <div key={index} className="mb-4">
            <p className="text-[13px] font- font-bold">
              {project.title || "Resume Builder"}
            </p>

            
              <p className="text-[11px] mb-1">
                Tech Stack: {project.techstack || "React"}
              </p>
            
            <p className=" text-[15px] mb-1">
                  Description:
                </p>


            { (
              <ul className="list-disc pl-5 text-[11px] leading-relaxed">
                {project.description
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>
                      {line.replace(/^-\s*/, "")}
                    </li>
                  ))}
              </ul>
            )}

            { (
              <p className="text-[11px] mt-1">
                GitHub: {project.github || "project.github.com"}
              </p>
            )}
        
          </div>
          
        ))}

            <div className="mb-6">
        <h2 className="text-[15px] font-semibold uppercase tracking-wide border-b pb-3 border-black mb-3">
          Social:
        </h2>

        <p className="text-[11px] text-black">
          <strong>LinkedIn Profile:</strong> {data.linkedin || "johndoe@linkedin.com"}
        </p>
      </div>
      </div>

    </div>
  </div>
);
};
    
export default Template1