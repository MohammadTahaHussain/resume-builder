"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { sampleResumeData } from "../../constants/sampleData";
import TemplateManager from "../../components/TemplateManager";
import EditDrawer from "../../components/EditDrawer";
import PDFDownloader from "../../components/PDFDownloader";
import AIAssistant from "@/components/AIAssistant";

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("template") || "modern";
  const professionId = searchParams.get("profession") || "softwareEngineer";
  const resumeId = searchParams.get("id"); // For editing existing resume
  
  const [resumeData, setResumeData] = useState({});
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Initialize resume data based on profession - memoized to prevent re-renders
  const initializeResumeData = useCallback(() => {
    if (professionId === "empty") {
      return {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
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
      };
    } else {
      return sampleResumeData[professionId] || {};
    }
  }, [professionId]);

  // Load resume from database if editing existing resume
  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    } else {
      // Initialize with sample data for new resume
      const initialData = initializeResumeData();
      setResumeData(initialData);
    }
  }, [resumeId, initializeResumeData]);

  // Load resume from database
  const loadResume = async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const resume = await response.json();
        
        // Transform the nested data structure to flat structure for templates
        const transformedData = {
          // Personal info (flatten from data.personal)
          name: resume.data.personal?.name || '',
          title: resume.data.personal?.title || '',
          email: resume.data.personal?.email || '',
          phone: resume.data.personal?.phone || '',
          location: resume.data.personal?.location || '',
          summary: resume.data.personal?.summary || '',
          linkedin: resume.data.personal?.linkedin || '',
          website: resume.data.personal?.website || '',
          
          // Other sections
          experience: resume.data.experience || [],
          education: resume.data.education || [],
          
          // Handle skills - convert from nested format to simple array if needed
          skills: (() => {
            const skills = resume.data.skills || [];
            // If skills is in old nested format [{category, skills: [...]}], flatten it
            if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'object' && skills[0].skills) {
              return skills.flatMap(skillGroup => skillGroup.skills || []);
            }
            // If skills is already a simple array, use it as is
            return skills;
          })(),
          
          projects: resume.data.projects || [],
          certifications: resume.data.certifications || [],
          awards: resume.data.awards || [],
          achievements: resume.data.achievements || [],
          publications: resume.data.publications || [],
          memberships: resume.data.memberships || [],
          clearance: resume.data.clearance || [],
          references: resume.data.references || [],
          teaching: resume.data.teaching || [],
          additional: resume.data.additional || [],
          languages: resume.data.languages || [],
          interests: resume.data.interests || []
        };
        
        setResumeData(transformedData);
        
        // Update template in URL if it's different
        if (resume.template !== templateId) {
          const params = new URLSearchParams(searchParams);
          params.set("template", resume.template);
          router.push(`/editor?id=${id}&${params.toString()}`);
        }
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

  // Save resume to database
  const saveResume = async (title = resumeData.name || "My Resume") => {
    setIsSaving(true);
    try {
      const resumePayload = {
        title,
        template: templateId,
        data: resumeData,
      };

      let url, method;
      
      if (resumeId) {
        // Update existing resume
        url = `/api/resumes/${resumeId}`;
        method = 'PUT';
      } else {
        // Create new resume
        url = '/api/resumes';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumePayload),
      });

      if (response.ok) {
        const savedResume = await response.json();
        setLastSaved(new Date());
        
        // If this was a new resume, update the URL with the ID
        if (!resumeId && savedResume._id) {
          const params = new URLSearchParams(searchParams);
          params.set("id", savedResume._id);
          router.push(`/editor?${params.toString()}`);
        }
        
        // alert('Resume saved successfully!');
      } else {
        alert('Failed to save resume. Please try again.');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDataUpdate = useCallback((newData) => {
    setResumeData(newData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:h-16 gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl font-semibold text-card-foreground">
                Resume Editor
              </h1>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Template:{" "}
                {templateId.charAt(0).toUpperCase() + templateId.slice(1)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {lastSaved && (
                <span className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => saveResume()}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Resume'}
                </button>
                <button
                  onClick={() => setIsEditDrawerOpen(true)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Edit Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Preview - Takes 2/3 of the width */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                Resume Preview
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Live Preview</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Full Resume Display */}
            <div className="bg-card shadow-lg rounded-lg overflow-hidden border border-border">
              {/* <div className="bg-gray-50 py-2 border-b">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {templateId.charAt(0).toUpperCase() + templateId.slice(1)}{" "}
                    Template
                  </span>
                  <span className="text-xs text-gray-500">A4 Format</span>
                </div>
              </div> */}

              {/* Resume Content - Fixed overflow */}
              <div className="min-w-full">
                <TemplateManager templateType={templateId} data={resumeData} />
              </div>
            </div>
          </div>

          {/* Quick Actions & PDF Download - Takes 1/3 of the width */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Resume Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {resumeData.experience?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {resumeData.skills?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {resumeData.projects?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {resumeData.education?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Education</div>
                </div>
              </div>
            </div>

            {/* PDF Download */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Download PDF
              </h3>
              <PDFDownloader
                resumeData={resumeData}
                templateType={templateId}
                templateName={
                  templateId.charAt(0).toUpperCase() + templateId.slice(1)
                }
              />
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                💡 Quick Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use the "Edit Resume" button to modify your content</li>
                <li>• All changes are reflected in real-time</li>
                <li>• Save your progress regularly</li>
                <li>• Download PDF when you're satisfied</li>
              </ul>
            </div>
          </div>
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

      <AIAssistant />
      
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
