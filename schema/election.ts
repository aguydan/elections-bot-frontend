import { z } from 'zod';

export const electionSchema = z.object({
  id: z.number().int().optional(), //do I even need ids that I never send???
  type: z
    .literal('presidential')
    .or(z.literal('general'))
    .default('presidential'),
  country: z
    .string()
    .trim()
    .min(1, { message: 'Country is required' })
    .max(100),
  name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  date: z.string().trim().nullable().or(z.literal('')),
  electorate: z
    .number({ message: 'Number of possible voters is required' })
    .positive({ message: 'Nonpositive numbers are not allowed' })
    .int({ message: 'Floating point numbers are not allowed' }),
  turnout: z
    .number()
    .positive({ message: 'Nonpositive numbers are not allowed' })
    .lte(100)
    .nullable(),
  flag_url: z.string().nullable(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().nullish(),
});
