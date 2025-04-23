function HTMLWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 min-h-screen bg-background-primary dark:bg-background-primary">
        {children}
      </body>
    </html>
  );
}

export default async function NotFound() {
  return (
    <HTMLWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-primary">
            Page not found
          </h2>
          <p className="text-secondary max-w-md">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </div>
    </HTMLWrapper>
  );
}

export const runtime = 'edge';
