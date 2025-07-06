// ai/flows/extract-skills.js

'use server';

import { ai } from '../../ai/ai-instance.js';
import { z } from 'genkit';

// Input is the same: the resume as a data URI
const ExtractSkillsInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file as a data URI (format: data:<mimetype>;base64,<encoded_data>).'
    ),
});

// Output is much simpler: just an array of strings
const ExtractSkillsOutputSchema = z.object({
  skills: z
    .array(z.string())
    .describe(
      'A list of technical skills, programming languages, frameworks, and tools found in the resume.'
    ),
});

// A new, highly focused prompt
const extractSkillsPrompt = ai.definePrompt({
  name: 'extractResumeSkillsPrompt',
  input: { schema: ExtractSkillsInputSchema },
  output: { schema: ExtractSkillsOutputSchema },
  config: { temperature: 0.1 }, // Very low temperature for high consistency
  prompt: `You are an expert technical recruiter and AI assistant. Your task is to analyze the provided resume and extract a list of all relevant technical skills.

  - Identify programming languages (e.g., JavaScript, Python, Java).
  - Identify frameworks and libraries (e.g., React, Node.js, Next.js, Django).
  - Identify tools and platforms (e.g., Git, Docker, AWS, Firebase, MongoDB).
  - Do NOT include soft skills (e.g., "communication", "teamwork").
  - Do NOT include general software like "Microsoft Word".

  Return the result as a simple JSON object with a single key "skills" containing an array of the identified skill strings.

  Resume to analyze:
  {{media url=resumeDataUri}}`,
});

// The new flow
const extractSkillsFlow = ai.defineFlow(
  {
    name: 'extractSkillsFlow',
    inputSchema: ExtractSkillsInputSchema,
    outputSchema: ExtractSkillsOutputSchema,
  },
  async (input) => {
    const { output } = await extractSkillsPrompt(input);
    if (!output) {
      throw new Error('AI analysis returned no skill output.');
    }
    return output;
  }
);

/**
 * Extracts technical skills from a resume.
 * @param {z.infer<typeof ExtractSkillsInputSchema>} input - The resume data URI.
 * @returns {Promise<z.infer<typeof ExtractSkillsOutputSchema>>} A promise resolving to an object with a 'skills' array.
 */
export async function extractSkillsFromResume(input) {
  try {
    const result = await extractSkillsFlow(input);
    return result;
  } catch (error) {
    console.error('[extractSkillsFromResume] Flow failed:', error);
    // Return a structured error or an empty skills array
    return { skills: [] };
  }
}