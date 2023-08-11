import React, { useState, useCallback } from 'react';

import cn from 'classnames';

import styles from './style.module.scss';

import { useOuterClick } from '~/ui/hooks';

export interface DropdownOption {
  label: string | number;
  value: string | number;
}

interface DropdownProps {
  className?: string;
  options: DropdownOption[];
  selectedOption: DropdownOption;
  disabled?: boolean;
  onOptionSelected?: (option: DropdownOption) => void;
}

const Dropdown = React.forwardRef((props: DropdownProps, ref) => {
  const { className, options, selectedOption, disabled, onOptionSelected } =
    props;

  const [open, setOpen] = useState(false);

  const innerRef = useOuterClick((ev) => {
    setOpen(false);
  });

  const toggleList = useCallback(() => {
    if (!disabled) setOpen((prevState) => !prevState);
  }, [disabled]);

  const handleOptionSelected = useCallback((option) => {
    setOpen(false);
    onOptionSelected?.(option);
  }, []);

  return (
    <>
      <div
        className={cn(
          'input text_limit input_down',
          className,
          open && 'on',
          disabled && 'disabled'
        )}
        ref={innerRef}
      >
        <div
          className={cn('input', !selectedOption && 'not_select')}
          onClick={toggleList}
        >
          {selectedOption.label}
        </div>
        <div
          className={cn(
            'dropdown-menu dropdown_content',
            open && styles.dropdownOpen
          )}
        >
          <ul>
            {options.map((option) => {
              return (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelected(option)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
