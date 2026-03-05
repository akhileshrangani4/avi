import { RedirectPage } from 'app/components/redirect-page';
import { userData } from 'lib/data';
import { redirectMetadata, redirects } from 'lib/redirects';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const metadata = redirectMetadata[page];

  if (!metadata) {
    return {
      title: 'Not Found',
    };
  }

  const url = `${userData.site}/${page}`;

  // Convert relative image paths to absolute URLs for Open Graph
  const imageUrl = metadata.image
    ? metadata.image.startsWith('http')
      ? metadata.image
      : `${userData.site}${metadata.image}`
    : undefined;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url,
      siteName: userData.name,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 2816,
              height: 1536,
              alt: metadata.title,
              type: 'image/png',
            },
          ]
        : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@akhileshrangani',
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(redirects)
    .filter(key => redirects[key])
    .map(page => ({ page }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const redirectUrl = redirects[page];

  if (!redirectUrl) {
    notFound();
  }

  return <RedirectPage url={redirectUrl} />;
}
