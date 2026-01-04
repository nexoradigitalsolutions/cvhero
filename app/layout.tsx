import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
  description: 'Create a professional CV online for free without signup. Build, customize, and download your CV as PDF in minutes with our AI-powered CV builder.',
  manifest: '/manifest.json',
  icons: {
    icon: '🚀',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CVHero',
  },
  keywords: [
    'free cv creator',
    'cv builder online',
    'ai cv builder',
    'resume maker',
    'create cv online',
  ],
  openGraph: {
    type: 'website',
    url: 'https://freecvhero.vercel.app',
    title: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
    description: 'Create a professional CV online for free without signup. Build, customize, and download your CV as PDF in minutes with our AI-powered CV builder.',
    siteName: 'CVHero',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e293b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CV Hero" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
