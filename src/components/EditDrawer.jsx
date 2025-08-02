'use client';

import { useState } from 'react';

const EditDrawer = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [activeSection, setActiveSection] = useState('personal');
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, ...value } : item
      )
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
      handleInputChange('skills', [...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
    const newSkills = currentSkills.filter((_, i) => i !== index);
    handleInputChange('skills', newSkills);
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'projects', name: 'Projects', icon: '📁' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'awards', name: 'Awards', icon: '🏅' },
    { id: 'achievements', name: 'Achievements', icon: '⭐' },
    { id: 'publications', name: 'Publications', icon: '📚' },
    { id: 'memberships', name: 'Memberships', icon: '👥' },
    { id: 'clearance', name: 'Clearance', icon: '🔒' },
    { id: 'references', name: 'References', icon: '📞' },
    { id: 'teaching', name: 'Teaching', icon: '📖' },
    { id: 'additional', name: 'Additional', icon: '➕' }
  ];

  const renderPersonalSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Senior Software Engineer"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="john.doe@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="San Francisco, CA"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          value={formData.summary || ''}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description of your professional background..."
        />
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-4">
      {formData.experience?.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
            <button
              onClick={() => {
                const newExp = formData.experience.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, experience: newExp }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={exp.title || ''}
              onChange={(e) => handleArrayChange('experience', index, { title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Job Title"
            />
            <input
              type="text"
              value={exp.company || ''}
              onChange={(e) => handleArrayChange('experience', index, { company: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Company"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => handleArrayChange('experience', index, { startDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              />
              <input
                type="text"
                value={exp.endDate || ''}
                onChange={(e) => handleArrayChange('experience', index, { endDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              />
            </div>
            <textarea
              value={exp.achievements?.join('\n') || ''}
              onChange={(e) => handleArrayChange('experience', index, { 
                achievements: e.target.value.split('\n').filter(item => item.trim()) 
              })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Achievements (one per line)"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newExp = [...(formData.experience || []), {
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            achievements: []
          }];
          setFormData(prev => ({ ...prev, experience: newExp }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Experience
      </button>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-4">
      {/* Add New Skill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add New Skill</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a skill (e.g., JavaScript)"
          />
          <button
            onClick={addSkill}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Current Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Skills</label>
        {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
          <div className="space-y-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-900">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 text-lg font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p>No skills added yet</p>
            <p className="text-sm">Add your first skill above</p>
          </div>
        )}
      </div>

      {/* Quick Add Common Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Add Common Skills</label>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'Git', 'SQL'].map((skill) => (
            <button
              key={skill}
              onClick={() => {
                const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
                if (!currentSkills.includes(skill)) {
                  handleInputChange('skills', [...currentSkills, skill]);
                }
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-4">
      {formData.education?.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
            <button
              onClick={() => {
                const newEdu = formData.education.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, education: newEdu }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={edu.degree || ''}
              onChange={(e) => handleArrayChange('education', index, { degree: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
            />
            <input
              type="text"
              value={edu.institution || ''}
              onChange={(e) => handleArrayChange('education', index, { institution: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Institution (e.g., University of California)"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={edu.graduationYear || ''}
                onChange={(e) => handleArrayChange('education', index, { graduationYear: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Graduation Year"
              />
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleArrayChange('education', index, { gpa: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="GPA (optional)"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newEdu = [...(formData.education || []), {
            degree: '',
            institution: '',
            graduationYear: '',
            gpa: ''
          }];
          setFormData(prev => ({ ...prev, education: newEdu }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Education
      </button>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="space-y-4">
      {formData.projects?.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
            <button
              onClick={() => {
                const newProjects = formData.projects.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, projects: newProjects }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={project.name || ''}
              onChange={(e) => handleArrayChange('projects', index, { name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Project Name"
            />
            <textarea
              value={project.description || ''}
              onChange={(e) => handleArrayChange('projects', index, { description: e.target.value })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Project Description"
            />
            <input
              type="text"
              value={Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || ''}
              onChange={(e) => handleArrayChange('projects', index, { 
                technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
              })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Technologies (e.g., React, Node.js, MongoDB)"
            />
            <input
              type="url"
              value={project.url || ''}
              onChange={(e) => handleArrayChange('projects', index, { url: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Project URL (optional)"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newProjects = [...(formData.projects || []), {
            name: '',
            description: '',
            technologies: [],
            url: ''
          }];
          setFormData(prev => ({ ...prev, projects: newProjects }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Project
      </button>
    </div>
  );

  const renderCertificationsSection = () => (
    <div className="space-y-4">
      {formData.certifications?.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Certification {index + 1}</h4>
            <button
              onClick={() => {
                const newCerts = formData.certifications.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, certifications: newCerts }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={cert.name || ''}
              onChange={(e) => handleArrayChange('certifications', index, { name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Certification Name"
            />
            <input
              type="text"
              value={cert.issuer || ''}
              onChange={(e) => handleArrayChange('certifications', index, { issuer: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Issuing Organization"
            />
            <input
              type="text"
              value={cert.date || ''}
              onChange={(e) => handleArrayChange('certifications', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Date Obtained"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newCerts = [...(formData.certifications || []), {
            name: '',
            issuer: '',
            date: ''
          }];
          setFormData(prev => ({ ...prev, certifications: newCerts }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Certification
      </button>
    </div>
  );

  const renderAwardsSection = () => (
    <div className="space-y-4">
      {formData.awards?.map((award, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Award {index + 1}</h4>
            <button
              onClick={() => {
                const newAwards = formData.awards.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, awards: newAwards }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={award.name || ''}
              onChange={(e) => handleArrayChange('awards', index, { name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Award Name"
            />
            <input
              type="text"
              value={award.issuer || ''}
              onChange={(e) => handleArrayChange('awards', index, { issuer: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Issuing Organization"
            />
            <input
              type="text"
              value={award.date || ''}
              onChange={(e) => handleArrayChange('awards', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Date Received"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newAwards = [...(formData.awards || []), {
            name: '',
            issuer: '',
            date: ''
          }];
          setFormData(prev => ({ ...prev, awards: newAwards }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Award
      </button>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-4">
      {formData.achievements?.map((achievement, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Achievement {index + 1}</h4>
            <button
              onClick={() => {
                const newAchievements = formData.achievements.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, achievements: newAchievements }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={typeof achievement === 'string' ? achievement : achievement.title || ''}
              onChange={(e) => {
                const newAchievements = [...(formData.achievements || [])];
                if (typeof achievement === 'string') {
                  newAchievements[index] = e.target.value;
                } else {
                  newAchievements[index] = { ...achievement, title: e.target.value };
                }
                setFormData(prev => ({ ...prev, achievements: newAchievements }));
              }}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Achievement Title"
            />
            {typeof achievement === 'object' && (
              <textarea
                value={achievement.description || ''}
                onChange={(e) => {
                  const newAchievements = [...(formData.achievements || [])];
                  newAchievements[index] = { ...achievement, description: e.target.value };
                  setFormData(prev => ({ ...prev, achievements: newAchievements }));
                }}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Achievement Description"
              />
            )}
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newAchievements = [...(formData.achievements || []), ''];
          setFormData(prev => ({ ...prev, achievements: newAchievements }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Achievement
      </button>
    </div>
  );

  const renderPublicationsSection = () => (
    <div className="space-y-4">
      {formData.publications?.map((pub, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Publication {index + 1}</h4>
            <button
              onClick={() => {
                const newPubs = formData.publications.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, publications: newPubs }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={pub.title || ''}
              onChange={(e) => handleArrayChange('publications', index, { title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Publication Title"
            />
            <input
              type="text"
              value={pub.journal || ''}
              onChange={(e) => handleArrayChange('publications', index, { journal: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Journal/Conference"
            />
            <input
              type="text"
              value={pub.date || ''}
              onChange={(e) => handleArrayChange('publications', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Publication Date"
            />
            <input
              type="url"
              value={pub.url || ''}
              onChange={(e) => handleArrayChange('publications', index, { url: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Publication URL (optional)"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newPubs = [...(formData.publications || []), {
            title: '',
            journal: '',
            date: '',
            url: ''
          }];
          setFormData(prev => ({ ...prev, publications: newPubs }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Publication
      </button>
    </div>
  );

  const renderMembershipsSection = () => (
    <div className="space-y-4">
      {formData.memberships?.map((membership, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Membership {index + 1}</h4>
            <button
              onClick={() => {
                const newMemberships = formData.memberships.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, memberships: newMemberships }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={membership.organization || ''}
              onChange={(e) => handleArrayChange('memberships', index, { organization: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Organization Name"
            />
            <input
              type="text"
              value={membership.role || ''}
              onChange={(e) => handleArrayChange('memberships', index, { role: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Role/Position"
            />
            <input
              type="text"
              value={membership.date || ''}
              onChange={(e) => handleArrayChange('memberships', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Membership Date"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newMemberships = [...(formData.memberships || []), {
            organization: '',
            role: '',
            date: ''
          }];
          setFormData(prev => ({ ...prev, memberships: newMemberships }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Membership
      </button>
    </div>
  );

  const renderClearanceSection = () => (
    <div className="space-y-4">
      {formData.clearance?.map((clearance, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Clearance {index + 1}</h4>
            <button
              onClick={() => {
                const newClearances = formData.clearance.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, clearance: newClearances }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={clearance.level || ''}
              onChange={(e) => handleArrayChange('clearance', index, { level: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Clearance Level"
            />
            <input
              type="text"
              value={clearance.agency || ''}
              onChange={(e) => handleArrayChange('clearance', index, { agency: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Issuing Agency"
            />
            <input
              type="text"
              value={clearance.date || ''}
              onChange={(e) => handleArrayChange('clearance', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Date Obtained"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newClearances = [...(formData.clearance || []), {
            level: '',
            agency: '',
            date: ''
          }];
          setFormData(prev => ({ ...prev, clearance: newClearances }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Clearance
      </button>
    </div>
  );

  const renderReferencesSection = () => (
    <div className="space-y-4">
      {formData.references?.map((ref, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
            <button
              onClick={() => {
                const newRefs = formData.references.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, references: newRefs }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={ref.name || ''}
              onChange={(e) => handleArrayChange('references', index, { name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Reference Name"
            />
            <input
              type="text"
              value={ref.title || ''}
              onChange={(e) => handleArrayChange('references', index, { title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Job Title"
            />
            <input
              type="text"
              value={ref.company || ''}
              onChange={(e) => handleArrayChange('references', index, { company: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Company"
            />
            <input
              type="email"
              value={ref.email || ''}
              onChange={(e) => handleArrayChange('references', index, { email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <input
              type="tel"
              value={ref.phone || ''}
              onChange={(e) => handleArrayChange('references', index, { phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newRefs = [...(formData.references || []), {
            name: '',
            title: '',
            company: '',
            email: '',
            phone: ''
          }];
          setFormData(prev => ({ ...prev, references: newRefs }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Reference
      </button>
    </div>
  );

  const renderTeachingSection = () => (
    <div className="space-y-4">
      {formData.teaching?.map((teaching, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Teaching Experience {index + 1}</h4>
            <button
              onClick={() => {
                const newTeaching = formData.teaching.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, teaching: newTeaching }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={teaching.course || ''}
              onChange={(e) => handleArrayChange('teaching', index, { course: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Course Name"
            />
            <input
              type="text"
              value={teaching.institution || ''}
              onChange={(e) => handleArrayChange('teaching', index, { institution: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Institution"
            />
            <input
              type="text"
              value={teaching.date || ''}
              onChange={(e) => handleArrayChange('teaching', index, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Teaching Period"
            />
            <textarea
              value={teaching.description || ''}
              onChange={(e) => handleArrayChange('teaching', index, { description: e.target.value })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Description of teaching responsibilities"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newTeaching = [...(formData.teaching || []), {
            course: '',
            institution: '',
            date: '',
            description: ''
          }];
          setFormData(prev => ({ ...prev, teaching: newTeaching }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Teaching Experience
      </button>
    </div>
  );

  const renderAdditionalSection = () => (
    <div className="space-y-4">
      {formData.additional?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Additional Item {index + 1}</h4>
            <button
              onClick={() => {
                const newAdditional = formData.additional.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, additional: newAdditional }));
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={typeof item === 'string' ? item : item.title || ''}
              onChange={(e) => {
                const newAdditional = [...(formData.additional || [])];
                if (typeof item === 'string') {
                  newAdditional[index] = e.target.value;
                } else {
                  newAdditional[index] = { ...item, title: e.target.value };
                }
                setFormData(prev => ({ ...prev, additional: newAdditional }));
              }}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
            />
            {typeof item === 'object' && (
              <textarea
                value={item.content || ''}
                onChange={(e) => {
                  const newAdditional = [...(formData.additional || [])];
                  newAdditional[index] = { ...item, content: e.target.value };
                  setFormData(prev => ({ ...prev, additional: newAdditional }));
                }}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Content"
              />
            )}
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newAdditional = [...(formData.additional || []), ''];
          setFormData(prev => ({ ...prev, additional: newAdditional }));
        }}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
      >
        + Add Additional Item
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      case 'projects':
        return renderProjectsSection();
      case 'certifications':
        return renderCertificationsSection();
      case 'awards':
        return renderAwardsSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'publications':
        return renderPublicationsSection();
      case 'memberships':
        return renderMembershipsSection();
      case 'clearance':
        return renderClearanceSection();
      case 'references':
        return renderReferencesSection();
      case 'teaching':
        return renderTeachingSection();
      case 'additional':
        return renderAdditionalSection();
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full min-w-[300px] max-w-[640px] lg:w-1/2 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Edit Resume</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:grid grid-cols-2 gap-4">
              {/* Section Navigation */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Sections</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        activeSection === section.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{section.icon}</div>
                      <div className="text-xs font-medium">{section.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Content */}
              <div className="max-lg:border-t border-gray-200 max-lg:pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {sections.find(s => s.id === activeSection)?.name}
                </h3>
                {renderSection()}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDrawer;