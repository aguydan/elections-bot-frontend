import { ZodType } from 'zod';

export function validate<T>(
  schema: ZodType<T>,
  data: T,
): { message: string; error: true } | { error: false } {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);

    return {
      message: 'Server-side validation failed',
      error: true,
    };
  }

  return {
    error: false,
  };
}
