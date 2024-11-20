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
  type: z.literal('presidential').or(z.literal('general')),
  country: z.string().trim().min(1).max(100),
  election_name: z.string().trim().min(1).max(100),
  date: z.string().trim().nullable().or(z.literal('')),
  candidate_name: z.string().trim().min(1).max(100),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  party: z.string().trim().nullable().or(z.literal('')),
});
