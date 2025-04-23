'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';

import { IntFilter } from './IntFilter';
import { StringFilter } from './StringFilter';
import { capitalize, Skeleton } from '@0xsequence/design-system';
import { type PropertyFilter, PropertyType } from '@0xsequence/metadata';

export type FilterProps = {
  filter: PropertyFilter;
};

type PropertyFiltersProps = {
  filters?: PropertyFilter[];
  isLoadingNames?: boolean;
  isFetchingValues?: boolean;
};

export const PropertyFilters = ({
  filters,
  isLoadingNames,
  isFetchingValues,
}: PropertyFiltersProps) => {
  if (isLoadingNames) {
    return <FilterNamesSkeleton />;
  }

  if (!filters || filters.length === 0) {
    return null;
  }

  if (isFetchingValues) {
    return (
      <>
        {filters.map((filter) => (
          <FilterValuesSkeleton key={filter.name} filterName={filter.name} />
        ))}
      </>
    );
  }

  return (
    <Accordion type="single" collapsible>
      {filters.map((filter) => {
        switch (filter.type) {
          case PropertyType.STRING:
          case PropertyType.ARRAY:
            return <StringFilter key={filter.name} filter={filter} />;
          case PropertyType.INT:
            return <IntFilter key={filter.name} filter={filter} />;
        }
      })}
    </Accordion>
  );
};

const FilterNamesSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-9 rounded-[8px]" />

      <Skeleton className="w-full h-9 rounded-[8px]" />

      <Skeleton className="w-full h-9 rounded-[8px]" />
    </>
  );
};

const FilterValuesSkeleton = ({ filterName }: { filterName: string }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={filterName}
        className="text-primary rounded-[8px] py-2.5 pl-3 pr-2 bg-background-secondary cursor-pointer"
      >
        <AccordionTrigger className="pr-2 font-bold text-primary text-left">
          {capitalize(filterName)}
        </AccordionTrigger>
        <AccordionContent asChild>
          <Skeleton className="w-full h-6 rounded-sm my-2" />

          <Skeleton className="w-full h-6 rounded-sm mb-2" />

          <Skeleton className="w-full h-6 rounded-sm" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
