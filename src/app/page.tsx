import storeConfig from '~/store-config';

import { redirect } from 'next/navigation';

const Page = async () => {
  const shopEnabled = storeConfig.shop.enabled;

  if (shopEnabled) {
    return redirect('/shop');
  }
  return redirect('/market');
};

export default Page;

export const runtime = 'edge';
