const TechTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 font-sans">
      {/* Header */}
      <div className="border-b-4 border-green-600 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-xl text-green-600 font-semibold mb-2">
            {data.title || 'Technical Professional'}
          </p>
          <div className="flex justify-center space-x-6 text-gray-600">
            <span>{data.email || 'email@example.com'}</span>
            <span>{data.phone || '+1 (555) 123-4567'}</span>
            <span>{data.location || 'City, State'}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Technical Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <span className="text-green-800 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.title}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-green-600 font-medium mb-2">
                  {exp.company}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Technical Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-gray-600 text-sm">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Technical Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {cert.name}
                </h3>
                <p className="text-green-600 text-sm mb-1">
                  {cert.issuer}
                </p>
                <span className="text-gray-500 text-sm">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Achievements */}
      {data.awards && data.awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Technical Achievements
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

      {/* Additional Technical Information */}
      {data.additional && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Additional Technical Information
          </h2>
          <div className="space-y-4">
            {data.additional.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechTemplate; 