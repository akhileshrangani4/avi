import { ConnectSection } from 'app/components/connect-section';
import { Badge, CurrentWorkSection } from 'app/components/current-work-section';
import { HeroSection } from 'app/components/hero-section';
import { PhotoGridSection } from 'app/components/photo-grid-section';
import { ProjectsSection } from 'app/components/projects-section';
import { WritingSection } from 'app/components/writing-section';
import { getBlogPosts } from 'app/db/blog';
import { userData } from 'lib/data';
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
      "software engineer in san francisco. i build developer tools, AI systems, and things that ship. founding engineer at tambo, previously research at gwu.",
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
      <Badge href="https://aialexa.org" underline={true}>
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
      <ConnectSection links={connectData} />
    </section>
  );
}
