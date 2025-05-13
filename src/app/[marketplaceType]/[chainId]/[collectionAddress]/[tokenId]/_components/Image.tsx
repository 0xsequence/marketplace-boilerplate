'use client';

import { Suspense, useState } from 'react';

import { getProxyImageUrl } from '~/lib/image-proxy';
import { isHtml, isVideo, is3dModel, isAnimationUrl } from '~/lib/utils';
import { cn } from '~/lib/utils';

import { Image } from '@0xsequence/design-system';
import { useCollectible } from '@0xsequence/marketplace-sdk/react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

const ModelViewer = dynamic(() => import('./ModelViewer'), {
  ssr: false,
});

export const CollectibleImage = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const { data: collectible, isLoading: collectibleLoading } = useCollectible({
    chainId,
    collectionAddress,
    collectibleId: tokenId,
  });
  const placeholderImage = '/images/chess-tile.png';

  // Determine the source to use for rendering
  const animationUrl = collectible?.animation_url;
  const imageUrl = collectible?.image;
  const fileSrc = animationUrl || imageUrl || placeholderImage;

  if (collectibleLoading) return <CollectibleImageSkeleton />;

  // Render iframe for HTML content or animation URLs
  if (isHtml(fileSrc) || isAnimationUrl(fileSrc)) {
    return <AnimationFrame src={fileSrc} fallbackImage={placeholderImage} />;
  }

  if (isVideo(fileSrc)) {
    return <VideoPlayer src={fileSrc} fallbackImage={placeholderImage} />;
  }

  if (is3dModel(fileSrc)) {
    return (
      <div className="rounded-lg aspect-square overflow-hidden">
        <Suspense fallback={<CollectibleImageSkeleton />}>
          <ModelViewer src={fileSrc} posterSrc={placeholderImage} />
        </Suspense>
      </div>
    );
  }

  // For regular images
  return (
    <div className="mx-auto w-full rounded-[8px] bg-background-control/40 relative aspect-square">
      <Image
        src={getProxyImageUrl(fileSrc, 600, 600)}
        alt={collectible?.name || 'NFT Image'}
        className="aspect-square w-full rounded-lg object-cover"
        onError={(e) => {
          // Replace with chess-tile on error
          e.currentTarget.src = placeholderImage;
        }}
      />
    </div>
  );
};

// Animation frame component for HTML and animation URLs
const AnimationFrame = ({
  src,
  fallbackImage,
}: {
  src: string;
  fallbackImage: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full align-center flex justify-center bg-background-control/30 rounded-lg relative aspect-square">
      {isLoading && (
        <div className="absolute inset-0">
          <CollectibleImageSkeleton />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={fallbackImage}
            alt="Fallback image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <iframe
        title="Collectible animation"
        className={cn(
          'aspect-square w-full rounded-lg',
          isLoading && 'opacity-0',
          hasError && 'hidden',
        )}
        src={src}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin"
        style={{ border: '0px' }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

// Video player component
const VideoPlayer = ({
  src,
  fallbackImage,
}: {
  src: string;
  fallbackImage: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full align-center flex justify-center bg-background-control/30 rounded-lg relative aspect-square">
      {isLoading && (
        <div className="absolute inset-0">
          <CollectibleImageSkeleton />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={fallbackImage}
            alt="Fallback image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <video
        className={cn(
          'aspect-square w-full rounded-lg',
          isLoading && 'opacity-0',
          hasError && 'hidden',
        )}
        autoPlay
        loop
        controls
        playsInline
        muted
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      >
        <source src={src} />
      </video>
    </div>
  );
};

function CollectibleImageSkeleton() {
  return <div className="aspect-square w-full h-full loading rounded-lg" />;
}
