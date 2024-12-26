import { z } from 'zod';
import { candidateSchema } from '@/schema/candidate';
import { electionSchema } from '@/schema/election';
import { heldElectionSchema } from '@/schema/held-election';
import { electionResultSchema } from '@/schema/election-result';

export type Candidate = z.infer<typeof candidateSchema>;
export type Election = z.infer<typeof electionSchema>;
export type HeldElection = z.infer<typeof heldElectionSchema>;
export type ElectionResult = z.infer<typeof electionResultSchema>;
