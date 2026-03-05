import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { userData } from 'lib/data';
import { cn } from 'lib/utils';
import type { Metadata } from 'next';
import { Navbar } from './components/nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(userData.site),
  title: {
    default: userData.name,
    template: '%s | ' + userData.name,
  },
  description:
    'Founding Engineer at Tambo AI. Building developer tools, AI systems, and generative UI.',
  alternates: {
    canonical: userData.site,
  },
  openGraph: {
    title: userData.name,
    description:
      'Founding Engineer at Tambo AI. Building developer tools, AI systems, and generative UI.',
    url: userData.site,
    siteName: userData.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: userData.name,
    card: 'summary_large_image',
    creator: '@akhileshrangani',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'){d.classList.add('dark');d.style.colorScheme='dark'}else{d.style.colorScheme='light'}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased max-w-xl mb-40 flex flex-col mx-6 mt-8 md:mt-16 lg:mx-auto bg-white dark:bg-neutral-950 text-black dark:text-white">
        <main className="flex-auto min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
