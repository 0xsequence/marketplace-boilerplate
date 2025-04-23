import { getChain } from '~/lib/utils';

import { type NextRequest, NextResponse } from 'next/server';

export function redirectMarketplace(req: NextRequest) {
  const url = req.nextUrl;

  //Redirect marketplace v1 paths
  if (
    url.pathname.startsWith('/collection/') ||
    url.pathname.startsWith('/collectable/')
  ) {
    const pathParts = url.pathname.split('/');

    // Handle collection paths: /collection/{chainNameOrId}/{collectionAddress} -> /{chainId}/{collectionAddress}
    if (url.pathname.startsWith('/collection/') && pathParts.length >= 3) {
      const chainNameOrId = pathParts[2];
      const collectionAddress = pathParts[3] || '';

      // Check if chainNameOrId exists
      if (!chainNameOrId) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Validate the chain parameter using getChain
      const chain = getChain(chainNameOrId);
      if (!chain) {
        // If chain is invalid, fallback to homepage
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Use validated chainId in the redirect
      return NextResponse.redirect(
        new URL(`/${chain.chainId}/${collectionAddress}`, req.url),
      );
    }

    // Handle collectable paths: /collectable/amm|p2p/{chainNameOrId}/{collectionAddress}/{tokenId} -> /{chainId}/{collectionAddress}/{tokenId}
    if (url.pathname.startsWith('/collectable/') && pathParts.length >= 4) {
      const chainNameOrId = pathParts[3];
      const collectionAddress = pathParts[4];
      const tokenId = pathParts[5] || '';

      // Check if chainNameOrId exists
      if (!chainNameOrId) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Validate the chain parameter using getChain
      const chain = getChain(chainNameOrId);
      if (!chain) {
        // If chain is invalid, fallback to homepage
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Use validated chainId in the redirect
      return NextResponse.redirect(
        new URL(`/${chain.chainId}/${collectionAddress}/${tokenId}`, req.url),
      );
    }

    // Fallback to homepage if path structure doesn't match expected format
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
