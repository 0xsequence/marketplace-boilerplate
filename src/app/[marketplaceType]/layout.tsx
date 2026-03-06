import { ssrClient } from '../marketplace-sdk/ssr';
import { type Metadata } from 'next';

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata(): Promise<Metadata> {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  return {
    title: marketplaceConfig.settings.title,
  };
}
