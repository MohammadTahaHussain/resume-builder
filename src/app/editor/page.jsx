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

  const handleDownloadPDF = () => {
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    const template = searchParams.get('template') || 'modern';
    
    // Get the template component
    let templateComponent;
    switch (template) {
      case 'classic':
        templateComponent = <ClassicTemplate data={resumeData} />;
        break;
      case 'creative':
        templateComponent = <CreativeTemplate data={resumeData} />;
        break;
      case 'minimal':
        templateComponent = <MinimalTemplate data={resumeData} />;
        break;
      case 'tech':
        templateComponent = <TechTemplate data={resumeData} />;
        break;
      case 'academic':
        templateComponent = <AcademicTemplate data={resumeData} />;
        break;
      case 'startup':
        templateComponent = <StartupTemplate data={resumeData} />;
        break;
      case 'federal':
        templateComponent = <FederalTemplate data={resumeData} />;
        break;
      default:
        templateComponent = <ModernTemplate data={resumeData} />;
    }

    // Write the HTML content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.name || 'Resume'}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div id="resume-content">
            ${templateComponent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Calculate stats
  const stats = {
    experience: resumeData.experience?.length || 0,
    education: resumeData.education?.length || 0,
    skills: resumeData.skills?.length || 0,
    projects: resumeData.projects?.length || 0,
    certifications: resumeData.certifications?.length || 0,
    awards: resumeData.awards?.length || 0,
    achievements: resumeData.achievements?.length || 0,
    publications: resumeData.publications?.length || 0,
    memberships: resumeData.memberships?.length || 0,
    clearance: resumeData.clearance?.length || 0,
    references: resumeData.references?.length || 0,
    teaching: resumeData.teaching?.length || 0,
    additional: resumeData.additional?.length || 0,
    languages: resumeData.languages?.length || 0,
    interests: resumeData.interests?.length || 0
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
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
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
            
            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Experience:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.experience}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Education:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.education}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Skills:</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.skills}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Projects:</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.projects}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </button>
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

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Top Row - Title and Back Button */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-muted-foreground hover:text-card-foreground transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h1 className="text-lg font-semibold text-card-foreground">Resume Editor</h1>
              </div>
              
              {/* Mobile Stats */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {stats.experience}
                  </span>
                  <span className="text-xs text-muted-foreground">Exp</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {stats.skills}
                  </span>
                  <span className="text-xs text-muted-foreground">Skills</span>
                </div>
              </div>
            </div>

            {/* Bottom Row - Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownloadPDF}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PDF</span>
                </button>
                <button
                  onClick={handleSaveResume}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Save
                </button>
              </div>
              
              <button
                onClick={() => setIsEditDrawerOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Edit Resume
              </button>
            </div>

            {/* Additional Stats Row - Only on Tablet */}
            <div className="hidden md:flex items-center justify-center mt-3 space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span>Education:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.education}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Projects:</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.projects}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex ">
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
