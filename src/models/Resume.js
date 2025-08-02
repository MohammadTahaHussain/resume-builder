import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'My Resume'
  },
  template: {
    type: String,
    required: true,
    default: 'modern'
  },
  data: {
    personal: {
      name: String,
      title: String,
      email: String,
      phone: String,
      location: String,
      summary: String,
      linkedin: String,
      website: String,
    },
    experience: [{
      title: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
      achievements: [String],
    }],
    education: [{
      degree: String,
      institution: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      gpa: String,
      description: String,
    }],
    skills: [String],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      url: String,
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      link: String,
    }],
    awards: [{
      name: String,
      issuer: String,
      date: String,
    }],
    achievements: [{
      title: String,
      description: String,
    }],
    publications: [{
      title: String,
      journal: String,
      date: String,
      url: String,
    }],
    memberships: [{
      organization: String,
      role: String,
      date: String,
    }],
    clearance: [{
      level: String,
      agency: String,
      date: String,
    }],
    references: [{
      name: String,
      title: String,
      company: String,
      email: String,
      phone: String,
    }],
    teaching: [{
      course: String,
      institution: String,
      date: String,
      description: String,
    }],
    additional: [{
      title: String,
      content: String,
    }],
    languages: [{
      language: String,
      proficiency: String,
    }],
    interests: [String],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isTemplate: {
    type: Boolean,
    default: false,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

// Create indexes
resumeSchema.index({ userId: 1 })
resumeSchema.index({ isPublic: 1 })
resumeSchema.index({ isTemplate: 1 })

delete mongoose.models.Resume
const Resume = mongoose.model('Resume', resumeSchema)

export default Resume 