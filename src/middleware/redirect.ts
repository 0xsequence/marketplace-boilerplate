import { getChainId } from '~/lib/utils';

import { type NextRequest, NextResponse } from 'next/server';

const getPath = (path: string) => {
  const pathParts = path.split('/').filter(Boolean);
  const firstPart = pathParts[0];

  if (firstPart === 'market' || firstPart === 'shop') {
    return null;
  }

  if (firstPart === 'collection' || firstPart === 'collectable') {
    // v1 collection path /collection/chainNameOrId/collectionAddress...
    const chainNameOrId = pathParts[1];
    const collectionAddress = pathParts[2];
    // v1 collectable path /collectable/chainNameOrId/collectionAddress/tokenId or
    // /collectable/chainNameOrId/collectionAddress/items
    const tokenIdOrItems = pathParts[3];

    if (!chainNameOrId || !collectionAddress) {
      return null;
    }

    const chainId = getChainId(chainNameOrId);

    if (!chainId) {
      return null;
    }

    return `/market/${chainId}/${collectionAddress}/{${tokenIdOrItems}`;
  }

  // Legacy marketplace v2 path /chainId/collectionAddress
  if (firstPart?.match(/^\d+$/)) {
    return `/market/${pathParts[0]}/${pathParts[1]}${pathParts[2] ? `/${pathParts[2]}` : ''}`;
  }

  return null;
};

export function redirectMarketplace(req: NextRequest) {
  const url = req.nextUrl;

  const path = getPath(url.pathname);

  if (path) {
    const redirectUrl = new URL(path, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
