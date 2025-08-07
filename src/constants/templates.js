// Template configurations
export const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and creative industries',
    category: 'Professional',
    features: ['ATS Optimized', 'Clean Layout', 'Professional Colors'],
    difficulty: 'Easy',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#10B981'
    }
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional layout ideal for corporate and executive positions',
    category: 'Executive',
    features: ['Executive Style', 'Traditional Layout', 'Corporate Ready'],
    difficulty: 'Easy',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#374151',
      secondary: '#1F2937',
      accent: '#6B7280'
    }
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold and artistic design for creative professionals and designers',
    category: 'Creative',
    features: ['Creative Design', 'Portfolio Style', 'Visual Impact'],
    difficulty: 'Medium',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#F59E0B'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant design focusing on content over decoration',
    category: 'Minimal',
    features: ['Minimal Design', 'Content Focused', 'Clean Typography'],
    difficulty: 'Easy',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      accent: '#10B981'
    }
  },
  {
    id: 'tech',
    name: 'Tech Specialist',
    description: 'Optimized for technical roles with emphasis on skills and projects',
    category: 'Technical',
    features: ['Tech Focused', 'Skills Highlight', 'Project Showcase'],
    difficulty: 'Medium',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10B981'
    }
  },
  {
    id: 'academic',
    name: 'Academic Research',
    description: 'Perfect for researchers, academics, and educational professionals',
    category: 'Academic',
    features: ['Academic Style', 'Research Focus', 'Publication List'],
    difficulty: 'Medium',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#A855F7'
    }
  },
  {
    id: 'startup',
    name: 'Startup Entrepreneur',
    description: 'Dynamic design for entrepreneurs and startup professionals',
    category: 'Entrepreneur',
    features: ['Entrepreneurial', 'Dynamic Layout', 'Achievement Focus'],
    difficulty: 'Medium',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      accent: '#EF4444'
    }
  },
  {
    id: 'federal',
    name: 'Federal Government',
    description: 'Compliant with federal job application requirements',
    category: 'Government',
    features: ['Federal Compliant', 'Detailed Format', 'Government Ready'],
    difficulty: 'Hard',
    preview: '/api/placeholder/400/500',
    colors: {
      primary: '#1F2937',
      secondary: '#111827',
      accent: '#374151'
    }
  }
];

// Template categories
export const categories = [
  'All',
  'Professional',
  'Executive',
  'Creative',
  'Minimal',
  'Technical',
  'Academic',
  'Entrepreneur',
  'Government'
];

// Template difficulty levels
export const difficultyLevels = {
  Easy: {
    label: 'Easy',
    color: 'bg-green-100 text-green-800',
    description: 'Perfect for beginners'
  },
  Medium: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Some customization required'
  },
  Hard: {
    label: 'Hard',
    color: 'bg-red-100 text-red-800',
    description: 'Advanced features and customization'
  }
};

// Template features
export const templateFeatures = [
  'ATS Optimized',
  'Clean Layout',
  'Professional Colors',
  'Executive Style',
  'Traditional Layout',
  'Corporate Ready',
  'Creative Design',
  'Portfolio Style',
  'Visual Impact',
  'Minimal Design',
  'Content Focused',
  'Clean Typography',
  'Tech Focused',
  'Skills Highlight',
  'Project Showcase',
  'Academic Style',
  'Research Focus',
  'Publication List',
  'Entrepreneurial',
  'Dynamic Layout',
  'Achievement Focus',
  'Federal Compliant',
  'Detailed Format',
  'Government Ready'
];

// Template recommendations based on profession
export const professionTemplateRecommendations = {
  'Software Engineer': ['modern', 'tech', 'minimal', 'premium'],
  'Data Scientist': ['modern', 'tech', 'academic', 'premium'],
  'Marketing Manager': ['modern', 'classic', 'creative', 'premium'],
  'Graphic Designer': ['creative', 'minimal', 'modern', 'premium'],
  'Product Manager': ['modern', 'classic', 'startup', 'premium'],
  'UX Designer': ['creative', 'minimal', 'modern', 'premium'],
  'Sales Representative': ['classic', 'modern', 'startup', 'premium'],
  'Project Manager': ['classic', 'modern', 'executive', 'premium'],
  'Business Analyst': ['classic', 'modern', 'minimal', 'premium'],
  'Research Scientist': ['academic', 'modern', 'minimal', 'premium'],
  'Entrepreneur': ['startup', 'creative', 'modern', 'premium'],
  'Government Employee': ['federal', 'classic', 'modern', 'premium']
};

// Template compatibility with different industries
export const industryTemplateCompatibility = {
  'Technology': ['modern', 'tech', 'minimal', 'creative', 'premium'],
  'Finance': ['classic', 'modern', 'executive', 'premium'],
  'Healthcare': ['classic', 'modern', 'academic', 'premium'],
  'Education': ['academic', 'modern', 'classic', 'premium'],
  'Creative': ['creative', 'minimal', 'modern', 'premium'],
  'Government': ['federal', 'classic', 'modern', 'premium'],
  'Startup': ['startup', 'modern', 'creative', 'premium'],
  'Corporate': ['classic', 'executive', 'modern', 'premium'],
  'Non-profit': ['modern', 'classic', 'minimal', 'premium'],
  'Consulting': ['classic', 'modern', 'executive', 'premium']
}; 