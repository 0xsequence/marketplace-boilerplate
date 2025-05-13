'use client';

import { createPortal } from 'react-dom';

import { useIsClient } from '~/hooks/ui/useIsClient';

export function Portal({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? createPortal(children, document.body) : null;
}
