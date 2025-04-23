'use client';

import React from 'react';

import ENSName from '~/components/ENSName';

import { GradientAvatar, Text } from '@0xsequence/design-system';
import type { Hex } from 'viem';
import { useAccount } from 'wagmi';

type OwnerProps = {
  address: Hex;
};

export default function Owner({ address }: OwnerProps) {
  const { address: accountAddress } = useAccount();

  return (
    <div className="flex items-center gap-2 mt-5 ml-4">
      <Text className="text-xs text-muted">Owner:</Text>

      <div className="flex items-center gap-1">
        <GradientAvatar size="xs" address={address.toLowerCase()} />

        <Text className="text-xs font-semibold text-primary">
          <ENSName address={address} truncateAt={4} />
        </Text>
        {accountAddress === address && (
          <Text className="text-xs text-muted">(You)</Text>
        )}
      </div>
    </div>
  );
}
