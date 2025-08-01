"use client";

import { useState } from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf
} from '@react-pdf/renderer';
import UniversalTemplate from './UniversalTemplate';

const PDFDownloader = ({ resumeData, templateType, templateName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Create PDF Document using react-pdf components directly
  const MyDocument = ({ resumeData, templateType }) => {
    const colors = getTemplateColors(templateType);
    
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontSize: 10,
        lineHeight: 1.4,
      },
      header: {
        marginBottom: 20,
        borderBottom: `4px solid ${colors.primary}`,
        paddingBottom: 24,
      },
      name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.secondary,
        textAlign: 'center',
        marginBottom: 8,
      },
      title: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
      },
      contact: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        fontSize: 10,
        color: '#6b7280',
      },
      section: {
        marginBottom: 32,
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.secondary,
        marginBottom: 16,
        borderBottom: `2px solid ${colors.border}`,
        paddingBottom: 8,
      },
      experienceItem: {
        marginBottom: 12,
        borderLeft: `4px solid ${colors.primary}`,
        paddingLeft: 24,
      },
      experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.secondary,
      },
      company: {
        fontSize: 10,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      dates: {
        fontSize: 9,
        color: '#6b7280',
      },
      achievements: {
        marginLeft: 10,
        fontSize: 9,
        color: colors.text,
      },
      skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
      },
      skillTag: {
        backgroundColor: colors.accent,
        color: colors.secondary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 9,
        fontWeight: 'bold',
      },
      educationItem: {
        marginBottom: 8,
      },
      educationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      degree: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.secondary,
      },
      school: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 'bold',
      },
      summary: {
        fontSize: 10,
        color: colors.text,
        lineHeight: 1.5,
        marginBottom: 16,
      },
    });

    function getTemplateColors(templateType) {
      switch (templateType) {
        case 'modern':
          return {
            primary: '#3b82f6',
            secondary: '#1f2937',
            accent: '#1e40af',
            background: '#ffffff',
            text: '#374151',
            border: '#e5e7eb'
          };
        case 'creative':
          return {
            primary: '#8b5cf6',
            secondary: '#6d28d9',
            accent: '#f3e8ff',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        case 'startup':
          return {
            primary: '#ef4444',
            secondary: '#b91c1c',
            accent: '#fee2e2',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        case 'tech':
          return {
            primary: '#10b981',
            secondary: '#047857',
            accent: '#d1fae5',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        case 'academic':
          return {
            primary: '#7c3aed',
            secondary: '#5b21b6',
            accent: '#f3e8ff',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        case 'classic':
          return {
            primary: '#374151',
            secondary: '#6b7280',
            accent: '#f3f4f6',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        case 'minimal':
          return {
            primary: '#6b7280',
            secondary: '#9ca3af',
            accent: '#f9fafb',
            background: '#ffffff',
            text: '#374151',
            border: '#d1d5db'
          };
        case 'federal':
          return {
            primary: '#1e40af',
            secondary: '#3b82f6',
            accent: '#dbeafe',
            background: '#ffffff',
            text: '#1f2937',
            border: '#e5e7eb'
          };
        default:
          return {
            primary: '#3b82f6',
            secondary: '#1f2937',
            accent: '#dbeafe',
            background: '#ffffff',
            text: '#374151',
            border: '#e5e7eb'
          };
      }
    }

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.name || 'Your Name'}</Text>
            <Text style={styles.title}>{resumeData.title || 'Professional Title'}</Text>
            <View style={styles.contact}>
              <Text>{resumeData.email || 'email@example.com'}</Text>
              <Text>{resumeData.phone || '+1 (555) 123-4567'}</Text>
              <Text>{resumeData.location || 'City, State'}</Text>
            </View>
          </View>

          {/* Summary */}
          {resumeData.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resumeData.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{exp.title}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dates}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </Text>
                  </View>
                  {exp.achievements && exp.achievements.map((achievement, i) => (
                    <Text key={i} style={styles.achievements}>
                      • {achievement}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>{edu.degree}</Text>
                      <Text style={styles.school}>
                        {edu.school || edu.institution}
                      </Text>
                    </View>
                    <Text style={styles.dates}>
                      {edu.year || edu.graduationYear}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {resumeData.projects.map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{project.name}</Text>
                      <Text style={styles.company}>{project.technologies}</Text>
                    </View>
                    <Text style={styles.dates}>{project.year}</Text>
                  </View>
                  <Text style={styles.achievements}>{project.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {resumeData.certifications.map((cert, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>{cert.name}</Text>
                      <Text style={styles.dates}>
                        {cert.year || cert.date}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.school}>{cert.issuer}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Awards */}
          {resumeData.awards && resumeData.awards.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              {resumeData.awards.map((award, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>{award.name}</Text>
                      <Text style={styles.dates}>
                        {award.year || award.date}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.school}>{award.issuer}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Additional sections can be added here */}
        </Page>
      </Document>
    );
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const blob = await pdf(
        <MyDocument resumeData={resumeData} templateType={templateType} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      
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
        <p>Fixed PDF generation with proper content</p>
        <p>Format: A4 | Template: {templateName || templateType}</p>
      </div>
    </div>
  );
};

export default PDFDownloader;
