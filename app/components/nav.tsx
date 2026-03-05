'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { name: 'blog', path: '/blog' },
  { name: 'guestbook', path: '/guestbook' },
  { name: 'resume', path: '/resume' },
  { name: 'calendar', path: '/calendar' },
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums font-mono">
      {time} <span className="text-neutral-300 dark:text-neutral-600">PT</span>
    </span>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    setDark(stored === 'dark');
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const el = document.documentElement;
    el.classList.toggle('dark', next);
    el.style.colorScheme = next ? 'dark' : 'light';
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) return <div className="w-4 h-4" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 p-0.5"
    >
      {dark ? (
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
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
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
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export function Navbar() {
  return (
    <nav className="mb-12 md:mb-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-neutral-900 dark:text-neutral-100 font-medium tracking-tight"
        >
          avi
        </Link>
        <div className="flex items-center gap-4 sm:hidden">
          <LiveClock />
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center justify-between sm:gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          {links.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className="text-sm text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden sm:flex sm:items-center sm:gap-5">
          <LiveClock />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
