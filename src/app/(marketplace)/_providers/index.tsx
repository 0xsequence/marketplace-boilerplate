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
import type { MarketplaceConfig, SdkConfig } from '@0xsequence/marketplace-sdk';
import {
  createWagmiConfig,
  getQueryClient,
  marketplaceConfigOptions,
  MarketplaceProvider,
  ModalProvider,
} from '@0xsequence/marketplace-sdk/react';
import { SequenceWalletProvider } from '@0xsequence/wallet-widget';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type State, WagmiProvider } from 'wagmi';

const queryClient = getQueryClient();

const SHOW_DESCRIPTIVE_SOCIALS_THRESHOLD = 2;

export default function Providers({
  sdkInitialState,
  sdkConfig,
  children,
}: {
  sdkInitialState?: { wagmi?: State };
  sdkConfig: SdkConfig;
  children: React.ReactNode;
}) {
  const { data: marketplaceConfig } = useQuery(
    marketplaceConfigOptions(sdkConfig),
    queryClient,
  );

  return marketplaceConfig ? (
    <Providers2
      config={sdkConfig}
      marketplaceConfig={marketplaceConfig}
      initialState={sdkInitialState}
    >
      {children}
    </Providers2>
  ) : (
    <></>
  );
}

const Providers2 = ({
  config,
  marketplaceConfig,
  children,
  initialState,
}: {
  config: SdkConfig;
  marketplaceConfig: MarketplaceConfig;
  children: React.ReactNode;
  initialState?: { wagmi?: State };
}) => {
  const [wagmiConfig] = useState(
    createWagmiConfig(marketplaceConfig, config, !!initialState),
  );

  const isDev = process.env.NEXT_PUBLIC_ENV === 'development';

  const envOverrides = {
    marketplaceApiUrl: isDev
      ? `https://dev-marketplace-api.sequence.app`
      : `https://marketplace-api.sequence.app`,
    indexerGatewayUrl: isDev
      ? `https://dev-indexer.sequence.app`
      : `https://indexer.sequence.app`,
    sequenceApiUrl: isDev
      ? `https://dev-api.sequence.app`
      : `https://api.sequence.app`,
    metadataUrl: isDev
      ? `https://dev-metadata.sequence.app`
      : `https://metadata.sequence.app`,
    apiUrl: isDev ? `https://dev-api.sequence.app` : `https://api.sequence.app`,
    indexerUrl: isDev
      ? `https://dev-indexer.sequence.app`
      : `https://indexer.sequence.app`,
  };

  const socialAuthConnectors = (wagmiConfig.connectors as ExtendedConnector[])
    .filter((c) => c._wallet?.type === 'social')
    .filter((c) => !c._wallet.id.includes('email'));

  const showDescriptiveSocials =
    socialAuthConnectors.length <= SHOW_DESCRIPTIVE_SOCIALS_THRESHOLD;

  const connectConfig = {
    projectAccessKey: config.projectAccessKey,
    signIn: {
      projectName: marketplaceConfig.title,
      descriptiveSocials: showDescriptiveSocials,
    },
    env: envOverrides,
  } satisfies ConnectConfig;

  return (
    <ThemeProvider>
      <WagmiProvider config={wagmiConfig} initialState={initialState?.wagmi}>
        <QueryClientProvider client={queryClient}>
          <SequenceConnectProvider config={connectConfig}>
            <SequenceCheckoutProvider
              config={{
                env: envOverrides,
              }}
            >
              <SequenceWalletProvider>
                <ToastProvider>
                  <MarketplaceProvider config={config}>
                    <AnalyticsProvider>{children}</AnalyticsProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <ModalProvider />
                  </MarketplaceProvider>
                </ToastProvider>
              </SequenceWalletProvider>
            </SequenceCheckoutProvider>
          </SequenceConnectProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
