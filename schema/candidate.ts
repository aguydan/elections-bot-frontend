import { z } from 'zod';

export const candidateSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: 'Invalid hex color' }),
  origin: z.string().trim().nullable().or(z.literal('')),
  running_mate: z.string().trim().nullable().or(z.literal('')),
  party: z.string().trim().nullable().or(z.literal('')),
  image_url: z.string().nullable(),
  score: z.record(z.string(), z.number().lte(1)),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().nullish(),
});
