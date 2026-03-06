import { addPathnameToHeadersMiddleware } from './middleware/add-pathname-to-headers';
import { authMiddleware } from './middleware/auth';
import { redirectMarketplace } from './middleware/redirect';
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const addPathnameResult = addPathnameToHeadersMiddleware(req);

  if (addPathnameResult) {
    NextResponse.next();
  }

  const authResult = authMiddleware(req);

  if (authResult) {
    NextResponse.next();
  }

  const redirectResult = redirectMarketplace(req);

  if (redirectResult) {
    NextResponse.next();
  }

  return redirectResult;
}
