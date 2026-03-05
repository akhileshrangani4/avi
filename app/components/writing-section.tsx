import { cn } from 'lib/utils';

export interface BlogPost {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
}

export interface WritingSectionProps {
  title?: string;
  posts: BlogPost[];
  className?: string;
  showAll?: boolean;
  maxPosts?: number;
}

export function WritingSection({
  title = 'writing',
  posts,
  className,
  showAll = false,
  maxPosts = 3,
}: WritingSectionProps) {
  const displayPosts = showAll ? posts : posts.slice(0, maxPosts);

  return (
    <div className={cn('mb-12 animate-enter animate-enter-5', className)}>
      <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        {title}
      </h2>
      <div className="space-y-3">
        {displayPosts.map((post, index) => (
          <a
            key={index}
            href={`/blog/${post.slug}`}
            className="group block -mx-3 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
              <span className="text-[15px] text-neutral-900 dark:text-neutral-100">
                {post.title}
              </span>
              <span className="text-xs text-neutral-300 dark:text-neutral-700 tabular-nums shrink-0">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-0.5">
              {post.summary}
            </p>
          </a>
        ))}
      </div>
      {!showAll && posts.length > maxPosts && (
        <a
          href="/blog"
          className="inline-block mt-4 text-sm text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
        >
          all posts &#8599;
        </a>
      )}
    </div>
  );
}
