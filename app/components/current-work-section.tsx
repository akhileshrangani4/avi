'use client';

import { cn } from 'lib/utils';
import React from 'react';

export type CurrentWorkSectionProps = {
  title?: string;
  workItems?: React.ReactElement[];
  className?: string;
};

function Badge({
  href,
  children,
  underline = false,
}: {
  href: string;
  children: React.ReactNode;
  underline?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center',
        underline
          ? 'underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-[3px] decoration-[0.5px] hover:decoration-neutral-800 dark:hover:decoration-neutral-200'
          : '',
        'text-neutral-900 dark:text-neutral-100'
      )}
    >
      {children}
    </a>
  );
}

export function CurrentWorkSection({
  title = 'now',
  workItems = [],
  className,
}: CurrentWorkSectionProps) {
  if (workItems.length === 0) {
    return null;
  }

  return (
    <div className={cn('mb-12 animate-enter animate-enter-4', className)}>
      <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        {title}
      </h2>
      <div className="space-y-3 text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {workItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export { Badge };
