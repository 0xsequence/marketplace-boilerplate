'use client';

import { createPortal } from 'react-dom';

import { useIsClient } from '~/hooks/ui/use-is-client';

export function Portal({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? createPortal(children, document.body) : null;
}
