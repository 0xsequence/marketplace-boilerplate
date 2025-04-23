'use client';

import { SocialsClient } from '~/app/(marketplace)/_layout/Header/Buttons/Socials-client';

import Description from './Description';
import Details from './Details';
import Properties from './Properties';
import { useCollectible } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export default function CollectibleDetailsTab() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const { data: collectible, isLoading: collectibleLoading } = useCollectible({
    chainId,
    collectionAddress: collectionAddress,
    collectibleId: tokenId,
  });

  return (
    <div>
      <Description
        description={collectible?.description}
        isLoading={collectibleLoading}
      />

      <SocialsClient shouldHideOnMobile={false} />

      <Properties isLoading={collectibleLoading} tokenMetadata={collectible} />

      <Details />
    </div>
  );
}
