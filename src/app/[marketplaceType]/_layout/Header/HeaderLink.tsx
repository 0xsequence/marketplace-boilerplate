'use client';

import { Text } from '@0xsequence/design-system';
import { type Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  exactMatch?: boolean;
}

export const HeaderLink = ({
  href,
  children,
  exactMatch = false,
}: HeaderLinkProps) => {
  const pathname = usePathname();
  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href as Route}>
      <Text className={`text-sm ${isActive ? 'text-primary' : 'text-muted'}`}>
        {children}
      </Text>
    </Link>
  );
};
