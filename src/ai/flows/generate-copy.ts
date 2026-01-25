'use server';

/**
 * @fileOverview Generates marketing copy grounded in retrieved facts.
 *
 * - generateCopy - A function that generates copy from source material with fact-grounding.
 * - GenerateCopyInput - The input type for the generateCopy function.
 * - GenerateCopyOutput - The return type for the generateCopy function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCopyInputSchema = z.object({
    sourceMaterial: z
        .string()
        .describe('The source material/documents to extract facts from.'),
    prompt: z
        .string()
        .describe('The user prompt describing what copy to generate.'),
    contentType: z
        .enum(['Blog Post', 'Social Media', 'Ad Copy', 'Email', 'Product Description', 'Education'])
        .describe('The type of content to generate.'),
});
export type GenerateCopyInput = z.infer<typeof GenerateCopyInputSchema>;

const GenerateCopyOutputSchema = z.object({
    generatedCopy: z.string().describe('The generated marketing copy.'),
    factsUsed: z.array(z.string()).describe('The specific facts used from source material to generate the copy.'),
    sources: z.array(z.string()).describe('The sources of the facts used (e.g., document names, sections).'),
    confidenceLevel: z
        .enum(['High', 'Medium', 'Low'])
        .describe('The confidence level of the generated copy based on source material quality.'),
});
export type GenerateCopyOutput = z.infer<typeof GenerateCopyOutputSchema>;

export async function generateCopy(
    input: GenerateCopyInput
): Promise<GenerateCopyOutput> {
    return generateCopyFlow(input);
}

const generateCopyPrompt = ai.definePrompt({
    name: 'generateCopyPrompt',
    input: { schema: GenerateCopyInputSchema },
    output: { schema: GenerateCopyOutputSchema },
    prompt: `You are a professional copywriter who ONLY writes content based on verified facts from source documents.

CRITICAL RULE: You must NEVER hallucinate or make up information. Every claim in your copy MUST come directly from the source material provided.

Source Material:
{{{sourceMaterial}}}

User Request: {{{prompt}}}

Content Type: {{{contentType}}}

INSTRUCTIONS:
1. First, extract all relevant facts from the source material above
2. Generate {{{contentType}}} that uses ONLY these facts
3. Adapt your tone based on content type:
   - Blog Post: Informative, conversational, well-structured with headings
   - Social Media: Concise, engaging, with emojis and hashtags
   - Ad Copy: Persuasive, benefit-focused, clear call-to-action
   - Email: Professional, personalized, scannable
   - Product Description: Detailed, feature-focused, SEO-friendly
   - Education: Clear, instructional, structured for learning
4. List every fact you used in "Facts Used"
5. Identify sources (sections/topics from the material)
6. Set confidence level:
   - High: Abundant source material directly addressing the request
   - Medium: Some relevant facts but gaps exist
   - Low: Minimal or tangentially related source material

OUTPUT FORMAT:
- Generated Copy: [Your copy here]
- Facts Used: [Bullet list of specific facts extracted]
- Sources: [Sections or topics from source material]
- Confidence Level: High/Medium/Low

Remember: If the source material doesn't contain enough information, generate what you can and mark confidence as Low. NEVER invent facts.`,
});

const generateCopyFlow = ai.defineFlow(
    {
        name: 'generateCopyFlow',
        inputSchema: GenerateCopyInputSchema,
        outputSchema: GenerateCopyOutputSchema,
    },
    async input => {
        const { output } = await generateCopyPrompt(input);
        return output!;
    }
);
