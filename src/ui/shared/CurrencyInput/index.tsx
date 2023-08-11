import React, { memo, useState } from 'react';

import numeral from 'numeral';

interface CurrencyInputProps {
  className?: string;
  name?: string;
  style?: React.CSSProperties;
  value?: number;
  placeholder?: string;
  maxLength?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
}

function formatNumber(value) {
  const number = value.toString().split('.').join('');
  return numeral(number).format('0,0[.]000').toString().replaceAll(',', '.');
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  defaultValue,
  className,
  name,
  placeholder,
  maxLength = 14,
  style,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<any>(
    defaultValue || value ? formatNumber(defaultValue || value) : null
  );

  const handleChange = (e) => {
    const formattedNumber =
      e.target.value?.length > 0 ? formatNumber(e.target.value) : null;
    setInputValue(formattedNumber);
    onChange?.(parseFloat(formattedNumber?.split('.')?.join('')));
  };

  return (
    <input
      pattern="[0-9]*"
      inputMode="numeric"
      className={className}
      style={style}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default CurrencyInput;
