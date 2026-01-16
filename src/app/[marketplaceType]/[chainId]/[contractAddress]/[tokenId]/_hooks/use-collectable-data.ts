'use client';

import { use1155Balance } from '~/hooks/use-1155-balance';
import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { ContractType } from '@0xsequence/marketplace-sdk';
import {
  useCollectible,
  useCollection,
  useERC721Owner,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import { useAccount } from 'wagmi';

export function useCollectableData() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { address: accountAddress } = useAccount();
  const { data: marketplaceCollection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const { data: sdkCollection, isLoading: collectionLoading } = useCollection({
    chainId,
    collectionAddress: collectionAddress,
  });
  const tokenStandard = sdkCollection?.type;

  const { data: collectible, isLoading: collectibleLoading } = useCollectible({
    chainId,
    collectionAddress,
    tokenId,
  });
  const { owner: erc721Owner, isLoading: erc721OwnerLoading } = useERC721Owner({
    chainId,
    collectionAddress,
    contractType: ContractType.ERC721,
    tokenId,
  });

  // For ERC1155 tokens, use balance check
  // TODO: Update useBalanceOfCollectible in marketplace-sdk when new indexer balance endpoints support tokenId filter
  /*const { data: erc1155Balance, isLoading: erc1155BalanceLoading } =
    useBalanceOfCollectible({
      chainId,
      collectionAddress,
      tokenId,
      userAddress: accountAddress,
    });*/

  const { balance: erc1155Balance, isLoading: erc1155BalanceLoading } =
    use1155Balance({
      collectionAddress,
      chainId: Number(chainId),
      tokenId: BigInt(tokenId),
    });

  const isErc721 = tokenStandard === ContractType.ERC721;
  const isErc1155 = tokenStandard === ContractType.ERC1155;

  let ownerData;
  let ownerLoading;

  if (isErc721) {
    ownerData = erc721Owner;
    ownerLoading = erc721OwnerLoading;
  } else if (isErc1155) {
    ownerData =
      erc1155Balance && erc1155Balance > 0n ? accountAddress : undefined;
    ownerLoading = erc1155BalanceLoading;
  } else {
    ownerData = undefined;
    ownerLoading = false;
  }

  return {
    chainId,
    tokenId,
    collectionAddress,
    collectionMetadata: {
      data: sdkCollection,
      isLoading: collectionLoading,
    },
    collectibleMetadata: {
      data: collectible,
      isLoading: collectibleLoading,
    },
    owner: {
      data: ownerData,
      isLoading: ownerLoading,
    },
    ownedByAccount: ownerData === accountAddress,
  };
}
