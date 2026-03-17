import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const DEFAULT_SUMMARY =
  'software engineer in san francisco. founding engineer at tambo, building developer tools, AI systems, and generative ui.';

const DEFAULT_TAGS = ['react', 'typescript', 'ai', 'open source', 'dev tools'];

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const title = searchParams.get('title') || 'avi.mn';
  const summary = searchParams.get('summary') || '';
  const keywords = searchParams.get('keywords') || '';
  const displaySummary = summary || DEFAULT_SUMMARY;
  const tags = keywords
    ? keywords.split(',').map(k => k.trim()).slice(0, 5)
    : DEFAULT_TAGS;

  const [fontRegular, fontBold] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf'
    ).then(res => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf'
    ).then(res => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter',
        position: 'relative',
      }}
    >
      {/* Main content area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          padding: '60px 70px 30px',
        }}
      >
        {/* Left side: title + description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingRight: '50px',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#0d1117',
              marginBottom: '24px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: '#656d76',
              maxWidth: '750px',
            }}
          >
            {displaySummary.length > 140
              ? displaySummary.slice(0, 140) + '...'
              : displaySummary}
          </div>
        </div>

        {/* Right side: profile photo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            width: '280px',
            flexShrink: 0,
          }}
        >
          <img
            src={`${origin}/images/home/me4.png`}
            width="260"
            height="260"
            style={{
              borderRadius: '16px',
              objectFit: 'cover',
              border: '1px solid #d0d7de',
            }}
          />
        </div>
      </div>

      {/* Bottom section: tags + branding */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 70px 45px',
        }}
      >
        {/* Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {tags.map(tag => (
            <div
              key={tag}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 20,
                color: '#0969da',
                backgroundColor: '#ddf4ff',
                padding: '6px 16px',
                borderRadius: '20px',
                fontWeight: 400,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 24,
          }}
        >
          <span style={{ color: '#0d1117', fontWeight: 700 }}>avi</span>
          <span style={{ color: '#656d76' }}>/</span>
          <span style={{ color: '#0d1117' }}>avi.mn</span>
        </div>
      </div>

      {/* Bottom colored bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '8px',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        <div style={{ flex: 3, backgroundColor: '#3b82f6' }} />
        <div style={{ flex: 1, backgroundColor: '#f97316' }} />
        <div style={{ flex: 1, backgroundColor: '#22c55e' }} />
      </div>

      {/* Subtle border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '1px solid #d0d7de',
          display: 'flex',
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
