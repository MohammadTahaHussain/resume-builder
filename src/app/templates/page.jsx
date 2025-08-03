"use client";

import { useRouter } from 'next/navigation';
import { templates } from '../../constants/templates';

export default function TemplatesPage() {
  const router = useRouter();

  const handleTemplateSelect = (templateId) => {
    // Redirect to sample data selection page with template ID
    router.push(`/sample-data?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our professionally designed templates to create your perfect resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Template Preview */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: template.colors?.primary || '#3B82F6' }}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Template Preview</p>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                      Select Template
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {template.description}
                </p>
                
                {/* Template Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Template Meta */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${template.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : template.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {template.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't decide? Start with our Modern template - it's perfect for most industries!
          </p>
          <button
            onClick={() => handleTemplateSelect('modern')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            Start with Modern Template
          </button>
        </div>
      </div>
    </div>
  );
} 