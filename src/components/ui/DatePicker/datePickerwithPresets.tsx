'use client';

import { useState } from 'react';

import { Calendar, CalendarIcon, Flex, cn } from '..';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { PopoverContent, PopoverTrigger } from '../Popover/popover';
import {
  addDays,
  addMonths,
  differenceInDays,
  endOfDay,
  format,
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

interface DatePickerWithPresetsProps {
  onChange?: (date: Date) => void;
  defaultDate?: Date;
  closeOnSelect?: boolean;
}

// TODO: make more generic
export const DatePickerWithPresets = ({
  defaultDate = new Date(),
  closeOnSelect = true,
  onChange,
}: DatePickerWithPresetsProps) => {
  const presets = [
    { label: 'Today', value: 0 },
    { label: 'Tomorrow', value: 1 },
    { label: 'In 3 days', value: 3 },
    { label: 'In a week', value: 7 },
    { label: 'In a month', value: 30 },
  ];

  // TODO: Expose this as props, the calender is now hardcoded to date limits from today until 6 months
  const today = new Date();
  const in6Months = addMonths(today, 6);

  const [date, setDate] = useState<Date>(defaultDate);
  const [dateOffset, setDateOffset] = useState(
    differenceInDays(defaultDate, today),
  );
  const [displayedMonth, setDisplayedMonth] = useState(defaultDate);
  const [isOpen, setIsOpen] = useState(false);

  const onDateChange = (date: Date | undefined) => {
    if (!date) return;

    const offset = differenceInDays(date, today);
    if (offset == 0) {
      setDate(endOfDay(date)); // If the selected is today, set to EOD
    } else {
      // Ensures that the time is set to the same as the initial time,
      // TODO: this should probably be handled different if we want timepickers in the future
      date = setHours(date, getHours(defaultDate));
      date = setMinutes(date, getMinutes(defaultDate));
      date = setSeconds(date, getSeconds(defaultDate));
      if (onChange) onChange(date);
      setDate(date);
    }
    setDateOffset(offset);
    setDisplayedMonth(date);
    if (closeOnSelect) setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className={cn(
            'w-full justify-start py-6 text-left font-medium text-foreground',
            'md:w-[250px]',
            // TODO: The radius normally get overwritten by the button for some reason
            '!rounded-md',
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {format(date, 'PPpp')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex h-[21rem] w-auto space-y-2 p-2">
        <Flex className="flex-col pr-2 pt-4">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant={preset.value == dateOffset ? 'default' : 'ghost'}
              onClick={() => onDateChange(addDays(today, preset.value))}
            >
              <span>{preset.label}</span>
            </Button>
          ))}
        </Flex>
        <Calendar
          mode="single"
          fromDate={today}
          toDate={in6Months}
          onMonthChange={setDisplayedMonth}
          month={displayedMonth}
          disabled={{ before: today, after: in6Months }}
          selected={date}
          onSelect={onDateChange}
        />
      </PopoverContent>
    </Popover.Root>
  );
};
