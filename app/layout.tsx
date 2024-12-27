import type { Metadata } from 'next';
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import theme from '../lib/theme';
import { inter, raleway } from '@/lib/fonts';
import Header from '@/components/ui/header';

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
          <Header />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
