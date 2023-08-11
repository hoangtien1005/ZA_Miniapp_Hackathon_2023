/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useGetLocation } from '~/application/location/getLocation.usecase';
import { LocationGroup } from '~/constants/interface';
import useOutsideClick from '~/ui/hooks/use-click-outside';
import { formatPlaceList, urlFormat } from '~/utils/convert.util';
import { generateTextLocation } from '~/utils/format.util';

enum PageIndex {
  Location = 0,
  District = 1,
  Ward = 2,
}

const mappingIndexToKey = ['location', 'district', 'ward'];

interface ILocationPopup {
  value: LocationGroup;
  onChange: (values) => void;
  isError: boolean;
  isDisabled?: boolean;
}

const LocationPopup = ({
  value,
  onChange,
  isError,
  isDisabled = false,
  ...rest
}: ILocationPopup) => {
  const [values, setValues] = useState({
    location: { value: null, label: '' },
    district: { value: null, label: '' },
    ward: { value: null, label: '' },
  });
  const [currentTab, setCurrentTab] = useState(PageIndex.Location);
  const [listLocation, setListLocation] = useState([
    { key: 'location', list: [] },
    { key: 'district', list: [] },
    { key: 'ward', list: [], isEmpty: false },
  ]);
  const [keyword, setKeyword] = useState('');
  const titlePage = ['Tỉnh/Thành', 'Quận/Huyện', 'Phường/Xã'];
  const { getLocations, getDistrict, getWard } = useGetLocation();
  const [isVisibleLocationGroup, setVisibleLocationGroup] = useState(false);
  const [valueGroupInput, setValueGroupInput] = useState('');
  const handleOutsideClick = () => {
    setVisibleLocationGroup(false);
  };

  const ref = useOutsideClick(handleOutsideClick);

  const fetchLocation = async () => {
    const listFetched = await getLocations();
    setListLocation(
      listLocation.map((item: any) => {
        if (item.key === 'location') {
          return {
            ...item,
            list: formatPlaceList(listFetched, true),
          };
        }
        return item;
      })
    );

    return listFetched;
  };
  const fetchDistrict = async (locationId) => {
    setListLocation(
      listLocation.map((item: any) => {
        if (item.key === 'district') {
          return {
            ...item,
            list: [],
          };
        }
        return item;
      })
    );
    const listFetched = await getDistrict(locationId);
    setListLocation(
      listLocation.map((item: any) => {
        if (item.key === 'district') {
          return {
            ...item,
            list: formatPlaceList(listFetched),
          };
        }
        return item;
      })
    );

    return listFetched;
  };

  const fetchWard = async (districtId) => {
    setListLocation(
      listLocation.map((item: any) => {
        if (item.key === 'ward') {
          return {
            ...item,
            list: [],
            isEmpty: false,
          };
        }
        return item;
      })
    );

    const listFetched: any = await getWard(districtId);
    setListLocation(
      listLocation.map((item: any) => {
        if (item.key === 'ward') {
          return {
            ...item,
            list: formatPlaceList(listFetched),
            // @ts-ignore
            isEmpty: listFetched?.length === 0,
          };
        }
        return item;
      })
    );

    return listFetched;
  };

  const filterListBySearch = (item, searchString) => {
    return urlFormat(item?.label || '').includes(urlFormat(searchString));
  };

  const setValuesByField = (field: string, item) => {
    setValues({
      ...values,
      [field]: {
        value: item.value,
        label: item.label,
        shortName: item.shortName,
      },
    });
  };

  const selectItem = (index, item) => {
    // console.log(index, item);
    setValuesByField(mappingIndexToKey[index], item);

    const current = index + 1;
    setCurrentTab(current);

    // eslint-disable-next-line no-empty
    if (current === PageIndex.Location) {
    } else if (current === PageIndex.District) {
      fetchDistrict(item.value);
    } else if (current === PageIndex.Ward) {
      fetchWard(item.value);
    }
  };

  const clickTab = (index: number) => {
    setCurrentTab(index);
  };

  const summaryValues = () => {
    setCurrentTab(PageIndex.Location);
    setVisibleLocationGroup(false);
    setValueGroupInput(
      generateTextLocation([
        values.location.label,
        values.district.label,
        values.ward.label,
      ])
    );
    onChange(values);
  };

  useEffect(() => {
    // console.log(values);
    // console.log(listLocation);
    if (currentTab > PageIndex.Ward) {
      summaryValues();
    } else if (currentTab === PageIndex.Ward && listLocation[2].isEmpty) {
      setValuesByField('ward', { value: null, label: '' });
      summaryValues();
    }
  }, [values, currentTab, listLocation]);

  useEffect(() => {
    Promise.all([
      getLocations(),
      value?.district?.value && getDistrict(value?.location?.value),
      value?.ward?.value && getWard(value?.district?.value),
    ]).then((responses: any) => {
      setListLocation(
        listLocation.map((item: any) => {
          if (item.key === 'location') {
            return {
              ...item,
              list: formatPlaceList(responses[0], true),
            };
          }
          return item;
        })
      );

      const selectedTextLocation =
        responses[0] &&
        responses[0].filter((i) => i.value === value?.location?.value)[0]
          ?.label;
      const selectedTextDistrict =
        responses[1] &&
        responses[1].filter((i) => i.value === value?.district?.value)[0]
          ?.label;
      const selectedTextWard =
        responses[2] &&
        responses[2].filter((i) => i.value === value?.ward?.value)[0]?.label;
      setValueGroupInput(
        generateTextLocation([
          selectedTextLocation,
          selectedTextDistrict,
          selectedTextWard,
        ])
      );
    });
  }, [value]);

  useEffect(() => {
    setKeyword('');
  }, [currentTab]);

  return (
    <div ref={ref}>
      <input
        className={classNames('input text_limit', {
          'is-err': isError,
          disabled: isDisabled,
        })}
        type="text"
        placeholder="Chọn địa chỉ"
        value={valueGroupInput}
        autoComplete="off"
        {...rest}
        onClick={() => setVisibleLocationGroup(true)}
      />
      <div
        className={classNames('dropdown_content', {
          is_show: isVisibleLocationGroup,
        })}
      >
        <div className=" tab_nav flex space">
          {titlePage.map((title, index) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className={classNames(' item', { active: currentTab === index })}
              onClick={() => clickTab(index)}
            >
              <span>{title}</span>
            </div>
          ))}
        </div>
        <div className=" tab_content">
          <div className=" field field_search">
            <div className=" control">
              <input
                className="input"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={`Tìm tên ${titlePage[currentTab]}`}
              />
            </div>
          </div>
          <div className="list scrollbar">
            <ul
              className={classNames('min-height-location-popup', {
                'display-none': currentTab !== PageIndex.Location,
              })}
            >
              {listLocation[PageIndex.Location]?.list
                ?.filter((item) => filterListBySearch(item, keyword))
                ?.map((item: any) => {
                  return (
                    <li
                      key={`location-${item.value}`}
                      className={classNames({
                        active:
                          item.value ===
                          values[mappingIndexToKey[currentTab]]?.value,
                      })}
                      onClick={() => selectItem(currentTab, item)}
                    >
                      {item?.label}
                    </li>
                  );
                })}
            </ul>
            <ul
              className={classNames('min-height-location-popup', {
                'display-none': currentTab !== PageIndex.District,
              })}
            >
              {listLocation[PageIndex.District]?.list
                ?.filter((item) => filterListBySearch(item, keyword))
                ?.map((item: any) => {
                  return (
                    <li
                      key={`district-${item.value}`}
                      className={classNames({
                        active:
                          item.value ===
                          values[mappingIndexToKey[currentTab]]?.value,
                      })}
                      onClick={() => selectItem(currentTab, item)}
                    >
                      {item?.label}
                    </li>
                  );
                })}
            </ul>
            <ul
              className={classNames('min-height-location-popup', {
                'display-none': currentTab !== PageIndex.Ward,
              })}
            >
              {listLocation[PageIndex.Ward]?.list
                ?.filter((item) => filterListBySearch(item, keyword))
                ?.map((item: any) => {
                  return (
                    <li
                      key={`ward-${item.value}`}
                      className={classNames({
                        active:
                          item.value ===
                          values[mappingIndexToKey[currentTab]]?.value,
                      })}
                      onClick={() => selectItem(currentTab, item)}
                    >
                      {item?.label}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationPopup;
