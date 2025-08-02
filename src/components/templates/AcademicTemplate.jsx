const AcademicTemplate = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white min-w-[800px] max-w-4xl mx-auto lg:p-8 font-serif">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            {data.title || 'Academic Professional'}
          </p>
          <div className="flex justify-center space-x-6 text-gray-600">
            <span>{data.email || 'email@example.com'}</span>
            <span>{data.phone || '+1 (555) 123-4567'}</span>
            <span>{data.location || 'City, State'}</span>
          </div>
        </div>

      {/* Research Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Research Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
          </p>
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
              <div key={index} className="border-l-4 border-purple-800 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-purple-700 font-semibold">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-gray-600 font-medium text-lg">
                    {edu.graduationYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Research Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-purple-800 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-purple-700 font-semibold">
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

      {/* Publications */}
      {data.publications && data.publications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Publications
          </h2>
          <div className="space-y-4">
            {data.publications.map((pub, index) => (
              <div key={index} className="border-l-4 border-purple-800 pl-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {pub.title}
                </h3>
                <p className="text-purple-700 font-medium mb-2">
                  {pub.journal}
                </p>
                <p className="text-gray-600 mb-2">
                  {pub.authors}
                </p>
                <span className="text-gray-500 text-sm">
                  {pub.date}
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

      {/* Research Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Research Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-purple-800 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
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

      {/* Academic Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Academic Certifications
          </h2>
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {cert.name}
                  </span>
                  <p className="text-purple-700 font-medium">
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

      {/* Academic Awards */}
      {data.awards && data.awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Academic Awards & Recognition
          </h2>
          <div className="space-y-4">
            {data.awards.map((award, index) => (
              <div key={index} className="border-l-4 border-purple-800 pl-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {award.name}
                </h3>
                <p className="text-purple-700 font-medium mb-2">
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

      {/* Teaching Experience */}
      {data.teaching && data.teaching.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Teaching Experience
          </h2>
          <div className="space-y-4">
            {data.teaching.map((course, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {course.name}
                  </h3>
                  <p className="text-purple-700 font-medium">
                    {course.institution}
                  </p>
                </div>
                <span className="text-gray-600 font-medium">
                  {course.period}
                </span>
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
      </div>
    </div>
  );
};

export default AcademicTemplate; 