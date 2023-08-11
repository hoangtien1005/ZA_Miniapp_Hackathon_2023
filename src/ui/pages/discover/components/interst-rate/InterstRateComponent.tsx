import React, { useEffect, useState } from 'react';

import { Select } from 'zmp-ui';

import InterestRateList from '../interst-rate-list/InterstRateList';

import { useGetBanksByTypeQuery } from '~/application/bank/useGetBankQuery.usecase';
import { useGetInterestRatesByTypeQuery } from '~/application/interestRate/useGetInterestRateQuery.usecase';
import { InterestRate } from '~/domain/interestRate';
import CurrencyInput from '~/ui/shared/CurrencyInput';
import { findOneFromDataset } from '~/utils/dataset.util';
import { getLogo, getSquareLogo } from '~/utils/logo.util';

const durationOptions = [
  { title: '1 tháng', value: 1 },
  { title: '3 tháng', value: 3 },
  { title: '6 tháng', value: 6 },
  { title: '9 tháng', value: 9 },
  { title: '1 năm', value: 12 },
  { title: '2 năm', value: 24 },
  { title: '3 năm', value: 36 },
];

const sortOptions = [
  { title: 'Lãi suất giảm dần', value: 1 },
  { title: 'Mức độ phổ biến giảm dần', value: 2 },
];

const calculateInterest = (rate, amount, period) => {
  return ((rate / 12) * +amount * period) / 100;
};

const prepareData = (rates, banks, currentFilter) => {
  const list: any = [];
  const fnIndex1 = function (item) {
    return (
      (item.group > 0 ? Math.log(1 / item.group) : 0) + Math.sqrt(item.rate)
    );
  };
  const fnIndex2 = function (item) {
    return item.rate * 100 + 1 / item.group;
  };
  if (rates && rates.length > 0) {
    rates.forEach(function (root) {
      root.rates.forEach(function (sub) {
        const item: any = {
          code: root.code,
          group: root.group,
          landing_page: root.landing_page,
          min_amount: sub.min_amount,
          period: sub.period,
          rate: parseFloat(sub.rate),
          logoSquare: getSquareLogo(`${root.code}VNVX`),
          logo: getLogo(`${root.code}VNVX`),
          interest: calculateInterest(
            sub.rate,
            currentFilter.amount,
            currentFilter.period
          ),
        };

        const filter = { swift_code: `${root.code}VNVX` };
        const alternativeFilter = { swift_code: `${root.code}VNVN` };
        item.bank = findOneFromDataset(filter, banks);
        if (!item.bank) {
          item.bank = findOneFromDataset(alternativeFilter, banks);
        }

        item.index1 = fnIndex1(item);
        item.index2 = fnIndex2(item);

        list.push(item);
      });
    });
  }
  return list;
};

const filterDataset = (dataset, filter) => {
  const seen: any = [];
  return dataset
    .filter(
      (row) =>
        parseInt(filter.amount, 10) > 0 &&
        row.period === filter.period &&
        row.rate > 0
    )
    .sort((a, b) =>
      filter.sort === 2 ? b.index1 - a.index1 : b.index2 - a.index2
    )
    .filter((row) => {
      if (seen[row.code]) {
        return false;
      }
      seen[row.code] = true;
      return true;
    });
};

const InterestRateComponent = () => {
  const { Option } = Select;
  const [dataset, setDataset] = useState<Array<InterestRate>>([]);
  const [interestRates, setInterestRates] = useState<Array<InterestRate>>([]);

  const { data: banks } = useGetBanksByTypeQuery();
  const { data: rates } = useGetInterestRatesByTypeQuery();

  const [filter, setFilter] = useState<{
    amount: number;
    period: number;
    sort: number;
  }>({
    amount: 5000000,
    period: 12,
    sort: 1,
  });

  const handleOptionSelected = (value) => {
    setFilter({ ...filter, period: value });
  };

  const handleSortSelected = (value) => {
    setFilter({ ...filter, sort: value });
  };

  const handleAmountChange = (value) => {
    setFilter({ ...filter, amount: value });
  };

  const handlePrepareData = async (ratesData, banksData) => {
    const list = prepareData(ratesData, banksData, filter);
    setDataset(list);
  };

  useEffect(() => {
    if (rates && banks) handlePrepareData(rates, banks);
  }, [rates, banks]);

  const handleChangeFilter = () => {
    const filteredList = filterDataset(dataset, filter).map((row) => ({
      ...row,
      interest: ((row.rate / 12) * filter.amount * filter.period) / 100,
    }));
    setInterestRates(filteredList);
  };

  useEffect(() => {
    handleChangeFilter();
  }, [dataset, filter]);

  return (
    <>
      <div className="module_box mt-24">
        <div className="module_box_heading">
          <div className="ttl">Tra cứu Lãi suất</div>
        </div>
        <div className="module_box_boding">
          <div className="row">
            <div className="col-6">
              <div className="field">
                <label className="label" htmlFor="">
                  Số tiền gửi (VNĐ)
                </label>
                <div className="control">
                  <CurrencyInput
                    className="input text_limit input_false"
                    value={filter.amount}
                    maxLength={14}
                    placeholder="Nhập số tiền"
                    onChange={handleAmountChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label className="label" htmlFor="">
                  Kì hạn gửi
                </label>
                <div className="control">
                  <Select
                    defaultValue={filter.period}
                    onChange={handleOptionSelected}
                    closeOnSelect
                  >
                    {durationOptions.map((option) => (
                      <Option key={option.value} {...option} />
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="sort flex flex-midle flex-space">
            <div className="result fz-12">{interestRates.length} kết quả </div>
            <div className="field_sort fz-14 color_main">
              <div className="field reset_space">
                <label className="label" htmlFor="" />
                <div className="control">
                  <Select
                    defaultValue={filter.sort}
                    onChange={handleSortSelected}
                    closeOnSelect
                  >
                    {sortOptions.map((option) => (
                      <Option key={option.value} {...option} />
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <InterestRateList data={interestRates} containerClassName="mt-16" />
        </div>
      </div>
    </>
  );
};

export default InterestRateComponent;
