'use client';

import { cn } from '~/lib/utils';

import { useCollectableData } from '../_hooks/useCollectableData';
import CollectibleHeading from './Heading';
import { MarketplaceCollectibleActions } from './MarketplaceCollectibleActions';
import Owner from './Owner';
import ShopCollectibleActions from './ShopCollectibleActions';
import { ERC721_ABI } from '@0xsequence/marketplace-sdk';
import { ContractType } from '@0xsequence/metadata';
import { useParams } from 'next/navigation';
import { useReadContract } from 'wagmi';

export default function CollectibleSidebar() {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';

  const {
    collectionMetadata,
    collectibleMetadata,
    collectionAddress,
    tokenId,
  } = useCollectableData();

  const is721 = collectionMetadata.data?.type === ContractType.ERC721;
  const is1155 = collectionMetadata.data?.type === ContractType.ERC1155;
  const { data: owner } = useReadContract({
    address: collectionAddress,
    chainId: collectionMetadata.data?.chainId,
    abi: ERC721_ABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });
  const isLoading =
    collectionMetadata.isLoading || collectibleMetadata.isLoading;

  return (
    <div className={cn('flex flex-col', 'w-full md:w-[320px]!')}>
      <div className="hidden md:block!">
        <CollectibleHeading />
      </div>

      <div className="bg-background-secondary rounded-3xl p-4 mt-0 md:mt-2!">
        {isShop ? (
          <ShopCollectibleActions is1155={is1155} is721={is721} />
        ) : (
          <MarketplaceCollectibleActions
            isLoading={isLoading}
            externalUrl={collectibleMetadata.data?.external_url}
          />
        )}
      </div>

      {is721 && owner && !isShop && <Owner address={owner} />}
    </div>
  );
}
