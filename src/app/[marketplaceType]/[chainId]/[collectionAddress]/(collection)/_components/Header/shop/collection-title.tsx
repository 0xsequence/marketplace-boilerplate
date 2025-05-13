import SvgCollectionAvatar from '~/components/icons/CollectionAvatar';
import CustomNetworkImage from '~/components/network-image';

import { Image, Text } from '@0xsequence/design-system';

interface CollectionTitleProps {
  title: string;
  name: string;
  image?: string;
  tokenType: 'ERC-721' | 'ERC-1155';
  chainId: number;
}

export function CollectionTitle({
  title,
  name,
  image,
  tokenType,
  chainId,
}: CollectionTitleProps) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="pb-3">
        <Text className="text-4xl font-bold text-white">{title}</Text>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center pr-4 mr-4 border-r border-border-normal">
          {image ? (
            <Image src={image} alt={name} className="w-4 h-4 rounded-full" />
          ) : (
            <div className="w-4 h-4 bg-background-control rounded-full flex items-center justify-center p-0.5">
              <SvgCollectionAvatar className="text-white" />
            </div>
          )}

          <Text className="text-secondary text-sm font-medium mr-2 ml-0.5">
            {name}
          </Text>

          <CustomNetworkImage
            chainId={chainId}
            className="w-2.5 h-2.5 rounded-full"
          />
        </div>

        <div className="flex items-center">
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
        </div>
      </div>
    </div>
  );
}
