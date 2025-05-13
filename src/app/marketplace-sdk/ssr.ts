'use server';

import { createSSRClient } from '@0xsequence/marketplace-sdk/react/ssr';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export const ssrClient = async () => {
  const headersList = await headers();

  const projectAccessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  if (!projectAccessKey || !projectId) {
    throw new Error('Missing environment variables');
  }

  return createSSRClient({
    cookie: headersList.get('cookie') || '',
    config: {
      projectAccessKey,
      walletConnectProjectId,
      projectId,
    },
    queryClient: new QueryClient(),
  });
};
