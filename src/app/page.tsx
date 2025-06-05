import { ssrClient } from './marketplace-sdk/ssr';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  if (marketplaceConfig.shop.enabled) {
    return redirect('/shop');
  }
  return redirect('/market');
};

export default Page;

export const runtime = 'edge';
