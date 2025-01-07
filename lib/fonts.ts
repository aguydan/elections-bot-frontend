import { Inter, Raleway } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['cyrillic', 'latin'],
  fallback: ['sans-serif'],
});
export const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  fallback: ['sans-serif'],
});
