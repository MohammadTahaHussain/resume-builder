const ModernTemplate = ({ data }) => {
  return (
    <div className="bg-white max-w-4xl mx-auto lg:p-8 font-sans">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-xl text-blue-600 font-semibold mb-2">
            {data.title || 'Professional Title'}
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
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.summary}
          </p>
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
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.title}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">
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
                  <p className="text-blue-600 font-medium">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-gray-600 text-sm">
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
          <div className="space-y-4">
            {data.skills.map((skillGroup, index) => (
              <div key={index}>
                {skillGroup.category && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {skillGroup.category}
                  </h3>
                )}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills && skillGroup.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">
                  {cert.name}
                </span>
                <span className="text-gray-600 text-sm">
                  {cert.issuer} • {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teaching Experience */}
      {data.teaching && data.teaching.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Teaching Experience
          </h2>
          <div className="space-y-4">
            {data.teaching.map((course, index) => (
              <div key={index} className="border-l-4 border-purple-600 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.course}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {course.date}
                  </span>
                </div>
                <p className="text-purple-600 font-medium mb-2">
                  {course.institution}
                </p>
                {course.description && (
                  <p className="text-gray-700 text-sm">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Publications
          </h2>
          <div className="space-y-3">
            {data.publications.map((pub, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {pub.title}
                </h3>
                <p className="text-green-600 font-medium mb-1">
                  {pub.journal}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {pub.date}
                </p>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Security Clearance
          </h2>
          <div className="space-y-3">
            {data.clearance.map((clearance, index) => (
              <div key={index} className="border-l-4 border-red-600 pl-6">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            References
          </h2>
          <div className="space-y-4">
            {data.references.map((reference, index) => (
              <div key={index} className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {reference.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-1">
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
    </div>
  );
};

export default ModernTemplate; 