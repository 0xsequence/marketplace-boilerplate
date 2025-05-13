const storeConfig = {
  shop: {
    enabled: true,
    name: 'Shop',
    // Landing banner image
    bannerUrl: '/images/landing-banner-placeholder.png',
    collections: [
      {
        name: 'Collection 1',
        chainId: 80002,
        // Collection banner image
        bannerUrl: '/images/collection-banner-placeholder.png',
        salesAddress: '0xddc7029ce8390cdd6b6c1ff58d4bf4c3f1f88bed',
        // This is the address of the items collection, not the sales address
        address: '0xbb92fdb23b41c1f47f01691a0aa6e747fab36847',
        itemsForSale: ['1', '2', '3'],
      },
    ],
  },
  market: {
    enabled: true,
  },
} as const;

export default storeConfig;
