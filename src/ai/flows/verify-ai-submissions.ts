'use server';

/**
 * @fileOverview Flow for verifying AI submissions based on confidence score.
 *
 * - verifyAISubmission - A function to verify AI submissions.
 * - VerifyAISubmissionInput - The input type for the verifyAISubmission function.
 * - VerifyAISubmissionOutput - The return type for the verifyAISubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyAISubmissionInputSchema = z.object({
  submissionId: z.string().describe('The ID of the submission to verify.'),
  photoUrl: z.string().describe('URL of the photo submitted by the user.'),
  aiResult: z.string().describe('The AI result for the submission (species/debris type).'),
  aiConfidenceScore: z.number().describe('The AI confidence score for the submission.'),
});
export type VerifyAISubmissionInput = z.infer<typeof VerifyAISubmissionInputSchema>;

const VerifyAISubmissionOutputSchema = z.object({
  isVerified: z.boolean().describe('Whether the submission is verified or not.'),
  knowledgeCardData: z.string().optional().describe('Educational information for the identified species/debris.'),
  reason: z.string().describe('The reason for the verification status.'),
});
export type VerifyAISubmissionOutput = z.infer<typeof VerifyAISubmissionOutputSchema>;

const KNOWLEDGE_CARD_MOCK_DATA = {
    'plastic_bottle': 'Plastic bottles are a major source of pollution in marine environments. Recycle whenever possible!',
    'sea_turtle': 'Sea turtles are endangered species. Protect their nesting sites and reduce plastic use.',
    'coral': 'Corals are vital for marine ecosystems. Support efforts to reduce ocean acidification and pollution.',
    'fish': 'Overfishing threatens fish populations. Consume fish from sustainable sources.',
};


async function getKnowledgeCardData(aiResult: string): Promise<string | undefined> {
    // Mock function to fetch knowledge card data based on AI result.
    // In a real implementation, this would likely query a database.
    return KNOWLEDGE_CARD_MOCK_DATA[aiResult];
}


export async function verifyAISubmission(input: VerifyAISubmissionInput): Promise<VerifyAISubmissionOutput> {
  return verifyAISubmissionFlow(input);
}

const verifyAISubmissionPrompt = ai.definePrompt({
  name: 'verifyAISubmissionPrompt',
  input: {schema: VerifyAISubmissionInputSchema},
  output: {schema: VerifyAISubmissionOutputSchema},
  prompt: `You are an AI verification expert for the BlueMap Guardians application.
  Your task is to determine if a submission should be automatically verified based on the AI confidence score.
  If the confidence score is above 0.8, mark the submission as verified, fetch the matching knowledge card data, and provide a reason.
  If the confidence score is below 0.8, mark the submission as unverified and provide a reason.

  Submission ID: {{{submissionId}}}
  AI Result: {{{aiResult}}}
  Confidence Score: {{{aiConfidenceScore}}}

  Return a JSON object with the following keys:
  - isVerified (boolean): Whether the submission is verified or not.
  - knowledgeCardData (string, optional): Educational information for the identified species/debris. Only include if verified.
  - reason (string): The reason for the verification status.
  `,
});

const verifyAISubmissionFlow = ai.defineFlow(
  {
    name: 'verifyAISubmissionFlow',
    inputSchema: VerifyAISubmissionInputSchema,
    outputSchema: VerifyAISubmissionOutputSchema,
  },
  async input => {
    if (input.aiConfidenceScore > 0.8) {
      const knowledgeCardData = await getKnowledgeCardData(input.aiResult);
      const output = {
        isVerified: true,
        knowledgeCardData: knowledgeCardData,
        reason: 'AI confidence score is above the threshold.',
      };
      return output;
    } else {
      const output = {
        isVerified: false,
        reason: 'AI confidence score is below the threshold.',
      };
      return output;
    }
  }
);
