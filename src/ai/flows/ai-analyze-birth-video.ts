'use server';
/**
 * @fileOverview Analyzes a video to detect if a cow is starting to give birth.
 *
 * - analyzeBirthVideo - A function that analyzes the video and returns the result.
 * - AnalyzeBirthVideoInput - The input type for the analyzeBirthVideo function.
 * - AnalyzeBirthVideoOutput - The return type for the analyzeBirthVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBirthVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a cow, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeBirthVideoInput = z.infer<
  typeof AnalyzeBirthVideoInputSchema
>;

const AnalyzeBirthVideoOutputSchema = z.object({
  isBirthStarting: z
    .boolean()
    .describe('Whether the cow shows signs of starting to give birth.'),
  analysisResult: z
    .string()
    .describe('A detailed analysis of the cow\'s behavior and the reasoning for the conclusion.'),
});
export type AnalyzeBirthVideoOutput = z.infer<
  typeof AnalyzeBirthVideoOutputSchema
>;

export async function analyzeBirthVideo(
  input: AnalyzeBirthVideoInput
): Promise<AnalyzeBirthVideoOutput> {
  return analyzeBirthVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBirthVideoPrompt',
  input: {schema: AnalyzeBirthVideoInputSchema},
  output: {schema: AnalyzeBirthVideoOutputSchema},
  prompt: `You are an expert veterinarian specializing in bovine obstetrics. You will be provided with a video of a cow.

Your task is to analyze the video to determine if the cow is exhibiting signs of imminent birth (calving).

Look for the following signs:
- Restlessness, getting up and down frequently.
- Tail raising or twitching.
- Nesting behavior (pawing at the ground).
- Straining or pushing.
- Appearance of the water bag or amniotic sac.
- Isolation from the rest of the herd.
- Mucus discharge from the vulva.

Based on your analysis, set the 'isBirthStarting' field to true if you are confident that birth is imminent or has begun. Otherwise, set it to false.

In the 'analysisResult' field, provide a detailed step-by-step breakdown of your observations from the video and explain your reasoning for the 'isBirthStarting' conclusion. If birth is not starting, describe the observed behavior and state that no signs of imminent calving were detected.

IMPORTANT LANGUAGE RULE:
The 'analysisResult' field MUST be written entirely in Turkish.
Do NOT use English in the final output.
All explanations, observations, and conclusions must be in clear and professional Turkish.
Only the field names (like isBirthStarting and analysisResult) should remain in English.

Video to analyze:
{{media url=videoDataUri}}`
});

const analyzeBirthVideoFlow = ai.defineFlow(
  {
    name: 'analyzeBirthVideoFlow',
    inputSchema: AnalyzeBirthVideoInputSchema,
    outputSchema: AnalyzeBirthVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
