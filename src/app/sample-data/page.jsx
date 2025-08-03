"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { sampleResumeData } from '../../constants/sampleData';

function SampleDataContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [selectedProfession, setSelectedProfession] = useState(null);

  const professions = [
    { id: 'softwareEngineer', name: 'Software Engineer', icon: '💻', color: 'bg-blue-500' },
    { id: 'dataScientist', name: 'Data Scientist', icon: '📊', color: 'bg-purple-500' },
    { id: 'productManager', name: 'Product Manager', icon: '📋', color: 'bg-green-500' },
    { id: 'designer', name: 'UI/UX Designer', icon: '🎨', color: 'bg-pink-500' },
    { id: 'marketingManager', name: 'Marketing Manager', icon: '📈', color: 'bg-orange-500' },
    { id: 'entrepreneur', name: 'Entrepreneur', icon: '🚀', color: 'bg-red-500' },
    { id: 'consultant', name: 'Business Consultant', icon: '💼', color: 'bg-indigo-500' },
    { id: 'teacher', name: 'Teacher/Professor', icon: '📚', color: 'bg-teal-500' },
  ];

  const handleProfessionSelect = (professionId) => {
    setSelectedProfession(professionId);
  };

  const handleContinue = () => {
    if (selectedProfession && templateId) {
      router.push(`/editor?template=${templateId}&profession=${selectedProfession}`);
    }
  };

  const handleStartEmpty = () => {
    if (templateId) {
      router.push(`/editor?template=${templateId}&profession=empty`);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Choose Your Sample Data
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select a profession to pre-fill your resume with relevant sample data, or start with a blank template
          </p>
        </div>

        {/* Selected Template Info */}
        {templateId && (
          <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  Selected Template: {templateId.charAt(0).toUpperCase() + templateId.slice(1)}
                </h2>
                <p className="text-muted-foreground">
                  You can change this later in the editor
                </p>
              </div>
              <button
                onClick={() => router.push('/templates')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Change Template
              </button>
            </div>
          </div>
        )}

        {/* Professions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {professions.map((profession) => (
            <div
              key={profession.id}
              className={`bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                selectedProfession === profession.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-border hover:border-accent'
              }`}
              onClick={() => handleProfessionSelect(profession.id)}
            >
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${profession.color}`}>
                  <span className="text-2xl">{profession.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {profession.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {sampleResumeData[profession.id]?.summary?.substring(0, 80) || 'Sample data for this profession...'}...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedProfession}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            Continue with Sample Data
          </button>
          
          <button
            onClick={handleStartEmpty}
            className="bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground px-8 py-3 rounded-lg font-medium border-2 border-border transition-all duration-200 transform hover:scale-105"
          >
            Start with Empty Template
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-blue-800">
            Choose sample data to see how your resume will look with real content. You can edit all the information in the next step!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SampleDataPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sample data page...</p>
        </div>
      </div>
    }>
      <SampleDataContent />
    </Suspense>
  );
} 