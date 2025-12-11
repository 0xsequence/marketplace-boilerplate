import { useState } from 'react';

import { AddIcon, Button, SubtractIcon } from '@0xsequence/design-system';

interface Sale721QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function Sale721QuantityInput({
  value,
  onChange,
  min = 1,
  max = Infinity,
  disabled = false,
}: Sale721QuantityInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    if (newInputValue === '') return;

    const numericValue = parseInt(newInputValue);
    if (!isNaN(numericValue)) {
      if (numericValue >= min && numericValue <= max) {
        onChange(numericValue);
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || isNaN(parseInt(inputValue))) {
      setInputValue(min.toString());
      onChange(min);
    } else {
      const numericValue = parseInt(inputValue);
      if (numericValue < min) {
        setInputValue(min.toString());
        onChange(min);
      } else if (numericValue > max) {
        setInputValue(max.toString());
        onChange(max);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div
      className={`quantity h-full flex items-center justify-between border border-background-secondary rounded-xl w-[100px] overflow-hidden ${disabled ? 'opacity-50' : ''}`}
    >
      <Button
        variant="secondary"
        onClick={handleDecrement}
        className="p-1.5 rounded-none"
        disabled={value <= min || disabled}
      >
        <SubtractIcon className="w-4 h-4 text-primary" />
      </Button>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="w-8 bg-transparent flex-1 text-primary text-sm font-medium h-9 text-center focus:outline-none"
        aria-label="Quantity"
        disabled={disabled}
      />

      <Button
        variant="secondary"
        onClick={handleIncrement}
        className="p-1.5 rounded-none"
        disabled={value >= max || disabled}
      >
        <AddIcon className="w-4 h-4 text-primary" />
      </Button>
    </div>
  );
}

export default Sale721QuantityInput;
