'use client';

import React from 'react';

import { OfferIcon, TabbedNav } from '@0xsequence/design-system';
import { useListOffersForCollectible } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import type { Hex } from 'viem';

export default function CollectibleTabs({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const defaultTab = params.mode as 'details' | 'offers' | 'listings';
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const router = useRouter();
  // TODO: Change it to useHighestOffer when it returns the highest offer for reservoir
  const { data: offersList } = useListOffersForCollectible({
    chainId,
    collectionAddress,
    collectibleId: tokenId,
  });
  const highestOffer = offersList?.offers[0];
  const handleTabChange = (value: string) => {
    switch (value) {
      case 'offers':
        router.replace(`/${chainId}/${collectionAddress}/${tokenId}/offers`);
        break;
      case 'listings':
        router.replace(`/${chainId}/${collectionAddress}/${tokenId}/listings`);
        break;
      default:
        router.replace(`/${chainId}/${collectionAddress}/${tokenId}/details`);
        break;
    }
  };

  return (
    <div>
      <div className="border-b border-border-normal mb-4">
        <TabbedNav
          variant="line"
          defaultValue={defaultTab}
          tabs={[
            {
              value: 'details',
              label: 'Details',
            },
            {
              value: 'offers',
              label: (
                <div className="relative">
                  Offers
                  {highestOffer && (
                    <div className="absolute top-1 -right-2 rounded-full bg-brand-primary text-white w-3 h-3 flex items-center justify-center">
                      <OfferIcon className="w-2 h-2" />
                    </div>
                  )}
                </div>
              ),
            },
            {
              value: 'listings',
              label: 'Listings',
            },
          ]}
          onTabChange={handleTabChange}
        />
      </div>

      {
        // details, offers and listings tabs are shown with this child
        children
      }
    </div>
  );
}
