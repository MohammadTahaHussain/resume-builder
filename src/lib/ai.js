// class ResumeAI {
//   constructor() {
//     this.apiKey = process.env.GEMINI_API_KEY;
//     this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-1.5-flash:generateContent';
//   }

//   async generate(prompt, context = '') {
//     if (!this.apiKey) {
//       throw new Error('Gemini API key not configured');
//     }

//     try {
//       const response = await fetch(this.baseUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.apiKey}`
//         },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{
//               text: `${context}\n\n${prompt}`
//             }]
//           }],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.95,
//             maxOutputTokens: 1024,
//           }
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.candidates[0]?.content?.parts[0]?.text || '';
//     } catch (error) {
//       console.error('AI generation failed:', error);
//       throw new Error('AI service temporarily unavailable');
//     }
//   }

//   // Generate professional summary
//   async generateSummary(resumeData) {
//     const prompt = `Create a compelling professional summary for ${resumeData.name || 'a professional'}, a ${resumeData.title || 'professional'} with experience in ${resumeData.skills?.slice(0, 5).join(', ') || 'various technologies'}.

//     Focus on:
//     - Key achievements and impact
//     - Years of experience
//     - Core competencies
//     - Career objectives

//     Keep it concise (2-3 sentences) and professional.`;

//     return await this.generate(prompt);
//   }

//   // Enhance achievements
//   async enhanceAchievements(achievements) {
//     const prompt = `Transform these job achievements to be more impactful and quantifiable. Use specific numbers, percentages, and results where possible:

//     Original achievements:
//     ${achievements.join('\n')}

//     Provide 3-4 enhanced achievements that are:
//     - Quantifiable with numbers
//     - Action-oriented
//     - Results-focused
//     - Professional and concise`;

//     return await this.generate(prompt);
//   }

//   // Suggest skills based on job title
//   async suggestSkills(jobTitle, currentSkills = []) {
//     const prompt = `Suggest 5-8 additional relevant skills for a ${jobTitle} position.

//     Current skills: ${currentSkills.join(', ')}

//     Provide skills that are:
//     - Industry-relevant
//     - Complementary to existing skills
//     - In-demand for this role
//     - Both technical and soft skills`;

//     return await this.generate(prompt);
//   }

//   // Grammar and style check
//   async checkGrammar(text) {
//     const prompt = `Review and improve this text for grammar, style, and professionalism. Provide the corrected version:

//     Text to review:
//     ${text}

//     Return only the corrected text, maintaining the same meaning but improving clarity and professionalism.`;

//     return await this.generate(prompt);
//   }

//   // Generate cover letter
//   async generateCoverLetter(resumeData, jobTitle, companyName) {
//     const prompt = `Create a compelling cover letter for ${resumeData.name} applying for a ${jobTitle} position at ${companyName}.

//     Resume highlights:
//     - Title: ${resumeData.title}
//     - Skills: ${resumeData.skills?.slice(0, 5).join(', ')}
//     - Experience: ${resumeData.experience?.length || 0} positions

//     Make it:
//     - Professional and enthusiastic
//     - Tailored to the specific role
//     - Highlight relevant experience
//     - Include a call to action
//     - Keep it concise (3-4 paragraphs)`;

//     return await this.generate(prompt);
//   }

//   // Resume scoring and feedback
//   async analyzeResume(resumeData) {
//     const prompt = `Analyze this resume and provide feedback on a scale of 1-10:

//     Resume data:
//     - Name: ${resumeData.name}
//     - Title: ${resumeData.title}
//     - Skills: ${resumeData.skills?.join(', ')}
//     - Experience: ${resumeData.experience?.length || 0} positions
//     - Education: ${resumeData.education?.length || 0} degrees

//     Provide:
//     1. Overall score (1-10)
//     2. 3 specific strengths
//     3. 3 areas for improvement
//     4. 2 actionable suggestions`;

//     return await this.generate(prompt);
//   }
// }

// // Create singleton instance
// const aiService = new ResumeAI();

// export default aiService;

