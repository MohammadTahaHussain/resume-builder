"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const AIAssistant = ({ resumeData, onUpdateData }) => {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentAction, setCurrentAction] = useState('');

  // Debug session information
  console.log('AIAssistant session:', {
    hasSession: !!session,
    sessionUser: session?.user,
    sessionUserId: session?.user?.id,
    sessionEmail: session?.user?.email,
    sessionKeys: session ? Object.keys(session) : null,
    status: session?.status,
    sessionToken: session?.sessionToken
  });

  const aiActions = [
    {
      id: 'test',
      title: 'Test API',
      description: 'Test if AI service is working',
      icon: '🔧',
      action: testAPI
    },
    {
      id: 'summary',
      title: 'Generate Summary',
      description: 'Create a compelling professional summary',
      icon: '📝',
      action: generateSummary
    },
    {
      id: 'enhance',
      title: 'Enhance Achievements',
      description: 'Make achievements more impactful',
      icon: '🚀',
      action: enhanceAchievements
    },
    {
      id: 'skills',
      title: 'Suggest Skills',
      description: 'Get skill recommendations',
      icon: '💡',
      action: suggestSkills
    },
    {
      id: 'analyze',
      title: 'Analyze Resume',
      description: 'Get feedback and score',
      icon: '📊',
      action: analyzeResume
    }
  ];

  async function testAPI() {
    setCurrentAction('test');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/test', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (response.ok) {
        addMessage('✅ AI API is working!', 'success');
        addMessage(`Response: ${data.response}`, 'ai');
      } else if (response.status === 401) {
        handleUnauthorizedError();
      } else {
        addMessage(`❌ API Test Failed: ${data.error}`, 'error');
        if (data.details) {
          addMessage(`Details: ${data.details}`, 'error');
        }
      }
    } catch (error) {
      addMessage('❌ Failed to test API: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction('');
    }
  }

  async function generateSummary() {
    if (!resumeData.name && !resumeData.title) {
      addMessage('Please add your name and title first to generate a summary.', 'error');
      return;
    }

    setCurrentAction('summary');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        addMessage('✨ Generated a professional summary for you!', 'success');
        addMessage(data.summary, 'ai');
        
        // Update the resume data
        onUpdateData({ ...resumeData, summary: data.summary });
      } else if (response.status === 401) {
        handleUnauthorizedError();
      } else {
        addMessage(data.error || 'Failed to generate summary', 'error');
      }
    } catch (error) {
      addMessage('Failed to connect to AI service', 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction('');
    }
  }

  async function enhanceAchievements() {
    if (!resumeData.experience || resumeData.experience.length === 0) {
      addMessage('Please add some work experience first.', 'error');
      return;
    }

    setCurrentAction('enhance');
    setIsLoading(true);
    
    try {
      // Get achievements from all experiences
      const allAchievements = resumeData.experience.flatMap(exp => exp.achievements || []);
      
      if (allAchievements.length === 0) {
        addMessage('Please add achievements to your work experience first.', 'error');
        return;
      }

      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievements: allAchievements }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        addMessage('🚀 Enhanced your achievements!', 'success');
        addMessage(data.enhancedAchievements, 'ai');
      } else if (response.status === 401) {
        handleUnauthorizedError();
      } else {
        addMessage(data.error || 'Failed to enhance achievements', 'error');
      }
    } catch (error) {
      addMessage('Failed to connect to AI service', 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction('');
    }
  }

  async function suggestSkills() {
    if (!resumeData.title) {
      addMessage('Please add your job title first.', 'error');
      return;
    }

    setCurrentAction('skills');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobTitle: resumeData.title, 
          currentSkills: resumeData.skills || [] 
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        addMessage('💡 Here are some skill suggestions for you!', 'success');
        addMessage(data.suggestedSkills, 'ai');
      } else if (response.status === 401) {
        handleUnauthorizedError();
      } else {
        addMessage(data.error || 'Failed to suggest skills', 'error');
      }
    } catch (error) {
      addMessage('Failed to connect to AI service', 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction('');
    }
  }

  async function analyzeResume() {
    if (!resumeData.name || !resumeData.title) {
      addMessage('Please add your basic information first.', 'error');
      return;
    }

    setCurrentAction('analyze');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        addMessage('📊 Here\'s your resume analysis!', 'success');
        addMessage(data.analysis, 'ai');
      } else if (response.status === 401) {
        handleUnauthorizedError();
      } else {
        addMessage(data.error || 'Failed to analyze resume', 'error');
      }
    } catch (error) {
      addMessage('Failed to connect to AI service', 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction('');
    }
  }

  function addMessage(text, type = 'user') {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages(prev => [...prev, { id: uniqueId, text, type }]);
  }

  function clearMessages() {
    setMessages([]);
  }

  function handleUnauthorizedError() {
    addMessage('🔐 Please login to use AI features', 'error');
    addMessage('You need to be logged in to access AI-powered resume assistance. Click the login button below to get started.', 'error');
    addMessage('login_button', 'login_prompt');
  }

  if (!session) return null;

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        </button>
      </div>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed inset-4 sm:bottom-24 sm:right-6 sm:inset-auto sm:w-96 sm:h-96 bg-card rounded-lg shadow-2xl border border-border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-t-lg flex-shrink-0">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm sm:text-base">AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 p-1"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {messages.length === 0 ? (
              /* AI Actions Grid */
              <div className="p-3 sm:p-4">
                <h4 className="text-xs sm:text-sm font-medium text-card-foreground mb-3">What would you like me to help you with?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {aiActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      disabled={isLoading}
                      className="p-2 sm:p-3 text-left bg-secondary hover:bg-accent rounded-lg border border-border transition-colors disabled:opacity-50"
                    >
                      <div className="text-xl sm:text-2xl mb-1">{action.icon}</div>
                      <div className="text-xs sm:text-sm font-medium text-secondary-foreground">{action.title}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{action.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                        message.type === 'ai' 
                          ? 'bg-blue-50 text-blue-900' 
                          : message.type === 'success'
                          ? 'bg-green-50 text-green-900'
                          : message.type === 'error'
                          ? 'bg-red-50 text-red-900'
                          : message.type === 'login_prompt'
                          ? 'bg-yellow-50 text-yellow-900'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.type === 'login_prompt' ? (
                        <div className="text-center">
                          <Link
                            href="/auth/signin"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login to Use AI Features
                          </Link>
                        </div>
                      ) : (
                        <ReactMarkdown 
                          components={{
                            ul: ({ children }) => <ul className="list-disc pl-3 sm:pl-4 space-y-1 mt-2">{children}</ul>,
                            li: ({ children }) => <li className="text-xs sm:text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold mt-3 mb-2">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-xs sm:text-sm font-semibold mt-2 mb-1">{children}</h4>
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="p-3 sm:p-4 border-t border-border flex-shrink-0">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMessages([])}
                      className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-secondary hover:bg-accent text-secondary-foreground hover:text-accent-foreground rounded-lg transition-colors"
                    >
                      Clear Chat
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant; 