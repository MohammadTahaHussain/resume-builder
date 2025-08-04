"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const EditDrawer = ({
  isOpen,
  onClose,
  data,
  onDataUpdate,
  activeSection,
  onSectionChange,
}) => {
  const [formData, setFormData] = useState(data);
  const [newSkill, setNewSkill] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  // Update formData when data prop changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [checkScrollPosition]);

  // Debounced update to parent component
  useEffect(() => {
    if (onDataUpdate) {
      const timeoutId = setTimeout(() => {
        onDataUpdate(formData);
      }, 300); // 300ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [formData, onDataUpdate]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleArrayChange = useCallback((field, index, value) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];

      // Handle special cases for add/remove/update
      if (value === "add") {
        // Add new item to the end
        return {
          ...prev,
          [field]: [...currentArray, {}],
        };
      } else if (value === "remove") {
        // Remove item at index
        const newArray = currentArray.filter((_, i) => i !== index);
        return {
          ...prev,
          [field]: newArray,
        };
      } else if (value.update) {
        // Update specific item
        const newArray = [...currentArray];
        newArray[index] = value.update;
        return {
          ...prev,
          [field]: newArray,
        };
      } else {
        // Update specific field of an item
        const newArray = [...currentArray];
        newArray[index] = { ...newArray[index], ...value };
        return {
          ...prev,
          [field]: newArray,
        };
      }
    });
  }, []);

  const handleAIGenerateSummary = async () => {
    if (!formData.name || !formData.title) {
      alert("Please add your name and title first to generate a summary.");
      return;
    }

    try {
      const response = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: formData }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ ...formData, summary: data.summary });
      } else {
        alert("Failed to generate summary: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to connect to AI service");
    }
  };

  const addSkill = useCallback(() => {
    if (newSkill.trim()) {
      const currentSkills = Array.isArray(formData.skills)
        ? formData.skills
        : [];
      handleInputChange("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  }, [newSkill, formData.skills, handleInputChange]);

  const removeSkill = useCallback(
    (index) => {
      const currentSkills = Array.isArray(formData.skills)
        ? formData.skills
        : [];
      const newSkills = currentSkills.filter((_, i) => i !== index);
      handleInputChange("skills", newSkills);
    },
    [formData.skills, handleInputChange]
  );

  const sections = [
    { id: "personal", name: "Personal Info", icon: "👤" },
    { id: "experience", name: "Experience", icon: "💼" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "skills", name: "Skills", icon: "🛠️" },
    { id: "projects", name: "Projects", icon: "📁" },
    { id: "certifications", name: "Certifications", icon: "🏆" },
    { id: "awards", name: "Awards", icon: "🏅" },
    { id: "achievements", name: "Achievements", icon: "⭐" },
    { id: "publications", name: "Publications", icon: "📚" },
    { id: "memberships", name: "Memberships", icon: "👥" },
    { id: "clearance", name: "Clearance", icon: "🔒" },
    { id: "references", name: "References", icon: "📞" },
    { id: "teaching", name: "Teaching", icon: "📖" },
    { id: "additional", name: "Additional", icon: "➕" },
  ];

  const renderPersonalSection = useCallback(
    () => (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {/* <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3> */}
          <button
            onClick={handleAIGenerateSummary}
            className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors"
          >
            ✨ AI Summary
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="john.doe@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Professional Summary
            </label>
            <textarea
              value={formData.summary || ""}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              rows={4}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="Brief description of your professional background..."
            />
          </div>
        </div>
      </div>
    ),
    [formData, handleInputChange, handleAIGenerateSummary]
  );

  const renderExperienceSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.experience?.map((exp, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-card-foreground">
                Experience {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("experience", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={exp.title || ""}
                onChange={(e) =>
                  handleArrayChange("experience", index, { title: e.target.value })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Job Title"
              />
              <input
                type="text"
                value={exp.company || ""}
                onChange={(e) =>
                  handleArrayChange("experience", index, { company: e.target.value })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Company Name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={exp.startDate || ""}
                  onChange={(e) =>
                    handleArrayChange("experience", index, { startDate: e.target.value })
                  }
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                />
                <input
                  type="date"
                  value={exp.endDate || ""}
                  onChange={(e) =>
                    handleArrayChange("experience", index, { endDate: e.target.value })
                  }
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                />
              </div>
              <textarea
                value={exp.achievements || ""}
                onChange={(e) =>
                  handleArrayChange("experience", index, { achievements: e.target.value })
                }
                rows={3}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Describe your achievements and responsibilities..."
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("experience", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent hover:text-accent-foreground"
        >
          + Add Experience
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderSkillsSection = useCallback(
    () => (
      <div className="space-y-4">
        {/* Add New Skill */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Add New Skill
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="flex-1 p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
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
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Current Skills
          </label>
          {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-secondary p-3 rounded-lg gap-2"
                >
                  <span className="text-secondary-foreground">{skill}</span>
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
            <div className="text-center text-muted-foreground py-4 border-2 border-dashed border-border rounded-lg">
              <p>No skills added yet</p>
              <p className="text-sm">Add your first skill above</p>
            </div>
          )}
        </div>

        {/* Quick Add Common Skills */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Quick Add Common Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "Python",
              "HTML",
              "CSS",
              "Git",
              "SQL",
            ].map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  const currentSkills = Array.isArray(formData.skills)
                    ? formData.skills
                    : [];
                  if (!currentSkills.includes(skill)) {
                    handleInputChange("skills", [...currentSkills, skill]);
                  }
                }}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    ),
    [formData.skills, handleInputChange, addSkill, removeSkill]
  );

  const renderEducationSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.education?.map((edu, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-card-foreground">
                Education {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("education", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={edu.degree || ""}
                onChange={(e) =>
                  handleArrayChange("education", index, {
                    degree: e.target.value,
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
              />
              <input
                type="text"
                value={edu.institution || ""}
                onChange={(e) =>
                  handleArrayChange("education", index, {
                    institution: e.target.value,
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Institution (e.g., University of California)"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.graduationYear || ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, {
                      graduationYear: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="Graduation Year"
                />
                <input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, {
                      gpa: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="GPA (optional)"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("education", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent hover:text-accent-foreground"
        >
          + Add Education
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderProjectsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.projects?.map((project, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-card-foreground">Project {index + 1}</h4>
              <button
                onClick={() => handleArrayChange("projects", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={project.name || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, { name: e.target.value })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Project Name"
              />
              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, {
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Project Description"
              />
              <input
                type="text"
                value={
                  Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : project.technologies || ""
                }
                onChange={(e) =>
                  handleArrayChange("projects", index, {
                    technologies: e.target.value
                      .split(",")
                      .map((tech) => tech.trim())
                      .filter((tech) => tech),
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Technologies (e.g., React, Node.js, MongoDB)"
              />
              <input
                type="url"
                value={project.url || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, { url: e.target.value })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Project URL (optional)"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("projects", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent hover:text-accent-foreground"
        >
          + Add Project
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderCertificationsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.certifications?.map((cert, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-card-foreground">
                Certification {index + 1}
              </h4>
              <button
                onClick={() =>
                  handleArrayChange("certifications", index, "remove")
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={cert.name || ""}
                onChange={(e) =>
                  handleArrayChange("certifications", index, {
                    name: e.target.value,
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Certification Name"
              />
              <input
                type="text"
                value={cert.issuer || ""}
                onChange={(e) =>
                  handleArrayChange("certifications", index, {
                    issuer: e.target.value,
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Issuing Organization"
              />
              <input
                type="text"
                value={cert.date || ""}
                onChange={(e) =>
                  handleArrayChange("certifications", index, {
                    date: e.target.value,
                  })
                }
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Date Obtained"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("certifications", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent hover:text-accent-foreground"
        >
          + Add Certification
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderAwardsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.awards?.map((award, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">Award {index + 1}</h4>
              <button
                onClick={() => handleArrayChange("awards", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={award.name || ""}
                onChange={(e) =>
                  handleArrayChange("awards", index, { name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Award Name"
              />
              <input
                type="text"
                value={award.issuer || ""}
                onChange={(e) =>
                  handleArrayChange("awards", index, { issuer: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Issuing Organization"
              />
              <input
                type="text"
                value={award.date || ""}
                onChange={(e) =>
                  handleArrayChange("awards", index, { date: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Date Received"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("awards", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Award
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderAchievementsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.achievements?.map((achievement, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Achievement {index + 1}
              </h4>
              <button
                onClick={() =>
                  handleArrayChange("achievements", index, "remove")
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={
                  typeof achievement === "string"
                    ? achievement
                    : achievement.title || ""
                }
                onChange={(e) => {
                  const newValue =
                    typeof achievement === "string"
                      ? e.target.value
                      : { ...achievement, title: e.target.value };
                  handleArrayChange("achievements", index, {
                    update: newValue,
                  });
                }}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Achievement Title"
              />
              {typeof achievement === "object" && (
                <textarea
                  value={achievement.description || ""}
                  onChange={(e) => {
                    const newValue = {
                      ...achievement,
                      description: e.target.value,
                    };
                    handleArrayChange("achievements", index, {
                      update: newValue,
                    });
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
          onClick={() => handleArrayChange("achievements", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Achievement
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderPublicationsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.publications?.map((pub, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Publication {index + 1}
              </h4>
              <button
                onClick={() =>
                  handleArrayChange("publications", index, "remove")
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={pub.title || ""}
                onChange={(e) =>
                  handleArrayChange("publications", index, {
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Publication Title"
              />
              <input
                type="text"
                value={pub.journal || ""}
                onChange={(e) =>
                  handleArrayChange("publications", index, {
                    journal: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Journal/Conference"
              />
              <input
                type="text"
                value={pub.date || ""}
                onChange={(e) =>
                  handleArrayChange("publications", index, {
                    date: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Publication Date"
              />
              <input
                type="url"
                value={pub.url || ""}
                onChange={(e) =>
                  handleArrayChange("publications", index, {
                    url: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Publication URL (optional)"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("publications", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Publication
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderMembershipsSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.memberships?.map((membership, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Membership {index + 1}
              </h4>
              <button
                onClick={() =>
                  handleArrayChange("memberships", index, "remove")
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={membership.organization || ""}
                onChange={(e) =>
                  handleArrayChange("memberships", index, {
                    organization: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Organization Name"
              />
              <input
                type="text"
                value={membership.role || ""}
                onChange={(e) =>
                  handleArrayChange("memberships", index, {
                    role: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Role/Position"
              />
              <input
                type="text"
                value={membership.date || ""}
                onChange={(e) =>
                  handleArrayChange("memberships", index, {
                    date: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Membership Date"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("memberships", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Membership
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderClearanceSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.clearance?.map((clearance, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Clearance {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("clearance", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={clearance.level || ""}
                onChange={(e) =>
                  handleArrayChange("clearance", index, {
                    level: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Clearance Level"
              />
              <input
                type="text"
                value={clearance.agency || ""}
                onChange={(e) =>
                  handleArrayChange("clearance", index, {
                    agency: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Issuing Agency"
              />
              <input
                type="text"
                value={clearance.date || ""}
                onChange={(e) =>
                  handleArrayChange("clearance", index, {
                    date: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Date Obtained"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("clearance", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Clearance
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderReferencesSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.references?.map((ref, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Reference {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("references", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={ref.name || ""}
                onChange={(e) =>
                  handleArrayChange("references", index, {
                    name: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Reference Name"
              />
              <input
                type="text"
                value={ref.title || ""}
                onChange={(e) =>
                  handleArrayChange("references", index, {
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Job Title"
              />
              <input
                type="text"
                value={ref.company || ""}
                onChange={(e) =>
                  handleArrayChange("references", index, {
                    company: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Company"
              />
              <input
                type="email"
                value={ref.email || ""}
                onChange={(e) =>
                  handleArrayChange("references", index, {
                    email: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <input
                type="tel"
                value={ref.phone || ""}
                onChange={(e) =>
                  handleArrayChange("references", index, {
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Phone"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("references", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Reference
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderTeachingSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.teaching?.map((teaching, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Teaching Experience {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("teaching", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={teaching.course || ""}
                onChange={(e) =>
                  handleArrayChange("teaching", index, {
                    course: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Course Name"
              />
              <input
                type="text"
                value={teaching.institution || ""}
                onChange={(e) =>
                  handleArrayChange("teaching", index, {
                    institution: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Institution"
              />
              <input
                type="text"
                value={teaching.date || ""}
                onChange={(e) =>
                  handleArrayChange("teaching", index, { date: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Teaching Period"
              />
              <textarea
                value={teaching.description || ""}
                onChange={(e) =>
                  handleArrayChange("teaching", index, {
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Description of teaching responsibilities"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => handleArrayChange("teaching", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Teaching Experience
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderAdditionalSection = useCallback(
    () => (
      <div className="space-y-4">
        {formData.additional?.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Additional Item {index + 1}
              </h4>
              <button
                onClick={() => handleArrayChange("additional", index, "remove")}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={typeof item === "string" ? item : item.title || ""}
                onChange={(e) => {
                  const newValue =
                    typeof item === "string"
                      ? e.target.value
                      : { ...item, title: e.target.value };
                  handleArrayChange("additional", index, { update: newValue });
                }}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
              />
              {typeof item === "object" && (
                <textarea
                  value={item.content || ""}
                  onChange={(e) => {
                    const newValue = { ...item, content: e.target.value };
                    handleArrayChange("additional", index, {
                      update: newValue,
                    });
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
          onClick={() => handleArrayChange("additional", 0, "add")}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Additional Item
        </button>
      </div>
    ),
    [formData, handleArrayChange]
  );

  const renderSection = useCallback(() => {
    switch (activeSection) {
      case "personal":
        return renderPersonalSection();
      case "experience":
        return renderExperienceSection();
      case "education":
        return renderEducationSection();
      case "skills":
        return renderSkillsSection();
      case "projects":
        return renderProjectsSection();
      case "certifications":
        return renderCertificationsSection();
      case "awards":
        return renderAwardsSection();
      case "achievements":
        return renderAchievementsSection();
      case "publications":
        return renderPublicationsSection();
      case "memberships":
        return renderMembershipsSection();
      case "clearance":
        return renderClearanceSection();
      case "references":
        return renderReferencesSection();
      case "teaching":
        return renderTeachingSection();
      case "additional":
        return renderAdditionalSection();
      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <p>Section coming soon...</p>
          </div>
        );
    }
  }, [
    activeSection,
    renderPersonalSection,
    renderExperienceSection,
    renderEducationSection,
    renderSkillsSection,
    renderProjectsSection,
    renderCertificationsSection,
    renderAwardsSection,
    renderAchievementsSection,
    renderPublicationsSection,
    renderMembershipsSection,
    renderClearanceSection,
    renderReferencesSection,
    renderTeachingSection,
    renderAdditionalSection,
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full min-w-[300px] max-w-[640px] lg:w-1/2 bg-card shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-bold text-card-foreground">Edit Resume</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-4 space-y-6 pb-6">
            {/* Navigation */}
            <div className="relative">
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-border rounded-full shadow-lg flex items-center justify-center text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Right Scroll Button */}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-border rounded-full shadow-lg flex items-center justify-center text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              <div 
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-2"
              >
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-200 whitespace-nowrap min-w-fit ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105"
                    }`}
                  >
                    <span className="text-base">{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Content */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">
                {sections.find(s => s.id === activeSection)?.name}
              </h3>
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex-shrink-0">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Cancel
            </button>
            {/* Removed Save Changes button as per new_code */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDrawer;
