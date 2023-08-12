/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-nested-ternary */
import React, { memo, useCallback, useMemo, useState } from 'react';

// import { List } from 'react-virtualized';

import SearchInput from '../Search';

import { LogoSearchImage } from '~/ui/assets/images';
import { useDebounce } from '~/ui/hooks';
import { removeAccents } from '~/utils/convert.util';

import './index.scss';

export interface VirtualListConfig {
  height: number;
  width: number;
  rowHeight: number;
  overscanRowCount: number;
}

export interface DataItemSelect {
  value: string;
  label: string;
}
export interface ModalSearchProps {
  listData: DataItemSelect[];
  placeholderSearch: string;
  onClickItem: (value: string, label: string) => void;
  isVirtual: boolean;
  virtualConfig: VirtualListConfig;
}

const defaultConfigVirtualList: VirtualListConfig = {
  rowHeight: 52,
  height: 260, // 52 * 5 => show max only 5 rows, more extra space for the lifting up of the keyboard phone
  width: window.outerWidth - 16,
  overscanRowCount: 4,
};
// eslint-disable-next-line react/prop-types
function ItemResult({ label, value, onClick, style = {} }) {
  return (
    <div
      className="item-result"
      id="item"
      onClick={() => onClick(value, label)}
      style={style}
    >
      {label}
    </div>
  );
}

const renderVirtualRow = (listItems, onClickItem) => {
  console.log('listItems in renderVirtualRow', listItems);
  return ({ index, key, parent, style }: any) => {
    return (
      <ItemResult
        key={key}
        label={listItems?.[index]?.label}
        value={listItems?.[index]?.value}
        onClick={onClickItem}
        style={style}
      />
    );
  };
};

function ModalSearch({
  listData,
  onClickItem,
  placeholderSearch,
  isVirtual,
  virtualConfig,
}: ModalSearchProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const onChangeInput = (value: string) => {
    setSearchValue(value);
  };
  const handleClear = (ref: React.MutableRefObject<any>) => {
    ref.current.value = '';
    setSearchValue('');
  };
  const listDataDisplay: DataItemSelect[] = useMemo<DataItemSelect[]>(() => {
    if (!debouncedSearchTerm) {
      return listData;
    }

    return listData.filter((item) => {
      return removeAccents(item.label)
        .toLowerCase()
        .includes(removeAccents(debouncedSearchTerm).toLowerCase());
    });
  }, [listData, debouncedSearchTerm]);

  const renderRow = ({ value, label }) => {
    return (
      <ItemResult
        key={value}
        label={label}
        value={value}
        onClick={onClickItem}
      />
    );
  };
  let virtualListConfigData: VirtualListConfig = {} as VirtualListConfig;
  if (isVirtual) {
    console.log('listDataDisplay', listDataDisplay);
    virtualListConfigData = {
      ...defaultConfigVirtualList,
      ...virtualConfig,
    };
  }
  return (
    <div className="container-modal-search">
      <div className="container-modal-field-search">
        <SearchInput
          placeholder={placeholderSearch}
          onChange={onChangeInput}
          handleClear={handleClear}
        />
      </div>
      <div className={`container-result mt-1 ${isVirtual ? 'virtual' : ''}`}>
        {listDataDisplay.length > 0 ? (
          isVirtual ? (
            // <List
            //   {...virtualListConfigData}
            //   rowRenderer={renderVirtualRow(listDataDisplay || [], onClickItem)}
            //   rowCount={listDataDisplay.length}
            // />
            <></>
          ) : (
            listDataDisplay.map((item) => renderRow(item))
          )
        ) : (
          <div className="not-found flex flex-col items-center justify-center h-full">
            <div style={{ marginTop: '16px', width: 'fit-content' }}>
              <img src={LogoSearchImage} alt="not founded logo" />
            </div>
            <p className="normal-text color-main text-center mt-6">
              Không tìm thấy kết quả <br /> Vui lòng tìm kiếm với từ khoá khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ModalSearch);
