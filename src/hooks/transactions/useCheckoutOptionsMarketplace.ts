import {
  type CheckoutOptionsMarketplaceArgs
} from '~/lib/queries/marketplace/marketplace.gen';
import { fetchCheckoutOptionsMarketplace } from '~/lib/queries/fetchers'

import { useQuery } from '@tanstack/react-query';

type UseCheckoutOptionsMarketplaceArgs = CheckoutOptionsMarketplaceArgs & { chainId: number }

interface UseCheckoutOptionsMarketplaceOptions {
  disabled: boolean
}

export const useCheckoutOptionsMarketplace = (args: UseCheckoutOptionsMarketplaceArgs, options: UseCheckoutOptionsMarketplaceOptions) =>
  useQuery({
    queryKey: [
      'useCheckoutOptionsMarketplace', args
    ],
    queryFn: () => {
      const {
        chainId,
        ...restArgs
      } = args

      return fetchCheckoutOptionsMarketplace({
        ...restArgs,
        chainId,
      })
    },
    retry: false,
    enabled: !options.disabled && !!args.wallet
  });
