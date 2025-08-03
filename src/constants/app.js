// App-wide constants and configurations

// Navigation menu items
export const navigationItems = [
  {
    name: 'Home',
    href: '/',
    description: 'Landing page with overview'
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    description: 'Your personal dashboard',
    requiresAuth: true
  },
  {
    name: 'Templates',
    href: '/templates',
    description: 'Browse resume templates'
  },
  {
    name: 'AI Suggestions',
    href: '/ai-suggestions',
    description: 'Get AI-powered recommendations'
  },
  {
    name: 'About',
    href: '/about',
    description: 'Learn about our platform'
  }
];

// Footer links
export const footerLinks = {
  quickLinks: [
    { name: 'Templates', href: '/templates' },
    { name: 'AI Suggestions', href: '/ai-suggestions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Help Center', href: '/help' }
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]
};

// Social media links
export const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: 'twitter'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    href: '#',
    icon: 'github'
  }
];

// App metadata
export const appMetadata = {
  name: 'ResumeAI',
  description: 'Create professional resumes with AI-powered suggestions',
  version: '1.0.0',
  author: 'ResumeAI Team',
  keywords: ['resume builder', 'AI resume', 'professional resume', 'job application'],
  ogImage: '/og-image.png',
  favicon: '/favicon.ico'
};

// Color schemes
export const colorSchemes = {
  primary: {
    blue: {
      light: '#3B82F6',
      main: '#2563EB',
      dark: '#1D4ED8'
    },
    purple: {
      light: '#8B5CF6',
      main: '#7C3AED',
      dark: '#6D28D9'
    },
    emerald: {
      light: '#10B981',
      main: '#059669',
      dark: '#047857'
    }
  },
  gradients: {
    primary: 'from-blue-600 via-purple-600 to-indigo-700',
    secondary: 'from-emerald-500 to-teal-500',
    accent: 'from-purple-500 to-pink-500'
  }
};

// Form field configurations
export const formFields = {
  personal: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'title',
      label: 'Professional Title',
      type: 'text',
      placeholder: 'Senior Software Engineer',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john.doe@email.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: true
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'San Francisco, CA',
      required: true
    },
    {
      name: 'summary',
      label: 'Professional Summary',
      type: 'textarea',
      placeholder: 'Brief description of your professional background and expertise...',
      required: true
    }
  ],
  experience: [
    {
      name: 'title',
      label: 'Job Title',
      type: 'text',
      placeholder: 'Senior Software Engineer',
      required: true
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'TechCorp Inc.',
      required: true
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      placeholder: 'Present'
    },
    {
      name: 'achievements',
      label: 'Achievements',
      type: 'array',
      placeholder: 'List your key achievements and responsibilities...',
      required: true
    }
  ]
};

// AI suggestion categories
export const aiSuggestionCategories = [
  {
    id: 'content',
    name: 'Content Enhancement',
    description: 'Improve your resume content and descriptions',
    icon: 'document-text'
  },
  {
    id: 'keywords',
    name: 'Keyword Optimization',
    description: 'Optimize for ATS systems with relevant keywords',
    icon: 'magnifying-glass'
  },
  {
    id: 'formatting',
    name: 'Formatting Tips',
    description: 'Improve layout and visual presentation',
    icon: 'paint-brush'
  },
  {
    id: 'skills',
    name: 'Skills Analysis',
    description: 'Identify missing skills and competencies',
    icon: 'light-bulb'
  }
];

// Resume sections order
export const resumeSectionOrder = [
  'personal',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'awards',
  'leadership'
];

// File upload configurations
export const fileUploadConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  maxFiles: 1
};

// Export formats
export const exportFormats = [
  {
    id: 'pdf',
    name: 'PDF',
    description: 'High-quality PDF format',
    icon: 'document-pdf'
  },
  {
    id: 'docx',
    name: 'Word Document',
    description: 'Editable Word format',
    icon: 'document-text'
  },
  {
    id: 'txt',
    name: 'Plain Text',
    description: 'Simple text format',
    icon: 'document'
  }
];

// Pricing plans
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '3 resume templates',
      'Basic AI suggestions',
      'PDF export',
      'Email support'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'All resume templates',
      'Advanced AI suggestions',
      'Multiple export formats',
      'Priority support',
      'Unlimited resumes'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Custom templates',
      'Team collaboration',
      'API access',
      'Dedicated support'
    ],
    popular: false
  }
];

// Error messages
export const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
  fileSize: 'File size must be less than 5MB',
  fileType: 'Please upload a valid image file (JPEG, PNG, GIF)'
};

// Success messages
export const successMessages = {
  resumeSaved: 'Resume saved successfully!',
  resumeExported: 'Resume exported successfully!',
  aiSuggestionsGenerated: 'AI suggestions generated successfully!',
  profileUpdated: 'Profile updated successfully!'
}; 