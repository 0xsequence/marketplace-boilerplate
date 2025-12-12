'use client';

import React, { type ComponentProps } from 'react';

import { useIsMinWidth } from '~/hooks/ui/use-is-min-width';
import { cn } from '~/lib/utils';

import { useOpenConnectModal } from '@0xsequence/connect';
import { Button, WalletIcon } from '@0xsequence/design-system';

type ConnectButtonProps = ComponentProps<typeof Button> & {
  showIcon?: boolean;
  className?: string;
  responsive?: boolean;
};

export default function ConnectButton(props: ConnectButtonProps) {
  const { setOpenConnectModal } = useOpenConnectModal();
  const isMd = useIsMinWidth('@md');
  let label: string | undefined = 'Connect Wallet';
  if (props.responsive) {
    label = isMd ? 'Connect Wallet' : undefined;
  }

  return (
    <Button
      shape="square"
      variant={props.variant || 'secondary'}
      className={cn(
        props.className,
        'bg-background-raised! hover:bg-background-raised/80',
      )}
      size={props.size}
      onClick={() => setOpenConnectModal(true)}
    >
      {props.showIcon && <WalletIcon className="mr-2" />}
      {label}
    </Button>
  );
}
