'use client';

import ConnectButton from '~/components/connectButton/ConnectButton';

import { AccountButton } from './AccountButton';
import { useAccount } from 'wagmi';

export const WalletButton = () => {
  const { isConnected, isConnecting } = useAccount();

  if (isConnecting) {
    return <div className="w-9 h-9 md:w-40 loading rounded-[8px]" />;
  }

  if (isConnected) {
    return <AccountButton />;
  }

  return <ConnectButton size="sm" showIcon shape="square" responsive={true} />;
};
