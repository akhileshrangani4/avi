import { cn } from 'lib/utils';

export interface Project {
  title: string;
  description: string;
  url: string;
}

export interface ProjectsSectionProps {
  title?: string;
  projects?: Project[];
  className?: string;
}

export function ProjectsSection({
  title = 'projects',
  projects = [],
  className,
}: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className={cn('mb-12 animate-enter animate-enter-5', className)}>
      <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        {title}
      </h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block -mx-3 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[15px] text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                {project.title}
              </span>
              <span className="text-xs text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-400 dark:group-hover:text-neutral-500 shrink-0">
                &#8599;
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-0.5 leading-relaxed">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
