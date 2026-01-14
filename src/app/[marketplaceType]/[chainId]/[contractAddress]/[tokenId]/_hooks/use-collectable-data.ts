'use client';

import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { ContractType } from '@0xsequence/marketplace-sdk';
import {
  useBalanceOfCollectible,
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
  const { data: erc1155Balance, isLoading: erc1155BalanceLoading } =
    useBalanceOfCollectible({
      chainId,
      collectionAddress,
      tokenId,
      userAddress: accountAddress,
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
      erc1155Balance?.balance && Number(erc1155Balance.balance) > 0
        ? accountAddress
        : undefined;
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
  };
}
