'use client';

import { useState } from 'react';

import AnalyticsProvider from '~/analytics/analytics-provider';

import { SequenceCheckoutProvider } from '@0xsequence/checkout';
import {
  type ConnectConfig,
  type ExtendedConnector,
  SequenceConnectProvider,
} from '@0xsequence/connect';
import { ThemeProvider, ToastProvider } from '@0xsequence/design-system';
import { SequenceHooksProvider } from '@0xsequence/hooks';
import type { MarketplaceConfig, SdkConfig } from '@0xsequence/marketplace-sdk';
import {
  createWagmiConfig,
  getQueryClient,
  MarketplaceProvider,
  ModalProvider,
} from '@0xsequence/marketplace-sdk/react';
import { SequenceWalletProvider } from '@0xsequence/wallet-widget';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type State, WagmiProvider } from 'wagmi';

const SHOW_DESCRIPTIVE_SOCIALS_THRESHOLD = 2;

const queryClient = getQueryClient();

export default function Providers({
  sdkInitialState,
  sdkConfig,
  marketplaceConfig,
  children,
}: {
  sdkInitialState?: { wagmi?: State };
  sdkConfig: SdkConfig;
  marketplaceConfig: MarketplaceConfig;
  children: React.ReactNode;
}) {
  const [wagmiConfig] = useState(
    createWagmiConfig(marketplaceConfig, sdkConfig, !!sdkInitialState),
  );

  const socialAuthConnectors = (wagmiConfig.connectors as ExtendedConnector[])
    .filter((c) => c._wallet?.type === 'social')
    .filter((c) => !c._wallet.id.includes('email'));

  const showDescriptiveSocials =
    socialAuthConnectors.length <= SHOW_DESCRIPTIVE_SOCIALS_THRESHOLD;

  const connectConfig = {
    projectAccessKey: sdkConfig.projectAccessKey,
    signIn: {
      projectName: marketplaceConfig.title,
      descriptiveSocials: showDescriptiveSocials,
    },
  } satisfies ConnectConfig;

  return (
    <ThemeProvider>
      <WagmiProvider config={wagmiConfig} initialState={sdkInitialState?.wagmi}>
        <QueryClientProvider client={queryClient}>
          <SequenceHooksProvider config={connectConfig}>
            <SequenceConnectProvider config={connectConfig}>
              <SequenceCheckoutProvider>
                <SequenceWalletProvider>
                  <ToastProvider>
                    <MarketplaceProvider config={sdkConfig}>
                      <AnalyticsProvider>{children}</AnalyticsProvider>
                      <ReactQueryDevtools initialIsOpen={false} />
                      <ModalProvider />
                    </MarketplaceProvider>
                  </ToastProvider>
                </SequenceWalletProvider>
              </SequenceCheckoutProvider>
            </SequenceConnectProvider>
          </SequenceHooksProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
