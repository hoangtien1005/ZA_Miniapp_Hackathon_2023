import React, {
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { Sheet } from 'zmp-ui';

import ModalSearch, { VirtualListConfig } from '../ModalSearch';

import './index.scss';
import { useSheet } from '~/ui/hooks';
import useGlobalSheet from '~/ui/hooks/use-global-sheet';

export interface SelectWithSearchSheetProps {
  placeholder: string;
  name: string;
  register?: any;
  trigger?: any;
  registerOption?: any;
  label?: string;
  value: string;
  placeholderSearch: string;
  listOption: { value: string; label: string }[];
  onClickItem: (value: string, label: string) => void;
  onBlurItem?: (event: FocusEvent<HTMLInputElement>) => void;
  title: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  error?: string;
  isVirtual?: boolean;
  virtualConfig?: VirtualListConfig;
  inputRef?: any;
}

function SelectWithSearchSheet({
  placeholder,
  name,
  register,
  trigger,
  registerOption,
  label,
  value,
  placeholderSearch,
  className = '',
  listOption,
  disabled = false,
  title,
  onClickItem,
  onBlurItem,
  error,
  isVirtual = false,
  virtualConfig = {} as VirtualListConfig,
  inputRef = null,
}: SelectWithSearchSheetProps) {
  const sheetRef = useRef<any>(null);

  const { visible: sheetVisible, openSheet, closeSheet } = useGlobalSheet();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleClickITem = useCallback((value: string, label: string) => {
    onClickItem(value, label);
    closeSheet();
  }, []);

  const handleInputClick = () => {
    trigger(name);
    openSheet({
      visible: sheetVisible,
      sheetRef,
      title,
      className: 'sheet-search',
      children: (
        <ModalSearch
          placeholderSearch={placeholderSearch}
          listData={listOption}
          onClickItem={handleClickITem}
          isVirtual={isVirtual}
          virtualConfig={virtualConfig}
        />
      ),
      onClose: closeSheet,
    });
  };

  return (
    <>
      <input
        autoComplete="off"
        placeholder={placeholder}
        value={value ?? ''}
        name={name}
        id={name}
        {...register(name, registerOption)}
        className={classNames(
          'field_input text_limit icon icon_dropdown',
          className,
          disabled && 'disabled'
        )}
        disabled={disabled}
        onChange={() => handleClickITem}
        onClick={handleInputClick}
        onBlur={onBlurItem}
        readOnly
        ref={inputRef}
      />
    </>
  );
}
export default SelectWithSearchSheet;
