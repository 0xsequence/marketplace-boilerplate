import { isHtml, is3dModel, isVideo } from './utils';

export const normalizeMediaUrl = (imageUrl?: string): string => {
  if (!imageUrl) return '';

  if (imageUrl.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${imageUrl.slice('ipfs://'.length)}`;
  }

  return imageUrl;
};

export const getProxyImageUrl = (
  imageUrl: string,
  width: number,
  height: number,
  _options = { crop: true },
): string => {
  const normalizedImageUrl = normalizeMediaUrl(imageUrl);

  if (!normalizedImageUrl) return '';
  // Don't proxy data URLs, local URLs, or non-image URLs
  if (
    normalizedImageUrl.startsWith('data:') ||
    normalizedImageUrl.startsWith('/') ||
    isHtml(normalizedImageUrl) ||
    isVideo(normalizedImageUrl) ||
    is3dModel(normalizedImageUrl)
  ) {
    return normalizedImageUrl;
  }

  // Add a custom image proxy here
  return normalizedImageUrl;
};
