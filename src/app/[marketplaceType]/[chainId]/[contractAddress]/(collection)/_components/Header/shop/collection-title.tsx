import SvgCollectionAvatar from '~/components/icons/collection-avatar';
import CustomNetworkImage from '~/components/network-image';

import { Image, Skeleton, Text } from '@0xsequence/design-system';

interface CollectionTitleProps {
  name: string;
  image?: string;
  tokenType: 'ERC-721' | 'ERC-1155' | undefined;
  chainId: number;
  isLoading?: boolean;
}

export function CollectionTitle({
  name,
  image,
  tokenType,
  chainId,
  isLoading,
}: CollectionTitleProps) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="pb-3">
        {isLoading ? (
          <Skeleton className="w-32 h-[43px] rounded-sm" />
        ) : (
          <Text className="text-4xl font-bold text-white">{name}</Text>
        )}
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center pr-4 mr-4 border-r border-border-normal">
          {image ? (
            <Image src={image} alt={name} className="w-4 h-4 rounded-full" />
          ) : (
            <div className="w-4 h-4 bg-background-raised rounded-full flex items-center justify-center p-0.5">
              <SvgCollectionAvatar className="text-primary" />
            </div>
          )}

          {isLoading ? (
            <Skeleton className="w-16 h-5 rounded-sm mr-2 ml-0.5" />
          ) : (
            <Text className="text-secondary text-sm font-medium mr-2 ml-0.5">
              {name}
            </Text>
          )}

          <CustomNetworkImage
            chainId={chainId}
            className="w-3 h-3 rounded-full"
          />
        </div>

        <div className="flex items-center">
          {isLoading || !tokenType ? (
            <Skeleton className="w-16 h-5 rounded-sm" />
          ) : (
            <>
              <Image
                src={
                  tokenType === 'ERC-721'
                    ? '/images/721-contract.webp'
                    : '/images/1155-contract.webp'
                }
                alt={tokenType}
                className="w-2.5 h-2.5 mr-1"
              />
              <Text className="text-sm text-secondary font-medium">
                {tokenType}
              </Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
