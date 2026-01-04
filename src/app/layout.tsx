import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
  description: 'Create a professional CV online for free without signup. Build, customize, and download your CV as PDF in minutes with our AI-powered CV builder.',
  keywords: [
    'free cv creator',
    'cv builder online',
    'no signup required',
    'free resume maker',
    'professional cv template',
    'create cv online',
    'resume builder',
    'free resume creator',
    'cv generator',
    'online resume maker',
    'cv template',
    'resume template',
    'cv maker no signup',
    'free cv generator',
    'professional resume',
  ],
  authors: [{ name: 'CV Hero' }],
  creator: 'CV Hero',
  publisher: 'CV Hero',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://freecvhero.vercel.app',
    title: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
    description: 'Create a professional CV online for free without signup. Build, customize, and download your CV as PDF in minutes with our AI-powered CV builder.',
    siteName: 'CVHero',
    images: [
      {
        url: 'https://freecvhero.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CV Hero - Free CV Creator',
        type: 'image/png',
      },
      {
        url: 'https://freecvhero.vercel.app/og-image-square.png',
        width: 800,
        height: 800,
        alt: 'CV Hero - Free CV Creator',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
    description: 'Create a professional CV online for free without signup. Build, customize, and download your CV as PDF in minutes.',
    images: ['https://freecvhero.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://freecvhero.vercel.app'),
  alternates: {
    canonical: 'https://freecvhero.vercel.app',
  },
  icons: {
    icon: '🚀',
  },
  category: 'Career Tools',
  applicationName: 'CVHero - Free AI-Powered CV Builder | Create Your CV Online',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CVHero - Free AI-Powered CV Builder',
  description: 'Create professional CVs online for free without signup. Build, customize, and download your CV as PDF in minutes.',
  url: 'https://freecvhero.vercel.app',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  operatingSystem: 'Web Browser',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2500',
  },
  author: {
    '@type': 'Organization',
    name: 'CV Hero',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
