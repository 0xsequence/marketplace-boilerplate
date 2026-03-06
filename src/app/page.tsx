import { ssrClient } from './marketplace-sdk/ssr';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  if (marketplaceConfig.shop.enabled) {
    return redirect('/shop' as Route);
  }
  return redirect('/market' as Route);
};

export default Page;

export const runtime = 'edge';
