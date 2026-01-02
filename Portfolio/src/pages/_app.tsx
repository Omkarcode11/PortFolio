import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../hooks/useTheme';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta',
  display: 'swap',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <div className={`${outfit.variable} ${plusJakarta.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
