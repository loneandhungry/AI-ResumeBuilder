import React from 'react'


const Template1 = ({data}) => {
    data = data || {};
return (
  <div
    id="element-to-print"
    className="min-h-screen bg-white flex justify-center p-10"
  >
    <div className="w-full max-w-3xl p-8 border border-black">

      {/* Header */}
      <div className="border-b border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black">{data.name}</h1>
        <p className="text-black text-sm">Email: {data.email}</p>
        <p className="text-black text-sm">Contact: {data.phoneNumber}</p>
        {data.linkedin && (
          <p className="text-black text-sm">LinkedIn: {data.linkedin}</p>
        )}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Education
        </h2>

        {data.education?.map((edu, index) => (
          <div key={index} className="mb-3 text-sm text-black">
            <p><strong>College:</strong> {edu.college}</p>
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>CGPA:</strong> {edu.cg}</p>
            <p>
              <strong>Duration:</strong> {edu.start_year} - {edu.end_year}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 border border-black text-sm text-black"
            >
              {skill || ""}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Experience
        </h2>

        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-4 text-black">
            <p className="font-medium text-sm">
              {exp.role || ""} {exp.company && `— ${exp.company}`}
            </p>

            {(exp.start_date || exp.end_date) && (
              <p className="text-[11px]">
                {exp.start_date || ""} - {exp.end_date || ""}
                {exp.duration && ` (${exp.duration})`}
              </p>
            )}

            {exp.description && (
              <ul className="list-disc pl-4 text-[10px] leading-relaxed mt-1">
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Projects
        </h2>

        {data.projects?.map((project, index) => (
          <div key={index} className="mb-4 text-black">
            <p className="font-medium text-sm">
              {project.title || ""}
            </p>

            {project.techstack && (
              <p className="text-[11px]">
                <strong>Tech Stack:</strong> {project.techstack}
              </p>
            )}

            {project.description && (
              <ul className="list-disc pl-4 text-[10px] leading-relaxed mt-1">
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

            {project.github && (
              <p className="text-[10px]">
                GitHub: {project.github}
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  </div>
);

}
    
export default Template1