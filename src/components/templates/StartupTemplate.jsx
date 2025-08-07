const StartupTemplate = ({ data }) => {
  // Extract personal data with fallback to old structure for backward compatibility
  const personal = data.personal || data;

  return (
    <div className="w-full overflow-x-auto max-lg:p-4">
      <div className="bg-white min-w-[700px] max-w-4xl mx-auto lg:p-8 font-sans relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 mb-8 rounded-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {personal.name || 'Your Name'}
            </h1>
            <p className="text-xl font-semibold mb-4 opacity-90">
              {personal.title || 'Startup Professional'}
            </p>
            <div className="flex justify-center space-x-6 text-blue-100">
              <span>{personal.email || 'email@example.com'}</span>
              <span>{personal.phone || '+1 (555) 123-4567'}</span>
              <span>{personal.location || 'City, State'}</span>
            </div>
            {/* LinkedIn and Website links */}
            {(personal.linkedin || personal.website) && (
              <div className="flex justify-center space-x-6 text-blue-100 mt-2">
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
        
        {/* Dynamic accent elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full opacity-80"></div>

        {/* Vision Statement */}
        {personal.summary && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 mr-4"></span>
              Vision & Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Entrepreneurial Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-4"></span>
              Entrepreneurial Journey
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full -ml-2"></div>
                  <div className="ml-8 border-l-2 border-red-200 pl-8">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-red-600 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-gray-600 font-medium">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="leading-relaxed">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mr-4"></span>
              Key Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {typeof achievement === 'string' ? achievement : achievement.title || 'Achievement'}
                  </h3>
                  {typeof achievement === 'object' && achievement.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                  {typeof achievement === 'object' && achievement.metrics && (
                    <div className="mt-3">
                      <span className="text-red-600 font-semibold">
                        {achievement.metrics}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(() => {
                // Safety check: ensure skills is a simple array of strings
                const skillsArray = Array.isArray(data.skills) 
                  ? data.skills.filter(skill => typeof skill === 'string')
                  : [];
                
                return skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Ventures & Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></span>
              Ventures & Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {project.name}
                      </h3>
                      {project.technologies && (
                        <p className="text-purple-600 font-medium mb-3">
                          {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></span>
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-blue-600 font-semibold">
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <span className="text-gray-600 font-medium text-lg whitespace-nowrap">
                      {edu.endDate || 'Present'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards & Recognition */}
        {data.awards && data.awards.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mr-4"></span>
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.awards.map((award, index) => (
                <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {award.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-2">
                    {award.issuer}
                  </p>
                  <span className="text-gray-600 text-sm">
                    {award.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">
                    {cert.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teaching Experience */}
        {data.teaching && data.teaching.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Teaching Experience
            </h2>
            <div className="space-y-4">
              {data.teaching.map((course, index) => (
                <div key={index} className="border-l-4 border-orange-600 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.course}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {course.date}
                    </span>
                  </div>
                  <p className="text-orange-600 font-medium mb-2">
                    {course.institution}
                  </p>
                  {course.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {course.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {data.publications && data.publications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Publications
            </h2>
            <div className="space-y-3">
              {data.publications.map((pub, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {pub.title}
                  </h3>
                  <p className="text-green-600 font-medium mb-1">
                    {pub.journal}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      {pub.date}
                    </span>
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        View Publication →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Memberships */}
        {data.memberships && data.memberships.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Professional Memberships
            </h2>
            <div className="space-y-2">
              {data.memberships.map((membership, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 font-medium">
                      {membership.organization}
                    </span>
                    {membership.role && (
                      <p className="text-gray-600 text-sm">
                        {membership.role}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {membership.date || membership.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Clearance */}
        {data.clearance && data.clearance.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Security Clearance
            </h2>
            <div className="space-y-3">
              {data.clearance.map((clearance, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {clearance.level}
                      </h3>
                      <p className="text-red-600 font-medium">
                        {clearance.agency}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {clearance.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              References
            </h2>
            <div className="space-y-4">
              {data.references.map((reference, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {reference.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-1">
                    {reference.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {reference.company || reference.organization}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    {reference.email && (
                      <p>Email: {reference.email}</p>
                    )}
                    {reference.phone && (
                      <p>Phone: {reference.phone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {typeof language === 'string' ? language : `${language.language}${language.proficiency ? ` (${language.proficiency})` : ''}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {data.additional && data.additional.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Additional Information
            </h2>
            <div className="space-y-3">
              {data.additional.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  {typeof item === 'string' ? (
                    <p className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* Contact/Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 lg:p-8 rounded-lg text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
        <p className="text-gray-300 mb-6">
          Ready to disrupt industries and create innovative solutions? Let's discuss your next venture.
        </p>
        <div className="flex justify-center space-x-6">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {personal.email || 'email@example.com'}
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {personal.phone || '+1 (555) 123-4567'}
          </span>
        </div>
      </div>
    </div>
  </div>
);
};

export default StartupTemplate; 