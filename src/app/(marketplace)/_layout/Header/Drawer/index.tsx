'use client';

import type { SVGProps } from 'react';

import { Portal } from '~/components/ui';
import { cn } from '~/lib/utils';

import { useHeaderDrawer } from './HeaderDrawerContext';
import { useOpenConnectModal } from '@0xsequence/connect';
import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  TwitterIcon,
} from '@0xsequence/design-system';
import {
  Button,
  CloseIcon,
  DiscordIcon,
  Divider,
  GridIcon,
  IconButton,
  type IconProps,
  LinkIcon,
  SignoutIcon,
  Text,
  WalletIcon,
} from '@0xsequence/design-system';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import { type Route } from 'next';
import Link from 'next/link';
import { useDisconnect } from 'wagmi';

const HeaderDrawerMenu = ({
  socials,
}: {
  socials?: MarketplaceConfig['socials'];
}) => {
  const { open, setOpen } = useHeaderDrawer();

  const closeHeaderDrawerMenu = () => setOpen(false);
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
    inventory: {
      label: 'Inventory',

      icon: GridIcon,
      to: '/inventory',
    },
  } as Record<
    string,
    {
      label: string;
      icon: (props: IconProps) => React.JSX.Element;
      to: Route<string> | undefined;
      callback?: () => void;
    }
  >;

  // Filter out empty socials
  const definedSocials =
    socials &&
    (Object.fromEntries(
      Object.entries(socials).filter(([_, value]) => value !== ''),
    ) as Record<keyof typeof socials, string>);

  const socialItems = definedSocials
    ? Object.entries(definedSocials).map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);

        return {
          label,
          to: value,
          icon: () => {
            switch (key as keyof typeof socials) {
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
              default:
                return <div />;
            }
          },
        };
      })
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
          'fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ',
        )}
      >
        <IconButton
          size="sm"
          className="mb-7 w-9 h-9 rounded-full bg-button-glass hover:bg-button-glass/80"
          onClick={closeDrawer}
          icon={CloseIcon}
        />

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
              to={to as string}
            />
          ),
        )}

        {socialItems.length > 0 && <Divider className="w-full" />}

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

        <Divider className="w-full" />

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
