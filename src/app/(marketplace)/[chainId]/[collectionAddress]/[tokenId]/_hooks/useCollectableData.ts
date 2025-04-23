import {
  useCollectible,
  useCollection,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

export function useCollectableData() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const collectibleMetadata = useCollectible({
    chainId,
    collectionAddress,
    collectibleId: tokenId,
  });

  const collectionMetadata = useCollection({
    chainId,
    collectionAddress,
  });

  return {
    chainId,
    tokenId,
    collectionAddress,
    collectionMetadata,
    collectibleMetadata,
    loading: collectionMetadata.isLoading || collectibleMetadata.isLoading,
  };
}
