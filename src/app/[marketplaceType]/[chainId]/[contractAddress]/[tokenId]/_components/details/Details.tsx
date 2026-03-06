'use client';

import React from 'react';

import CopyButton from '~/components/copy-button';
import CustomSkeleton from '~/components/skeleton';

import { useCollectableData } from '../../_hooks/use-collectable-data';
import { getNetwork } from '@0xsequence/connect';
import { Text } from '@0xsequence/design-system';
import { ContractType, truncateMiddle } from '@0xsequence/marketplace-sdk';
import { useParams } from 'next/navigation';
import { isHex } from 'viem';

type Details = {
  'Contract Address': string;
  'Token ID': string;
  'Token Standard': string | undefined;
  Blockchain: string | undefined;
  Owner?: string;
};

export default function Details() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { collectionMetadata, owner } = useCollectableData();
  const tokenStandard = collectionMetadata.data?.type;
  const network = getNetwork(Number(chainId));

  const isLoading = collectionMetadata.isLoading || owner.isLoading;

  const details: Details = {
    'Contract Address': params.contractAddress as string,
    'Token ID': params.tokenId as string,
    'Token Standard': tokenStandard,
    Blockchain: network.title,
  };

  if (tokenStandard === ContractType.ERC721) {
    details.Owner = owner.data || 'Loading...';
  }

  return (
    <div className="flex flex-col gap-3">
      <Text className="text-xs text-muted font-medium">Details</Text>

      <div className="grid grid-cols-3 gap-3 overflow-ellipsis">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        {isLoading && [...Array(6)].map((_, i) => <SkeletonDetail key={i} />)}

        {details &&
          !isLoading &&
          Object.entries(details).map(([name, value]) => (
            <Detail
              key={name}
              name={name}
              value={String(value)}
              truncate={isHex(value)}
            />
          ))}
      </div>
    </div>
  );
}

function Detail({
  name,
  value,
  truncate = false,
}: {
  name: string;
  value: string;
  truncate?: boolean;
}) {
  return (
    <div className="bg-background-secondary backdrop-blur-xs flex flex-col gap-1 px-3 py-2 rounded-xl">
      <Text className="text-xs text-muted font-medium">{name}</Text>
      <div className="flex items-center gap-2">
        <Text className="text-sm text-secondary font-bold ellipsis text-nowrap overflow-hidden">
          {truncate ? truncateMiddle(value, 4, 4) : value}
        </Text>

        {truncate && (
          <CopyButton
            size="xs"
            textToCopy={value}
            className="p-0 text-center rounded-full w-5 h-5"
          />
        )}
      </div>
    </div>
  );
}

function SkeletonDetail() {
  return (
    <div className="bg-background-secondary backdrop-blur-xs flex flex-col gap-1 px-3 py-2 rounded-xl">
      <CustomSkeleton className="h-4 w-full" />
      <CustomSkeleton className="h-4 w-2/3" />
    </div>
  );
}
