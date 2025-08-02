"use client";

import { useState, useEffect } from 'react';

const SmartSuggestions = ({ resumeData, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate suggestions based on resume data
  useEffect(() => {
    generateSuggestions();
  }, [resumeData]);

  const generateSuggestions = async () => {
    setIsLoading(true);
    const newSuggestions = [];

    // Check for missing summary
    if (!resumeData.summary && resumeData.name && resumeData.title) {
      newSuggestions.push({
        id: 'summary',
        type: 'missing',
        title: 'Add Professional Summary',
        description: 'Create a compelling summary to grab attention',
        action: 'generate-summary',
        priority: 'high'
      });
    }

    // Check for weak achievements
    if (resumeData.experience && resumeData.experience.length > 0) {
      const hasWeakAchievements = resumeData.experience.some(exp => 
        exp.achievements && exp.achievements.some(achievement => 
          !achievement.includes('%') && !achievement.includes('$') && !achievement.includes('+')
        )
      );

      if (hasWeakAchievements) {
        newSuggestions.push({
          id: 'achievements',
          type: 'improvement',
          title: 'Enhance Achievements',
          description: 'Make your achievements more quantifiable',
          action: 'enhance-achievements',
          priority: 'medium'
        });
      }
    }

    // Check for skills suggestions
    if (resumeData.title && (!resumeData.skills || resumeData.skills.length < 5)) {
      newSuggestions.push({
        id: 'skills',
        type: 'suggestion',
        title: 'Add More Skills',
        description: 'Get skill recommendations for your role',
        action: 'suggest-skills',
        priority: 'medium'
      });
    }

    // Check for resume analysis
    if (resumeData.name && resumeData.title && resumeData.experience?.length > 0) {
      newSuggestions.push({
        id: 'analysis',
        type: 'analysis',
        title: 'Analyze Resume',
        description: 'Get feedback and improvement suggestions',
        action: 'analyze-resume',
        priority: 'low'
      });
    }

    setSuggestions(newSuggestions);
    setIsLoading(false);
  };

  const handleApplySuggestion = async (suggestion) => {
    if (onApplySuggestion) {
      onApplySuggestion(suggestion);
    }
  };

  if (suggestions.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Suggestions
        </h3>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-3 rounded-lg border-l-4 ${
              suggestion.priority === 'high' 
                ? 'border-red-500 bg-red-50' 
                : suggestion.priority === 'medium'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {suggestion.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    suggestion.type === 'missing' 
                      ? 'bg-red-100 text-red-800'
                      : suggestion.type === 'improvement'
                      ? 'bg-yellow-100 text-yellow-800'
                      : suggestion.type === 'suggestion'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {suggestion.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    suggestion.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : suggestion.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.priority} priority
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleApplySuggestion(suggestion)}
                className="ml-3 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions; 