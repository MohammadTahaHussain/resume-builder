const CreativeTemplate = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-w-[800px] max-w-4xl mx-auto font-sans relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 mb-8 rounded-none">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {data.name || 'Your Name'}
            </h1>
            <p className="text-xl font-semibold mb-4 opacity-90">
              {data.title || 'Creative Professional'}
            </p>
            <div className="flex justify-center space-x-6 text-purple-100">
              <span>{data.email || 'email@example.com'}</span>
              <span>{data.phone || '+1 (555) 123-4567'}</span>
              <span>{data.location || 'City, State'}</span>
            </div>
          </div>
        </div>
        
        {/* Creative accent elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full opacity-80"></div>

        {/* Content Container */}
        <div className="px-8 pb-8">
          {/* About/Summary */}
          {data.summary && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.summary}
              </p>
            </div>
          )}

          {/* Portfolio/Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-4"></span>
                Featured Work
              </h2>
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-8">
                {data.projects.map((project, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Project Preview</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></span>
                Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -ml-2"></div>
                    <div className="ml-8 border-l-2 border-purple-200 pl-8">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-purple-600 font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-4"></span>
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {(() => {
                  // Safety check: ensure skills is a simple array of strings
                  const skillsArray = Array.isArray(data.skills) 
                    ? data.skills 
                    : typeof data.skills === 'string' 
                      ? data.skills.split(',').map(s => s.trim()) 
                      : [];
                  
                  return skillsArray.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mr-4"></span>
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full -ml-2"></div>
                    <div className="ml-8 border-l-2 border-indigo-200 pl-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-indigo-600 font-semibold">
                            {edu.institution}
                          </p>
                        </div>
                        <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                          {edu.graduationYear}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mr-4"></span>
                Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-2">
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

          {/* References */}
          {data.references && data.references.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-teal-500 to-green-500 mr-4"></span>
                References
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.references.map((ref, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {ref.name}
                    </h3>
                    <p className="text-teal-600 font-semibold mb-2">
                      {ref.title} at {ref.company}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {ref.email} • {ref.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate; 