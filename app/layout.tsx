import type { Metadata } from 'next';
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import theme from '../styles/theme';
import { inter, raleway } from '@/styles/fonts';
import Header from '@/components/ui/header';
import ToastProvider from '@/components/providers/toast-provider';

import '@mantine/core/styles.css';

/* Overwrites some of the Mantine styles */
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Elections Bot',
  description: 'Web app for a Discord bot made for election simulation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.className} ${inter.className}`}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <ToastProvider>
            <Header />
            <main>
              <Box mt={{ base: '2rem', sm: '3rem' }}>{children}</Box>
            </main>
          </ToastProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
