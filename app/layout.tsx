import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import theme from '../lib/theme';
import { raleway } from '@/lib/fonts';
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
    <html lang="en" className={`${raleway.className}`}>
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
