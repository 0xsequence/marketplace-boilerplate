import { networks } from '@0xsequence/network';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// example: https://example.com/example.html?test=1
export const isHtml = (fileName: string) => {
  if (!fileName) return false;

  // Check for HTML extensions
  const hasHtmlExtension = /.*\.(html\?.+|html)$/.test(fileName.toLowerCase());

  return hasHtmlExtension || isAnimationUrl(fileName);
};

// Detect if a URL is likely* to be an animation URL without a file extension
export const isAnimationUrl = (url: string): boolean => {
  if (!url || isVideo(url) || is3dModel(url)) return false;

  // Animation keywords in the URL
  if (
    url.includes('render') ||
    url.includes('viewer') ||
    url.includes('animation')
  ) {
    return true;
  }

  // Check for URLs without file extensions
  const segments = url.split('/');
  const lastSegment = segments[segments.length - 1] || '';

  return !lastSegment.includes('.');
};

export const isVideo = (fileName: string) => {
  if (!fileName) return false;
  const isVideo = /.*\.(mp4|ogg|webm)$/.test(fileName.toLowerCase());
  return isVideo;
};

export const is3dModel = (fileName: string) => {
  if (!fileName) return false;
  const isGltf = /.*\.gltf$/.test(fileName.toLowerCase());
  return isGltf;
};

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type ChainNameOrId = string | number;

export const getChain = (nameOrId: ChainNameOrId) => {
  for (const network of Object.values(networks)) {
    if (
      network.name === String(nameOrId).toLowerCase() ||
      Number(network.chainId) === Number(nameOrId)
    ) {
      return network;
    }
  }
};

export const getChainName = (nameOrId: ChainNameOrId) =>
  getChain(nameOrId)?.name;
export const getChainId = (nameOrId: ChainNameOrId) =>
  getChain(nameOrId)?.chainId;
