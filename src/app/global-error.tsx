'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'black',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              gap: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '42rem',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                fontSize: '3.75rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              500
            </h1>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'white',
              }}
            >
              Something went wrong!
            </h2>
            <p
              style={{ color: '#9CA3AF', maxWidth: '28rem', margin: '0 auto' }}
            >
              We apologize for the inconvenience. Please try again later.
            </p>
            <div
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '0.5rem',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  color: 'rgb(239, 68, 68)',
                  wordBreak: 'break-word',
                }}
              >
                {error.message}
              </p>
              {error.stack && (
                <pre
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: 'rgba(239, 68, 68, 0.8)',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {error.stack}
                </pre>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <button
                  onClick={reset}
                  style={{
                    marginTop: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: 'hsl(0 84% 60%)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 150ms ease-in-out',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(0 84% 50%)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(0 84% 60%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg
                    style={{
                      width: '1rem',
                      height: '1rem',
                      marginRight: '0.5rem',
                      transition: 'transform 150ms ease-in-out',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export const runtime = 'edge';
