'use client';

import CustomSkeleton from '~/components/skeleton';
import { Table } from '~/components/table';
import { cn } from '~/lib/utils';

import OrdersTableAction from './action';
import AddressPill from './address-pill';
import MarketplacePill from './marketplace-pill';
import TimeLeft from './time-left';
import { Text } from '@0xsequence/design-system';
import { formatPrice, type Order } from '@0xsequence/marketplace-sdk';
import { useCollectible, useCurrency } from '@0xsequence/marketplace-sdk/react';
import type { Address, Hex } from 'viem';
import { useAccount } from 'wagmi';

const formatQuantity = (quantity: bigint, decimals: number): string => {
  const value = Number(quantity) / Math.pow(10, decimals);
  return decimals > 0 ? value.toFixed(decimals) : value.toString();
};

const OrdersTableRow = ({
  order,
  index,
  tokenId,
}: {
  order: Order;
  index: number;
  tokenId: bigint;
}) => {
  const { chainId, collectionContractAddress } = order;
  const { address: accountAddress } = useAccount();
  const { data: currency } = useCurrency({
    chainId,
    currencyAddress: order.priceCurrencyAddress,
  });
  const { data: collectible } = useCollectible({
    chainId,
    collectionAddress: collectionContractAddress as Address,
    tokenId,
  });
  const tokenDecimals = collectible?.decimals || 0;

  const formattedQuantity = formatQuantity(
    order.quantityRemaining,
    tokenDecimals,
  );

  return (
    <>
      {/* for small screens */}
      <Table.Row
        className={cn(
          index % 2 === 0 ? 'bg-background-raised' : '',
          'table-row md:hidden',
        )}
      >
        <Table.Cell className="p-2">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <Text className="text-xs text-muted font-bold">Quantity</Text>

              <Text className="text-base text-primary font-bold">
                {formattedQuantity}
              </Text>
            </div>

            <div className="flex flex-col gap-1">
              <Text className="text-xs text-muted font-bold">Price</Text>

              {currency ? (
                <Text className="text-sm text-primary font-bold">
                  {formatPrice(BigInt(order.priceAmount), currency.decimals)}{' '}
                  {currency.symbol}
                </Text>
              ) : (
                <CustomSkeleton className="w-16 h-4" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Text className="text-xs text-muted font-bold">Time left</Text>

              <TimeLeft endDate={order.validUntil} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1 grow">
              <Text className="text-xs text-muted font-bold">By</Text>

              <AddressPill address={order.createdBy} />
            </div>

            <div className="flex flex-col gap-1">
              <Text className="text-xs text-muted font-bold">On</Text>

              <MarketplacePill
                marketplace={order.marketplace}
                originName={order.originName}
              />
            </div>

            {accountAddress && (
              <div className="p-0">
                <OrdersTableAction
                  chainId={chainId}
                  collectionAddress={collectionContractAddress as Hex}
                  tokenId={tokenId}
                  order={order}
                />
              </div>
            )}
          </div>
        </Table.Cell>
      </Table.Row>
      {/* for wide screens */}
      <Table.Row
        className={cn(
          index % 2 === 0 ? 'bg-background-secondary/50' : '',
          'hidden md:table-row!',
        )}
      >
        <Table.Cell>
          {currency ? (
            <Text className="text-xs text-secondary font-medium">
              {formatPrice(BigInt(order.priceAmount), currency.decimals)}{' '}
              {currency.symbol}
            </Text>
          ) : (
            <CustomSkeleton className="w-16 h-4" />
          )}
        </Table.Cell>

        <Table.Cell className="text-xs text-secondary font-medium">
          {formattedQuantity}
        </Table.Cell>

        <Table.Cell>
          <AddressPill address={order.createdBy} />
        </Table.Cell>

        <Table.Cell>
          <TimeLeft endDate={order.validUntil} />
        </Table.Cell>

        <Table.Cell>
          <MarketplacePill
            marketplace={order.marketplace}
            originName={order.originName}
          />
        </Table.Cell>

        {accountAddress && (
          <Table.Cell className="p-0 pr-2">
            <OrdersTableAction
              chainId={chainId}
              collectionAddress={collectionContractAddress as Hex}
              tokenId={tokenId}
              order={order}
            />
          </Table.Cell>
        )}
      </Table.Row>
    </>
  );
};

export default OrdersTableRow;
