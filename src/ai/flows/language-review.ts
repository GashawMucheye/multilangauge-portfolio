// src/ai/flows/language-review.ts
// This file defines the Genkit flow for reviewing content in a selected language using AI.

import { z } from 'genkit';
import { ai } from '../genkit';

const LanguageReviewInputSchema = z.object({
  content: z.string().describe('The content to be reviewed.'),
  language: z.string().describe('The language to review the content in.'),
});
export type LanguageReviewInput = z.infer<typeof LanguageReviewInputSchema>;

const LanguageReviewOutputSchema = z.object({
  reviewedContent: z.string().describe('The reviewed content.'),
  feedback: z.string().describe('Feedback on the content.'),
});
export type LanguageReviewOutput = z.infer<typeof LanguageReviewOutputSchema>;

export async function reviewLanguage(
  input: LanguageReviewInput
): Promise<LanguageReviewOutput> {
  return languageReviewFlow(input);
}

const languageReviewPrompt = ai.definePrompt({
  name: 'languageReviewPrompt',
  input: { schema: LanguageReviewInputSchema },
  output: { schema: LanguageReviewOutputSchema },
  prompt: `You are an AI expert in linguistics and cultural nuances. Review the following content in {{language}} for linguistic accuracy, cultural appropriateness, and consistent tone. Provide feedback and a revised version of the content.

Content: {{{content}}}`,
});

const languageReviewFlow = ai.defineFlow(
  {
    name: 'languageReviewFlow',
    inputSchema: LanguageReviewInputSchema,
    outputSchema: LanguageReviewOutputSchema,
  },
  async (input) => {
    const { output } = await languageReviewPrompt(input);
    return output!;
  }
);
