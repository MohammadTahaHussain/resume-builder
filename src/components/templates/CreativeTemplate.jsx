const CreativeTemplate = ({ data }) => {
  // Extract personal data with fallback to old structure for backward compatibility
  const personal = data.personal || data;

  return (
    <div className="w-full overflow-x-auto max-lg:p-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 w-full max-w-4xl mx-auto font-sans relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 lg:p-8 mb-8 rounded-none">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {personal.name || 'Your Name'}
            </h1>
            <p className="text-lg lg:text-xl font-semibold mb-4 opacity-90">
              {personal.title || 'Creative Professional'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-purple-100 text-sm lg:text-base">
              <span>{personal.email || 'email@example.com'}</span>
              <span>{personal.phone || '+1 (555) 123-4567'}</span>
              <span>{personal.location || 'City, State'}</span>
            </div>
            {/* LinkedIn and Website links */}
            {(personal.linkedin || personal.website) && (
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-purple-100 mt-2 text-sm lg:text-base">
                {personal.linkedin && (
                  <a 
                    href={`https://${personal.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {personal.website && (
                  <a 
                    href={`https://${personal.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Creative accent elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-yellow-400 rounded-full opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 lg:w-6 lg:h-6 bg-pink-400 rounded-full opacity-80"></div>

        {/* Content Container */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {/* About/Summary */}
          {personal.summary && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {personal.summary}
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
                        <span className="text-gray-600 font-medium text-lg whitespace-nowrap">
                          {edu.endDate || 'Present'}
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
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-6">
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

          {/* Awards */}
          {data.awards && data.awards.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mr-4"></span>
                Awards & Recognition
              </h2>
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-6">
                {data.awards.map((award, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {award.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-2">
                      {award.issuer}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {award.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {data.achievements && data.achievements.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></span>
                Key Achievements
              </h2>
              <div className="space-y-4">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    {typeof achievement === 'string' ? (
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {achievement}
                      </p>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {achievement.title}
                        </h3>
                        {achievement.description && (
                          <p className="text-gray-700 leading-relaxed">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {data.publications && data.publications.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-4"></span>
                Publications
              </h2>
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-6">
                {data.publications.map((pub, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-green-600 font-semibold mb-2">
                      {pub.journal}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {pub.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teaching Experience */}
          {data.teaching && data.teaching.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-teal-500 to-green-500 mr-4"></span>
                Teaching Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.teaching.map((course, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {course.course}
                    </h3>
                    <p className="text-teal-600 font-semibold mb-2">
                      {course.institution}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {course.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Memberships */}
          {data.memberships && data.memberships.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mr-4"></span>
                Professional Memberships
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.memberships.map((membership, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {membership.organization}
                    </h3>
                    {membership.role && (
                      <p className="text-indigo-600 font-semibold mb-2">
                        {membership.role}
                      </p>
                    )}
                    <span className="text-gray-500 text-sm">
                      {membership.date || membership.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Clearance */}
          {data.clearance && data.clearance.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 mr-4"></span>
                Security Clearance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.clearance.map((clearance, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {clearance.level}
                    </h3>
                    <p className="text-red-600 font-semibold mb-2">
                      {clearance.agency}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {clearance.date}
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
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-6">
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

          {/* Additional Information */}
          {data.additional && data.additional.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></span>
                Additional Information
              </h2>
              <div className="space-y-4">
                {data.additional.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    {typeof item === 'string' ? (
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item}
                      </p>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        {item.content && (
                          <p className="text-gray-700 leading-relaxed">
                            {item.content}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mr-4"></span>
                Languages
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {typeof language === 'string' ? language : `${language.language}${language.proficiency ? ` (${language.proficiency})` : ''}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 mr-4"></span>
                Creative Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {interest}
                  </span>
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