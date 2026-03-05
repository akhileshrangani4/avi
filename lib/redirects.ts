export const redirects: Record<string, string | undefined> = {
  resume: process.env.RESUME_URL || '/resume.pdf',
  calendar: process.env.CAL_URL || process.env.NEXT_PUBLIC_CAL_URL,
};

export const redirectMetadata: Record<
  string,
  { title: string; description: string; image?: string }
> = {
  resume: {
    title: 'Resume | Akhilesh Rangani',
    description: 'View my professional resume and work experience.',
    image: '/images/office.png?v=2',
  },
  calendar: {
    title: 'Schedule a Meeting | Akhilesh Rangani',
    description:
      'Book time with me to discuss opportunities, projects, or just to chat.',
    image: '/images/office.png?v=2',
  },
};
