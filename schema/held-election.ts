import { z } from 'zod';
import { electionResultSchema } from './election-result';

export const heldElectionSchema = z.object({
  id: z.number().int(),
  created_at: z.string().datetime(),
  election_id: z.number().int(),
  type: z.literal('presidential').or(z.literal('general')),
  country: z.string().trim().min(1).max(100),
  election_name: z.string().trim().min(1).max(100),
  date: z.string().trim().nullable().or(z.literal('')),
  flag_url: z.string().nullable(),
  results: z.array(electionResultSchema),
});
