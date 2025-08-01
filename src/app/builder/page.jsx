"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateManager from "../../components/TemplateManager";
import EditDrawer from "../../components/EditDrawer";
import PDFDownloader from "../../components/PDFDownloader";
import { sampleResumeData } from "../../constants/sampleData";
import { templates } from "../../constants/templates";

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProfession, setSelectedProfession] = useState("softwareEngineer");
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [resumeData, setResumeData] = useState(sampleResumeData.softwareEngineer);
  const resumeRef = useRef(null);

  // Get template from URL params, default to 'modern'
  const selectedTemplate = searchParams.get("template") || "modern";

  // Update resume data when profession changes
  useEffect(() => {
    setResumeData(sampleResumeData[selectedProfession] || sampleResumeData.softwareEngineer);
  }, [selectedProfession]);

  // Function to update template in URL
  const updateTemplateInURL = (templateId) => {
    const params = new URLSearchParams(searchParams);
    params.set("template", templateId);
    router.push(`/builder?${params.toString()}`);
  };

  // Function to handle data updates from drawer
  const handleDataUpdate = (updatedData) => {
    setResumeData(updatedData);
  };

  // Get available templates for the builder
  const availableTemplates = templates;

  // Get current template name
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  // Available professions
  const professions = [
    { id: "softwareEngineer", name: "Software Engineer" },
    { id: "marketingManager", name: "Marketing Manager" },
    { id: "graphicDesigner", name: "Graphic Designer" },
    { id: "dataScientist", name: "Data Scientist" },
    { id: "productManager", name: "Product Manager" },
    { id: "entrepreneur", name: "Entrepreneur" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">Resume Builder</h1>
          <p className="text-blue-100">
            Create your professional resume with our AI-powered builder
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1 lg:sticky top-4 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Choose Template
              </h2>
              <div className="space-y-3">
                {availableTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => updateTemplateInURL(template.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {template.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Profession Selector */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Sample Data
                </h3>
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {professions.map((profession) => (
                    <option key={profession.id} value={profession.id}>
                      {profession.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  Switch between different sample data sets
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => setIsEditDrawerOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Edit Information
                </button>
                <PDFDownloader 
                  resumeData={resumeData}
                  templateType={selectedTemplate}
                  templateName={currentTemplate?.name}
                />
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200">
                  Get AI Suggestions
                </button>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Resume Preview
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    Zoom Out
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    Zoom In
                  </button>
                </div>
              </div>

              {/* Template Preview */}
              <div className="rounded-lg overflow-hidden bg-gray-50 lg:p-4">
                <div ref={resumeRef} data-resume-content>
                  <TemplateManager
                    templateType={selectedTemplate}
                    data={resumeData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Drawer */}
      <EditDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        data={resumeData}
        onSave={handleDataUpdate}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume builder...</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
