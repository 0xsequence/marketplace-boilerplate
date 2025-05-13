'use client';

import { useConfig } from '@0xsequence/marketplace-sdk/react';
import { type Auth, Databeat } from '@databeat/tracker';

export const useAnalytics = () => {
  const config = useConfig();
  const server = 'https://nodes.sequence.app';

  if (!config.projectAccessKey) {
    return null;
  }

  const auth: Auth = {};
  auth.headers = { 'X-Access-Key': config.projectAccessKey };

  return new Databeat(server, auth, {
    defaultEnabled: true,
    initProps: () => {
      return { origin: globalThis.window?.location.origin };
    },
  });
};
