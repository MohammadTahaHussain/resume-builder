"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { sampleData } from '@/constants/sampleData';

function SampleDataContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  useEffect(() => {
    const template = searchParams.get('template');
    if (template) {
      setSelectedTemplate(template);
    }
  }, [searchParams]);

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    router.push(`/editor?template=${selectedTemplate}&profession=${profession}`);
  };

  const professions = Object.keys(sampleData);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Choose Your Profession
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select your profession to get started with sample data tailored to your field
          </p>
        </div>

        {/* Template Selection */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">Select Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['modern', 'classic', 'creative', 'minimal', 'tech', 'academic', 'startup', 'federal'].map((template) => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedTemplate === template
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-border hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{getTemplateIcon(template)}</div>
                <div className="text-sm font-medium capitalize">{template}</div>
              </button>
            ))}
          </div>
        </div> */}

        {/* Professions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Empty Template Option */}
          <div
            className="bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 border border-border"
            onClick={() => router.push(`/editor?template=${selectedTemplate}`)}
          >
            <div className="p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                Start with an empty template
              </h3>
              <p className="text-muted-foreground mb-4">
                Begin with a blank canvas and add your own content
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="font-medium">Get Started</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {professions.map((profession) => (
            <div
              key={profession}
              className="bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 border border-border"
              onClick={() => handleProfessionSelect(profession)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{getProfessionIcon(profession)}</div>
                <h3 className="text-xl font-bold text-card-foreground mb-2 capitalize">
                  {profession.replace('-', ' ')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {getProfessionDescription(profession)}
                </p>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="font-medium">Get Started</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SampleDataSkeleton() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-card rounded-lg shadow-lg p-6 border border-border animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getTemplateIcon(template) {
  const icons = {
    modern: '🎨',
    classic: '📄',
    creative: '✨',
    minimal: '⚪',
    tech: '💻',
    academic: '🎓',
    startup: '🚀',
    federal: '🏛️'
  };
  return icons[template] || '📄';
}

function getProfessionIcon(profession) {
  const icons = {
    'software-engineer': '💻',
    'data-scientist': '📊',
    'product-manager': '📋',
    'designer': '🎨',
    'consultant': '💼',
    'teacher': '📚',
    'federal': '🏛️',
    'digital-marketing': '📱'
  };
  return icons[profession] || '👤';
}

function getProfessionDescription(profession) {
  const descriptions = {
    'software-engineer': 'Full-stack development, system architecture, and technical leadership',
    'data-scientist': 'Data analysis, machine learning, and statistical modeling',
    'product-manager': 'Product strategy, user research, and cross-functional leadership',
    'designer': 'UI/UX design, creative direction, and user experience',
    'consultant': 'Business strategy, process optimization, and client management',
    'teacher': 'Educational leadership, curriculum development, and student engagement',
    'federal': 'Government policy, regulatory compliance, and public service',
    'digital-marketing': 'Digital strategy, social media marketing, and performance optimization'
  };
  return descriptions[profession] || 'Professional experience and achievements';
}

export default function SampleDataPage() {
  return (
    <Suspense fallback={<SampleDataSkeleton />}>
      <SampleDataContent />
    </Suspense>
  );
} 