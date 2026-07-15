import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required').max(100),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(1, 'Phone is required').max(20),
        platform: z.enum(['facebook', 'instagram', 'youtube', 'other']),
        message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
      })
    )
    .mutation(async ({ input }) => {
      // Log the submission for now; integrate with email/DB later
      console.log('[Contact] New submission:', {
        name: input.name,
        email: input.email,
        phone: input.phone,
        platform: input.platform,
        messageLength: input.message.length,
        timestamp: new Date().toISOString(),
      });

      return {
        success: true,
        message: 'Your request has been submitted. We will contact you within 2-4 hours.',
      };
    }),
});

export type ContactRouter = typeof contactRouter;
