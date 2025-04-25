'use client';

import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { Table } from '~/components/ui';
import { cn } from '~/lib/utils';

import OrdersTableAction from './Action';
import AddressPill from './AddressPill';
import MarketplacePill from './MarketplacePill';
import TimeLeft from './TimeLeft';
import { Text } from '@0xsequence/design-system';
import {
  compareAddress,
  formatPrice,
  type Order,
} from '@0xsequence/marketplace-sdk';
import { useCurrencies } from '@0xsequence/marketplace-sdk/react';
import type { Hex } from 'viem';
import { useAccount } from 'wagmi';

const OrdersTableRow = ({
  order,
  index,
  tokenId,
}: {
  order: Order;
  index: number;
  tokenId: string;
}) => {
  const { chainId, collectionContractAddress } = order;
  const { address: accountAddress } = useAccount();
  const { data: currencies } = useCurrencies({
    chainId,
  });
  const currency = currencies?.find((c) =>
    compareAddress(c.contractAddress, order.priceCurrencyAddress),
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
                {order.quantityRemaining}
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
          {order.quantityRemaining}
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
