'use client';

import type { ChangeEvent } from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';

import type { FilterProps } from './PropertyFilters';
import { Button, cn, Text, TextInput } from '@0xsequence/design-system';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';
import { capitalize } from 'radash';

const useIntRangeFilter = (
  name: string,
  filterMin?: number,
  filterMax?: number,
) => {
  const { getIntFilterRange, setIntFilterValue } = useFilterState();
  const range = getIntFilterRange(name);
  const currentMin = range?.[0];
  const currentMax = range?.[1];
  const [localMin, setMin] = useState(
    currentMin !== undefined ? String(currentMin) : '',
  );
  const [localMax, setMax] = useState(
    currentMax !== undefined ? String(currentMax) : '',
  );
  const isEditingRef = useRef(false);

  useEffect(() => {
    if (isEditingRef.current) return;

    if (range === undefined) {
      setMin('');
      setMax('');
    } else {
      setMin(range[0] !== undefined ? String(range[0]) : '');
      setMax(range[1] !== undefined ? String(range[1]) : '');
    }
  }, [range]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
    boundaryValue?: number,
    isMin = true,
  ) => {
    isEditingRef.current = true;

    const value = e.target.value;

    if (value === '') {
      setter('');
      return;
    }

    const numValue = Number(value);

    if (
      boundaryValue !== undefined &&
      ((isMin && numValue < boundaryValue) ||
        (!isMin && numValue > boundaryValue))
    ) {
      setter(String(boundaryValue));
    } else {
      setter(value);
    }
  };

  const isValid = useMemo(() => {
    if (localMin === '' && localMax === '') {
      return false;
    }

    const minValue = localMin === '' ? (filterMin ?? 0) : Number(localMin);
    const maxValue = localMax === '' ? (filterMax ?? 0) : Number(localMax);

    return !(minValue > maxValue && maxValue !== 0);
  }, [localMin, localMax, filterMin, filterMax]);

  const applyFilter = () => {
    if (!isValid) return;

    const minValue = localMin === '' ? (filterMin ?? 0) : Number(localMin);
    const maxValue = localMax === '' ? (filterMax ?? 0) : Number(localMax);

    isEditingRef.current = false;

    setIntFilterValue(name, minValue, maxValue);
  };

  return {
    localMin,
    localMax,
    isValid,
    handleMinChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleInputChange(e, setMin, filterMin, true),
    handleMaxChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleInputChange(e, setMax, filterMax, false),
    applyFilter,
  };
};

export const IntFilter = ({ filter }: FilterProps) => {
  const { name, min: filterMin, max: filterMax } = filter;

  const {
    localMin,
    localMax,
    isValid,
    handleMinChange,
    handleMaxChange,
    applyFilter,
  } = useIntRangeFilter(name, filterMin, filterMax);

  const onApplyClick = () => {
    applyFilter();
  };

  return (
    <AccordionItem
      value={name}
      className="text-primary rounded-[8px] py-2.5 pl-3 pr-2 bg-background-secondary cursor-pointer"
    >
      <AccordionTrigger className="pr-2 font-bold text-primary text-left">
        {capitalize(name)}
      </AccordionTrigger>
      <AccordionContent asChild>
        <div className="flex flex-col gap-2 pb-0">
          <div className="flex mt-3 w-full items-center gap-4">
            <div
              className={cn(
                '[&>label>div>div>div]:h-9 [&>label>div>div>div]:rounded-lg [&>label>div>div>div]:px-2',
                '[&>label>div>div>div>svg]:w-3',
                '[&>label>div>div>div>input]:bg-none! [&>label>div>div>div>input]:py-1 [&>label>div>div>div>input]:h-8 [&>label>div>div>div>input]:text-xs',
              )}
            >
              <TextInput
                name={`${name}-min`}
                id={`${name}-min`}
                type="number"
                placeholder={String(filterMin)}
                value={localMin}
                className="w-full"
                onChange={handleMinChange}
                min={filterMin}
                aria-label={`Minimum ${name}`}
              />
            </div>

            <Text className="text-secondary text-xs uppercase">to</Text>

            <div
              className={cn(
                '[&>label>div>div>div]:h-9 [&>label>div>div>div]:rounded-lg [&>label>div>div>div]:px-2',
                '[&>label>div>div>div>svg]:w-3',
                '[&>label>div>div>div>input]:bg-none! [&>label>div>div>div>input]:py-1 [&>label>div>div>div>input]:h-8 [&>label>div>div>div>input]:text-xs',
              )}
            >
              <TextInput
                name={`${name}-max`}
                id={`${name}-max`}
                type="number"
                placeholder={String(filterMax)}
                value={localMax}
                className="w-full"
                onChange={handleMaxChange}
                max={filterMax}
                aria-label={`Maximum ${name}`}
              />
            </div>
          </div>
          <Button
            size="xs"
            className="w-full rounded-sm text-primary mt-2 bg-button-glass hover:bg-button-glass/80"
            label="Apply"
            onClick={onApplyClick}
            disabled={!isValid}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
