import React, { useRef } from 'react';

import { CloseIcon, SearchIcon } from '~/ui/assets/images/icon_1';

import './index.scss';

export interface SearchInputProps {
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  handleClear: (ref: React.MutableRefObject<any>) => void;
}

function SearchInput({
  onChange,
  className,
  placeholder,
  handleClear,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="container-search-input">
      <input
        type="text"
        className={`search-input ${className}`}
        placeholder={placeholder || 'Search'}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        ref={inputRef}
      />
      <img src={SearchIcon} className="icon search" />
      {inputRef.current?.value && (
        <img
          src={CloseIcon}
          alt="close"
          className="icon close"
          onClick={() => handleClear(inputRef)}
        />
      )}
    </div>
  );
}

export default SearchInput;
