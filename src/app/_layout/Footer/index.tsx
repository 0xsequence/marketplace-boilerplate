'use client';

import { classNames } from '~/config/classNames';

import { Button, Flex, GasIcon, Text, cn } from '$ui';
import NextLink from 'next/link';
import { useAccount, useEstimateFeesPerGas } from 'wagmi';

export const Footer = () => {
  const { chain } = useAccount();

  const { data } = useEstimateFeesPerGas({
    formatUnits: 'gwei',
    chainId: chain?.id ?? 1,
  });

  return (
    <Flex
      className={cn(
        classNames.footer,
        'w-full flex-col-reverse items-center justify-between sm:flex-row',
      )}
    >
      <Flex className="gap-1 p-2 text-foreground/70">
        <GasIcon className="h-3.5 w-3.5" />

        {data?.gasPrice ? (
          <Text className="text-xs uppercase text-inherit">
            {data.gasPrice} gwei
          </Text>
        ) : null}
      </Flex>

      <Flex className="gap-2">
        <Button asChild size="sm" variant="link" className="text-foreground/70">
          <NextLink href="/terms">Terms of Use</NextLink>
        </Button>
        <Button asChild size="sm" variant="link" className="text-foreground/70">
          <NextLink href="/privacy">Privacy</NextLink>
        </Button>
      </Flex>
    </Flex>
  );
};
