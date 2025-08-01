'use client';

import { View, Text, StyleSheet } from '@react-pdf/renderer';

const UniversalTemplate = ({ data, templateType, isForPDF = false }) => {
  // Template-specific color schemes
  const getTemplateColors = (templateType) => {
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
  };

  const colors = getTemplateColors(templateType);

  // Create styles for PDF
  const pdfStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 32,
      fontSize: 10,
      lineHeight: 1.4,
    },
    header: {
      marginBottom: 32,
      borderBottom: `4px solid ${colors.primary}`,
      paddingBottom: 24,
    },
    headerContent: {
      textAlign: 'center',
    },
    name: {
      color: colors.secondary,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    title: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
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
      color: colors.secondary,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 16,
      borderBottom: `2px solid ${colors.border}`,
      paddingBottom: 8,
    },
    summary: {
      color: colors.text,
      fontSize: 10,
      lineHeight: 1.5,
      marginBottom: 16,
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
      color: colors.secondary,
      fontSize: 12,
      fontWeight: 'bold',
    },
    company: {
      color: colors.primary,
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    dates: {
      color: '#6b7280',
      fontSize: 9,
    },
    achievements: {
      color: colors.text,
      fontSize: 9,
      marginLeft: 10,
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
      color: colors.secondary,
      fontSize: 10,
      fontWeight: 'bold',
    },
    school: {
      color: colors.primary,
      fontSize: 9,
      fontWeight: 'bold',
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
    projectItem: {
      marginBottom: 12,
      borderLeft: `4px solid ${colors.primary}`,
      paddingLeft: 24,
    },
    projectTitle: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    projectDescription: {
      color: colors.text,
      fontSize: 9,
      marginBottom: 4,
    },
    projectTech: {
      backgroundColor: colors.accent,
      color: colors.secondary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 8,
    },
    certItem: {
      marginBottom: 8,
    },
    certHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    certName: {
      color: colors.secondary,
      fontSize: 10,
      fontWeight: 'bold',
    },
    certIssuer: {
      color: colors.primary,
      fontSize: 9,
      fontWeight: 'bold',
    },
  });

  // For web rendering
  if (!isForPDF) {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 font-sans">
        {/* Header */}
        <div className="border-b-4 pb-6 mb-8" style={{ borderBottomColor: colors.primary }}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2" style={{ color: colors.secondary }}>
              {data.name || 'Your Name'}
            </h1>
            <p className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
              {data.title || 'Professional Title'}
            </p>
            <div className="flex justify-center space-x-6">
              <span className="text-gray-600">{data.email || 'email@example.com'}</span>
              <span className="text-gray-600">{data.phone || '+1 (555) 123-4567'}</span>
              <span className="text-gray-600">{data.location || 'City, State'}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 pl-6" style={{ borderLeftColor: colors.primary }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-medium mb-2" style={{ color: colors.primary }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.achievements && exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium" style={{ color: colors.primary }}>
                      {edu.school || edu.institution}
                    </p>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {edu.year || edu.graduationYear}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.secondary,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 pl-6" style={{ borderLeftColor: colors.primary }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies && project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.secondary,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{cert.name}</span>
                  <span className="text-gray-600 text-sm">
                    {cert.issuer} • {cert.year || cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Awards
            </h2>
            <div className="space-y-2">
              {data.awards.map((award, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{award.name}</span>
                  <span className="text-gray-600 text-sm">
                    {award.issuer} • {award.year || award.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // For PDF rendering
  return (
    <View style={pdfStyles.container}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <View style={pdfStyles.headerContent}>
          <Text style={pdfStyles.name}>{data.name || 'Your Name'}</Text>
          <Text style={pdfStyles.title}>{data.title || 'Professional Title'}</Text>
          <View style={pdfStyles.contact}>
            <Text>{data.email || 'email@example.com'}</Text>
            <Text>{data.phone || '+1 (555) 123-4567'}</Text>
            <Text>{data.location || 'City, State'}</Text>
          </View>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Professional Summary</Text>
          <Text style={pdfStyles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={pdfStyles.experienceItem}>
              <View style={pdfStyles.experienceHeader}>
                <View>
                  <Text style={pdfStyles.jobTitle}>{exp.title}</Text>
                  <Text style={pdfStyles.company}>{exp.company}</Text>
                </View>
                <Text style={pdfStyles.dates}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </Text>
              </View>
              {exp.achievements && exp.achievements.map((achievement, i) => (
                <Text key={i} style={pdfStyles.achievements}>
                  • {achievement}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={pdfStyles.educationItem}>
              <View style={pdfStyles.educationHeader}>
                <View>
                  <Text style={pdfStyles.degree}>{edu.degree}</Text>
                  <Text style={pdfStyles.school}>
                    {edu.school || edu.institution}
                  </Text>
                </View>
                <Text style={pdfStyles.dates}>
                  {edu.year || edu.graduationYear}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Skills</Text>
          <View style={pdfStyles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={pdfStyles.skillTag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={pdfStyles.projectItem}>
              <Text style={pdfStyles.projectTitle}>{project.name}</Text>
              <Text style={pdfStyles.projectDescription}>{project.description}</Text>
              <View style={pdfStyles.skillsContainer}>
                {project.technologies && project.technologies.map((tech, idx) => (
                  <Text key={idx} style={pdfStyles.projectTech}>
                    {tech}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <View key={index} style={pdfStyles.certItem}>
              <View style={pdfStyles.certHeader}>
                <Text style={pdfStyles.certName}>{cert.name}</Text>
                <Text style={pdfStyles.dates}>
                  {cert.year || cert.date}
                </Text>
              </View>
              <Text style={pdfStyles.certIssuer}>{cert.issuer}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Awards</Text>
          {data.awards.map((award, index) => (
            <View key={index} style={pdfStyles.certItem}>
              <View style={pdfStyles.certHeader}>
                <Text style={pdfStyles.certName}>{award.name}</Text>
                <Text style={pdfStyles.dates}>
                  {award.year || award.date}
                </Text>
              </View>
              <Text style={pdfStyles.certIssuer}>{award.issuer}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default UniversalTemplate; 