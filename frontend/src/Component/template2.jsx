import React from 'react'

const Template2 = ({data}) => {  {/* brackets here because we are sending react props, 
    that is in a container of multiple props such as dat */}
    data = data || {} ;
  return (
  <div id= 'element-to-print' className="min-h-screen bg-white flex justify-center p-10">
    <div className="w-full max-w-2xl p-8 border border-black font-serif bg-white">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1 text-black">
          {data.name}
        </h1>

        <p className="text-black text-sm">
          <strong>Email:</strong> {data.email} |{" "}
          <strong>Contact:</strong> {data.phoneNumber}
        </p>

        {data.linkedin && (
          <p className="text-black text-sm">
            <strong>LinkedIn:</strong> {data.linkedin}
          </p>
        )}
      </div>

      {/* EDUCATION */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-black pb-1 mb-3 text-black">
          Education:
        </h2>

        {data.education?.map((edu, index) => (
          <div key={index} className="mb-3 text-sm text-black">
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>College:</strong> {edu.college}</p>
            <p><strong>CGPA:</strong> {edu.cg}</p>
            <p>
              <strong>Duration:</strong> {edu.start_year} - {edu.end_year}
            </p>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-black pb-1 mb-3 text-black">
          Skills / Techstack:
        </h2>
        <p className="text-black text-sm">
          {data.skills}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-black pb-1 mb-3 text-black">
          Experience:
        </h2>

        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-4 text-black">
            <p className="text-sm">
              <strong>Role:</strong> {exp.role || "Role"}
            </p>

            <p className="text-sm">
              <strong>Company:</strong> {exp.company || "Company"}
            </p>

            <p className="text-[11px]">
              <strong>Duration:</strong>{" "}
              {exp.start_date} - {exp.end_date}{" "}
              {exp.duration && `(${exp.duration})`}
            </p>

            {exp.description && (
              <div className="mt-2 border border-black p-3 w-full">
                <p className="text-[11px] font-semibold mb-1 text-black">
                  Description:
                </p>

                <ul className="list-disc pl-4 text-[10px] leading-relaxed">
                  {exp.description
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line, i) => (
                      <li key={i}>
                        {line.replace(/^-\s*/, "")}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-black pb-1 mb-3 text-black">
          Projects:
        </h2>

        {data.projects?.map((project, index) => (
          <div key={index} className="mb-4 text-black">
            <p className="text-sm">
              <strong>Project Title:</strong>{" "}
              {project.title || "Project Title"}
            </p>

            <p className="text-sm">
              <strong>Tech Stack:</strong> {project.techstack || ""}
            </p>

            {project.description && (
              <div className="mt-2 border border-black p-3 w-full">
                <p className="text-[11px] font-semibold mb-1 text-black">
                  Description:
                </p>

                <ul className="list-disc pl-4 text-[10px] leading-relaxed">
                  {project.description
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line, i) => (
                      <li key={i}>
                        {line.replace(/^-\s*/, "")}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {project.github && (
              <p className="text-[11px] text-black mt-1">
                <strong>GitHub:</strong> {project.github}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* SOCIAL */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-black pb-1 mb-3 text-black">
          Social / LinkedIn:
        </h2>

        <p className="text-sm text-black">
          <strong>LinkedIn Profile:</strong> {data.linkedin}
        </p>
      </div>

    </div>
  </div>
);


}

export default Template2