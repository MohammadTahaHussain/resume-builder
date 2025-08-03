import React from 'react';

const TemplatePreview = ({ templateId, sampleData }) => {
  console.log('TemplatePreview rendered with templateId:', templateId);
  
  const renderTemplatePreview = () => {
    switch (templateId) {
      case 'modern':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="border-b-4 border-blue-600 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">John Doe</h3>
              <p className="text-xs text-blue-600 font-semibold">Software Engineer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-600 mt-1">
                <span>john@email.com</span>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-xs text-gray-700 leading-tight">
                Experienced software engineer with 5+ years developing scalable applications...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l-4 border-blue-600 pl-2">
                <p className="font-semibold text-xs">Senior Developer</p>
                <p className="text-blue-600 text-xs">Tech Corp • 2020-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Led team of 5 developers</p>
                <p className="text-xs text-gray-600">• Improved performance by 40%</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900 mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">React</span>
                <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">Node.js</span>
                <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">Python</span>
              </div>
            </div>
          </div>
        );

      case 'classic':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-300 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-xs text-gray-600">Marketing Manager</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>sarah@email.com</span>
                <span>+1 (555) 987-6543</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-xs text-gray-700 leading-tight text-center">
                Results-driven marketing professional with expertise in digital campaigns...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l-2 border-gray-400 pl-2">
                <p className="font-semibold text-xs">Marketing Manager</p>
                <p className="text-gray-600 text-xs">Global Inc • 2019-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Increased ROI by 35%</p>
                <p className="text-xs text-gray-600">• Managed $2M budget</p>
              </div>
            </div>
            
            {/* Education */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900">Education:</p>
              <p className="text-xs text-gray-600">MBA, Marketing - University of Business</p>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 h-full text-xs">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 mb-2 rounded">
              <h3 className="text-sm font-bold text-center">Maria Rodriguez</h3>
              <p className="text-xs text-center opacity-90">Creative Designer</p>
              <div className="flex justify-center space-x-1 text-xs text-purple-100 mt-1">
                <span>maria@email.com</span>
                <span>+1 (555) 321-6540</span>
              </div>
            </div>
            
            {/* About */}
            <div className="mb-2">
              <div className="mb-1">
                <span className="w-3 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 inline-block mr-1"></span>
                <span className="font-semibold text-xs">About Me</span>
              </div>
              <p className="text-xs text-gray-700 leading-tight">
                Creative designer with passion for innovative visual solutions...
              </p>
            </div>
            
            {/* Projects */}
            <div className="space-y-1">
              <div className="bg-white p-1 rounded">
                <p className="font-semibold text-xs">Brand Redesign</p>
                <p className="text-xs text-gray-600">Client: Tech Startup</p>
                <p className="text-xs text-gray-600">• Increased engagement by 60%</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-xs">Figma</span>
                <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-xs">Photoshop</span>
                <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-xs">Illustrator</span>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="text-center mb-2">
              <h3 className="text-sm font-light text-gray-900">Alex Chen</h3>
              <p className="text-xs text-gray-600">UX Designer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>alex@email.com</span>
                <span>+1 (555) 456-7890</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-center mb-1 text-xs text-gray-700 leading-tight">
                User experience designer focused on creating intuitive interfaces...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l border-gray-300 pl-2">
                <p className="font-medium text-xs">UX Designer</p>
                <p className="text-gray-600 text-xs">Design Studio • 2021-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Redesigned 3 major apps</p>
                <p className="text-xs text-gray-600">• Improved usability scores</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-600">Sketch • Figma • Prototyping</p>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="bg-gray-900 text-white p-2 mb-2">
              <h3 className="text-sm font-bold text-center">David Kim</h3>
              <p className="text-xs text-green-400 text-center">Full Stack Developer</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-300 mt-1">
                <span>david@email.com</span>
                <span>+1 (555) 789-0123</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-xs text-gray-700 leading-tight">
                Full stack developer with expertise in modern web technologies...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l-4 border-green-600 pl-2">
                <p className="font-semibold text-xs">Senior Developer</p>
                <p className="text-green-600 text-xs">Tech Startup • 2020-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Built scalable microservices</p>
                <p className="text-xs text-gray-600">• Led DevOps implementation</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900 mb-1">Tech Stack:</p>
              <div className="flex flex-wrap gap-1">
                <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">React</span>
                <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">Node.js</span>
                <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">Docker</span>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-300 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Dr. Emily Wilson</h3>
              <p className="text-xs text-gray-600">Research Scientist</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>emily@university.edu</span>
                <span>+1 (555) 234-5678</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-xs text-gray-700 leading-tight">
                PhD in Computer Science with focus on machine learning algorithms...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l-4 border-purple-800 pl-2">
                <p className="font-semibold text-xs">Research Scientist</p>
                <p className="text-purple-700 text-xs">University Lab • 2019-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Published 15 peer-reviewed papers</p>
                <p className="text-xs text-gray-600">• Secured $500K in grants</p>
              </div>
            </div>
            
            {/* Education */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900">Education:</p>
              <p className="text-xs text-gray-600">PhD Computer Science - MIT</p>
            </div>
          </div>
        );

      case 'startup':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 mb-2 rounded">
              <h3 className="text-sm font-bold text-center">Michael Chang</h3>
              <p className="text-xs text-center opacity-90">Startup Founder</p>
              <div className="flex justify-center space-x-1 text-xs text-blue-100 mt-1">
                <span>michael@startup.com</span>
                <span>+1 (555) 345-6789</span>
              </div>
            </div>
            
            {/* Vision */}
            <div className="mb-2">
              <div className="mb-1">
                <span className="w-3 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 inline-block mr-1"></span>
                <span className="font-semibold text-xs">Vision & Mission</span>
              </div>
              <p className="text-xs text-gray-700 leading-tight">
                Entrepreneur passionate about disrupting traditional industries...
              </p>
            </div>
            
            {/* Achievements */}
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-1 rounded">
                <p className="font-semibold text-xs">Company Growth</p>
                <p className="text-xs text-gray-600">• 500% revenue increase</p>
                <p className="text-xs text-gray-600">• 50+ team members</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">Leadership</span>
                <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">Strategy</span>
                <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">Innovation</span>
              </div>
            </div>
          </div>
        );

      case 'federal':
        return (
          <div className="bg-white p-2 h-full text-xs">
            {/* Header */}
            <div className="text-center border-b-4 border-blue-800 pb-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900">Robert Smith</h3>
              <p className="text-xs text-gray-600">Federal Program Manager</p>
              <div className="flex justify-center space-x-1 text-xs text-gray-500 mt-1">
                <span>robert@agency.gov</span>
                <span>+1 (555) 456-7890</span>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mb-2">
              <p className="text-xs text-gray-700 leading-tight">
                Experienced federal program manager with 10+ years in government...
              </p>
            </div>
            
            {/* Experience */}
            <div className="space-y-1">
              <div className="border-l-4 border-blue-800 pl-2">
                <p className="font-semibold text-xs">Program Manager</p>
                <p className="text-blue-800 text-xs">Federal Agency • 2018-Present</p>
                <p className="text-xs text-gray-600 mt-1">• Managed $10M budget</p>
                <p className="text-xs text-gray-600">• Led 25-person team</p>
              </div>
            </div>
            
            {/* Clearance */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-900">Security Clearance:</p>
              <p className="text-xs text-gray-600">Top Secret - Active</p>
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