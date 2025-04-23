import { type ReactNode, useState } from 'react';

import {
  Button,
  ChevronDownIcon,
  cn,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Text,
} from '@0xsequence/design-system';

export interface SelectItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface CustomSelectProps {
  items: SelectItem[];
  onValueChange?: (value: string) => void;
  defaultValue?: SelectItem;
  placeholder?: string;
  disabled?: boolean;
  backgroundColor?: string;
  className?: string;
  testId?: string;
}

export const CustomSelect = ({
  items,
  onValueChange,
  defaultValue,
  placeholder = 'Select an option',
  disabled = false,
  className,
  testId = 'custom-select',
}: CustomSelectProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>(
    defaultValue,
  );

  const handleValueChange = (item: SelectItem) => {
    setSelectedItem(item);
    onValueChange?.(item.value);
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          size="xs"
          label={
            <div className="flex items-center justify-center gap-1 truncate">
              <Text className="text-xs text-primary font-medium">
                {selectedItem ? selectedItem.content : placeholder}
              </Text>

              <ChevronDownIcon size="xs" />
            </div>
          }
          className={`bg-background-raised hover:bg-background-control py-1.5 pl-3 ${className || ''}`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={8}
          className="w-20 z-[1000] overflow-hidden rounded-lg border border-border-normal bg-background-raised p-0 shadow-lg backdrop-blur-md"
          data-testid={`${testId}-content`}
        >
          <div className="max-h-[240px] overflow-auto">
            {items.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.value}
                checked={selectedItem?.value === item.value}
                onCheckedChange={() => handleValueChange(item)}
                disabled={item.disabled}
                className="group relative flex cursor-pointer select-none items-center p-1 pl-2 outline-none transition-colors hover:bg-background-control! data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>span[data-state='checked']]:hidden"
                data-testid={`${testId}-option-${item.value}`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    {typeof item.content === 'string' ? (
                      <Text
                        className={cn(
                          'truncate text-xs font-medium text-muted',
                          selectedItem?.value === item.value && 'text-primary',
                        )}
                      >
                        {item.content}
                      </Text>
                    ) : (
                      <div className="truncate">{item.content}</div>
                    )}
                  </div>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};
