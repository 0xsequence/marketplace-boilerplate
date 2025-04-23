'use client';

import { useState, type ComponentProps } from 'react';

import ENSName from '~/components/ENSName';

import {
  GradientAvatar,
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
  CopyIcon,
  Button as DropdownButton,
  SignoutIcon,
  GridIcon,
  useToast,
  WalletIcon,
  cn,
  Button,
} from '@0xsequence/design-system';
import { useOpenWalletModal } from '@0xsequence/wallet-widget';
import { useRouter } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';

export const AccountButton = (props: ComponentProps<typeof Button>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const toast = useToast();
  const { setOpenWalletModal } = useOpenWalletModal();

  const handleCopyAddress = async () => {
    try {
      if (!address) throw new Error('No address to copy');
      await navigator.clipboard.writeText(address);
      toast({
        variant: 'success',
        title: 'Address copied',
      });
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Failed to copy address',
      });
      console.error(error);
    }
  };

  const openWallet = () => {
    setOpenWalletModal(true);
    setIsOpen(false);
  };

  return (
    <DropdownMenuRoot open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="raised"
          size="sm"
          shape="square"
          className={cn(
            isOpen
              ? 'bg-background-control'
              : 'bg-button-glass hover:bg-button-glass/80',
            'px-2.5',
          )}
          {...props}
          onClick={() => setIsOpen(!isOpen)}
          label={
            props.children ?? (
              <div className="flex items-center gap-2">
                <GradientAvatar
                  address={address?.toLowerCase() ?? ''}
                  size="sm"
                />

                <div className="hidden md:block! text-primary">
                  <ENSName address={address} truncateAt={4} />
                </div>
              </div>
            )
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: '216px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        collisionPadding={16}
        onInteractOutside={() => setIsOpen(false)}
        className="rounded-[8px] mt-4 md:mt-[3px] bg-background-raised"
      >
        <DropdownButton
          className="w-full bg-background-control hover:bg-background-control/80"
          leftIcon={CopyIcon}
          onClick={handleCopyAddress}
          label="Copy address"
          shape="square"
          size="sm"
        />

        <DropdownButton
          className="w-full bg-background-control hover:bg-background-control/80"
          leftIcon={GridIcon}
          onClick={() => router.push('/inventory')}
          label="View inventory"
          shape="square"
          size="sm"
        />

        <DropdownButton
          className="w-full bg-background-control hover:bg-background-control/80"
          leftIcon={WalletIcon}
          onClick={() => openWallet()}
          label="Open wallet"
          shape="square"
          size="sm"
        />

        <DropdownButton
          className="w-full bg-background-control hover:bg-background-control/80"
          leftIcon={SignoutIcon}
          onClick={() => disconnect()}
          label="Sign out"
          shape="square"
          size="sm"
        />
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
