'use client';

import type { ComponentProps } from 'react';

import { ConnectButton } from '~/components/buttons/ConnectButton';

import type { Button } from '$ui';
import { AccountButton } from './AccountButton';
import { useAccount } from 'wagmi';

export const WalletButton = ({
  buttonProps,
}: {
  buttonProps?: ComponentProps<typeof Button>;
}) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <AccountButton {...buttonProps} />;
  } else {
    return <ConnectButton variant="muted" {...buttonProps} />;
  }
};
