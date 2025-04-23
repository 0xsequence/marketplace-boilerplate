'use client';

import {
  CustomSelect,
  type SelectItem,
} from '~/components/custom-select/CustomSelect';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { Table } from '~/components/ui';

import { type PageState } from '../../pagination/PaginationContext';
import { PAGE_SIZE_OPTIONS } from '../OrdersTable';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  IconButton,
  Text,
} from '@0xsequence/design-system';

const OrdersTableFooter = ({
  page,
  ordersCount,
  ordersCountLoading,
}: {
  page: PageState;
  ordersCount: number | undefined;
  ordersCountLoading: boolean;
}) => {
  const pageSize = page.pageSize;
  const pageNo = page.page;
  const totalItems = Number(ordersCount) || 0;

  // Calculate start and end, ensuring they're valid
  const start = totalItems === 0 ? 0 : (pageNo - 1) * pageSize + 1;
  const end = Math.min(pageNo * pageSize, totalItems);
  const displayText =
    totalItems === 0 ? '0 items' : `${start}-${end} of ${totalItems} items`;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Reset to page 1 if current page is invalid after page size change
  if (pageNo > totalPages) {
    page.set('page', 1);
  }

  return (
    <Table.Footer className="bg-inherit">
      <Table.Row>
        <Table.Cell
          className="p-0 border-t border-border-normal pt-2 pb-3 px-3"
          colSpan={10}
        >
          <div className="flex text-xs items-center justify-between">
            <ItemsPerPageSelect page={page} />

            {ordersCountLoading ? (
              <CustomSkeleton />
            ) : (
              <Text className="text-xs text-muted font-medium">
                {displayText}
              </Text>
            )}

            <PageSelect
              page={page}
              totalPages={totalPages}
              totalPagesLoading={ordersCountLoading}
            />

            <PreviousNextPageControls page={page} ordersCount={ordersCount} />
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  );
};

function ItemsPerPageSelect({ page }: { page: PageState }) {
  const currentPageSize = page.pageSize;

  const currentPageSizeOption = PAGE_SIZE_OPTIONS.find(
    (option) => Number(option.value) === currentPageSize,
  );

  return (
    <div className="flex sm:flex! items-center gap-2">
      <Text className="text-xs text-muted font-medium">Items per page</Text>

      <CustomSelect
        key={`page-size-select-${currentPageSize}`}
        items={PAGE_SIZE_OPTIONS}
        defaultValue={currentPageSizeOption || PAGE_SIZE_OPTIONS[0]}
        onValueChange={(value) => page.set('pageSize', Number(value))}
      />
    </div>
  );
}

function PageSelect({
  page,
  totalPages,
  totalPagesLoading,
}: {
  page: PageState;
  totalPages: number;
  totalPagesLoading: boolean;
}) {
  const currentPage = page.page;
  const options = Array.from({ length: totalPages }, (_, i) => ({
    value: String(i + 1),
    content: (i + 1).toString(),
  })) as SelectItem[];

  const currentPageOption = options.find(
    (option) => option.value === String(currentPage),
  );

  return (
    <div className="flex sm:flex! items-center gap-2">
      <CustomSelect
        key={`page-select-${currentPage}`}
        items={options}
        defaultValue={currentPageOption || options[0]}
        onValueChange={(value) => page.set('page', Number(value))}
      />
      {totalPagesLoading ? (
        <CustomSkeleton />
      ) : (
        <Text className="text-xs text-muted font-medium">of {totalPages}</Text>
      )}
    </div>
  );
}

function PreviousNextPageControls({
  page,
  ordersCount,
}: {
  page: PageState;
  ordersCount: number | undefined;
}) {
  const currentPage = page.page;
  const pageSize = page.pageSize;
  const totalPages = Math.ceil(Number(ordersCount) / pageSize) || 1;

  function handlePrevPage() {
    if (currentPage > 1) {
      page.set('page', currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      page.set('page', currentPage + 1);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <IconButton
        onClick={handlePrevPage}
        variant="raised"
        disabled={currentPage <= 1}
        size="xs"
        icon={ChevronLeftIcon}
      />

      <IconButton
        onClick={handleNextPage}
        variant="raised"
        disabled={currentPage >= totalPages}
        size="xs"
        icon={ChevronRightIcon}
      />
    </div>
  );
}

export default OrdersTableFooter;
