import { ssrClient } from '~/app/marketplace-sdk/ssr';

import { Footer } from './Footer';
import { Header } from './Header';
import HeaderDrawerMenu from './Header/Drawer';
import { HeaderDrawerProvider } from './Header/Drawer/HeaderDrawerContext';

export async function Layout({ children }: { children: React.ReactNode }) {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  return (
    <HeaderDrawerProvider>
      <div className="min-h-screen bg-background-primary">
        <Header />
        <HeaderDrawerMenu socials={marketplaceConfig.socials} />

        {children}
        <Footer />
      </div>
    </HeaderDrawerProvider>
  );
}
