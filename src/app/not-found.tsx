import DisabledMarketplace from './disabled-marketplace';
import { extractProjectId } from './marketplace-sdk/extract-project-id';
import { getBuilderApiUrl } from './marketplace-sdk/get-builder-url';
import { getHostname } from './marketplace-sdk/get-hostname';
import { getIsAtLeastCollaborator } from './marketplace-sdk/show-private';
import { Button, Image, Text } from '@0xsequence/design-system';
import { BuilderAPI, type Env } from '@0xsequence/marketplace-sdk';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
  const hostname = await getHostname();
  const headersList = await headers();
  const defaultEnv = (process.env.NEXT_PUBLIC_ENV || 'production') as Env;

  // Get host parts for createyourown functionality
  const rootDomain = hostname.split('.').slice(-2).join('.');
  const subdomain = hostname.split('.').slice(0, -2).join('.');

  const builderUrl = getBuilderApiUrl(defaultEnv);
  const api = new BuilderAPI(
    builderUrl,
    process.env.PROJECT_ACCESS_KEY, // For local dev
    process.env.BUILDER_API_KEY, // For staging/production
  );

  const lookupMarketplaceArgs = process.env.PROJECT_ACCESS_KEY
    ? {
        projectId: extractProjectId(process.env.PROJECT_ACCESS_KEY),
      }
    : {
        domain: hostname,
      };

  let isValidMarketplaceHostname = true;
  let marketplaceConfig;

  try {
    marketplaceConfig = await api.lookupMarketplace(lookupMarketplaceArgs);
  } catch (error) {
    console.error(error);
    //TODO: we should check the error and only set this on invalid hostnames
    isValidMarketplaceHostname = false;
  }

  if (!isValidMarketplaceHostname) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-primary dark:bg-background-primary">
        <div className="text-center space-y-6">
          <Image
            alt="Cube"
            src="/images/vending-machine-colorful.png"
            className="h-[80px] w-[80px] mx-auto mb-6"
          />

          <div className="flex justify-center items-center gap-1">
            <Text className="text-2xl font-semibold text-gray-200">
              {subdomain}
            </Text>
            <Text className="text-2xl font-semibold text-gray-400">
              {subdomain && '.'}
              {rootDomain} is available!
            </Text>
          </div>

          <Text className="text-secondary max-w-md">
            Want to host your own marketplace here? <br /> Get started at
            <a
              className="ml-2 text-primary hover:underline"
              href="https://sequence.xyz/marketplace"
              target="_blank"
              rel="noreferrer"
            >
              sequence.xyz/marketplace
            </a>
          </Text>
        </div>
      </div>
    );
  }

  // If marketplace exists, check if it's enabled and if user has access
  if (marketplaceConfig) {
    const projectId = marketplaceConfig.marketplace.projectId;
    const cookie = headersList.get('cookie') || '';
    let marketplaceEnabled = true;

    if (
      !marketplaceConfig.marketplace.shop.enabled &&
      !marketplaceConfig.marketplace.market.enabled
    ) {
      marketplaceEnabled = false;
    }

    const marketIsPrivate =
      marketplaceConfig.marketplace.market.private &&
      marketplaceConfig.marketCollections.length > 0;

    const shopIsPrivate =
      marketplaceConfig.marketplace.shop.private &&
      marketplaceConfig.shopCollections.length > 0;

    if (marketIsPrivate || shopIsPrivate) {
      let isAtLeastCollaborator = false;
      try {
        isAtLeastCollaborator = await getIsAtLeastCollaborator({
          builderUrl,
          projectId,
          cookies: cookie,
        });
      } catch {}

      const isMarketEnabled = marketplaceConfig.marketplace.market.enabled;
      const isShopEnabled = marketplaceConfig.marketplace.shop.enabled;

      if (isMarketEnabled) {
        marketplaceConfig.marketplace.market.enabled =
          !marketIsPrivate || isAtLeastCollaborator;
      }

      if (isShopEnabled) {
        marketplaceConfig.marketplace.shop.enabled =
          !shopIsPrivate || isAtLeastCollaborator;
      }

      if (!isAtLeastCollaborator) {
        if (
          !marketplaceConfig.marketplace.shop.enabled &&
          !marketplaceConfig.marketplace.market.enabled
        ) {
          marketplaceEnabled = false;
        }
      }
    }

    if (!marketplaceEnabled) {
      return <DisabledMarketplace />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-primary dark:bg-background-primary">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-primary">Page not found</h2>
        <p className="text-secondary max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/">
          <Button>Go to home</Button>
        </Link>
      </div>
    </div>
  );
}

export const runtime = 'edge';
