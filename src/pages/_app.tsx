import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../hooks/useTheme";
import Layout from "../components/Layout";
import SmoothScroll from "../components/SmoothScroll";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <SmoothScroll>
          <div className={`${inter.variable} font-sans`}>
            <Layout>
              <Analytics />
              <Component {...pageProps} />
            </Layout>
          </div>
        </SmoothScroll>
      </ThemeProvider>
    </SessionProvider>
  );
}
