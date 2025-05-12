'use client';

import { Text } from '@0xsequence/design-system';
import Link from 'next/link';

type HeaderLogoProps = {
  logoUrl?: string;
  title?: string;
};

export const HeaderLogo = ({ logoUrl, title }: HeaderLogoProps) => {
  return (
    <Link
      prefetch={false}
      href="/"
      className={'flex items-center text-xl font-bold text-secondary'}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          className="h-full max-w-[200px] object-contain"
          alt="Logo"
        />
      ) : (
        <Text className="text-xl" fontWeight="bold">
          {title}
        </Text>
      )}
    </Link>
  );
};
