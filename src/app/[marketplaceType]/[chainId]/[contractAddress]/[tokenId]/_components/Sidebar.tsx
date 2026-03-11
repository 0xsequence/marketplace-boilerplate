'use client';

import { cn } from '~/lib/utils';

import { useCollectableData } from '../_hooks/use-collectable-data';
import CollectibleHeading from './Heading';
import Owner from './Owner';
import { MarketCollectibleActions } from './market-collectible-actions';
import ShopCollectibleActions from './shop-collectible-actions';
import { ContractType } from '@0xsequence/marketplace-sdk';
import { useParams } from 'next/navigation';

export default function CollectibleSidebar() {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';

  const { collectionMetadata, collectibleMetadata, owner } =
    useCollectableData();

  const is721 = collectionMetadata.data?.type === ContractType.ERC721;
  const isLoading =
    collectionMetadata.isLoading ||
    collectibleMetadata.isLoading ||
    owner.isLoading;

  return (
    <div className={cn('flex flex-col', 'w-full md:w-[320px]!')}>
      <div className="hidden md:block!">
        <CollectibleHeading />
      </div>

      <div className="bg-background-secondary rounded-3xl p-4 mt-0 md:mt-2!">
        {isShop ? (
          <ShopCollectibleActions
            collectionType={collectionMetadata.data?.type as ContractType}
          />
        ) : (
          <MarketCollectibleActions isLoading={isLoading} />
        )}
      </div>

      {is721 && owner.data && !isShop && <Owner address={owner.data} />}
    </div>
  );
}
