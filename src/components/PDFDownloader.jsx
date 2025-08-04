"use client";

import { useState } from "react";
import { renderToString } from "react-dom/server";

const PDFDownloader = ({ resumeData, templateType, templateName }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkText, setWatermarkText] = useState("ResumeAI Builder");

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const templateComponent = getTemplateComponent(resumeData, templateType);
      console.log("templateType", templateType);
      const htmlContent = renderToString(templateComponent);

      // Make API call to generate PDF
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          htmlContent,
          resumeData,
          templateType,
          // watermarkOptions: {
          //   show: showWatermark,
          //   text: watermarkText
          // }
        }),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      // Get the PDF blob
      const pdfBlob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;

      // Generate proper filename
      const name = resumeData?.personal?.name || resumeData?.name || "Resume";
      const title = resumeData?.personal?.title || resumeData?.title || "";
      const filename = title ? `${name} - ${title}` : name;
      link.download = `${filename}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getTemplateComponent = (data, templateType) => {
    switch (templateType) {
      case "modern":
        const ModernTemplate = require("./templates/ModernTemplate").default;
        return <ModernTemplate data={data} />;
      case "classic":
        const ClassicTemplate = require("./templates/ClassicTemplate").default;
        return <ClassicTemplate data={data} />;
      case "creative":
        const CreativeTemplate =
          require("./templates/CreativeTemplate").default;
        return <CreativeTemplate data={data} />;
      case "minimal":
        const MinimalTemplate = require("./templates/MinimalTemplate").default;
        return <MinimalTemplate data={data} />;
      case "tech":
        const TechTemplate = require("./templates/TechTemplate").default;
        return <TechTemplate data={data} />;
      case "startup":
        const StartupTemplate = require("./templates/StartupTemplate").default;
        return <StartupTemplate data={data} />;
      case "academic":
        const AcademicTemplate =
          require("./templates/AcademicTemplate").default;
        return <AcademicTemplate data={data} />;
      case "federal":
        const FederalTemplate = require("./templates/FederalTemplate").default;
        return <FederalTemplate data={data} />;
      default:
        const DefaultTemplate = require("./templates/ModernTemplate").default;
        return <DefaultTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Watermark Options */}
      {/* <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Add Watermark
          </label>
          <button
            onClick={() => setShowWatermark(!showWatermark)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showWatermark ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showWatermark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {showWatermark && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Watermark Text
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter watermark text"
            />
            <p className="text-xs text-gray-500">
              Watermark will appear in bottom-right corner of the PDF
            </p>
          </div>
        )}
      </div> */}

      {/* Download Button */}
      <button
        id="download-pdf-btn"
        onClick={generatePDF}
        disabled={isGenerating}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
        <span>{isGenerating ? "Generating PDF..." : "Download PDF"}</span>
      </button>

      {/* PDF Info */}
      {/* <div className="text-center text-xs text-gray-600">
        <p>Using existing template components for perfect PDF generation</p>
        <p>Format: A4 | Template: {templateName || templateType}</p>
        {showWatermark && (
          <p>Watermark: {watermarkText}</p>
        )}
      </div> */}
    </div>
  );
};

export default PDFDownloader;
