'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';

import { IntFilter } from './IntFilter';
import { StringFilter } from './StringFilter';
import { type PropertyFilter, PropertyType } from '@0xsequence/metadata';

export type FilterProps = {
  filter: PropertyFilter;
};

type PropertyFiltersProps = {
  filters?: PropertyFilter[];
  loading?: boolean;
};

export const PropertyFilters = ({ filters, loading }: PropertyFiltersProps) => {
  if (loading) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="a" disabled className="loading">
          <AccordionTrigger />
          <AccordionContent />
        </AccordionItem>

        <AccordionItem value="b" disabled className="loading">
          <AccordionTrigger />
          <AccordionContent />
        </AccordionItem>

        <AccordionItem value="c" disabled className="loading">
          <AccordionTrigger />
          <AccordionContent />
        </AccordionItem>
      </Accordion>
    );
  }

  if (!filters || filters.length === 0) {
    return null;
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
