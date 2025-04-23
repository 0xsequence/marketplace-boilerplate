import { type ComponentProps } from 'react';

import { getNetwork } from '@0xsequence/connect';
import {
  cn,
  NetworkImage as OriginalNetworkImage,
  Tooltip,
} from '@0xsequence/design-system';
import { NetworkType } from '@0xsequence/network';

type CustomNetworkImageProps = ComponentProps<typeof OriginalNetworkImage>;

const CustomNetworkImage = (props: CustomNetworkImageProps) => {
  const network = getNetwork(props.chainId);
  const isTestnet = network.type === NetworkType.TESTNET;

  return (
    <Tooltip message={network.title || network.name} disabled={!isTestnet}>
      <div className="relative">
        <OriginalNetworkImage
          {...props}
          className={cn('w-3 h-3', props.className)}
        />

        {isTestnet && (
          <div className="-top-0.5 -left-0.5 bg-yellow-500 border border-yellow-700 w-1.5 h-1.5 rounded-full absolute" />
        )}
      </div>
    </Tooltip>
  );
};

export default CustomNetworkImage;
