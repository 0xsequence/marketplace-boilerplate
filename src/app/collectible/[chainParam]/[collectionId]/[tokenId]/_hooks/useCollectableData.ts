import { Routes } from '~/lib/routes';
import { getChainId } from '~/lib/utils/getChain';

import {
  useCollection,
  useCollectable,
} from '@0xsequence/marketplace-sdk/react';

export const useCollectableData = () => {
  const { chainParam, collectionId, tokenId } = Routes.collectible.useParams();

  const chainId = getChainId(chainParam)!;

  const collectibleMetadata = useCollectable({
    chainId,
    collectionAddress: collectionId,
    tokenId,
  });

  const collectionMetadata = useCollection({
    chainId,
    collectionAddress: collectionId,
  });

  return {
    chainId,
    tokenId,
    collectionId,
    collectionMetadata,
    collectibleMetadata,
    loading: collectionMetadata.isLoading || collectibleMetadata.isLoading,
  };
};
