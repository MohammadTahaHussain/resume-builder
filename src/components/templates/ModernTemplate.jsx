const ModernTemplate = ({ data }) => {
  // Extract personal data with fallback to old structure for backward compatibility
  const personal = data.personal || data;

  return (
    <div className="w-full overflow-x-auto max-lg:p-4">
      <div className="bg-white w-full max-w-5xl mx-auto font-sans">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {personal.name || 'Your Name'}
            </h1>
            <p className="text-lg lg:text-xl font-semibold mb-4 opacity-90">
              {personal.title || 'Professional Title'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100 text-sm lg:text-base">
              <span>{personal.email || 'email@example.com'}</span>
              <span>{personal.phone || '+1 (555) 123-4567'}</span>
              <span>{personal.location || 'City, State'}</span>
            </div>
            {/* LinkedIn and Website links */}
            {(personal.linkedin || personal.website) && (
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100 mt-2 text-sm lg:text-base">
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

        {/* Content Container */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Professional Summary */}
          {personal.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Two Column Layout for Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Experience & Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Professional Experience */}
              {data.experience && data.experience.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {exp.title}
                            </h3>
                            <p className="text-blue-600 font-semibold text-sm break-words">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </span>
                        </div>
                        {exp.achievements && (
                          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                            {Array.isArray(exp.achievements) ? 
                              exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="leading-relaxed break-words">{achievement}</li>
                              )) : 
                              <li className="leading-relaxed break-words">{exp.achievements}</li>
                            }
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Key Projects
                  </h2>
                  <div className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {project.name}
                            </h3>
                            {project.technologies && (
                              <p className="text-green-600 font-semibold text-sm break-words">
                                {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                              </p>
                            )}
                          </div>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                            >
                              View →
                            </a>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-gray-700 leading-relaxed text-sm break-words">
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {data.publications && data.publications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Publications
                  </h2>
                  <div className="space-y-3">
                    {data.publications.map((pub, index) => (
                      <div key={index} className="border-l-2 border-purple-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {pub.title}
                            </h3>
                            <p className="text-purple-600 font-semibold text-sm break-words">
                              {pub.journal}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {pub.date}
                          </span>
                        </div>
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                          >
                            View Publication →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {data.achievements && data.achievements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    Key Achievements
                  </h2>
                  <div className="space-y-3">
                    {data.achievements.map((achievement, index) => (
                      <div key={index} className="border-l-2 border-orange-200 pl-4">
                        {typeof achievement === 'string' ? (
                          <p className="text-gray-700 leading-relaxed text-sm break-words">
                            {achievement}
                          </p>
                        ) : (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">
                              {achievement.title}
                            </h3>
                            {achievement.description && (
                              <p className="text-gray-700 leading-relaxed text-sm break-words">
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
            </div>

            {/* Right Column - Education, Skills, Certifications, etc. */}
            <div className="space-y-6">
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {data.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-indigo-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {edu.degree}
                            </h3>
                            <p className="text-indigo-600 font-semibold text-sm break-words">
                              {edu.institution}
                            </p>
                            {edu.gpa && (
                              <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                            )}
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {edu.graduationYear}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const skillsArray = Array.isArray(data.skills) 
                        ? data.skills.filter(skill => typeof skill === 'string')
                        : [];
                      
                      return skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="border-l-2 border-pink-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <span className="text-lg font-bold text-gray-900 break-words">
                              {cert.name}
                            </span>
                            <p className="text-pink-600 font-medium text-sm break-words">
                              {cert.issuer}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {data.awards && data.awards.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                    Awards
                  </h2>
                  <div className="space-y-3">
                    {data.awards.map((award, index) => (
                      <div key={index} className="border-l-2 border-yellow-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <span className="text-lg font-bold text-gray-900 break-words">
                              {award.name}
                            </span>
                            <p className="text-yellow-600 font-medium text-sm break-words">
                              {award.issuer}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {award.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {typeof language === 'string' ? language : `${language.language}${language.proficiency ? ` (${language.proficiency})` : ''}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {data.interests && data.interests.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-violet-600 rounded-full mr-3"></div>
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Experience */}
              {data.teaching && data.teaching.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></div>
                    Teaching
                  </h2>
                  <div className="space-y-3">
                    {data.teaching.map((course, index) => (
                      <div key={index} className="border-l-2 border-cyan-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {course.course}
                            </h3>
                            <p className="text-cyan-600 font-semibold text-sm break-words">
                              {course.institution}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                            {course.date}
                          </span>
                        </div>
                        {course.description && (
                          <p className="text-gray-700 leading-relaxed text-sm break-words mt-1">
                            {course.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Clearance */}
              {data.clearance && data.clearance.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    Clearance
                  </h2>
                  <div className="space-y-3">
                    {data.clearance.map((clearance, index) => (
                      <div key={index} className="border-l-2 border-red-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {clearance.level}
                            </h3>
                            <p className="text-red-600 font-semibold text-sm break-words">
                              {clearance.agency}
                            </p>
                          </div>
                          <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
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
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                    References
                  </h2>
                  <div className="space-y-3">
                    {data.references.map((reference, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {reference.name}
                            </h3>
                            <p className="text-gray-600 font-semibold text-sm break-words">
                              {reference.title}
                            </p>
                            <p className="text-gray-600 font-semibold text-sm break-words">
                              {reference.company || reference.organization}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 space-y-1 mt-1">
                          {reference.email && (
                            <p className="break-words">Email: {reference.email}</p>
                          )}
                          {reference.phone && (
                            <p className="break-words">Phone: {reference.phone}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information - Full Width at Bottom */}
          {data.additional && data.additional.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                Additional Information
              </h2>
              <div className="space-y-3">
                {data.additional.map((item, index) => (
                  <div key={index} className="border-l-2 border-slate-200 pl-4">
                    {typeof item === 'string' ? (
                      <p className="text-gray-700 leading-relaxed text-sm break-words">
                        {item}
                      </p>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">
                          {item.title}
                        </h3>
                        {item.content && (
                          <p className="text-gray-700 leading-relaxed text-sm break-words">
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
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate; 