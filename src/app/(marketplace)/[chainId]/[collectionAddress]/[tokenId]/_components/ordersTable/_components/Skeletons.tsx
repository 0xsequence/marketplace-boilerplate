import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { Table } from '~/components/ui';

const OrdersTableBodySkeleton = ({
  columns,
  pageSize,
}: {
  columns: number;
  pageSize: number;
}) => {
  return (
    <>
      <Table.Body className="text-primary">
        {Array.from({ length: pageSize }).map((_, index) => (
          <OrdersTableRowSkeletonSmallScreen key={index} />
        ))}

        {Array.from({ length: pageSize }).map((_, index) => (
          <OrdersTableRowSkeletonWideScreen key={index} columns={columns} />
        ))}
      </Table.Body>
    </>
  );
};

const OrdersTableRowSkeletonWideScreen = ({ columns }: { columns: number }) => {
  return (
    <Table.Row className="hidden md:table-row!">
      {Array.from({ length: columns }).map((_, index) => (
        <Table.Cell key={index}>
          <CustomSkeleton style={{ width: 60 }} />
        </Table.Cell>
      ))}
    </Table.Row>
  );
};

const OrdersTableRowSkeletonSmallScreen = () => {
  return (
    <Table.Row className="table-row md:hidden!">
      <Table.Cell>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <CustomSkeleton style={{ width: 60 }} />

            <CustomSkeleton style={{ width: 60 }} />
          </div>

          <div className="flex gap-4">
            <CustomSkeleton style={{ width: 60 }} />

            <CustomSkeleton style={{ width: 60 }} />
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default OrdersTableBodySkeleton;
