const FederalTemplate = ({ data }) => {
  return (
    <div className="bg-white max-w-4xl mx-auto p-4 lg:p-8 font-serif">
      {/* Header - Federal Style */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-wide">
          {data.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-700 font-medium mb-4">
          {data.title || 'Federal Professional'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 text-lg">
          <div>
            <span className="font-semibold">Email:</span> {data.email || 'email@example.com'}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {data.phone || '+1 (555) 123-4567'}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {data.location || 'City, State'}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
          </p>
        </div>
      )}

      {/* Core Competencies */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700 text-lg font-medium">{skill}</span>
              </div>
            ))}
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
                <span className="text-gray-600 font-medium text-lg">
                  {edu.graduationYear}
                </span>
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
      {data.clearance && (
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

      {/* Additional Information */}
      {data.additional && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
            Additional Information
          </h2>
          <div className="space-y-4">
            {data.additional.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
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
  );
};

export default FederalTemplate; 