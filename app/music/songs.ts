export type StreamingLink = {
  name: string;
  url: string;
  logo: string;
  invertOnDark?: boolean;
};

export type Song = {
  slug: string;
  title: string;
  meaning: string;
  status: 'released' | 'upcoming';
  meta: string;
  about: string;
  cover: string;
  spotifyEmbedTrackId?: string;
  streamingLinks?: StreamingLink[];
  hasLyrics?: boolean;
  preSaveUrl?: string;
};

export const songs: Song[] = [
  {
    slug: 'tune-kaha-tha',
    title: 'tune kaha tha',
    meaning: '“you had said”',
    status: 'released',
    meta: 'single',
    cover: '/images/music/cover.png',
    about:
      'a song about the guilt of walking away from someone who asked you to stay. about choosing the easier path and living with the weight of that. the words you couldn\'t say when it mattered, and the ones that keep echoing after.',
    spotifyEmbedTrackId: '5gLRwBPPJHpUFUfvkz2tYC',
    hasLyrics: true,
    streamingLinks: [
      {
        name: 'spotify',
        url: 'https://open.spotify.com/track/5gLRwBPPJHpUFUfvkz2tYC?si=087c42bc912445ab&utm_medium=share&utm_source=linktree',
        logo: '/images/music/logos/spotify.svg',
      },
      {
        name: 'apple music',
        url: 'https://music.apple.com/us/album/tune-kaha-tha/1894374091?i=1894374092',
        logo: '/images/music/logos/apple-music.svg',
      },
      {
        name: 'youtube',
        url: 'https://www.youtube.com/watch?v=8ogwU0Jc1hc',
        logo: '/images/music/logos/youtube.svg',
      },
      {
        name: 'youtube music',
        url: 'https://music.youtube.com/watch?v=8ogwU0Jc1hc&si=ZxK_Ea8-c6K8G5yL',
        logo: '/images/music/logos/youtube-music.svg',
      },
      {
        name: 'amazon music',
        url: 'https://music.amazon.in/albums/B0GX98SW63?do=play&trackAsin=B0GX9K1SL2&ts=1776268616&ref=dm_sh_SDhjamKH5MKfjkWvG1p4ycG2u',
        logo: '/images/music/logos/amazon-music.svg',
      },
      {
        name: 'tidal',
        url: 'https://listen.tidal.com/track/516038524',
        logo: '/images/music/logos/tidal.svg',
        invertOnDark: true,
      },
      {
        name: 'pandora',
        url: 'https://www.pandora.com/TR:202159720',
        logo: '/images/music/logos/pandora.svg',
      },
    ],
  },
  {
    slug: 'ho-jaata-hai',
    title: 'ho jaata hai',
    meaning: '“it just happens”',
    status: 'upcoming',
    meta: 'upcoming single',
    cover: '/images/music/ho-jaata-hai.png',
    about:
      'the other side of tune kaha tha. about the quiet flutter of falling for someone, the way everything slows down and lights up when they\'re around. the words that get stuck, the nervousness of a first meeting, and how your name in their voice changes the whole day.',
    preSaveUrl: 'https://distrokid.com/hyperfollow/avi54/ho-jaata-hai?ref=release',
  },
];

export const songSlugs = songs.map((s) => s.slug);

export const defaultSong =
  songs.find((s) => s.status === 'released') ?? songs[0];

export function getSong(slug: string): Song | undefined {
  return songs.find((s) => s.slug === slug);
}
