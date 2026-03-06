import { ContractType } from '@0xsequence/marketplace-sdk';

const getStickyFilterSidebarTop = ({
  marketplaceType,
  collectionType,
}: {
  marketplaceType: 'market' | 'shop';
  collectionType: ContractType;
}) => {
  if (marketplaceType === 'shop') {
    return collectionType === ContractType.ERC721 ? '320px' : '252px';
  }
  return '228px';
};

export default getStickyFilterSidebarTop;
