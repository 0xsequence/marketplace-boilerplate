import { getMarketConfig } from '~/config/marketplace';

import { Flex } from '$ui';
import Inventory from './Inventory';
import type { Metadata } from 'next';

const InventoryPage = async ({
  params,
}: {
  params: { chainParam: string; address: string };
}) => {
  const marketConfig = await getMarketConfig();
  return (
    <Flex
      className="mx-auto h-full w-full max-w-[1400px] flex-col gap-24 py-12"
      style={{
        minHeight: 'calc(100vh - $$footerHeight - $$headerHeight)',
      }}
    >
      <Inventory
        chainParam={params.chainParam}
        queryAccountAddress={params.address}
        marketConfig={marketConfig}
      />
    </Flex>
  );
};

export default InventoryPage;

export const metadata: Metadata = {
  title: 'Inventory',
};

export const runtime = 'edge';
