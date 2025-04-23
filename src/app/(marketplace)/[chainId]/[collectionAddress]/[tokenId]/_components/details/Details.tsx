'use client';

import React from 'react';

import CopyButton from '~/components/CopyButton';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';

import { getNetwork } from '@0xsequence/connect';
import { Text } from '@0xsequence/design-system';
import {
  ContractType,
  ERC721_ABI,
  truncateMiddle,
} from '@0xsequence/marketplace-sdk';
import { useCollection } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';
import { isHex } from 'viem';
import { useReadContract } from 'wagmi';

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
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const { data: collection, isLoading: collectionLoading } = useCollection({
    chainId,
    collectionAddress: collectionAddress,
  });
  const tokenStandard = collection?.type;
  const network = getNetwork(Number(chainId));
  const { data: owner, isLoading: ownerLoading } = useReadContract({
    address: collectionAddress,
    chainId,
    abi: ERC721_ABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
    query: {
      enabled: tokenStandard === ContractType.ERC721,
    },
  });

  const isLoading =
    collectionLoading ||
    (tokenStandard === ContractType.ERC721 && ownerLoading);
  const details: Details = {
    'Contract Address': collectionAddress,
    'Token ID': tokenId,
    'Token Standard': tokenStandard,
    Blockchain: network.title,
  };
  if (tokenStandard === ContractType.ERC721) {
    details.Owner = owner;
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
