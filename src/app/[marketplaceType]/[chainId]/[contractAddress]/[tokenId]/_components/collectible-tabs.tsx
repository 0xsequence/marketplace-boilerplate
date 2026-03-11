'use client';

import React from 'react';

import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import {
  OfferIcon,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@0xsequence/design-system';
import { useHighestOffer } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type CollectibleTabsProps = {
  children: React.ReactNode;
};

export default function CollectibleTabs({ children }: CollectibleTabsProps) {
  const params = useParams();
  const defaultTab = params.mode as 'details' | 'offers' | 'listings';
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const router = useRouter();
  const { data: highestOffer } = useHighestOffer({
    chainId,
    collectionAddress,
    tokenId,
  });
  const handleTabChange = (value: string) => {
    const tokenIdStr = String(tokenId);
    switch (value) {
      case 'offers':
        router.replace(
          `/market/${chainId}/${collectionAddress}/${tokenIdStr}/offers`,
        );
        break;
      case 'listings':
        router.replace(
          `/market/${chainId}/${collectionAddress}/${tokenIdStr}/listings`,
        );
        break;
      default:
        router.replace(
          `/market/${chainId}/${collectionAddress}/${tokenIdStr}/details`,
        );
        break;
    }
  };

  return (
    <div>
      <div className="border-b border-border-normal mb-4">
        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger className="text-xs" value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="offers">
              <div className="relative">
                Offers
                {highestOffer && (
                  <div
                    className="absolute rounded-full bg-brand-primary text-white w-3 h-3 flex items-center justify-center"
                    style={{
                      top: -10,
                      right: -10,
                    }}
                  >
                    <OfferIcon className="w-2 h-2" />
                  </div>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="listings">
              Listings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {
        // details, offers and listings tabs are shown with this child
        children
      }
    </div>
  );
}
