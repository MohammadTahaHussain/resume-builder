import React from 'react';

const TemplatePreview = ({ templateId, sampleData }) => {
  console.log('TemplatePreview rendered with templateId:', templateId);
  
  const renderTemplatePreview = () => {
    switch (templateId) {
      case 'modern':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="border-b-4 border-blue-600 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">John Doe</h3>
              <p className="text-xs text-blue-600 font-semibold">Software Engineer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-600 mt-1">
                <span>john@email.com</span>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="mb-1 text-xs">Experienced software engineer with 5+ years...</p>
              <div className="space-y-1">
                <div className="border-l-4 border-blue-600 pl-2">
                  <p className="font-semibold text-xs">Senior Developer</p>
                  <p className="text-blue-600 text-xs">Tech Corp • 2020-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'classic':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="text-center border-b-2 border-gray-300 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-xs text-gray-600">Marketing Manager</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>sarah@email.com</span>
                <span>+1 (555) 987-6543</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="mb-1 text-xs">Results-driven marketing professional...</p>
              <div className="space-y-1">
                <div className="border-l-2 border-gray-400 pl-2">
                  <p className="font-semibold text-xs">Marketing Manager</p>
                  <p className="text-gray-600 text-xs">Global Inc • 2019-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 h-full text-xs">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 mb-2 rounded">
              <h3 className="text-sm font-bold text-center">Maria Rodriguez</h3>
              <p className="text-xs text-center opacity-90">Creative Designer</p>
              <div className="flex justify-center space-x-1 text-xs text-purple-100 mt-1">
                <span>maria@email.com</span>
                <span>+1 (555) 321-6540</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <div className="mb-1">
                <span className="w-3 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 inline-block mr-1"></span>
                <span className="font-semibold text-xs">About Me</span>
              </div>
              <p className="mb-1 text-xs">Creative designer with passion for...</p>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="text-center mb-2">
              <h3 className="text-sm font-light text-gray-900">Alex Chen</h3>
              <p className="text-xs text-gray-600">UX Designer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>alex@email.com</span>
                <span>+1 (555) 456-7890</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="text-center mb-1 text-xs">User experience designer focused on...</p>
              <div className="space-y-1">
                <div className="border-l border-gray-300 pl-2">
                  <p className="font-medium text-xs">UX Designer</p>
                  <p className="text-gray-600 text-xs">Design Studio • 2021-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="bg-gray-900 text-white p-2 mb-2">
              <h3 className="text-sm font-bold text-center">David Kim</h3>
              <p className="text-xs text-green-400 text-center">Full Stack Developer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-300 mt-1">
                <span>david@email.com</span>
                <span>+1 (555) 789-0123</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="mb-1 text-xs">Full stack developer with expertise in...</p>
              <div className="space-y-1">
                <div className="border-l-4 border-green-600 pl-2">
                  <p className="font-semibold text-xs">Senior Developer</p>
                  <p className="text-green-600 text-xs">Tech Startup • 2020-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="text-center border-b-2 border-gray-300 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Dr. Emily Wilson</h3>
              <p className="text-xs text-gray-600">Research Scientist</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>emily@university.edu</span>
                <span>+1 (555) 234-5678</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="mb-1 text-xs">PhD in Computer Science with focus on...</p>
              <div className="space-y-1">
                <div className="border-l-4 border-purple-800 pl-2">
                  <p className="font-semibold text-xs">Research Scientist</p>
                  <p className="text-purple-700 text-xs">University Lab • 2019-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'startup':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 mb-2 rounded">
              <h3 className="text-sm font-bold text-center">Michael Chang</h3>
              <p className="text-xs text-center opacity-90">Startup Founder</p>
              <div className="flex justify-center space-x-1 text-xs text-blue-100 mt-1">
                <span>michael@startup.com</span>
                <span>+1 (555) 345-6789</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <div className="mb-1">
                <span className="w-3 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 inline-block mr-1"></span>
                <span className="font-semibold text-xs">Vision & Mission</span>
              </div>
              <p className="mb-1 text-xs">Entrepreneur passionate about disrupting...</p>
            </div>
          </div>
        );

      case 'federal':
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="text-center border-b-4 border-blue-800 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Robert Smith</h3>
              <p className="text-xs text-gray-600">Federal Program Manager</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>robert@agency.gov</span>
                <span>+1 (555) 456-7890</span>
              </div>
            </div>
            <div className="text-xs text-gray-700">
              <p className="mb-1 text-xs">Experienced federal program manager...</p>
              <div className="space-y-1">
                <div className="border-l-4 border-blue-800 pl-2">
                  <p className="font-semibold text-xs">Program Manager</p>
                  <p className="text-blue-800 text-xs">Federal Agency • 2018-Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-2 h-full text-xs">
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-900">Your Name</h3>
              <p className="text-xs text-gray-600">Professional Title</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderTemplatePreview()}
    </div>
  );
};

export default TemplatePreview; 