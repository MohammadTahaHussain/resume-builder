const MinimalTemplate = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto max-lg:p-4">
      <div className="bg-white min-w-[800px] max-w-3xl mx-auto lg:p-8 font-sans">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {data.title || 'Professional Title'}
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>{data.email || 'email@example.com'}</span>
            <span>{data.phone || '+1 (555) 123-4567'}</span>
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
                  {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.map((achievement, idx) => (
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

      {/* Teaching Experience */}
      {data.teaching && data.teaching.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Teaching Experience
          </h2>
          <div className="space-y-4">
            {data.teaching.map((course, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {course.course}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {course.institution}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {course.date}
                  </span>
                </div>
                {course.description && (
                  <p className="text-gray-700 leading-relaxed text-sm">
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
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Publications
          </h2>
          <div className="space-y-4">
            {data.publications.map((pub, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {pub.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {pub.journal}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {pub.date}
                  </span>
                </div>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    View Publication →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Memberships */}
      {data.memberships && data.memberships.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Professional Memberships
          </h2>
          <div className="space-y-3">
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
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            Security Clearance
          </h2>
          <div className="space-y-4">
            {data.clearance.map((clearance, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {clearance.level}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {clearance.agency}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
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
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center uppercase tracking-wide">
            References
          </h2>
          <div className="space-y-4">
            {data.references.map((reference, index) => (
              <div key={index} className="border-l border-gray-300 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {reference.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {reference.title}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {reference.company || reference.organization}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
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
      </div>
    </div>
  );
};

export default MinimalTemplate; 