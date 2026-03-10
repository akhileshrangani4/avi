import { userData } from 'lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View my professional resume and work experience.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume | Akhilesh Rangani',
    description: 'View my professional resume and work experience.',
    url: `${userData.site}/resume`,
    siteName: userData.name,
    images: [
      {
        url: `${userData.site}/images/office.png?v=2`,
        width: 2816,
        height: 1536,
        alt: 'Resume | Akhilesh Rangani',
        type: 'image/png',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Akhilesh Rangani',
    description: 'View my professional resume and work experience.',
    creator: '@akhileshrangani',
    images: [`${userData.site}/images/office.png?v=2`],
  },
};

export default function ResumePage() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium tracking-tight">resume</h1>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          download pdf
        </a>
      </div>
      <div className="w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
        <iframe
          src="/api/resume"
          className="w-full"
          style={{ height: '80vh' }}
          title="Resume"
        />
      </div>
    </section>
  );
}
