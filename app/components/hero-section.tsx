import { cn } from 'lib/utils';

export interface HeroSectionProps {
  name: string;
  description: string;
  className?: string;
}

export function HeroSection({
  name,
  description,
  className,
}: HeroSectionProps) {
  return (
    <div className={cn('mb-12', className)}>
      <h1 className="text-3xl font-medium mb-3 tracking-tight text-neutral-900 dark:text-neutral-100 animate-enter animate-enter-1">
        {name}
      </h1>
      <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg animate-enter animate-enter-2">
        {description}
      </p>
    </div>
  );
}
