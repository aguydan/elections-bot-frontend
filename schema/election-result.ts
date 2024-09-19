import { z } from 'zod';

export const electionResultSchema = z.object({
  id: z.number().int(),
  popular_vote: z.number().int(),
  percentage: z.number().lte(100).positive(),
  seats_won: z.number().int().positive().nullable(),
  swing: z.number().lte(100).positive().nullable(),
  created_at: z.string().datetime(),
  candidate_id: z.number().int(),
  election_id: z.number().int(),
});
