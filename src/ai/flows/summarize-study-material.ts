'use server';

/**
 * @fileOverview Summarizes study material into key points.
 *
 * - summarizeStudyMaterial - A function that summarizes the provided study material.
 * - SummarizeStudyMaterialInput - The input type for the summarizeStudyMaterial function.
 * - SummarizeStudyMaterialOutput - The return type for the summarizeStudyMaterial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudyMaterialInputSchema = z.object({
  studyMaterial: z
    .string()
    .describe('The study material to be summarized.'),
});
export type SummarizeStudyMaterialInput = z.infer<typeof SummarizeStudyMaterialInputSchema>;

const SummarizeStudyMaterialOutputSchema = z.object({
  summary: z.string().describe('The summary of the study material.'),
  factsUsed: z.array(z.string()).describe('The facts used to generate the summary.'),
  sources: z.array(z.string()).describe('The sources of the facts used.'),
  confidenceLevel: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The confidence level of the summary.'),
});
export type SummarizeStudyMaterialOutput = z.infer<typeof SummarizeStudyMaterialOutputSchema>;

export async function summarizeStudyMaterial(
  input: SummarizeStudyMaterialInput
): Promise<SummarizeStudyMaterialOutput> {
  return summarizeStudyMaterialFlow(input);
}

const summarizeStudyMaterialPrompt = ai.definePrompt({
  name: 'summarizeStudyMaterialPrompt',
  input: {schema: SummarizeStudyMaterialInputSchema},
  output: {schema: SummarizeStudyMaterialOutputSchema},
  prompt: `You are an expert summarizer of study material.

  Summarize the following study material into key points. Be sure to extract key facts and cite your sources.

  Study Material: {{{studyMaterial}}}

  OUTPUT FORMAT:
  - Answer:
  - Facts Used:
  - Sources:
  - Confidence Level (High / Medium / Low)`,
});

const summarizeStudyMaterialFlow = ai.defineFlow(
  {
    name: 'summarizeStudyMaterialFlow',
    inputSchema: SummarizeStudyMaterialInputSchema,
    outputSchema: SummarizeStudyMaterialOutputSchema,
  },
  async input => {
    const {output} = await summarizeStudyMaterialPrompt(input);
    return output!;
  }
);
