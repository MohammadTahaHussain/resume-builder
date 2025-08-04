"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EditDrawer from "../../components/EditDrawer";
import ClassicTemplate from "../../components/templates/ClassicTemplate";
import ModernTemplate from "../../components/templates/ModernTemplate";
import CreativeTemplate from "../../components/templates/CreativeTemplate";
import MinimalTemplate from "../../components/templates/MinimalTemplate";
import TechTemplate from "../../components/templates/TechTemplate";
import AcademicTemplate from "../../components/templates/AcademicTemplate";
import StartupTemplate from "../../components/templates/StartupTemplate";
import FederalTemplate from "../../components/templates/FederalTemplate";
import AIAssistant from "../../components/AIAssistant";
import { sampleData } from "../../constants/sampleData";

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    website: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    awards: [],
    achievements: [],
    publications: [],
    memberships: [],
    clearance: [],
    references: [],
    teaching: [],
    additional: [],
    languages: [],
    interests: []
  });

  useEffect(() => {
    const template = searchParams.get('template') || 'modern';
    const profession = searchParams.get('profession');
    const resumeId = searchParams.get('id');

    if (resumeId) {
      // Load existing resume
      fetchResume(resumeId);
    } else if (profession && sampleData[profession]) {
      // Load sample data for profession
      setResumeData(sampleData[profession]);
    }
  }, [searchParams]);

  const fetchResume = async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const resume = await response.json();
        setResumeData(resume.data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const handleDataUpdate = (newData) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const handleSaveResume = async () => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resumeData.name || 'My Resume',
          template: searchParams.get('template') || 'modern',
          data: resumeData,
        }),
      });

      if (response.ok) {
        const savedResume = await response.json();
        router.push(`/editor?id=${savedResume._id}`);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const renderTemplate = () => {
    const template = searchParams.get('template') || 'modern';
    
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      case 'academic':
        return <AcademicTemplate data={resumeData} />;
      case 'startup':
        return <StartupTemplate data={resumeData} />;
      case 'federal':
        return <FederalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-muted-foreground hover:text-card-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-card-foreground">Resume Editor</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Resume
            </button>
            <button
              onClick={() => setIsEditDrawerOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Edit Resume
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Resume Preview */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            {renderTemplate()}
          </div>
        </div>

        {/* Edit Drawer */}
        <EditDrawer
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          data={resumeData}
          onDataUpdate={handleDataUpdate}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* AI Assistant */}
        <AIAssistant 
          resumeData={resumeData} 
          onUpdateData={handleDataUpdate}
        />
      </div>
    </div>
  );
}

function EditorSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorContent />
    </Suspense>
  );
}
