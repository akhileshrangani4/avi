import { userData } from 'lib/data';

export interface BlogPostStructuredDataProps {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  slug: string;
  keywords?: string;
  wordCount?: number;
  authorName?: string;
  baseUrl?: string;
}

export function BlogPostStructuredData({
  title,
  publishedAt,
  summary,
  image,
  slug,
  keywords,
  wordCount,
  authorName = userData.name,
  baseUrl = userData.site,
}: BlogPostStructuredDataProps) {
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/og?title=${title}`;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          datePublished: publishedAt,
          dateModified: publishedAt,
          description: summary,
          image: ogImage,
          url: `${baseUrl}/blog/${slug}`,
          ...(keywords && { keywords: keywords.split(', ') }),
          ...(wordCount && { wordCount }),
          author: {
            '@type': 'Person',
            name: authorName,
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: authorName,
            url: baseUrl,
          },
        }),
      }}
    />
  );
}
