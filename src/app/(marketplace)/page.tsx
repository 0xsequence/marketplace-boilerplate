import { ssrClient } from '../marketplace-sdk/ssr';
import LandingPage from './_landing/LandingPage';
import { redirect } from 'next/navigation';

const Page = async () => {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  // Redirect to the collection page if there's only one collection
  if (marketplaceConfig?.collections?.length === 1) {
    const collection = marketplaceConfig.collections[0];
    if (collection) {
      redirect(`/${collection.chainId}/${collection.address}/items`);
    }
  }

  return <LandingPage />;
};

export default Page;

export const runtime = 'edge';
