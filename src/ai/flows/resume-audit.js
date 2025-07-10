
'use server';

/**
 * @fileOverview This file defines a Genkit flow for auditing resumes.
 *
 * It allows users to upload their resume (PDF) and receive a detailed AI-powered analysis,
 * including scoring, strengths, weaknesses, section-specific feedback (with separate suggestions),
 * ATS suggestions, and actionable recommendations.
 *
 * @exports {ResumeAuditInput} The input type for the resume audit flow.
 * @exports {ResumeAuditOutput} The output type for the resume audit flow.
 * @exports {resumeAudit} A function that triggers the resume audit flow.
 */

import {ai} from '../../ai/ai-instance.js';
import {z}  from 'genkit';

// Define the input schema for the resume audit flow
const ResumeAuditInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});

// Define the detailed output schema matching the requested JSON structure
const ResumeAuditOutputSchema = z.object({
  overallScore: z
    .number()
    .min(0).max(10)
    .describe('Overall quality score out of 10 for the resume.'),
  atsScore: z
    .number()
    .min(0).max(100)
    .describe('Applicant Tracking System (ATS) compatibility score out of 100, based on keyword relevance, formatting, and standard section usage.'),
  summary: z
    .string()
    .describe("High-level summary of the resume's overall quality, strengths, and weaknesses. This should be a general overview."),
  strengths: z
    .array(
      z.object({
        text: z.string().describe('Specific strength identified.'),
        source: z
          .string()
          .describe('The exact text from the resume that supports this strength.'),
      })
    )
    .describe('List of identified strengths with supporting text from the resume.'),
  weaknesses: z
    .array(
      z.object({
        text: z.string().describe('Specific weakness identified.'),
        source: z
          .string()
          .describe('The exact text from the resume related to this weakness.'),
      })
    )
    .describe('List of identified weaknesses with related text from the resume.'),
  sectionFeedback: z
    .array(
      z.object({
        section: z
          .string()
          .describe('Name of the resume section (e.g., "Education", "Skills", "Experience").'),
        score: z.number().min(0).max(10).describe('Score out of 10 for this section.'),
        feedback: z.string().describe('General feedback and observations for this section. Do NOT include detailed rewrite examples here; put them in the "suggestions" array.'),
        suggestions: z.array(z.string()).describe('Detailed, actionable suggestions and rewrite examples to improve this specific section. If the section is good, this can be an empty array or contain positive affirmations.'),
        references: z
          .array(
            z.object({
              excerpt: z.string().describe('The specific text referenced from the resume.'),
              comment: z.string().describe('Comment explaining the relevance of the excerpt.'),
            })
          )
          .describe('Specific text excerpts from the resume related to this feedback.'),
      })
    )
    .describe('Feedback broken down by resume section, including specific suggestions for improvement.'),
  atsSuggestions: z
    .array(z.string())
    .describe('Suggestions to improve Applicant Tracking System (ATS) compatibility.'),
  actionableRecommendations: z
    .array(z.string())
    .describe('Top 3-5 concrete, actionable steps the user can take to improve their resume globally.'),
});

// Define the prompt for the detailed resume audit
const resumeAuditPrompt = ai.definePrompt({
  name: 'detailedResumeAuditPrompt',
  input: { schema: ResumeAuditInputSchema },
  output: { schema: ResumeAuditOutputSchema },
  config: { temperature: 0.2 }, // Lower temperature for more consistent output
  prompt: `Analyze the following resume thoroughly. You are an expert resume reviewer and career coach. Provide a detailed analysis strictly in the specified JSON format.

  For the 'summary' field, provide a high-level overview.
  Calculate an 'atsScore' (0-100) based on ATS compatibility (keywords, formatting, standard sections).
  For each entry in 'sectionFeedback':
    - The 'feedback' field should contain general observations about that section. Provide brief rephrasing ideas or point out what is missing IF improvements are needed.
    - The 'suggestions' field should contain DETAILED, ACTIONABLE advice and specific rewrite examples if the section can be improved. If the section is already strong, this array can be empty or note that it's well-written.
  Refer to specific text excerpts from the resume in the 'references' field where applicable. Be critical and constructive. Ensure all fields in the JSON schema are populated accurately based on the resume content.

  Resume Text (provided as media):
  {{media url=resumeDataUri}}

  Generate a JSON object matching the ResumeAuditOutputSchema exactly.
  Populate all fields accurately.`,
});


// Define the resume audit flow that calls the detailed prompt
const resumeAuditFlow = ai.defineFlow(
  {
    name: 'resumeAuditFlow',
    inputSchema: ResumeAuditInputSchema,
    outputSchema: ResumeAuditOutputSchema,
  },
  async (input) => {
    console.log('[resumeAuditFlow] Started with input:', JSON.stringify(input).substring(0, 100) + '...'); // Log start and truncated input
    try {
      const { output } = await resumeAuditPrompt(input);

      if (!output) {
         console.error('[resumeAuditFlow] Prompt returned null or undefined output.');
         throw new Error('AI analysis returned no output.');
      }

      console.log('[resumeAuditFlow] Received valid output from prompt:', JSON.stringify(output).substring(0, 100) + '...'); // Log success and truncated output
      return output;
    } catch (error) {
      console.error('[resumeAuditFlow] Error during execution:', error);
      throw error;
    }
  }
);

/**
 * Analyzes a resume (PDF) and provides a detailed AI-powered audit.
 *
 * @param {z.infer<typeof ResumeAuditInputSchema>} input - The input for the resume audit, containing the resume data URI.
 * @returns {Promise<z.infer<typeof ResumeAuditOutputSchema>>} A promise that resolves to an object containing the detailed audit results.
 */
export async function resumeAudit(input) {
  console.log('[resumeAudit] Function called. Invoking resumeAuditFlow...');
  try {
      const result = await resumeAuditFlow(input);
      console.log('[resumeAudit] resumeAuditFlow completed successfully.');
      return result;
  } catch(error) {
      console.error('[resumeAudit] resumeAuditFlow failed:', error);
      throw error;
  }
}
