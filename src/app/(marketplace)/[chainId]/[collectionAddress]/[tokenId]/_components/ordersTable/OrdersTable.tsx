import { type SelectItem } from '~/components/custom-select/CustomSelect';

import { Table } from '../../../../../../../components/ui';
import { type PageState } from '../pagination/PaginationContext';
import OrdersTableBody from './_components/Body';
import OrdersTableFooter from './_components/Footer';
import OrdersTableHeader from './_components/Header';
import OrdersTableBodySkeleton from './_components/Skeletons';
import type { Order } from '@0xsequence/marketplace-sdk';
import type { Hex } from 'viem';

export const PAGE_SIZE_OPTIONS = [
  { value: '5', content: '5' },
  { value: '10', content: '10' },
  { value: '20', content: '20' },
] as SelectItem[];

type OrdersTableProps = {
  chainId: number;
  collectionAddress: Hex;
  tokenId: string;
  orders: Order[] | undefined;
  ordersCount: number | undefined;
  ordersCountLoading: boolean;
  page: PageState;
  isLoading: boolean;
};

const OrdersTable = (props: OrdersTableProps) => {
  const { tokenId, page, orders, ordersCount, ordersCountLoading, isLoading } =
    props;
  const columns = ['Price', 'Quantity', 'By', 'Expires', 'Marketplace'];
  const shouldShowSkeleton = isLoading || !orders;

  return (
    <div className="overflow-hidden rounded-md border border-primary/20">
      <Table.Root>
        <OrdersTableHeader items={columns} isLoading={props.isLoading} />

        {shouldShowSkeleton && (
          <OrdersTableBodySkeleton
            columns={columns.length}
            pageSize={page.pageSize}
          />
        )}

        {!shouldShowSkeleton && (
          <OrdersTableBody orders={orders} tokenId={tokenId} />
        )}

        <OrdersTableFooter
          page={page}
          ordersCount={ordersCount}
          ordersCountLoading={ordersCountLoading}
        />
      </Table.Root>
    </div>
  );
};

export default OrdersTable;
