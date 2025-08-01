const StartupTemplate = ({ data }) => {
  return (
    <div className="bg-white max-w-4xl mx-auto lg:p-8 font-sans">
      {/* Header with Dynamic Design */}
      <div className="relative mb-12">
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 p-4 lg:p-8 rounded-lg text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              {data.name || 'Your Name'}
            </h1>
            <p className="text-2xl font-light mb-6 opacity-90">
              {data.title || 'Entrepreneur & Startup Professional'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {data.email || 'email@example.com'}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {data.phone || '+1 (555) 123-4567'}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {data.location || 'City, State'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Dynamic accent elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full opacity-80"></div>
      </div>

      {/* Vision Statement */}
      {data.summary && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 mr-4"></span>
            Vision & Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
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
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="leading-relaxed">{achievement}</li>
                    ))}
                  </ul>
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
                  {achievement.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {achievement.description}
                </p>
                {achievement.metrics && (
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

      {/* Skills & Expertise */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-4"></span>
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <span className="text-gray-800 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ventures & Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></span>
            Ventures & Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Venture Preview</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
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
            <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></span>
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
                    <p className="text-lg text-red-600 font-semibold">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {edu.graduationYear}
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
            <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 mr-4"></span>
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.awards.map((award, index) => (
              <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {award.name}
                </h3>
                <p className="text-gray-700 mb-2">
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
            {data.email || 'email@example.com'}
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {data.phone || '+1 (555) 123-4567'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartupTemplate; 