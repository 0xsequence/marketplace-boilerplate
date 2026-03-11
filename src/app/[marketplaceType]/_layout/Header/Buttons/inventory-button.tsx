'use client';

import { GridIcon, Tooltip, IconButton } from '@0xsequence/design-system';
import type { Route } from 'next';
import Link from 'next/link';

export function InventoryButton() {
  return (
    <Tooltip message="Inventory">
      <IconButton
        asChild
        icon={GridIcon}
        variant="secondary"
        size="sm"
        className="rounded-lg bg-background-raised! hover:bg-background-raised/80"
      >
        <Link href={'/market/inventory' as Route}></Link>
      </IconButton>
    </Tooltip>
  );
}
