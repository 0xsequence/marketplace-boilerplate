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
  // TODO: Eslint do not like that the variant is not defined in the props, investigate why
  variant?:
    | 'primary'
    | 'text'
    | 'base'
    | 'ghost'
    | 'feature'
    | 'glass'
    | 'emphasis'
    | 'raised'
    | 'danger'
    | null
    | undefined;
};

export default function ConnectButton(props: ConnectButtonProps) {
  const { setOpenConnectModal } = useOpenConnectModal();
  const isMd = useIsMinWidth('@md');
  const label = props.responsive
    ? isMd
      ? 'Connect Wallet'
      : undefined
    : 'Connect Wallet';

  const handleOnClick = () => {
    setOpenConnectModal(true);
  };

  const { showIcon, ...buttonProps } = props;

  return (
    <Button
      variant={props.variant || 'raised'}
      className={cn(props.className)}
      {...buttonProps}
      onClick={handleOnClick}
      label={label}
      leftIcon={showIcon ? WalletIcon : undefined}
    />
  );
}
