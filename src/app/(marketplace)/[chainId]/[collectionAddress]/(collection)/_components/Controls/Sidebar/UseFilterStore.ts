/* eslint-disable */
import { useMemo, useState } from 'react';

import { type PropertyFilter, PropertyType } from '@0xsequence/metadata';
import {
  useQueryState,
  parseAsString,
  parseAsBoolean,
  createSerializer,
  parseAsJson,
} from 'nuqs';

interface StringFilterValues {
  type: PropertyType.STRING;
  values: string[];
}

interface IntFilterValues {
  type: PropertyType.INT;
  min: number;
  max: number;
}

type FilterValues = StringFilterValues | IntFilterValues;

const validateFilters = (value: unknown): PropertyFilter[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (f): f is PropertyFilter =>
      typeof f === 'object' &&
      typeof f.name === 'string' &&
      Object.values(PropertyType).includes(f.type),
  );
};

const filtersParser = parseAsJson(validateFilters).withDefault([]);
const searchParser = parseAsString.withDefault('');
const listedOnlyParser = parseAsBoolean.withDefault(false);

const serialize = createSerializer(
  {
    filters: filtersParser,
    search: searchParser,
    listedOnly: listedOnlyParser,
  },
  {
    urlKeys: {
      filters: 'f',
      search: 'q',
      listedOnly: 'l',
    },
  },
);

const useSidebarState = () => {
  const [filtersSidebarOpen, setFiltersSidebarOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleSidebar = () => setFiltersSidebarOpen((prev) => !prev);
  const toggleSearchBar = () => setSearchBarOpen((prev) => !prev);

  return {
    filtersSidebarOpen,
    setFiltersSidebarOpen,
    searchBarOpen,
    setSearchBarOpen,
    toggleSidebar,
    toggleSearchBar,
  };
};

export function useFilterState() {
  const sidebarState = useSidebarState();

  const [filterOptions, setFilterOptions] = useQueryState(
    'filters',
    filtersParser,
  );
  const [searchText, setSearchText] = useQueryState('search', searchParser);
  const [showListedOnly, setShowListedOnly] = useQueryState(
    'listedOnly',
    listedOnlyParser,
  );

  const helpers = useMemo(
    () => ({
      getFilter: (name: string): PropertyFilter | undefined => {
        return filterOptions?.find((f) => f.name === name);
      },

      getFilterValues: (name: string): FilterValues | undefined => {
        const filter = filterOptions?.find((f) => f.name === name);
        if (!filter) return undefined;

        if (filter.type === PropertyType.INT) {
          return {
            type: PropertyType.INT,
            min: filter.min ?? 0,
            max: filter.max ?? 0,
          };
        }

        return {
          type: PropertyType.STRING,
          values: (filter.values as string[]) ?? [],
        };
      },

      isFilterActive: (name: string): boolean => {
        return !!filterOptions?.find((f) => f.name === name);
      },

      isStringValueSelected: (name: string, value: string): boolean => {
        const filter = filterOptions?.find((f) => f.name === name);
        if (!filter || filter.type !== PropertyType.STRING) return false;
        return (filter.values as string[])?.includes(value) ?? false;
      },

      isIntFilterActive: (name: string): boolean => {
        const filter = filterOptions?.find((f) => f.name === name);
        return !!filter && filter.type === PropertyType.INT;
      },

      getIntFilterRange: (name: string): [number, number] | undefined => {
        const filter = filterOptions?.find((f) => f.name === name);
        if (!filter || filter.type !== PropertyType.INT) return undefined;
        return [filter.min ?? 0, filter.max ?? 0];
      },

      deleteFilter: (name: string) => {
        const otherFilters =
          filterOptions?.filter((f) => !(f.name === name)) ?? [];
        setFilterOptions(otherFilters);
      },

      toggleStringFilterValue: (name: string, value: string) => {
        const otherFilters =
          filterOptions?.filter((f) => !(f.name === name)) ?? [];
        const filter = filterOptions?.find((f) => f.name === name);
        const existingValues =
          filter?.type === PropertyType.STRING
            ? ((filter.values as string[]) ?? [])
            : [];

        if (existingValues.includes(value)) {
          const newValues = existingValues.filter((v) => v !== value);
          if (newValues.length === 0) {
            setFilterOptions(otherFilters);
            return;
          }
          setFilterOptions([
            ...otherFilters,
            { name, type: PropertyType.STRING, values: newValues },
          ]);
        } else {
          setFilterOptions([
            ...otherFilters,
            {
              name,
              type: PropertyType.STRING,
              values: [...existingValues, value],
            },
          ]);
        }
      },

      setIntFilterValue: (name: string, min: number, max: number) => {
        if (min === max && min === 0) {
          const otherFilters =
            filterOptions?.filter((f) => !(f.name === name)) ?? [];
          setFilterOptions(otherFilters);
          return;
        }
        const otherFilters =
          filterOptions?.filter((f) => !(f.name === name)) ?? [];
        setFilterOptions([
          ...otherFilters,
          { name, type: PropertyType.INT, min, max },
        ]);
      },

      clearAllFilters: () => {
        void setShowListedOnly(false);
        void setFilterOptions([]);
        void setSearchText('');
      },
    }),
    [filterOptions, setFilterOptions, setShowListedOnly, setSearchText],
  );

  return {
    ...sidebarState,
    filterOptions,
    searchText,
    showListedOnly,
    setFilterOptions,
    setSearchText,
    setShowListedOnly,
    ...helpers,
    serialize,
  };
}
