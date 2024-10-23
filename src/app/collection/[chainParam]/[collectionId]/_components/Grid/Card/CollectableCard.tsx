import { AddToCartButton } from '~/components/buttons/AddToCartButton';
import { Image, cn } from '~/components/ui';
import { classNames } from '~/config/classNames';
import { Routes } from '~/lib/routes';
import { getChainId } from '~/lib/utils/getChain';

import { Footer } from './Footer';
import type { CollectibleOrder } from '@0xsequence/marketplace-sdk';
import Link from 'next/link';

export const CollectibleCard = ({ data }: { data: CollectibleOrder }) => {
  const { collectionId, chainParam, mode } = Routes.collection.useParams();
  return (
    <Card
      data={data}
      chainParam={chainParam}
      collectionId={collectionId}
      orderSide={mode || 'buy'}
    />
  );
};

type CardProps = {
  data: CollectibleOrder;
  chainParam: string | number;
  collectionId: string;
  orderSide: 'buy' | 'sell';
};

export const Card = ({
  data,
  chainParam,
  collectionId,
  orderSide,
}: CardProps) => {
  const { tokenId } = data.metadata;
  const chainId = getChainId(chainParam)!;

  return (
    <article
      className={cn(
        classNames.collectibleSelectionIndicator,
        `relative flex h-full w-full flex-col align-top m-[0.1rem]`,
        'rounded-md bg-foreground/5 outline outline-2 outline-transparent',
        'z-10 overflow-hidden !outline transition-all',
      )}
    >
      <Link
        href={Routes.collectible({
          chainParam,
          collectionId,
          tokenId,
        })}
        className="peer h-full p-2"
      >
        <Image
          src={data.metadata.image}
          containerClassName="bg-foreground/10 aspect-square rounded-sm overflow-hidden"
          className="aspect-square rounded-[inherit] hover:scale-125 ease-in duration-150"
        />
        <Footer {...data} />
      </Link>
      <AddToCartButton
        className={cn(
          'bottom-0 m-0 w-full !rounded-none ease-in-out hover:visible peer-hover:visible',
          '[@media(hover:hover)]:invisible [@media(hover:hover)]:absolute',
        )}
        chainId={chainId}
        collectionId={collectionId}
        collectibleOrder={data}
        orderSide={orderSide}
      />
    </article>
  );
};
