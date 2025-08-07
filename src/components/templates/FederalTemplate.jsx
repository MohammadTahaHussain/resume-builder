const FederalTemplate = ({ data }) => {
  // Extract personal data with fallback to old structure for backward compatibility
  const personal = data.personal || data;

  return (
    <div className="w-full overflow-x-auto max-lg:p-4">
      <div className="bg-white min-w-[700px] max-w-4xl mx-auto lg:p-8 font-sans">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personal.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            {personal.title || 'Federal Professional'}
          </p>
          <div className="flex justify-center space-x-6 text-gray-600">
            <span>{personal.email || 'email@example.com'}</span>
            <span>{personal.phone || '+1 (555) 123-4567'}</span>
            <span>{personal.location || 'City, State'}</span>
          </div>
          {/* LinkedIn and Website links */}
          {(personal.linkedin || personal.website) && (
            <div className="flex justify-center space-x-6 text-gray-600 mt-2">
              {personal.linkedin && (
                <a 
                  href={`https://${personal.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              )}
              {personal.website && (
                <a 
                  href={`https://${personal.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {personal.summary}
            </p>
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
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-gray-700 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="leading-relaxed">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-gray-700 font-semibold">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-gray-600 font-medium text-lg whitespace-nowrap">
                    {edu.endDate || 'Present'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Key Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {project.name}
                      </h3>
                      {project.technologies && (
                        <p className="text-lg text-gray-700 font-semibold">
                          {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                        </p>
                      )}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Key Achievements
            </h2>
            <div className="space-y-4">
              {data.achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Publications
            </h2>
            <div className="space-y-4">
              {data.publications.map((pub, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {pub.title}
                      </h3>
                      <p className="text-lg text-gray-700 font-semibold">
                        {pub.journal}
                      </p>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {pub.date}
                    </span>
                  </div>
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Publication →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teaching Experience */}
        {data.teaching && data.teaching.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Teaching Experience
            </h2>
            <div className="space-y-6">
              {data.teaching.map((course, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {course.course}
                      </h3>
                      <p className="text-lg text-gray-700 font-semibold">
                        {course.institution}
                      </p>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {course.date}
                    </span>
                  </div>
                  {course.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {course.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Licenses */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Certifications & Licenses
            </h2>
            <div className="space-y-4">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {cert.name}
                    </span>
                    <p className="text-gray-700 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards & Recognition */}
        {data.awards && data.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Awards & Recognition
            </h2>
            <div className="space-y-4">
              {data.awards.map((award, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {award.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {award.issuer} • {award.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Memberships */}
        {data.memberships && data.memberships.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Memberships
            </h2>
            <div className="space-y-3">
              {data.memberships.map((membership, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">
                    {membership.organization}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {membership.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Clearance */}
        {data.clearance && data.clearance.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Security Clearance
            </h2>
            <div className="space-y-3">
              {data.clearance.map((clearance, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 font-medium">
                      {clearance.level}
                    </span>
                    <p className="text-gray-600 text-sm">
                      {clearance.agency}
                    </p>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {clearance.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Interests
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Additional Information
            </h2>
            <div className="space-y-4">
              {data.additional.map((item, index) => (
                <div key={index}>
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

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              References
            </h2>
            <div className="space-y-4">
              {data.references.map((reference, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {reference.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    {reference.title}
                  </p>
                  <p className="text-gray-700 mb-1">
                    {reference.organization}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {reference.phone} • {reference.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FederalTemplate; 