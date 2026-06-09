import { userData } from 'lib/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MusicView } from '../music-view';
import { getSong, songSlugs } from '../songs';

export function generateStaticParams() {
  return songSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) return {};

  const description =
    song.status === 'upcoming'
      ? `${song.meaning} — an upcoming single by avi. pre-save it now.`
      : `${song.meaning} — a single by avi. listen on spotify, apple music, youtube, and more.`;
  const url = `${userData.site}/music/${song.slug}`;

  return {
    title: song.title,
    description,
    alternates: { canonical: `/music/${song.slug}` },
    openGraph: {
      title: song.title,
      description,
      url,
      siteName: userData.name,
      locale: 'en_US',
      type: 'music.song',
      images: [
        {
          url: `${userData.site}${song.cover}`,
          width: 1254,
          height: 1254,
          alt: `${song.title} cover art`,
        },
      ],
    },
    twitter: {
      title: song.title,
      description,
      card: 'summary_large_image',
      creator: '@akhileshrangani',
    },
  };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) notFound();

  return <MusicView activeSlug={song.slug} />;
}
