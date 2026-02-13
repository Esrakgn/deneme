// src/ai/flows/ai-help-new-user-get-started.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing a guided tour of the VetAI app to new users.
 *
 * The flow uses an LLM to generate a personalized welcome message and onboarding instructions based on the user's role and interests.
 *
 * @interface AIHelpNewUserGetStartedInput - Defines the input schema for the flow.
 * @interface AIHelpNewUserGetStartedOutput - Defines the output schema for the flow.
 * @function aiHelpNewUserGetStarted - The main function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHelpNewUserGetStartedInputSchema = z.object({
  userRole: z
    .string()
    .describe(
      'The role of the user, e.g., veterinarian, farmer, or farm manager.'
    ),
  userInterests: z
    .string()
    .describe(
      'The interests of the user, e.g., mastitis detection, newborn analysis, or regional analysis.'
    ),
});
export type AIHelpNewUserGetStartedInput = z.infer<
  typeof AIHelpNewUserGetStartedInputSchema
>;

const AIHelpNewUserGetStartedOutputSchema = z.object({
  welcomeMessage: z
    .string()
    .describe('A personalized welcome message for the new user.'),
  onboardingInstructions:
    z.string().describe('Step-by-step instructions to get started with VetAI.'),
});
export type AIHelpNewUserGetStartedOutput = z.infer<
  typeof AIHelpNewUserGetStartedOutputSchema
>;

export async function aiHelpNewUserGetStarted(
  input: AIHelpNewUserGetStartedInput
): Promise<AIHelpNewUserGetStartedOutput> {
  return aiHelpNewUserGetStartedFlow(input);
}

const aiHelpNewUserGetStartedPrompt = ai.definePrompt({
  name: 'aiHelpNewUserGetStartedPrompt',
  input: {schema: AIHelpNewUserGetStartedInputSchema},
  output: {schema: AIHelpNewUserGetStartedOutputSchema},
  prompt: `You are an AI assistant designed to help new users get started with VetAI, a modern web application for monitoring herd health and behavior.

  Based on the user's role and interests, generate a personalized welcome message and step-by-step onboarding instructions to help them quickly get started and maximize the value of VetAI.

  User Role: {{{userRole}}}
  User Interests: {{{userInterests}}}

  Welcome Message:`, // The onboarding instructions MUST follow after this message.
});

const aiHelpNewUserGetStartedFlow = ai.defineFlow(
  {
    name: 'aiHelpNewUserGetStartedFlow',
    inputSchema: AIHelpNewUserGetStartedInputSchema,
    outputSchema: AIHelpNewUserGetStartedOutputSchema,
  },
  async input => {
    const {output} = await aiHelpNewUserGetStartedPrompt(input);
    return output!;
  }
);
