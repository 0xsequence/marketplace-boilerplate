import { OverwriteCookie } from '~/dev/types';

import { config } from './config';
import { type Env } from '@0xsequence/marketplace-sdk';
import { createSSRClient } from '@0xsequence/marketplace-sdk/react/ssr';
import { cookies, headers } from 'next/headers';

export const ssrClient = () => {
  const cookieJar = cookies();

  const headersList = headers();

  console.log('cookieJar', cookieJar);
  console.log('headersList', headersList);

  const projectId =
    cookieJar.get(OverwriteCookie.MARKETPLACE_PROJECT)?.value || '13639';
  // env.NEXT_PUBLIC_SEQUENCE_PROJECT_ID;

  const marketplaceEnv = (cookieJar.get(OverwriteCookie.MARKETPLACE_ENV)
    ?.value || 'production') as Env;

  const builderEnv = (cookieJar.get(OverwriteCookie.BUILDER_ENV)?.value ||
    'production') as Env;

  const metadataEnv = (cookieJar.get(OverwriteCookie.METADATA_ENV)?.value ||
    'production') as Env;

  const indexerEnv = (cookieJar.get(OverwriteCookie.INDEXER_ENV)?.value ||
    'production') as Env;

  return createSSRClient({
    cookie: headersList.get('cookie') || '',
    config: {
      ...config,
      projectId,
      _internal: {
        devAccessKey: "AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM",
        builderEnv,
        marketplaceEnv,
        metadataEnv,
        indexerEnv,
      },
    },
  });
};
