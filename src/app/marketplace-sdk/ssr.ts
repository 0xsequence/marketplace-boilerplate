'use server';

import { createSSRClient } from '@0xsequence/marketplace-sdk/react/ssr';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export const ssrClient = async () => {
  const headersList = await headers();

  const projectAccessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  if (!projectAccessKey || !walletConnectProjectId || !projectId) {
    throw new Error('Missing environment variables');
  }

  return createSSRClient({
    cookie: headersList.get('cookie') || '',
    config: {
      projectAccessKey,
      wallet: {
        walletConnectProjectId,
      },
      projectId,
    },
    queryClient: new QueryClient(),
  });
};

// Redploy remove me

async function fetchExtendedMarketplaceConfig(
  hostname: string,
  environment: Env,
) {
  const devURL =
    'https://dev-api.sequence.build/rpc/Builder/GetExtendedMarketplaceConfig';
  const prodURL =
    'https://api.sequence.build/rpc/Builder/GetExtendedMarketplaceConfig';

  const isDev = environment === 'development';
  const url = isDev ? devURL : prodURL;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BUILDER_API_KEY}`,
    },
    body: JSON.stringify({
      hostname,
    }),
  };

  console.log('Request options:', requestOptions);
  const req = await fetch(url, requestOptions);

  const json = (await req.json()) as GetExtendedMarketplaceConfigReturn;

  if (req.status !== 200) {
    console.error('Error fetching extended marketplace config:', json);
    return notFound();
  }

  console.log('Extended marketplace config:', json);

  return json.config;
}
