'use client';

import { useEffect } from 'react';

import { useAnalytics } from './databeat';
import { usePathname } from 'next/navigation';

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const analytics = useAnalytics();
  useEffect(() => {
    analytics?.trackView({
      path: pathname,
    });
  }, [pathname, analytics]);

  return <>{children}</>;
};

export default AnalyticsProvider;
