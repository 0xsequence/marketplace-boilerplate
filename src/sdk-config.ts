import { env } from './env';
import { type SdkConfig } from '@0xsequence/marketplace-sdk';
import { createSSRClient } from '@0xsequence/marketplace-sdk/react/ssr';
import { headers } from 'next/headers';

// Use embedded wallet if waas config key is provided
const embedded = env.NEXT_PUBLIC_WAAS_CONFIG_KEY
  ? {
      googleClientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      waasConfigKey: env.NEXT_PUBLIC_WAAS_CONFIG_KEY,
    }
  : undefined;

export const config: SdkConfig = {
  projectId: env.NEXT_PUBLIC_SEQUENCE_PROJECT_ID,
  projectAccessKey: env.NEXT_PUBLIC_SEQUENCE_ACCESS_KEY,
  wallet: {
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    embedded,
  },
};

export const ssrClient = () => {
  const headersList = headers();
  return createSSRClient({
    cookie: headersList.get('cookie') || '',
    config,
  });
};
