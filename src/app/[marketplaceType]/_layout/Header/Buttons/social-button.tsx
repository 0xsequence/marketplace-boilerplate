'use client';

import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
} from '@0xsequence/design-system';
import { DiscordIcon, IconButton, LinkIcon } from '@0xsequence/design-system';

export const SOCIAL_PLATFORMS = [
  'discord',
  'twitter',
  'tiktok',
  'instagram',
  'youtube',
  'website',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

const getSocialIcon = (key: SocialPlatform): typeof DiscordIcon => {
  switch (key) {
    case 'discord':
      return DiscordIcon;
    case 'twitter':
      return TwitterIcon;
    case 'tiktok':
      return TiktokIcon;
    case 'instagram':
      return InstagramIcon;
    case 'youtube':
      return YoutubeIcon;
    case 'website':
      return LinkIcon;
    default: {
      const exhaustiveCheck: never = key;
      throw new Error(`Unhandled social platform: ${String(exhaustiveCheck)}`);
    }
  }
};

export const SocialButton = ({
  social,
  href,
}: {
  social: SocialPlatform;
  href: string;
}) => {
  const icon = getSocialIcon(social);
  return (
    <IconButton
      asChild
      icon={icon}
      variant="secondary"
      size="sm"
      className="bg-background-raised! rounded-lg hover:bg-background-raised/80"
    >
      <a target="_blank" href={href} rel="noopener noreferrer" />
    </IconButton>
  );
};
