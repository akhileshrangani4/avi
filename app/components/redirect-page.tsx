'use client';

import { useEffect } from 'react';

export function RedirectPage({ url }: { url: string }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-pulse mb-4">
          <svg
            className="w-8 h-8 text-neutral-600 dark:text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">Redirecting...</p>
      </div>
    </section>
  );
}
