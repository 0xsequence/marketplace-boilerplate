'use client';

import { useState } from 'react';

import { type MarketConfig } from '~/config/marketplace';
import { createWagmiConfig } from '~/config/networks/wagmi';
import { env } from '~/env';
import { getQueryClient } from '~/queries/getQueryClient';

import {
  KitProvider,
  defaultSignInOptions,
  type KitConfig,
} from '@0xsequence/kit';
import { KitCheckoutProvider } from '@0xsequence/kit-checkout';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider, Tooltip } from 'system';
import { WagmiProvider, type State } from 'wagmi';

export default function Providers({
  marketConfig,
  children,
  wagmiInitState,
}: {
  wagmiInitState: State | undefined;
  marketConfig: MarketConfig;
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const walletAuthOptions = defaultSignInOptions.walletAuthOptions;
  marketConfig.walletOptions.forEach((wallet) => {
    switch (wallet) {
      case 'coinbase':
        walletAuthOptions.push('coinbase-wallet');
        break;
      case 'walletconnect':
        walletAuthOptions.push('wallet-connect');
        break;
      case 'sequence':
      case 'metamask':
      case 'injected':
      default:
        walletAuthOptions.push(wallet);
        return;
    }
  });

  const kitConfig = {
    defaultTheme: 'dark',
    projectAccessKey: env.NEXT_PUBLIC_SEQUENCE_ACCESS_KEY,
    signIn: {
      projectName: marketConfig.title,
      showEmailInput: defaultSignInOptions.showEmailInput,
      socialAuthOptions: defaultSignInOptions.socialAuthOptions,
      walletAuthOptions,
    },
    disableAnalytics: true,
  } satisfies KitConfig;

  const [wagmiConfig] = useState(createWagmiConfig(marketConfig));

  return (
    <WagmiProvider config={wagmiConfig} initialState={wagmiInitState}>
      <KitProvider config={kitConfig}>
        <KitCheckoutProvider>
          <QueryClientProvider client={queryClient}>
            <Tooltip.Provider>
              {children}
              <ToastProvider />
            </Tooltip.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </KitCheckoutProvider>
      </KitProvider>
    </WagmiProvider>
  );
}
