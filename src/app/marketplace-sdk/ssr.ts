'use server';

import { extractProjectId } from './extract-project-id';
import { extractUserAddressFromCookies } from './extractUserAddressFromCookies';
import { getBuilderApiUrl, getBuilderFEUrl } from './get-builder-url';
import { getHostname } from './get-hostname';
import { getIsAtLeastCollaborator } from './show-private';
import { BuilderAPI, type Env } from '@0xsequence/marketplace-sdk';
import { createSSRClient } from '@0xsequence/marketplace-sdk/react/ssr';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const ssrClient = async () => {
  const hostname = await getHostname();
  const headersList = await headers();
  const defaultEnv = (process.env.NEXT_PUBLIC_ENV || 'production') as Env;
  const cookie = headersList.get('cookie') || '';
  const builderUrl = getBuilderApiUrl(defaultEnv);

  const api = new BuilderAPI(
    builderUrl,
    process.env.PROJECT_ACCESS_KEY, // For local dev
    process.env.BUILDER_API_KEY, // For staging/production
  );

  const lookupMarketplaceArgs = process.env.PROJECT_ACCESS_KEY
    ? {
        projectId: extractProjectId(process.env.PROJECT_ACCESS_KEY),
        userAddress: extractUserAddressFromCookies(cookie),
      }
    : {
        domain: hostname,
        userAddress: extractUserAddressFromCookies(cookie),
      };

  let marketplaceConfig;
  try {
    marketplaceConfig = await api.lookupMarketplace(lookupMarketplaceArgs);
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (!marketplaceConfig?.marketplace) {
    notFound();
  }

  const projectAccessKey =
    marketplaceConfig.marketplace.settings.accessKey ||
    process.env.PROJECT_ACCESS_KEY;

  if (!projectAccessKey) {
    notFound();
  }

  const projectId = marketplaceConfig.marketplace.projectId;
  let marketplaceEnabled = true;

  if (
    !marketplaceConfig.marketplace.shop.enabled &&
    !marketplaceConfig.marketplace.market.enabled
  ) {
    marketplaceEnabled = false;
  }

  const marketIsPrivate = marketplaceConfig.marketplace.market.private;
  const shopIsPrivate = marketplaceConfig.marketplace.shop.private;
  const hasPrivateShopCollection = marketplaceConfig.shopCollections.some(
    (collection) => collection.private,
  );

  let showPreviewBanner = false;
  let builderFEUrl = 'sequence.build';

  let isAtLeastCollaborator = false;
  try {
    isAtLeastCollaborator = await getIsAtLeastCollaborator({
      builderUrl,
      projectId,
      cookies: cookie,
    });
  } catch {}

  if (marketIsPrivate || shopIsPrivate) {
    const isMarketEnabled = marketplaceConfig.marketplace.market.enabled;
    const isShopEnabled = marketplaceConfig.marketplace.shop.enabled;

    const marketEnabledAndPrivate = isMarketEnabled && marketIsPrivate;
    const shopEnabledAndPrivate = isShopEnabled && shopIsPrivate;

    // show preview banner if the user is at least a collaborator and one of the shop/market is private and enabled
    showPreviewBanner =
      isAtLeastCollaborator &&
      (marketEnabledAndPrivate || shopEnabledAndPrivate);

    // This is a little hacky... We are setting the enabled flag to the opposite of
    // the private flag if the user is NOT a collaborator, this means that the rest of the
    // app will only need to check the enabled flag
    if (isMarketEnabled) {
      marketplaceConfig.marketplace.market.enabled =
        !marketIsPrivate || isAtLeastCollaborator;
    }

    if (isShopEnabled) {
      marketplaceConfig.marketplace.shop.enabled =
        !shopIsPrivate || isAtLeastCollaborator;
    }

    // If both shop and market are disabled (private) and the user is not a collaborator, then the marketplace is disabled
    if (!isAtLeastCollaborator) {
      if (
        !marketplaceConfig.marketplace.shop.enabled &&
        !marketplaceConfig.marketplace.market.enabled
      ) {
        marketplaceEnabled = false;
      }
    }

    if (isAtLeastCollaborator) {
      try {
        builderFEUrl = await getBuilderFEUrl({
          projectId,
          env: defaultEnv,
          projectAccessKey,
        });
      } catch {}
    }
  }

  if (hasPrivateShopCollection && isAtLeastCollaborator) {
    showPreviewBanner = true;
  }

  const isTrailsEnabled =
    marketplaceConfig.marketplace.settings.isTrailsEnabled;

  return {
    marketplaceEnabled,
    builderFEUrl,
    showPreviewBanner,
    ...createSSRClient({
      cookie,
      config: {
        projectAccessKey,
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
        projectId: String(projectId),
        checkoutMode: isTrailsEnabled ? 'trails' : 'crypto',
        _internal: {
          prefetchedMarketplaceSettings: marketplaceConfig,
          overrides: {
            api: {
              builder: {
                env: defaultEnv,
              },
              metadata: {
                env: defaultEnv,
              },
              marketplace: {
                env: defaultEnv,
              },
              indexer: {
                env: defaultEnv,
              },
              sequenceApi: {
                env: defaultEnv,
              },
              nodeGateway: {
                env: defaultEnv,
              },
              sequenceWallet: {
                env: defaultEnv,
              },
              trails: {
                env: defaultEnv,
              },
            },
          },
        },
      },
    }),
  };
};
