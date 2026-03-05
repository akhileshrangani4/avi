import { cn } from 'lib/utils';

export interface SocialLink {
  name: string;
  url: string;
  external?: boolean;
}

export interface ConnectSectionProps {
  title?: string;
  links: SocialLink[];
  className?: string;
}

export function ConnectSection({
  title = 'connect',
  links,
  className,
}: ConnectSectionProps) {
  return (
    <div className={cn('mb-12 animate-enter animate-enter-6', className)}>
      <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        {title}
      </h2>
      <div className="flex gap-5">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            {...(link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-200 dark:decoration-neutral-800 underline-offset-[3px] decoration-[0.5px] hover:decoration-neutral-500 dark:hover:decoration-neutral-400"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
