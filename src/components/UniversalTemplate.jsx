'use client';

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

  // Conditional component selection
  const Container = isForPDF ? 'View' : 'div';
  const TextElement = isForPDF ? 'Text' : 'p';
  const Heading = isForPDF ? 'Text' : 'h1';
  const SubHeading = isForPDF ? 'Text' : 'h2';
  const SectionHeading = isForPDF ? 'Text' : 'h3';
  const Span = isForPDF ? 'Text' : 'span';
  const ListItem = isForPDF ? 'Text' : 'li';
  const UnorderedList = isForPDF ? 'View' : 'ul';

  // Helper function to get styles for both web and PDF
  const getStyles = (baseStyles, templateStyles = {}) => {
    if (isForPDF) {
      return { ...baseStyles, ...templateStyles };
    }
    return { className: baseStyles.className, style: { ...baseStyles.style, ...templateStyles } };
  };

  return (
    <Container {...getStyles(
      { className: 'bg-white shadow-lg max-w-4xl mx-auto p-8 font-sans' },
      { backgroundColor: colors.background, padding: 32 }
    )}>
      {/* Header */}
      <Container {...getStyles(
        { className: 'border-b-4 pb-6 mb-8' },
        { 
          borderBottomColor: colors.primary, 
          borderBottomWidth: 4, 
          paddingBottom: 24, 
          marginBottom: 32 
        }
      )}>
        <Container {...getStyles({ className: 'text-center' })}>
          <Heading {...getStyles(
            { className: 'text-4xl font-bold mb-2' },
            { 
              color: colors.secondary, 
              fontSize: 28, 
              fontWeight: 'bold', 
              marginBottom: 8, 
              textAlign: 'center' 
            }
          )}>
            {data.name || 'Your Name'}
          </Heading>
          <TextElement {...getStyles(
            { className: 'text-xl font-semibold mb-2' },
            { 
              color: colors.primary, 
              fontSize: 16, 
              fontWeight: 'bold', 
              marginBottom: 8, 
              textAlign: 'center' 
            }
          )}>
            {data.title || 'Professional Title'}
          </TextElement>
          <Container {...getStyles(
            { className: 'flex justify-center space-x-6' },
            { 
              flexDirection: 'row', 
              justifyContent: 'center', 
              gap: 24 
            }
          )}>
            <Span {...getStyles(
              { className: 'text-gray-600' },
              { color: '#6b7280', fontSize: 10 }
            )}>
              {data.email || 'email@example.com'}
            </Span>
            <Span {...getStyles(
              { className: 'text-gray-600' },
              { color: '#6b7280', fontSize: 10 }
            )}>
              {data.phone || '+1 (555) 123-4567'}
            </Span>
            <Span {...getStyles(
              { className: 'text-gray-600' },
              { color: '#6b7280', fontSize: 10 }
            )}>
              {data.location || 'City, State'}
            </Span>
          </Container>
        </Container>
      </Container>

      {/* Summary */}
      {data.summary && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Professional Summary
          </SubHeading>
          <TextElement {...getStyles(
            { className: 'text-gray-700 leading-relaxed' },
            { 
              color: colors.text, 
              fontSize: 10, 
              lineHeight: 1.5, 
              marginBottom: 16 
            }
          )}>
            {data.summary}
          </TextElement>
        </Container>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Professional Experience
          </SubHeading>
          <Container {...getStyles(
            { className: 'space-y-6' },
            { marginBottom: 16 }
          )}>
            {data.experience.map((exp, index) => (
              <Container key={index} {...getStyles(
                { className: 'border-l-4 pl-6' },
                { 
                  borderLeftColor: colors.primary, 
                  borderLeftWidth: 4, 
                  paddingLeft: 24, 
                  marginBottom: 12 
                }
              )}>
                <Container {...getStyles(
                  { className: 'flex justify-between items-start mb-2' },
                  { 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    marginBottom: 4 
                  }
                )}>
                  <Container>
                    <SectionHeading {...getStyles(
                      { className: 'text-lg font-semibold text-gray-900' },
                      { 
                        color: colors.secondary, 
                        fontSize: 12, 
                        fontWeight: 'bold' 
                      }
                    )}>
                      {exp.title}
                    </SectionHeading>
                    <TextElement {...getStyles(
                      { className: 'text-blue-600 font-medium mb-2' },
                      { 
                        color: colors.primary, 
                        fontSize: 10, 
                        fontWeight: 'bold', 
                        marginBottom: 4 
                      }
                    )}>
                      {exp.company}
                    </TextElement>
                  </Container>
                  <Span {...getStyles(
                    { className: 'text-gray-600 text-sm' },
                    { color: '#6b7280', fontSize: 9 }
                  )}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Span>
                </Container>
                <UnorderedList {...getStyles(
                  { className: 'list-disc list-inside text-gray-700 space-y-1' },
                  { marginLeft: 10 }
                )}>
                  {exp.achievements && exp.achievements.map((achievement, idx) => (
                    <ListItem key={idx} {...getStyles(
                      { className: 'text-gray-700' },
                      { 
                        color: colors.text, 
                        fontSize: 9, 
                        marginLeft: 10 
                      }
                    )}>
                      • {achievement}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Container>
            ))}
          </Container>
        </Container>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Education
          </SubHeading>
          <Container {...getStyles(
            { className: 'space-y-4' },
            { marginBottom: 16 }
          )}>
            {data.education.map((edu, index) => (
              <Container key={index} {...getStyles(
                { className: 'flex justify-between items-start' },
                { 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  marginBottom: 8 
                }
              )}>
                <Container>
                  <SectionHeading {...getStyles(
                    { className: 'text-lg font-semibold text-gray-900' },
                    { 
                      color: colors.secondary, 
                      fontSize: 10, 
                      fontWeight: 'bold' 
                    }
                  )}>
                    {edu.degree}
                  </SectionHeading>
                  <TextElement {...getStyles(
                    { className: 'text-blue-600 font-medium' },
                    { 
                      color: colors.primary, 
                      fontSize: 9, 
                      fontWeight: 'bold' 
                    }
                  )}>
                    {edu.school || edu.institution}
                  </TextElement>
                </Container>
                <Span {...getStyles(
                  { className: 'text-gray-600 text-sm' },
                  { color: '#6b7280', fontSize: 9 }
                )}>
                  {edu.year || edu.graduationYear}
                </Span>
              </Container>
            ))}
          </Container>
        </Container>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Skills
          </SubHeading>
          <Container {...getStyles(
            { className: 'flex flex-wrap gap-2' },
            { 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              gap: 6 
            }
          )}>
            {data.skills.map((skill, index) => (
              <Span key={index} {...getStyles(
                { className: 'px-3 py-1 rounded-full text-sm font-medium' },
                { 
                  backgroundColor: colors.accent, 
                  color: colors.secondary, 
                  paddingHorizontal: 12, 
                  paddingVertical: 4, 
                  borderRadius: 12, 
                  fontSize: 9, 
                  fontWeight: 'bold' 
                }
              )}>
                {skill}
              </Span>
            ))}
          </Container>
        </Container>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Projects
          </SubHeading>
          <Container {...getStyles(
            { className: 'space-y-4' },
            { marginBottom: 16 }
          )}>
            {data.projects.map((project, index) => (
              <Container key={index} {...getStyles(
                { className: 'border-l-4 pl-6' },
                { 
                  borderLeftColor: colors.primary, 
                  borderLeftWidth: 4, 
                  paddingLeft: 24, 
                  marginBottom: 12 
                }
              )}>
                <SectionHeading {...getStyles(
                  { className: 'text-lg font-semibold text-gray-900 mb-1' },
                  { 
                    color: colors.secondary, 
                    fontSize: 12, 
                    fontWeight: 'bold', 
                    marginBottom: 2 
                  }
                )}>
                  {project.name}
                </SectionHeading>
                <TextElement {...getStyles(
                  { className: 'text-gray-700 mb-2' },
                  { 
                    color: colors.text, 
                    fontSize: 9, 
                    marginBottom: 4 
                  }
                )}>
                  {project.description}
                </TextElement>
                <Container {...getStyles(
                  { className: 'flex flex-wrap gap-2' },
                  { 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    gap: 6 
                  }
                )}>
                  {project.technologies && project.technologies.map((tech, idx) => (
                    <Span key={idx} {...getStyles(
                      { className: 'px-2 py-1 rounded text-xs' },
                      { 
                        backgroundColor: colors.accent, 
                        color: colors.secondary, 
                        paddingHorizontal: 8, 
                        paddingVertical: 2, 
                        borderRadius: 4, 
                        fontSize: 8 
                      }
                    )}>
                      {tech}
                    </Span>
                  ))}
                </Container>
              </Container>
            ))}
          </Container>
        </Container>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Certifications
          </SubHeading>
          <Container {...getStyles(
            { className: 'space-y-2' },
            { marginBottom: 16 }
          )}>
            {data.certifications.map((cert, index) => (
              <Container key={index} {...getStyles(
                { className: 'flex justify-between items-center' },
                { 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  marginBottom: 8 
                }
              )}>
                <Span {...getStyles(
                  { className: 'text-gray-900 font-medium' },
                  { 
                    color: colors.secondary, 
                    fontSize: 10, 
                    fontWeight: 'bold' 
                  }
                )}>
                  {cert.name}
                </Span>
                <Span {...getStyles(
                  { className: 'text-gray-600 text-sm' },
                  { color: '#6b7280', fontSize: 9 }
                )}>
                  {cert.issuer} • {cert.year || cert.date}
                </Span>
              </Container>
            ))}
          </Container>
        </Container>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <Container {...getStyles(
          { className: 'mb-8' },
          { marginBottom: 32 }
        )}>
          <SubHeading {...getStyles(
            { className: 'text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2' },
            { 
              color: colors.secondary, 
              fontSize: 14, 
              fontWeight: 'bold', 
              marginBottom: 16, 
              borderBottom: `2px solid ${colors.border}`, 
              paddingBottom: 8 
            }
          )}>
            Awards
          </SubHeading>
          <Container {...getStyles(
            { className: 'space-y-2' },
            { marginBottom: 16 }
          )}>
            {data.awards.map((award, index) => (
              <Container key={index} {...getStyles(
                { className: 'flex justify-between items-center' },
                { 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  marginBottom: 8 
                }
              )}>
                <Span {...getStyles(
                  { className: 'text-gray-900 font-medium' },
                  { 
                    color: colors.secondary, 
                    fontSize: 10, 
                    fontWeight: 'bold' 
                  }
                )}>
                  {award.name}
                </Span>
                <Span {...getStyles(
                  { className: 'text-gray-600 text-sm' },
                  { color: '#6b7280', fontSize: 9 }
                )}>
                  {award.issuer} • {award.year || award.date}
                </Span>
              </Container>
            ))}
          </Container>
        </Container>
      )}

      {/* Additional sections can be added here */}
    </Container>
  );
};

export default UniversalTemplate; 