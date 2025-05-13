'use client';

import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';

import Pill from './Pill';
import { GradientAvatar, Text } from '@0xsequence/design-system';
import { truncateMiddle } from '@0xsequence/marketplace-sdk';

const AddressPill = ({ address }: { address: string }) => {
  const isMinWidth = useIsMinWidth('@sm');
  return (
    <Pill>
      <GradientAvatar address={address.toLowerCase()} size="xs" />
      <Text className="text-xs text-secondary font-medium">
        {isMinWidth
          ? truncateMiddle(address, 1, 3)
          : truncateMiddle(address, 15, 3)}
      </Text>
    </Pill>
  );
};

export default AddressPill;
