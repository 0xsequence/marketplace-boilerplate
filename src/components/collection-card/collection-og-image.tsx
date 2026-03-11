import { normalizeMediaUrl } from '~/lib/image-proxy';

import { MarketplaceIcon } from '@0xsequence/design-system';
import { Media } from '@0xsequence/marketplace-sdk/react';

interface CollectionOGImageProps {
  imageUrl?: string;
}

export const CollectionOGImage = ({ imageUrl }: CollectionOGImageProps) => {
  const normalizedImageUrl = normalizeMediaUrl(imageUrl);
  const fallbackIcon = (
    <div className="bg-background-secondary rounded-full p-2 flex items-center justify-center w-10 h-10 md:w-12! md:h-12!">
      <MarketplaceIcon size="sm" className="text-secondary" />
    </div>
  );

  if (!normalizedImageUrl) {
    return fallbackIcon;
  }

  return (
    <Media
      assets={[normalizedImageUrl]}
      containerClassName="w-10 h-10 md:w-12! md:h-12! rounded-full overflow-hidden"
      fallbackContent={fallbackIcon}
      shouldListenForLoad={false}
    />
  );
};
