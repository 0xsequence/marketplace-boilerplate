'use client';

import type { SVGProps } from 'react';

import { Portal } from '~/components/portal';
import { cn } from '~/lib/utils';

import { SOCIAL_PLATFORMS } from '../Buttons/social-button';
import { useHeaderDrawer } from './header-drawer-context';
import { useOpenConnectModal } from '@0xsequence/connect';
import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
  CartIcon,
  MarketplaceIcon,
} from '@0xsequence/design-system';
import {
  Button,
  CloseIcon,
  DiscordIcon,
  Separator,
  GridIcon,
  IconButton,
  type IconProps,
  LinkIcon,
  SignoutIcon,
  Text,
  WalletIcon,
} from '@0xsequence/design-system';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';
import { type Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDisconnect } from 'wagmi';

const HeaderDrawerMenu = ({
  socials,
}: {
  socials?: MarketplaceConfig['settings']['socials'];
}) => {
  const { open, setOpen } = useHeaderDrawer();
  const pathname = usePathname();
  const { data: marketplaceConfig } = useMarketplaceConfig();
  const marketplaceEnabled = marketplaceConfig?.market.enabled;
  const shopEnabled = marketplaceConfig?.shop.enabled;

  const closeHeaderDrawerMenu = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };
  const { disconnect } = useDisconnect();
  const { setOpenConnectModal } = useOpenConnectModal();

  function openWallet() {
    setOpen(false);
    document.body.style.overflow = 'auto';
    setOpenConnectModal(true);
  }

  const DRAWER_ITEMS = {
    wallet: {
      label: 'Wallet',

      icon: WalletIcon,
      callback: () => {
        openWallet();
      },
      to: undefined,
    },
    ...(marketplaceEnabled
      ? {
          inventory: {
            label: 'Inventory',

            icon: GridIcon,
            to: '/market/inventory' as Route<string>,
          },
        }
      : {}),
  } as Record<
    string,
    {
      label: string;
      icon: (props: IconProps) => React.JSX.Element;
      to: Route<string> | undefined;
      callback?: () => void;
    }
  >;

  type SocialKey = (typeof SOCIAL_PLATFORMS)[number];

  const getSocialIcon = (key: SocialKey) => {
    switch (key) {
      case 'website':
        return <LinkIcon className="w-5 h-5 mr-2 text-muted" />;
      case 'twitter':
        return <TwitterIcon className="w-5 h-5 mr-2 text-muted" />;
      case 'discord':
        return <DiscordIcon className="w-5 h-5 mr-2 text-muted" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5 mr-2 text-muted" />;
      case 'tiktok':
        return <TiktokIcon className="w-5 h-5 mr-2 text-muted" />;
      case 'youtube':
        return <YoutubeIcon className="w-5 h-5 mr-2 text-muted" />;
      default: {
        const exhaustiveCheck: never = key;
        throw new Error(`Unhandled social key: ${String(exhaustiveCheck)}`);
      }
    }
  };

  const socialItems = socials
    ? SOCIAL_PLATFORMS.filter((key) => socials[key] && socials[key] !== '').map(
        (key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          to: socials[key],
          icon: () => getSocialIcon(key),
        }),
      )
    : [];

  function closeDrawer() {
    setOpen(false);
    document.body.style.overflow = 'auto';
  }

  if (!open) return null;

  return (
    <Portal>
      <div
        className={cn(
          'flex flex-col items-start',
          'w-full h-full bg-background-primary p-4 z-20',
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ',
        )}
      >
        <IconButton
          size="sm"
          className="mb-7 w-9 h-9 rounded-full bg-button-glass hover:bg-button-glass/80"
          onClick={closeDrawer}
          icon={CloseIcon}
        />

        <div className="flex flex-col gap-2 border-b border-border-normal mb-4 pb-4 w-full">
          {shopEnabled && (
            <Link
              href="/shop"
              onClick={() => {
                closeHeaderDrawerMenu();
              }}
              className={cn(
                'text-sm pb-2 flex items-center gap-2 font-bold',
                pathname?.startsWith('/shop') ? ' text-white' : 'text-muted',
              )}
            >
              <CartIcon
                className={cn(
                  'w-5 h-5',
                  pathname?.startsWith('/shop') ? 'text-white' : 'text-muted',
                )}
              />
              Shop
            </Link>
          )}
          {marketplaceEnabled && (
            <Link
              href="/market"
              onClick={() => {
                closeHeaderDrawerMenu();
              }}
              className={cn(
                'text-sm pb-2 flex items-center gap-2 font-bold',
                pathname?.startsWith('/market') ? 'text-white' : 'text-muted',
              )}
            >
              <MarketplaceIcon
                className={cn(
                  'w-5 h-5',
                  pathname?.startsWith('/market') ? 'text-white' : 'text-muted',
                )}
              />
              Market
            </Link>
          )}
        </div>

        {Object.entries(DRAWER_ITEMS).map(
          ([key, { label, icon, to, callback }]) => (
            <DrawerItem
              key={key}
              label={label}
              icon={icon}
              callback={
                callback
                  ? () => {
                      callback();
                      closeHeaderDrawerMenu();
                    }
                  : closeHeaderDrawerMenu
              }
              to={to}
            />
          ),
        )}

        {socialItems.length > 0 && <Separator className="w-full my-3" />}

        {socialItems.map(({ label, to, icon }) => (
          <DrawerItem
            key={label}
            label={label}
            icon={icon}
            callback={closeHeaderDrawerMenu}
            external
            to={to}
          />
        ))}

        <Separator className="w-full my-3" />

        <DrawerItem
          key={'signOut'}
          label={'Sign Out'}
          icon={SignoutIcon}
          callback={() => {
            closeHeaderDrawerMenu();

            disconnect();
          }}
        />
      </div>
    </Portal>
  );
};

type DrawerItemProps = {
  label: string;
  icon:
    | ((props: SVGProps<SVGSVGElement>) => React.JSX.Element)
    | ((props: IconProps) => React.JSX.Element);
  callback: () => void;
  external?: boolean;
  to?: string;
};

const DrawerItem = ({
  label,
  icon,
  callback,
  external = false,
  to,
}: DrawerItemProps) => {
  if (!to) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="flex items-center justify-start w-full py-2 px-0 rounded-md"
        onClick={callback}
      >
        {icon({ className: 'w-5 h-5 mr-2 text-muted' })}

        <Text className="text-muted">{label}</Text>
      </Button>
    );
  }

  return (
    <Link
      href={to as Route<string>}
      passHref={external}
      rel="noopener noreferrer"
      target={external ? '_blank' : '_self'}
      className="w-full"
    >
      <Button
        size="sm"
        variant="ghost"
        className="flex items-center justify-start w-full py-2 px-0 rounded-md"
        onClick={callback}
      >
        {icon({ className: 'w-5 h-5 mr-2 text-muted' })}

        <Text className="text-muted">{label}</Text>
      </Button>
    </Link>
  );
};

export default HeaderDrawerMenu;
