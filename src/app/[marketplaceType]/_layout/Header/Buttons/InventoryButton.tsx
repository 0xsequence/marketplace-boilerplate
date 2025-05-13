'use client';

import { GridIcon, Tooltip, IconButton } from '@0xsequence/design-system';
import Link from 'next/link';

export function InventoryButton() {
  return (
    <Tooltip message="Inventory">
      <IconButton
        asChild
        icon={GridIcon}
        size="sm"
        className="rounded-lg bg-button-glass hover:bg-button-glass/80"
      >
        <Link href="/inventory"></Link>
      </IconButton>
    </Tooltip>
  );
}