class ResumeAI {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
  }

  /**
   * Core method to interact with the Gemini API.
   * @param {string} prompt - The main prompt for the AI.
   * @param {string} [context=''] - Optional context to prepend to the prompt.
   * @returns {Promise<string>} The generated text from the AI.
   */
  async generate(prompt, context = "") {
    if (!this.apiKey) {
      console.error('Gemini API key not configured');
      throw new Error('Gemini API key not configured');
    }

    try {
      console.log('Making AI request with API key:', this.apiKey.substring(0, 10) + '...');
      console.log('Request URL:', this.baseUrl);
      console.log('Prompt:', prompt);

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": this.apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${context}\n\n${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('Extracted result:', result);
      
      return result;
    } catch (error) {
      console.error('AI generation failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        apiKey: this.apiKey ? 'Present' : 'Missing'
      });
      throw new Error(`AI service temporarily unavailable: ${error.message}`);
    }
  }

  /**
   * Generates a professional summary from resume data.
   * @param {object} resumeData - The user's resume data.
   * @returns {Promise<string>} A generated professional summary.
   */
  async generateSummary(resumeData) {
    if (!resumeData) return "";
    const prompt = `Create a compelling professional summary for ${
      resumeData.name || "a professional"
    }, a ${resumeData.title || "professional"} with experience in ${
      resumeData.skills?.slice(0, 5).join(", ") || "various technologies"
    }. 
    
    Focus on:
    - Key achievements and impact
    - Years of experience
    - Core competencies
    - Career objectives
    
    Keep it concise (2-3 sentences) and professional.`;

    return await this.generate(prompt);
  }

  /**
   * Enhances a list of achievements to be more impactful.
   * @param {string[]} achievements - An array of achievement strings.
   * @returns {Promise<string>} A list of enhanced, quantifiable achievements.
   */
  async enhanceAchievements(achievements) {
    if (!Array.isArray(achievements) || achievements.length === 0) {
      return ""; // Return empty string if input is invalid.
    }
    const prompt = `Transform these job achievements to be more impactful and quantifiable. Use specific numbers, percentages, and results where possible:

    Original achievements:
    ${achievements.join("\n")}
    
    Provide 3-4 enhanced achievements that are:
    - Quantifiable with numbers
    - Action-oriented
    - Results-focused
    - Professional and concise`;

    return await this.generate(prompt);
  }

  /**
   * Suggests relevant skills for a given job title.
   * @param {string} jobTitle - The target job title.
   * @param {string[]} [currentSkills=[]] - A list of the user's current skills.
   * @returns {Promise<string>} A list of suggested skills.
   */
  async suggestSkills(jobTitle, currentSkills = []) {
    if (!jobTitle) return "";
    const prompt = `Suggest 5-8 additional relevant skills for a ${jobTitle} position. 
    
    Current skills: ${currentSkills.join(", ")}
    
    Provide skills that are:
    - Industry-relevant
    - Complementary to existing skills
    - In-demand for this role
    - Both technical and soft skills`;

    return await this.generate(prompt);
  }

  /**
   * Checks and corrects grammar and style for a given text.
   * @param {string} text - The text to review.
   * @returns {Promise<string>} The corrected text.
   */
  async checkGrammar(text) {
    if (!text || typeof text !== "string") return "";
    const prompt = `Review and improve this text for grammar, style, and professionalism. Provide the corrected version:

    Text to review:
    ${text}
    
    Return only the corrected text, maintaining the same meaning but improving clarity and professionalism.`;

    return await this.generate(prompt);
  }

  /**
   * Generates a cover letter based on resume data and a job description.
   * @param {object} resumeData - The user's resume data.
   * @param {string} jobTitle - The title of the job being applied for.
   * @param {string} companyName - The name of the company.
   * @returns {Promise<string>} A generated cover letter.
   */
  async generateCoverLetter(resumeData, jobTitle, companyName) {
    if (!resumeData || !jobTitle || !companyName) return "";
    const prompt = `Create a compelling cover letter for ${
      resumeData.name
    } applying for a ${jobTitle} position at ${companyName}.

    Resume highlights:
    - Title: ${resumeData.title}
    - Skills: ${resumeData.skills?.slice(0, 5).join(", ")}
    - Experience: ${resumeData.experience?.length || 0} positions
    
    Make it:
    - Professional and enthusiastic
    - Tailored to the specific role
    - Highlight relevant experience
    - Include a call to action
    - Keep it concise (3-4 paragraphs)`;

    return await this.generate(prompt);
  }

  /**
   * Analyzes resume data and provides a score and feedback.
   * @param {object} resumeData - The user's resume data.
   * @returns {Promise<string>} Formatted feedback including a score, strengths, and suggestions.
   */
  async analyzeResume(resumeData) {
    if (!resumeData) return "Cannot analyze an empty resume.";
    const prompt = `Analyze this resume and provide feedback on a scale of 1-10:

    Resume data:
    - Name: ${resumeData.name}
    - Title: ${resumeData.title}
    - Skills: ${resumeData.skills?.join(", ")}
    - Experience: ${resumeData.experience?.length || 0} positions
    - Education: ${resumeData.education?.length || 0} degrees
    
    Provide:
    1. Overall score (1-10)
    2. 3 specific strengths
    3. 3 areas for improvement
    4. 2 actionable suggestions`;

    return await this.generate(prompt);
  }
}

// Create a singleton instance to be used throughout the application.
const aiService = new ResumeAI();

// Use ES module export.
export default aiService;