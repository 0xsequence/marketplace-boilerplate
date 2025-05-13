'use client';

import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
} from '@0xsequence/design-system';
import { DiscordIcon, IconButton, LinkIcon } from '@0xsequence/design-system';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';

export type SocialPlatform = keyof MarketplaceConfig['socials'];

const getSocialIcon = (key: SocialPlatform) => {
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
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = key;
      return LinkIcon;
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
      variant="raised"
      size="sm"
      className="bg-button-glass rounded-lg hover:bg-button-glass/80"
    >
      <a target="_blank" href={href} rel="noopener noreferrer" />
    </IconButton>
  );
};
