import type { Metadata } from 'next';
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import theme from '../lib/theme';
import { inter, raleway } from '@/lib/fonts';
import Header from '@/components/ui/header';
import ToastProvider from '@/components/providers/toast-provider';

export const metadata: Metadata = {
  title: 'Elections Bot Forms',
  description: 'A frontend app for the Elections Bot',
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
