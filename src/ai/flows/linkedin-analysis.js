
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing LinkedIn profiles.
 *
 * It allows users to provide a LinkedIn profile URL or upload a PDF export
 * and receive a detailed AI-powered analysis. The analysis covers aspects like
 * headline, summary, experience, skills, recommendations, and overall optimization,
 * providing general feedback and specific, actionable suggestions.
 *
 * @exports {LinkedInAnalysisInput} The input type for the LinkedIn analysis flow.
 * @exports {LinkedInAnalysisOutput} The output type for the LinkedIn analysis flow.
 * @exports {linkedinAnalysis} A function that triggers the LinkedIn analysis flow.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

// Define the input schema, allowing either URL or PDF data URI
const LinkedInAnalysisInputSchema = z.object({
  profileUrl: z.string().url().optional().describe('The URL of the public LinkedIn profile.'),
  profilePdfDataUri: z.string().optional().describe('The LinkedIn profile exported as a PDF, provided as a data URI (e.g., \'data:application/pdf;base64,...\').'),
}).refine(data => data.profileUrl || data.profilePdfDataUri, {
  message: 'Either profileUrl or profilePdfDataUri must be provided.',
});

// Define the detailed output schema
const LinkedInAnalysisOutputSchema = z.object({
  overallScore: z.number().min(0).max(10).describe('Overall score out of 10 for the LinkedIn profile\'s optimization and completeness.'),
  headlineAnalysis: z.object({
    score: z.number().min(0).max(10).describe('Score for the headline\'s effectiveness (clarity, keywords, value proposition).'),
    feedback: z.string().describe('General feedback on the headline. If improvements are needed, briefly mention what could be better. Do NOT include detailed rewrite examples here; put them in the "suggestions" array.'),
    suggestions: z.array(z.string()).describe('Detailed, actionable suggestions and rewrite examples for improving the headline. If good, can be empty or affirm its strength.'),
  }),
  summaryAnalysis: z.object({
    score: z.number().min(0).max(10).describe('Score for the summary/about section (engagement, clarity, keywords, call to action).'),
    feedback: z.string().describe('General feedback on the summary/about section. If improvements are needed, briefly mention what could be better. Do NOT include detailed rewrite examples here; put them in the "suggestions" array.'),
    suggestions: z.array(z.string()).describe('Detailed, actionable suggestions and rewrite examples for improving the summary/about section. If good, can be empty or affirm its strength.'),
  }),
  experienceAnalysis: z.object({
    score: z.number().min(0).max(10).describe('Score for the experience section (detail, achievements, keywords).'),
    feedback: z.string().describe('Overall general feedback on the experience section. If improvements are needed for the section as a whole, briefly mention them. Do NOT include detailed rewrite examples for individual entries here; put them in the entry-specific "suggestions" array within "entryFeedback".'),
    entryFeedback: z.array(z.object({
        title: z.string().describe('Job title or role.'),
        company: z.string().describe('Company name.'),
        feedback: z.string().describe('General feedback specific to this entry. If improvements are needed, briefly mention what could be better. Do NOT include detailed rewrite examples here; put them in the "suggestions" array for this entry.'),
        suggestions: z.array(z.string()).describe('Detailed, actionable improvement suggestions and rewrite examples for this specific experience entry. If good, can be empty or affirm its strength.')
    })).describe('Feedback on individual experience entries, including specific suggestions.')
  }),
  skillsAnalysis: z.object({
    score: z.number().min(0).max(10).describe('Score for the skills section (relevance, quantity, endorsements - if inferrable).'),
    feedback: z.string().describe('General feedback on skills relevance and presentation. If improvements are needed, briefly mention what could be better. Do NOT include detailed improvement tips here; put them in the "suggestions" array.'),
    suggestions: z.array(z.string()).describe('Detailed suggestions for optimizing the skills section (e.g., types of skills to add, how to highlight them). If good, can be empty or affirm its strength.'),
  }),
  recommendationsAnalysis: z.object({
     score: z.number().min(0).max(10).describe('Score based on the presence and quality of recommendations (0 if none).'),
     feedback: z.string().describe('General feedback on the impact of recommendations (or lack thereof). If improvements are needed (e.g. requesting more), briefly mention it. Do NOT include specific advice on requesting them here; put detailed advice in "suggestions".'),
     suggestions: z.array(z.string()).describe('Detailed suggestions regarding giving and receiving recommendations (e.g., how to request them effectively). If good, can be empty or affirm current state.')
  }),
  engagementAnalysis: z.object({
     score: z.number().min(0).max(10).describe('Estimated score for profile activity and engagement (based on profile completeness, content hints - very speculative).'),
     feedback: z.string().describe('General feedback on perceived profile activity and network engagement. If improvements are needed, briefly mention what could be better. Do NOT list specific actions here; put detailed actions in "suggestions".'),
     suggestions: z.array(z.string()).describe('Detailed suggestions for increasing visibility and engagement (e.g., content to share, groups to join). If good, can be empty or affirm current state.')
  }),
  visualsAnalysis: z.object({
      score: z.number().min(0).max(10).describe('Score for profile picture and banner (professionalism, relevance - based on presence/absence if analyzing PDF).'),
      feedback: z.string().describe('General feedback on the profile picture and background banner. If improvements are needed, briefly mention what could be better. Do NOT provide specific image improvement tips here; put them in "suggestions".'),
      suggestions: z.array(z.string()).describe('Detailed suggestions for optimizing visual elements (e.g., type of photo, banner content ideas). If good, can be empty or affirm current state.')
  }),
  overallStrengths: z.array(z.string()).describe('List of key strengths of the profile.'),
  overallWeaknesses: z.array(z.string()).describe('List of key weaknesses or areas for improvement.'),
  actionableRecommendations: z.array(z.string()).describe('Top 3-5 concrete, actionable steps the user can take to improve their LinkedIn profile globally.'),
});


