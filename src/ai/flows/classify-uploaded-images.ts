'use server';

/**
 * @fileOverview AI flow to classify uploaded images and provide a confidence score.
 *
 * - classifyImage - A function that classifies an image.
 * - ClassifyImageInput - The input type for the classifyImage function.
 * - ClassifyImageOutput - The return type for the classifyImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to classify, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyImageInput = z.infer<typeof ClassifyImageInputSchema>;

const ClassifyImageOutputSchema = z.object({
  aiResult: z.string().describe('The species or debris type identified in the image.'),
  aiConfidenceScore: z.number().describe('The confidence score of the AI identification (0-1).'),
  isVerified: z.boolean().describe('Whether the submission is verified (confidence > 0.8).'),
});
export type ClassifyImageOutput = z.infer<typeof ClassifyImageOutputSchema>;

export async function classifyImage(input: ClassifyImageInput): Promise<ClassifyImageOutput> {
  return classifyImageFlow(input);
}

const classifyImagePrompt = ai.definePrompt({
  name: 'classifyImagePrompt',
  input: {schema: ClassifyImageInputSchema},
  output: {schema: ClassifyImageOutputSchema},
  prompt: `You are an AI that classifies images of marine life or plastic debris.

  Analyze the image and identify the species or debris type. Provide a confidence score (0-1) for your identification.

  Here is the image to analyze: {{media url=photoDataUri}}
  {
    "aiResult": "<species or debris type>",
    "aiConfidenceScore": <confidence score 0-1>,
    "isVerified": <true if confidence score > 0.8, otherwise false>
  }
  `,
});

const classifyImageFlow = ai.defineFlow(
  {
    name: 'classifyImageFlow',
    inputSchema: ClassifyImageInputSchema,
    outputSchema: ClassifyImageOutputSchema,
  },
  async input => {
    const {output} = await classifyImagePrompt(input);
    return output!;
  }
);
