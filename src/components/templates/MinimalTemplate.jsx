const MinimalTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 font-sans">
      {/* Header - Minimal Design */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
          {data.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-4 font-medium">
          {data.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
          <span>{data.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{data.phone || '+1 (555) 123-4567'}</span>
          <span>•</span>
          <span>{data.location || 'City, State'}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <ul className="list-none space-y-1 mt-3">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-700 leading-relaxed">
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-gray-500 text-sm">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-gray-600 bg-gray-50 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-900 font-medium">
                    {cert.name}
                  </span>
                  <p className="text-gray-600 text-sm">
                    {cert.issuer}
                  </p>
                </div>
                <span className="text-gray-500 text-sm">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Awards & Recognition
          </h2>
          <div className="space-y-3">
            {data.awards.map((award, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-900 font-medium">
                    {award.name}
                  </span>
                  <p className="text-gray-600 text-sm">
                    {award.issuer}
                  </p>
                </div>
                <span className="text-gray-500 text-sm">
                  {award.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate; 