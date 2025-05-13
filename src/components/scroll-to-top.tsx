'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

/**
 *
 * @description Scroll to top of the page when the pathname changes.
 * @example
 * ```tsx
 * <ScrollToTop once={true} /> // Scroll to top of the page only once, remove `once` prop to scroll to top on every pathname change.
 * ```
 */
export default function ScrollToTop({ once }: { once?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (once && scrolled) return;

    window.scrollTo(0, 0);
    setScrolled(true);
  }, [pathname]);

  return <></>;
}
