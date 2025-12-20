    return(
           <div id='element-to-print' className=" min-h-screen bg-gray-100 flex justify-center p-10">
            <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-lg">

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-700">Email: {data.email}</p>
          <p className="text-gray-700">Contact: {data.phoneNumber}</p>
          {data.linkedin && (
            <p className="text-gray-700">LinkedIn: {data.linkedin}</p>
          )}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>

          {data.education?.map((edu, index) => (
            <div key={index} className="mb-3">
              <p><strong>College:</strong> {edu.college}</p>
              <p><strong>Degree:</strong> {edu.degree }</p>
              <p><strong>CGPA:</strong> {edu.cg }</p>
              <p>
                <strong>Duration:</strong> {edu.start_year} - {edu.end_year}
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {skill || "" }
              </span>
            ))}
          </div>
        </div>

       {/* Experience */}
<div className="mb-6">
  <h2 className="text-xl font-semibold mb-2">Experience</h2>

  {data.experience?.map((exp, index) => (
    <div key={index} className="mb-4">
      {/* Role & Company */}
      <p className="font-medium">
        {exp.role || ""} {exp.company && `— ${exp.company}`}
      </p>

      {/* Date & Duration */}
      {(exp.start_date || exp.end_date) && (
        <p className="text-[11px] text-gray-600">
          {exp.start_date || ""} - {exp.end_date || ""}{" "}
          {exp.duration && `(${exp.duration})`}
        </p>
      )}

     
      {exp.description && (
        <ul className="list-disc pl-4 text-[10px] text-gray-700 leading-relaxed mt-1">
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
          <h2 className="text-xl font-semibold mb-2">Projects</h2>

          {data.projects?.map((project, index) => (
  <div key={index} className="mb-4">
    <p className="font-medium">{project.title || ""}</p>

    {project.techstack && (
      <p className="text-[11px]">
        <strong>Tech Stack:</strong> {project.techstack}
      </p>
    )}

    {/* Description as bullets */}
    {project.description && (
      <ul className="list-disc pl-4 text-[10px] text-gray-700 leading-relaxed mt-1">
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
      <p className="text-[10px] text-blue-600 mt-1">
        GitHub: {project.github}
      </p>
    )}
  </div>
))}

        </div>

      </div>
    </div>
      
  )