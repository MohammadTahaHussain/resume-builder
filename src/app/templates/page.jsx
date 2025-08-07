"use client";

import { useRouter } from 'next/navigation';
import { templates } from '../../constants/templates';
import TemplatePreview from '../../components/TemplatePreview';

export default function TemplatesPage() {
  const router = useRouter();

  const handleTemplateSelect = (templateId) => {
    // Redirect to sample data selection page with template ID
    router.push(`/sample-data?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select from our professionally designed templates to create your perfect resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 border border-border"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Template Preview */}
              <div className="relative h-64 bg-muted rounded-t-lg overflow-hidden group">
                <div className="w-full h-full p-1">
                  <TemplatePreview templateId={template.id} />
                </div>
                
                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out rounded-t-lg flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="bg-card text-card-foreground px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Select Template</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle border animation */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-t-lg transition-all duration-300 ease-in-out"></div>
              </div>

              {/* Template Info */}
              <div className="p-6 group-hover:bg-accent transition-all duration-300">
                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {template.name}
                </h3>
                <p className="text-muted-foreground mb-4 group-hover:text-card-foreground transition-colors duration-300">
                  {template.description}
                </p>
                
                {/* Template Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300 transform"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Template Meta */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 transform ${
                    template.difficulty === 'Easy' ? 'bg-green-100 text-green-800 group-hover:bg-green-200' : 
                    template.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200' : 
                    'bg-red-100 text-red-800 group-hover:bg-red-200'
                  }`}>
                    {template.difficulty}
                  </span>
                  <span className="text-muted-foreground text-sm group-hover:text-blue-600 transition-colors duration-300">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't decide? Start with our Classic Executive template - it's perfect for most industries!
          </p>
          <button
            onClick={() => handleTemplateSelect('classic')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform"
          >
            Start with Classic Template
          </button>
        </div>
      </div>
    </div>
  );
} 