import { userData } from 'lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Lyrics } from './lyrics';
import { songs, type Song } from './songs';

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
    />
  </svg>
);

function SongPicker({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-12 animate-enter animate-enter-2">
      {songs.map((song) => {
        const active = song.slug === activeSlug;
        return (
          <Link
            key={song.slug}
            href={`/music/${song.slug}`}
            aria-current={active ? 'page' : undefined}
            scroll={false}
            className={`group flex items-center gap-3 p-2 pr-4 rounded-xl border transition-colors duration-150 ${
              active
                ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50'
                : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
            }`}
          >
            <Image
              src={song.cover}
              alt={`${song.title} cover art`}
              width={48}
              height={48}
              className={`rounded-lg w-12 h-12 object-cover transition-opacity duration-150 ${
                active ? '' : 'opacity-75 group-hover:opacity-100'
              }`}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {song.title}
              </p>
              <span className="flex items-center gap-1.5 mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    song.status === 'released'
                      ? 'bg-emerald-500'
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
                {song.status === 'released' ? 'released' : 'coming soon'}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function SongHero({ song }: { song: Song }) {
  return (
    <div className="flex gap-5 sm:gap-7 items-start mb-10">
      <Image
        src={song.cover}
        alt={`${song.title} cover art`}
        width={160}
        height={160}
        priority
        className="rounded-2xl w-28 h-28 sm:w-40 sm:h-40 object-cover shrink-0 ring-1 ring-neutral-200/80 dark:ring-neutral-800 shadow-sm"
      />
      <div className="min-w-0 pt-0.5">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          {song.meta}
        </p>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mt-1.5 leading-tight">
          {song.title}
        </h2>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
          {song.meaning}
        </p>

        {song.status === 'upcoming' && song.preSaveUrl && (
          <a
            href={song.preSaveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-sm font-medium text-neutral-50 dark:text-neutral-900 hover:opacity-90 transition-opacity duration-150"
          >
            pre-save
            <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

function StreamingChips({ song }: { song: Song }) {
  if (!song.streamingLinks?.length) return null;
  return (
    <div className="mt-12">
      <h3 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        listen on
      </h3>
      <div className="flex flex-wrap gap-2">
        {song.streamingLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-150"
          >
            <Image
              src={link.logo}
              alt=""
              width={16}
              height={16}
              className={link.invertOnDark ? 'dark:invert' : ''}
            />
            <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function SongDetail({ song }: { song: Song }) {
  return (
    <div className="animate-enter animate-enter-3">
      <SongHero song={song} />

      <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
        {song.about}
      </p>

      {song.spotifyEmbedTrackId && (
        <div className="mt-8">
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotifyEmbedTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
      )}

      {song.youtubeVideoId && (
        <div className="mt-12">
          <h3 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            video song
          </h3>
          <div className="relative w-full aspect-video overflow-hidden rounded-xl ring-1 ring-neutral-200/80 dark:ring-neutral-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${song.youtubeVideoId}`}
              title={`${song.title} video song`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      )}

      <StreamingChips song={song} />

      {song.hasLyrics && (
        <div className="mt-12">
          <Lyrics slug={song.slug} />
        </div>
      )}
    </div>
  );
}

export function MusicView({ activeSlug }: { activeSlug: string }) {
  const active = songs.find((s) => s.slug === activeSlug) ?? songs[0];

  return (
    <section>
      <div className="mb-10 animate-enter animate-enter-1">
        <h1 className="text-3xl font-medium mb-3 tracking-tight text-neutral-900 dark:text-neutral-100">
          music
        </h1>
        <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
          i started writing music as a way to process things i couldn't say out loud. sometimes code isn't the right language for what you're feeling.
        </p>
      </div>

      <SongPicker activeSlug={active.slug} />

      <SongDetail song={active} />

      <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-900 animate-enter animate-enter-6">
        <h3 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          artist
        </h3>
        <p className="text-sm text-neutral-900 dark:text-neutral-100">
          {userData.name}
        </p>
        <a
          href={`mailto:${userData.email}`}
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-200 dark:decoration-neutral-800 underline-offset-[3px] decoration-[0.5px] hover:decoration-neutral-500 dark:hover:decoration-neutral-400"
        >
          {userData.email}
        </a>
      </div>
    </section>
  );
}
