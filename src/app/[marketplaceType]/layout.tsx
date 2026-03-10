import { ssrClient } from '../marketplace-sdk/ssr';
import { Layout } from './_layout';
import { type Metadata } from 'next';

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}

export async function generateMetadata(): Promise<Metadata> {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  return {
    title: marketplaceConfig.settings.title,
  };
}
