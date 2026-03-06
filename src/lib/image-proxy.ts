import { isHtml, is3dModel, isVideo } from './utils';

export const getProxyImageUrl = (
  imageUrl: string,
  width: number,
  height: number,
  _options = { crop: true },
): string => {
  if (!imageUrl) return '';
  // Don't proxy data URLs, local URLs, or non-image URLs
  if (
    imageUrl.startsWith('data:') ||
    imageUrl.startsWith('/') ||
    isHtml(imageUrl) ||
    isVideo(imageUrl) ||
    is3dModel(imageUrl)
  ) {
    return imageUrl;
  }

  // Add a custom image proxy here
  return imageUrl;
};
