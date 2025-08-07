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
import PDFDownloader from "@/components/PDFDownloader";
import ProtectedRoute from "@/components/ProtectedRoute";

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [currentTemplate, setCurrentTemplate] = useState("classic");
  const [isSaving, setIsSaving] = useState(false);
  const [lastModified, setLastModified] = useState(null);
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    linkedin: "",
    website: "",
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
    interests: [],
  });

  useEffect(() => {
    const template = searchParams.get("template") || "classic";
    const profession = searchParams.get("profession");
    const resumeId = searchParams.get("id");

    if (resumeId) {
      // Load existing resume
      fetchResume(resumeId);
    } else if (profession && sampleData[profession]) {
      // Load sample data for profession
      setResumeData(sampleData[profession]);
      setCurrentTemplate(template);
    } else {
      // Set default template from URL params
      setCurrentTemplate(template);
    }
  }, [searchParams]);

  const fetchResume = async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const resume = await response.json();
        setResumeData(resume.data);

        // Pick template from backend resume data if available
        if (resume.template) {
          setCurrentTemplate(resume.template);
        }

        // Set last modified time
        if (resume.updatedAt) {
          setLastModified(new Date(resume.updatedAt));
        }
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleDataUpdate = (newData) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  };

  const handleSaveResume = async () => {
    try {
      setIsSaving(true);
      const resumeId = searchParams.get("id");
      const method = resumeId ? "PUT" : "POST";
      const url = resumeId ? `/api/resumes/${resumeId}` : "/api/resumes";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: resumeData.personal?.name || resumeData.name || "My Resume",
          template: currentTemplate,
          data: resumeData,
        }),
      });

      if (response.ok) {
        const savedResume = await response.json();
        // Update last modified time
        setLastModified(new Date());

        if (!resumeId) {
          // Only redirect if it's a new resume
          router.push(`/editor?id=${savedResume._id}`);
        }
      }
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to format last modified time
  const formatLastModified = (date) => {
    if (!date) return null;

    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString();
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
    interests: resumeData.interests?.length || 0,
  };

  const renderTemplate = () => {
    switch (currentTemplate) {
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      case "tech":
        return <TechTemplate data={resumeData} />;
      case "academic":
        return <AcademicTemplate data={resumeData} />;
      case "startup":
        return <StartupTemplate data={resumeData} />;
      case "federal":
        return <FederalTemplate data={resumeData} />;
      default:
        return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-3 sm:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-muted-foreground hover:text-card-foreground transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-card-foreground">
                Resume Editor
              </h1>
              {/* Template indicator */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Template:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {currentTemplate}
                </span>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
            </div> */}

            <div className="flex items-center space-x-3">
              <PDFDownloader
                resumeData={resumeData}
                template={currentTemplate}
                templateType={currentTemplate}
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      <span>Save progress</span>
                    </>
                  )}
                </button>
                {lastModified && (
                  <span className="text-xs text-muted-foreground">
                    Last saved: {formatLastModified(lastModified)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsEditDrawerOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-3">
            {/* Top Row - Title, Back Button, and Template */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.back()}
                  className="text-muted-foreground hover:text-card-foreground transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <h1 className="text-lg font-semibold text-card-foreground">
                  Resume Editor
                </h1>
              </div>

              {/* Template Badge */}
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {currentTemplate}
                </span>
              </div>
            </div>

            {/* Stats Row */}
            {/* <div className="flex items-center justify-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.experience}
                </span>
                <span className="text-muted-foreground">Exp</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.education}
                </span>
                <span className="text-muted-foreground">Edu</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.skills}
                </span>
                <span className="text-muted-foreground">Skills</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  {stats.projects}
                </span>
                <span className="text-muted-foreground">Proj</span>
              </div>
            </div> */}

            {/* Action Buttons Row */}
            <div className="">
              <PDFDownloader
                className="!w-full"
                resumeData={resumeData}
                template={currentTemplate}
                templateType={currentTemplate}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      <span>Save progress</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsEditDrawerOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Edit Resume
                </button>
              </div>
              {lastModified && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-muted-foreground">
                    Last saved: {formatLastModified(lastModified)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex ">
        {/* Resume Preview */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">{renderTemplate()}</div>
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
        <AIAssistant resumeData={resumeData} onUpdateData={handleDataUpdate} />
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
    <ProtectedRoute>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorContent />
      </Suspense>
    </ProtectedRoute>
  );
}
