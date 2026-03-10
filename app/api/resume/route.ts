import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  const pdf = await readFile(join(process.cwd(), 'public', 'resume.pdf'));

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  });
}
