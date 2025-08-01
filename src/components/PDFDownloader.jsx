"use client";

import { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const PDFDownloader = ({ resumeData, templateType, templateName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Create comprehensive template-specific styles
  const getTemplateStyles = (templateType) => {
    const baseStyles = StyleSheet.create({
      page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 40,
        fontSize: 10,
        lineHeight: 1.4,
      },
      header: {
        marginBottom: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 4,
      },
      title: {
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 8,
      },
      contact: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        fontSize: 9,
        color: "#6b7280",
      },
      section: {
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 8,
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: 4,
      },
      experienceItem: {
        marginBottom: 12,
      },
      experienceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
      },
      jobTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#1f2937",
      },
      company: {
        fontSize: 10,
        color: "#6b7280",
      },
      dates: {
        fontSize: 9,
        color: "#6b7280",
      },
      achievements: {
        marginLeft: 10,
        fontSize: 9,
        color: "#374151",
      },
      skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
      },
      skillTag: {
        backgroundColor: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 8,
        color: "#374151",
      },
      educationItem: {
        marginBottom: 8,
      },
      educationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
      },
      degree: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#1f2937",
      },
      school: {
        fontSize: 9,
        color: "#6b7280",
      },
      summary: {
        fontSize: 10,
        color: "#374151",
        lineHeight: 1.5,
        marginBottom: 16,
      },
    });

    // Template-specific comprehensive styles
    switch (templateType) {
      case "modern":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#1f2937", fontSize: 28 },
          title: { ...baseStyles.title, color: "#3b82f6", fontSize: 16, fontWeight: "bold" },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#1f2937",
            fontSize: 14,
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: 6
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#3b82f6", fontWeight: "bold" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#dbeafe",
            borderColor: "#3b82f6",
            color: "#1e40af",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 6
          }
        };
      case "creative":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#ffffff", fontSize: 32, textAlign: "center" },
          title: { ...baseStyles.title, color: "#ffffff", fontSize: 18, textAlign: "center", opacity: 0.9 },
          contact: {
            ...baseStyles.contact,
            color: "#ffffff",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20
          },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#1f2937",
            fontSize: 16,
            borderBottom: "none",
            paddingBottom: 0,
            flexDirection: "row",
            alignItems: "center"
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#6b7280" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#f3e8ff",
            borderColor: "#8b5cf6",
            color: "#6d28d9",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 6
          }
        };
      case "startup":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#ffffff", fontSize: 32, textAlign: "center" },
          title: { ...baseStyles.title, color: "#ffffff", fontSize: 18, textAlign: "center", opacity: 0.9 },
          contact: {
            ...baseStyles.contact,
            color: "#ffffff",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20
          },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#1f2937",
            fontSize: 16,
            borderBottom: "none",
            paddingBottom: 0,
            flexDirection: "row",
            alignItems: "center"
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#ef4444", fontWeight: "bold" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#fee2e2",
            borderColor: "#ef4444",
            color: "#b91c1c",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 6
          }
        };
      case "tech":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#10b981", fontSize: 28 },
          title: { ...baseStyles.title, color: "#6b7280", fontSize: 16 },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#10b981",
            fontSize: 14,
            borderBottom: "2px solid #10b981",
            paddingBottom: 6
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#10b981", fontWeight: "bold" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#d1fae5",
            borderColor: "#10b981",
            color: "#047857",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 6
          }
        };
      case "academic":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#7c3aed", fontSize: 28 },
          title: { ...baseStyles.title, color: "#6b7280", fontSize: 16 },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#7c3aed",
            fontSize: 14,
            borderBottom: "2px solid #7c3aed",
            paddingBottom: 6
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#7c3aed", fontWeight: "bold" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#f3e8ff",
            borderColor: "#a855f7",
            color: "#5b21b6",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 6
          }
        };
      case "classic":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#374151", fontSize: 28 },
          title: { ...baseStyles.title, color: "#6b7280", fontSize: 16 },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#374151",
            fontSize: 14,
            borderBottom: "2px solid #374151",
            paddingBottom: 6
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#6b7280" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#f3f4f6",
            borderColor: "#6b7280",
            color: "#374151",
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4
          }
        };
      case "minimal":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#6b7280", fontSize: 28 },
          title: { ...baseStyles.title, color: "#9ca3af", fontSize: 16 },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#6b7280",
            fontSize: 14,
            borderBottom: "1px solid #9ca3af",
            paddingBottom: 4
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#374151", fontSize: 12 },
          company: { ...baseStyles.company, color: "#9ca3af" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#f9fafb",
            borderColor: "#d1d5db",
            color: "#6b7280",
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4
          }
        };
      case "federal":
        return {
          ...baseStyles,
          name: { ...baseStyles.name, color: "#1e40af", fontSize: 28 },
          title: { ...baseStyles.title, color: "#6b7280", fontSize: 16 },
          sectionTitle: {
            ...baseStyles.sectionTitle,
            color: "#1e40af",
            fontSize: 14,
            borderBottom: "2px solid #1e40af",
            paddingBottom: 6
          },
          jobTitle: { ...baseStyles.jobTitle, color: "#1f2937", fontSize: 12 },
          company: { ...baseStyles.company, color: "#1e40af", fontWeight: "bold" },
          skillTag: {
            ...baseStyles.skillTag,
            backgroundColor: "#dbeafe",
            borderColor: "#3b82f6",
            color: "#1e40af",
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4
          }
        };
      default:
        return baseStyles;
    }
  };

  // Create PDF Document with exact template matching
  const MyDocument = ({ resumeData, templateType }) => {
    const styles = getTemplateStyles(templateType);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header with template-specific styling */}
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.name || "Your Name"}</Text>
            <Text style={styles.title}>{resumeData.title || "Professional Title"}</Text>
            <View style={styles.contact}>
              <Text>{resumeData.email || "email@example.com"}</Text>
              <Text>{resumeData.phone || "+1 (555) 123-4567"}</Text>
              <Text>{resumeData.location || "City, State"}</Text>
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
                      {exp.startDate} - {exp.endDate}
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

          {/* Achievements */}
          {resumeData.achievements && resumeData.achievements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              {resumeData.achievements.map((achievement, index) => {
                if (typeof achievement === "string") {
                  return (
                    <Text key={index} style={styles.achievements}>
                      • {achievement}
                    </Text>
                  );
                } else if (achievement && typeof achievement === "object") {
                  return (
                    <View key={index} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <View>
                          <Text style={styles.jobTitle}>
                            {achievement.title || "Achievement"}
                          </Text>
                          {achievement.metrics && (
                            <Text style={styles.company}>
                              {achievement.metrics}
                            </Text>
                          )}
                        </View>
                      </View>
                      {achievement.description && (
                        <Text style={styles.achievements}>
                          {achievement.description}
                        </Text>
                      )}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}

          {/* Publications */}
          {resumeData.publications && resumeData.publications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Publications</Text>
              {resumeData.publications.map((pub, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>
                        {pub.title || pub.name || "Publication"}
                      </Text>
                      {pub.authors && (
                        <Text style={styles.school}>{pub.authors}</Text>
                      )}
                    </View>
                    <Text style={styles.dates}>{pub.year || pub.date}</Text>
                  </View>
                  {pub.journal && (
                    <Text style={styles.school}>{pub.journal}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Memberships */}
          {resumeData.memberships && resumeData.memberships.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Memberships</Text>
              {resumeData.memberships.map((membership, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>
                        {membership.organization || membership.name}
                      </Text>
                      {membership.role && (
                        <Text style={styles.school}>{membership.role}</Text>
                      )}
                    </View>
                    <Text style={styles.dates}>
                      {membership.year || membership.period}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Clearance */}
          {resumeData.clearance && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Security Clearance</Text>
              {Array.isArray(resumeData.clearance) ? (
                resumeData.clearance.map((clearance, index) => (
                  <View key={index} style={styles.educationItem}>
                    <View style={styles.educationHeader}>
                      <View>
                        <Text style={styles.degree}>{clearance.level}</Text>
                        <Text style={styles.school}>{clearance.agency}</Text>
                      </View>
                      <Text style={styles.dates}>{clearance.date}</Text>
                    </View>
                  </View>
                ))
              ) : typeof resumeData.clearance === "string" ? (
                <Text style={styles.achievements}>
                  • {resumeData.clearance}
                </Text>
              ) : (
                <Text style={styles.achievements}>
                  • {JSON.stringify(resumeData.clearance)}
                </Text>
              )}
            </View>
          )}

          {/* References */}
          {resumeData.references && resumeData.references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              {resumeData.references.map((ref, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>{ref.name}</Text>
                      <Text style={styles.school}>{ref.title}</Text>
                    </View>
                  </View>
                  <Text style={styles.school}>
                    {ref.company || ref.organization}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Teaching */}
          {resumeData.teaching && resumeData.teaching.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Teaching Experience</Text>
              {resumeData.teaching.map((course, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>
                        {course.course || course.name}
                      </Text>
                      <Text style={styles.dates}>
                        {course.year || course.period}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.school}>{course.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Additional */}
          {resumeData.additional && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Information</Text>
              {Array.isArray(resumeData.additional) ? (
                resumeData.additional.map((item, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.jobTitle}>
                          {item.title || "Additional Item"}
                        </Text>
                      </View>
                    </View>
                    {item.content && (
                      <Text style={styles.achievements}>{item.content}</Text>
                    )}
                  </View>
                ))
              ) : typeof resumeData.additional === "string" ? (
                <Text style={styles.summary}>{resumeData.additional}</Text>
              ) : (
                <Text style={styles.summary}>
                  {JSON.stringify(resumeData.additional)}
                </Text>
              )}
            </View>
          )}
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
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.name || "resume"}_${
        templateName || templateType
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      // Success message
      const downloadBtn = document.getElementById("download-pdf-btn");
      const originalText = downloadBtn.textContent;
      downloadBtn.textContent = "PDF Downloaded!";
      setTimeout(() => {
        downloadBtn.textContent = originalText;
        setIsGenerating(false);
      }, 2000);
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      const downloadBtn = document.getElementById("download-pdf-btn");
      downloadBtn.textContent = "Failed to Download";
      setTimeout(() => {
        downloadBtn.textContent = "Download PDF";
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
        <span>{isGenerating ? "Generating PDF..." : "Download PDF"}</span>
      </button>

      {/* PDF Info */}
      <div className="text-center text-xs text-gray-600">
        <p>Exact template design in PDF</p>
        <p>Format: A4 | Template: {templateName || templateType}</p>
      </div>
    </div>
  );
};

export default PDFDownloader;
