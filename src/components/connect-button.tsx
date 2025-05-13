'use client';

import React, { type ComponentProps } from 'react';

import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';
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
      variant={props.variant || 'raised'}
      className={cn(props.className)}
      size={props.size}
      onClick={() => setOpenConnectModal(true)}
      label={label}
      leftIcon={props.showIcon ? WalletIcon : undefined}
    />
  );
}
