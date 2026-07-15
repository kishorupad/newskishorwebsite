import { z } from 'zod';
import { publicProcedure, router, rateLimitedProcedure } from '../_core/trpc';
import { invokeLLM } from '../_core/llm';

const SYSTEM_PROMPT = `You are Kishor Upadhyaya's AI assistant, representing a professional IT account recovery expert with 7+ years of experience. 

Your expertise includes:
- Facebook, Instagram, and YouTube account recovery
- Cybersecurity and account security issues
- Social media platform support and troubleshooting
- Data privacy and encryption
- Account verification and authentication

Key Facts About Kishor:
- 500+ successful account recoveries
- 98% success rate
- 7+ years of professional experience
- 24-hour average response time
- Specializes in hacked/compromised accounts
- Offers money-back guarantee
- Maintains strict confidentiality
- Transparent pricing model

When answering questions:
1. Be professional, warm, and helpful
2. Provide specific, actionable information
3. If you don't know something, suggest contacting Kishor directly
4. Always mention the 2-4 hour response time guarantee
5. Encourage visitors to use the contact form or WhatsApp for urgent matters
6. Be honest about what can and cannot be recovered
7. Emphasize security and data privacy

Common Services:
- Facebook Recovery: Recover hacked or compromised Facebook accounts
- Instagram Recovery: Restore access to Instagram accounts
- YouTube Recovery: Recover YouTube channel access
- Social Media Support: General social media account issues
- Security Consultation: Prevent future account compromises
- Account Investigation: Investigate suspicious account activity

Pricing: Only charged after successful recovery (money-back guarantee)
Response Time: Usually responds within 2-4 hours
Contact: WhatsApp, Live Chat, or Contact Form`;

export const chatRouter = router({
  generateResponse: rateLimitedProcedure
    .input(
      z.object({
        message: z.string().min(1).max(1000),
        conversationHistory: z
          .array(
            z.object({
              role: z.enum(['user', 'assistant']),
              content: z.string(),
            })
          )
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Build messages for LLM
        const messages = [
          { role: 'system' as const, content: SYSTEM_PROMPT },
          ...input.conversationHistory.map((msg) => ({
            role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
            content: msg.content,
          })),
          { role: 'user' as const, content: input.message },
        ];

        // Call LLM
        const response = await invokeLLM({
          messages,
        });

        const assistantMessage = response.choices[0]?.message?.content || '';

        return {
          success: true,
          response: assistantMessage,
          error: null,
        };
      } catch (error) {
        console.error('LLM Error:', error);
        return {
          success: false,
          response: '',
          error: 'Unable to process your question at the moment. Please try again or contact Kishor directly via WhatsApp.',
        };
      }
    }),
});

export type ChatRouter = typeof chatRouter;
