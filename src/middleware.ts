import { addPathnameToHeadersMiddleware } from './middleware/add-pathname-to-headers';
import { redirectMarketplace } from './middleware/redirect';
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const addPathnameResult = addPathnameToHeadersMiddleware(req);

  if (addPathnameResult) {
    NextResponse.next();
  }

  const redirectResult = redirectMarketplace(req);

  if (redirectResult) {
    NextResponse.next();
  }

  return redirectResult;
}
