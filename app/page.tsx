import { ConnectSection } from 'app/components/connect-section';
import { Badge, CurrentWorkSection } from 'app/components/current-work-section';
import { HeroSection } from 'app/components/hero-section';
import { PhotoGridSection } from 'app/components/photo-grid-section';
import { ProjectsSection } from 'app/components/projects-section';
import { WritingSection } from 'app/components/writing-section';
import { getBlogPosts } from 'app/db/blog';
import { latestRelease } from 'app/music/songs';
import { userData } from 'lib/data';
import Image from 'next/image';
import Link from 'next/link';
import me from 'public/images/home/me.jpg';
import me2 from 'public/images/home/me2.jpg';
import me3 from 'public/images/home/me3.jpg';

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  const allBlogs = getBlogPosts();
  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const heroData = {
    name: "hey, i'm avi.",
    description:
      "software engineer and musician in san francisco. i build developer tools, AI systems, and things that ship. i also write and produce music.",
  };

  const photoData = [
    { src: me.src, alt: 'Me' },
    { src: me3.src, alt: 'University' },
    { src: me2.src, alt: 'Washington DC' },
  ];

  const workData = [
    <p key="tambo">
      founding engineer at{' '}
      <Badge href="https://tambo.co" underline={true}>
        tambo ai
      </Badge>
      , building the generative ui sdk for react.
    </p>,
    <p key="gwu">
      research at{' '}
      <Badge href="https://gwdhi.org/" underline={true}>
        gw digital humanities institute
      </Badge>
      . built{' '}
      <Badge href="https://www.teachanything.ai/" underline={true}>
        teach anything
      </Badge>{' '}
      with{' '}
      <Badge href="https://ajoubin.org" underline={true}>
        prof. alexa alice joubin
      </Badge>
      .
    </p>,
    <p key="education">
      ms computer science,{' '}
      <Badge href="https://www.gwu.edu/" underline={true}>
        george washington university
      </Badge>
      .
    </p>,
  ];

  const projectsData = [
    {
      title: 'teach anything',
      description:
        'open-source ai chatbots for education. used by 250+ professors worldwide. featured in the new york times.',
      url: 'https://www.teachanything.ai/',
    },
    {
      title: 'gitwit sandbox',
      description:
        'open-source cloud ide with ai copilot, live preview, and real-time collaboration.',
      url: 'https://sandbox.gitwit.dev/',
    },
    {
      title: 'the standup app',
      description:
        'ai-powered team dashboard. ask questions in plain english, get interactive components from linear and github.',
      url: 'https://github.com/tambo-ai/thestandupapp',
    },
    {
      title: 'nova explorer',
      description:
        'ai space exploration game with voice controls, procedural galaxy generation, and generative ui.',
      url: 'https://github.com/akhileshrangani4/nova-explorer',
    },
  ];

  const writingData = sortedBlogs.map(blog => ({
    title: blog.metadata.title,
    summary: blog.metadata.summary,
    slug: blog.slug,
    publishedAt: blog.metadata.publishedAt,
  }));

  const connectData = [
    { name: 'twitter', url: userData.twitter, external: true },
    { name: 'linkedin', url: userData.linkedin, external: true },
    { name: 'github', url: userData.github, external: true },
    { name: 'email', url: `mailto:${userData.email}`, external: true },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: userData.name,
            url: userData.site,
            jobTitle: 'Founding Engineer',
            worksFor: {
              '@type': 'Organization',
              name: 'Tambo AI',
              url: 'https://tambo.co',
            },
            sameAs: [
              userData.twitter,
              userData.linkedin,
              userData.github,
            ],
          }),
        }}
      />
      <HeroSection {...heroData} />
      <PhotoGridSection photos={photoData} />
      <CurrentWorkSection title="now" workItems={workData} />
      <WritingSection posts={writingData} maxPosts={3} />
      <ProjectsSection projects={projectsData} />

      {/* latest release */}
      <div className="mb-12 animate-enter animate-enter-5">
        <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          latest release
        </h2>
        <Link
          href={`/music/${latestRelease.slug}`}
          className="flex items-center gap-4 group"
        >
          <Image
            src={latestRelease.cover}
            alt={`${latestRelease.title} cover art`}
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-[3px] decoration-[0.5px]">
              {latestRelease.title}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {latestRelease.meta} &middot; 2026
            </p>
          </div>
        </Link>
      </div>

      <div className="mb-12 animate-enter animate-enter-6">
        <h2 className="text-xs font-medium mb-4 text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          connect
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          {userData.name} &middot; {userData.email}
        </p>
        <div className="flex gap-5">
          {connectData.map((link, index) => (
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
    </section>
  );
}
