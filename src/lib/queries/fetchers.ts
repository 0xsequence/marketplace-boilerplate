import {
  getIndexerClient,
  getMarketplaceClient,
  getMetadataClient,
  getOldMarketplaceClient,
} from './clients';
import {
  type ListCollectiblesWithHighestOfferArgs,
  type ListCollectiblesWithLowestListingArgs,
  type GetCollectibleHighestOfferArgs,
  type GetCollectibleLowestListingArgs,
  type SyncOrdersArgs,
  type CheckoutOptionsMarketplaceArgs
} from './marketplace/marketplace.gen';
import type { GetTopOrdersArgs } from './marketplace/oldMarketplace.gen';
import type { GetTokenBalancesArgs } from '@0xsequence/indexer';
import {
  type TokenCollectionFiltersArgs,
  type GetTokenMetadataArgs,
} from '@0xsequence/metadata';
import { group } from 'radash';

export type CollectionArgs = {
  collectionId: string;
  chainID: string;
};

export type BatchCollectionArgs = CollectionArgs[];

export const fetchCollectionsMetadata = (args: BatchCollectionArgs) => {
  // Group the arguments by chainID for batch processing
  const groupedArgs = group(args, (arg) => arg.chainID);
  const entries = Object.entries(groupedArgs);

  return Promise.all(
    entries
      .map(([chainID, collections]) => {
        const metadata = getMetadataClient(chainID);
        const contractAddresses = collections!.map((c) => c.collectionId);

        return metadata.getContractInfoBatch({
          chainID,
          contractAddresses,
        });
      })
      .map(async (resp) => {
        const result = await resp;
        return result.contractInfoMap;
      }),
  );
};

export const fetchContractInfo = (args: CollectionArgs) => {
  const metadata = getMetadataClient(args.chainID);

  return metadata
    .getContractInfo({
      chainID: args.chainID,
      contractAddress: args.collectionId,
    })
    .then((resp) => resp.contractInfo);
};

export const fetchTokenMetadata = (args: GetTokenMetadataArgs) => {
  const metadata = getMetadataClient(args.chainID);

  return metadata.getTokenMetadata(args).then((resp) => resp.tokenMetadata[0]);
};

export const fetchCollectionFilters = (args: TokenCollectionFiltersArgs) => {
  const metadata = getMetadataClient(args.chainID);

  return metadata.tokenCollectionFilters(args).then((resp) => resp.filters);
};

export type TokenBalancesArgs = {
  chainId: number;
  accountAddress: string;
  contractAddress?: string;
  includeMetadata?: boolean;
  page?: GetTokenBalancesArgs['page'];
  tokenId?: string;
};

export const fetchTokenBalances = ({
  chainId,
  accountAddress,
  contractAddress,
  includeMetadata = true,
  tokenId,
  page,
}: TokenBalancesArgs) => {
  const indexer = getIndexerClient(chainId);
  const includeContracts = [];
  if (contractAddress) {
    includeContracts.push(contractAddress);
  }

  return indexer.getTokenBalances({
    accountAddress,
    contractAddress,
    includeMetadata,
    tokenID: tokenId,
    metadataOptions: {
      verifiedOnly: true,
      includeContracts,
    },
    page,
  });
};

export const fetchTopOrders = (
  args: GetTopOrdersArgs & { chainId: number },
) => {
  const oldMarketplace = getOldMarketplaceClient(args.chainId);
  return oldMarketplace.getTopOrders(args);
};

export const fetchLowestListing = (
  args: GetCollectibleLowestListingArgs & { chainId: number },
) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.getCollectibleLowestListing(args);
};

export const fetchHighestOffer = (
  args: GetCollectibleHighestOfferArgs & { chainId: number },
) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.getCollectibleHighestOffer(args);
};

export const fetchListLowestListings = (
  args: ListCollectiblesWithLowestListingArgs & { chainId: number },
) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.listCollectiblesWithLowestListing(args);
};

export const fetchListHighestOffers = (
  args: ListCollectiblesWithHighestOfferArgs & { chainId: number },
) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.listCollectiblesWithHighestOffer(args);
};

export const fetchCurrencies = (args: { chainId: number }) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.listCurrencies();
};

export const fetchSyncOrders = (args: SyncOrdersArgs & { chainId: number }) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.syncOrders(args);
};

export const fetchCheckoutOptionsMarketplace = (args: CheckoutOptionsMarketplaceArgs & { chainId: number }) => {
  const marketplace = getMarketplaceClient(args.chainId);
  return marketplace.checkoutOptionsMarketplace(args);
};
