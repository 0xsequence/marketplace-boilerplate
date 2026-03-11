import { type NextRequest, NextResponse } from 'next/server';

export function addPathnameToHeadersMiddleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const headers = new Headers(req.headers);
  headers.set('x-pathname', pathname);

  return NextResponse.next({
    headers,
  });
}
