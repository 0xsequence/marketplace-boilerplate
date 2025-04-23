import { Table } from '~/components/ui';

import OrdersTableRow from './TableRow';
import type { Order } from '@0xsequence/marketplace-sdk';

const OrdersTableBody = ({
  orders,
  tokenId,
}: {
  orders: Order[];
  tokenId: string;
}) => {
  return (
    <Table.Body className="text-primary">
      {orders?.map((order: Order, index: number) => (
        <OrdersTableRow
          key={`order-${order.orderId}`}
          tokenId={tokenId}
          order={order}
          index={index}
        />
      ))}
    </Table.Body>
  );
};

export default OrdersTableBody;
