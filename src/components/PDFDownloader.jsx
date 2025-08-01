"use client";

import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import StartupTemplate from './templates/StartupTemplate';
import FederalTemplate from './templates/FederalTemplate';

const PDFDownloader = ({ resumeData, templateType, templateName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Render the template component to HTML
      const templateComponent = getTemplateComponent(resumeData, templateType);
      const htmlContent = renderToString(templateComponent);

      // Call the API route with the rendered HTML
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent,
          resumeData,
          templateType,
        }),
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Get the PDF blob
      const pdfBlob = await response.blob();
      const url = URL.createObjectURL(pdfBlob);
      
      // Download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.name || 'resume'}_${
        templateName || templateType
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      // Success message
      const downloadBtn = document.getElementById('download-pdf-btn');
      downloadBtn.textContent = 'PDF Downloaded!';
      setTimeout(() => {
        downloadBtn.textContent = "Download PDF";
        setIsGenerating(false);
      }, 2000);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      const downloadBtn = document.getElementById('download-pdf-btn');
      downloadBtn.textContent = 'Failed to Download';
      setTimeout(() => {
        downloadBtn.textContent = 'Download PDF';
        setIsGenerating(false);
      }, 2000);
    }
  };

  const getTemplateComponent = (data, templateType) => {
    switch (templateType) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'academic':
        return <AcademicTemplate data={data} />;
      case 'startup':
        return <StartupTemplate data={data} />;
      case 'federal':
        return <FederalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Download Button */}
      <button
        id="download-pdf-btn"
        onClick={generatePDF}
        disabled={isGenerating}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>{isGenerating ? 'Generating PDF...' : 'Download PDF'}</span>
      </button>

      {/* PDF Info */}
      <div className="text-center text-xs text-gray-600">
        <p>Using existing template components for perfect PDF generation</p>
        <p>Format: A4 | Template: {templateName || templateType}</p>
      </div>
    </div>
  );
};

export default PDFDownloader;