// Define the prompt for the detailed LinkedIn analysis
const linkedinAnalysisPrompt = ai.definePrompt({
  name: 'detailedLinkedInAnalysisPrompt',
  input: { schema: LinkedInAnalysisInputSchema },
  output: { schema: LinkedInAnalysisOutputSchema },
  config: { temperature: 0.2 }, // Lower temperature for more consistent output
  prompt: `Analyze the provided LinkedIn profile information thoroughly. You are an expert LinkedIn profile reviewer and career coach. Provide a detailed analysis strictly in the specified JSON format.

  The profile information is provided either as a URL or as text extracted from a PDF export.

  {{#if profileUrl}}
  Analyze the LinkedIn profile based on the typical structure and content found at a URL like: {{{profileUrl}}}
  (Note: You cannot access external URLs directly, but analyze based on your knowledge of LinkedIn profile structures and best practices, assuming the URL points to a standard profile).
  Focus on completeness, keyword optimization, clarity, engagement potential, and professionalism.
  {{/if}}

  {{#if profilePdfDataUri}}
  Analyze the LinkedIn profile based on the following text extracted from a PDF export:
  {{media url=profilePdfDataUri}}
  Focus on the content provided: headline, summary/about, experience descriptions, skills list, education, etc. Assess formatting and completeness based on the text. Be aware that PDF exports might lack visual context (like banner images) or dynamic data (like endorsement counts).
  {{/if}}

  Generate a JSON object matching the LinkedInAnalysisOutputSchema exactly.
  For all 'feedback' fields (e.g., headlineAnalysis.feedback, summaryAnalysis.feedback, experienceAnalysis.entryFeedback.feedback), provide GENERAL observations and assessments. If improvements are needed for that section, briefly state what could be better or what's missing. Do NOT include detailed rewrite examples or specific improvement steps directly in these 'feedback' fields.
  Instead, for all 'suggestions' arrays (e.g., headlineAnalysis.suggestions, summaryAnalysis.suggestions, experienceAnalysis.entryFeedback.suggestions), provide DETAILED, ACTIONABLE advice, specific examples, and rewrite ideas for improvement. If a section is already strong, its 'suggestions' array can be empty or contain a brief affirmation.
  Provide constructive criticism. Score sections from 0 to 10 based on best practices for LinkedIn optimization. For engagement and visuals, make reasonable inferences if analyzing PDF text, acknowledging limitations.
  Ensure all fields in the JSON schema are populated accurately based on the profile information provided or inferred.`,
});


// Define the LinkedIn analysis flow
const linkedinAnalysisFlow = ai.defineFlow(
  {
    name: 'linkedinAnalysisFlow',
    inputSchema: LinkedInAnalysisInputSchema,
    outputSchema: LinkedInAnalysisOutputSchema,
  },
  async (input) => {
    const inputType = input.profileUrl ? 'URL' : 'PDF Data URI';
    console.log(`[linkedinAnalysisFlow] Started. Input type: ${inputType}`);
    if (input.profileUrl) {
        console.log(`[linkedinAnalysisFlow] Input URL: ${input.profileUrl}`);
    } else {
        console.log(`[linkedinAnalysisFlow] Input PDF URI: ${input.profilePdfDataUri ? input.profilePdfDataUri.substring(0, 100) + '...' : 'N/A'}`);
    }

    try {
      const result = await linkedinAnalysisPrompt(input);
      const output = result.output; 

      console.log('[linkedinAnalysisFlow] Raw output from prompt:', JSON.stringify(output, null, 2));

      if (!output) {
         console.error('[linkedinAnalysisFlow] Prompt returned null or undefined output.');
         throw new Error('AI analysis returned no output.');
      }

      console.log('[linkedinAnalysisFlow] Received valid output from prompt (structure validated by Genkit).');
      return output;
    } catch (error) {
      console.error('[linkedinAnalysisFlow] Error during execution:', error);
      if (error instanceof Error) {
          console.error(`[linkedinAnalysisFlow] Error message: ${error.message}`);
          console.error(`[linkedinAnalysisFlow] Error stack: ${error.stack}`);
      } else {
          console.error('[linkedinAnalysisFlow] Unknown error object:', error);
      }
      throw error;
    }
  }
);

/**
 * Analyzes a LinkedIn profile (from URL or PDF) and provides a detailed AI-powered audit.
 *
 * @param {z.infer<typeof LinkedInAnalysisInputSchema>} input - The input for the LinkedIn analysis, containing either the profile URL or the PDF data URI.
 * @returns {Promise<z.infer<typeof LinkedInAnalysisOutputSchema>>} A promise that resolves to an object containing the detailed analysis results.
 */
export async function linkedinAnalysis(input) {
  console.log('[linkedinAnalysis] Function called. Invoking linkedinAnalysisFlow...');
  try {
      if (!input.profileUrl && !input.profilePdfDataUri) {
          throw new Error('Invalid input: Must provide either profileUrl or profilePdfDataUri.');
      }
      const result = await linkedinAnalysisFlow(input);
      console.log('[linkedinAnalysis] linkedinAnalysisFlow completed successfully.');
      return result;
  } catch(error) {
      console.error('[linkedinAnalysis] linkedinAnalysisFlow failed:', error);
       if (error instanceof Error) {
        console.error(`[linkedinAnalysis] Error message: ${error.message}`);
      } else {
        console.error('[linkedinAnalysis] Unknown error object:', error);
      }
      throw error;
  }
}
