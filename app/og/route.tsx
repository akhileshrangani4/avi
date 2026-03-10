import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'avi.mn';
  const summary = searchParams.get('summary') || '';

  const [fontRegular, fontMedium] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf'
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf'
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          backgroundColor: '#fafafa',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0a0a0a',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          {summary && (
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                color: '#666',
                maxWidth: '900px',
              }}
            >
              {summary.length > 120 ? summary.slice(0, 120) + '...' : summary}
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <img
              src="https://avi.mn/images/home/me.jpg"
              width="52"
              height="52"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                fontSize: 26,
                color: '#0a0a0a',
                fontWeight: 500,
              }}
            >
              Akhilesh Rangani
            </div>
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#999',
            }}
          >
            avi.mn
          </div>
        </div>
      </div>
    ),
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
          data: fontMedium,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
