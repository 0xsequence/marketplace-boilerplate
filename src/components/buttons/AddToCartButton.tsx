'use client';

import { Button } from '$ui';
import type { CollectibleOrder } from '@0xsequence/marketplace-sdk';

const orderTypes = {
  buy: {
    label: 'Buy',
    onClick: () => {},
  },
  sell: {
    label: 'Sell',
    onClick: () => {},
  },
  order: {
    label: 'Place offer',
    onClick: () => {},
  },
  listing: {
    label: 'Create Listing',
    onClick: () => {},
  },
};

type OrderSide = 'buy' | 'sell';

type AddToCartButtonProps = {
  className?: string;
  chainId: number;
  collectionId: string;
  collectibleOrder: CollectibleOrder;
  orderSide: OrderSide;
};

export const AddToCartButton = ({
  className,
  chainId,
  collectionId,
  collectibleOrder,
  orderSide,
}: AddToCartButtonProps) => {
  const order = collectibleOrder.order;

  const onClick = () => {};
  const { label } = orderTypes[orderSide];

  return (
    <Button onClick={onClick} className={className}>
      {label}
    </Button>
  );
};
