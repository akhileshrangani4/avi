import { userData } from 'lib/data';
import type { Metadata } from 'next';
import { MusicView } from './music-view';
import { defaultSong } from './songs';

export const metadata: Metadata = {
  title: 'Music',
  description: 'music by Akhilesh Rangani (avi)',
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: 'music',
    description: 'songs by avi. listen on spotify, apple music, youtube, and more.',
    url: `${userData.site}/music`,
    siteName: userData.name,
    locale: 'en_US',
    type: 'music.song',
    images: [
      {
        url: `${userData.site}${defaultSong.cover}`,
        width: 1254,
        height: 1254,
      },
    ],
  },
  twitter: {
    title: 'music',
    description: 'songs by avi. listen on spotify, apple music, youtube, and more.',
    card: 'summary_large_image',
    creator: '@akhileshrangani',
  },
};

export default function MusicPage() {
  return <MusicView activeSlug={defaultSong.slug} />;
}
