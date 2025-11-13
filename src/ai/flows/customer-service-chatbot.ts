'use server';

/**
 * @fileOverview Customer service chatbot flow that answers user questions and escalates to a human representative if needed.
 *
 * - customerServiceChatbot - A function that handles the chatbot conversation.
 * - CustomerServiceChatbotInput - The input type for the customerServiceChatbot function.
 * - CustomerServiceChatbotOutput - The return type for the customerServiceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerServiceChatbotInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type CustomerServiceChatbotInput = z.infer<typeof CustomerServiceChatbotInputSchema>;

const CustomerServiceChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
  escalate: z.boolean().describe('Whether to escalate the query to a human representative.'),
});
export type CustomerServiceChatbotOutput = z.infer<typeof CustomerServiceChatbotOutputSchema>;

export async function customerServiceChatbot(input: CustomerServiceChatbotInput): Promise<CustomerServiceChatbotOutput> {
  return customerServiceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerServiceChatbotPrompt',
  input: {schema: CustomerServiceChatbotInputSchema},
  output: {schema: CustomerServiceChatbotOutputSchema},
  prompt: `You are a customer service chatbot for Strapy Africa, an online store.

  Answer the user's query based on the following FAQs.

  FAQs:
  - What payment methods do you accept? We accept MPesa, Airtel Money, and card payments.
  - What is your return policy? We offer a 30-day return policy.
  - How long does shipping take? Shipping usually takes 3-5 business days.

  If the query is not related to the FAQs, or if you are unsure of the answer, set escalate to true.

  Query: {{{query}}}
`,
});

const customerServiceChatbotFlow = ai.defineFlow(
  {
    name: 'customerServiceChatbotFlow',
    inputSchema: CustomerServiceChatbotInputSchema,
    outputSchema: CustomerServiceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
