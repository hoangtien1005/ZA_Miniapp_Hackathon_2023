import React from 'react';

import { HotProduct } from '~/domain/hotProduct';
import { numberFormat } from '~/utils/format.util';

export interface HotLoanListProps {
  data: HotProduct[] | undefined;
  containerClassName?: string;
  onClickItem?: any;
}

const HotLoanList = (
  props: HotLoanListProps = {
    data: [] as HotProduct[],
    containerClassName: '',
    onClickItem: () => {},
  } as HotLoanListProps
) => {
  const { data, containerClassName, onClickItem } = props;

  return (
    <div className={`list_loan ${containerClassName}`}>
      {data?.map((item) => {
        const info = JSON.parse(item.jsonConfig || '');
        return (
          <div
            className="item_loan"
            key={item.id}
            onClick={() => onClickItem(item)}
          >
            <div className="logo_brand">
              <div className="imgDrop">
                <img src={item.imageUrl} alt="" />
              </div>
            </div>
            <div className="content fz-12">
              <dl>
                <dt>Số tiền vay tối đa:</dt>
                <dd>{numberFormat(info?.loan_amount)}đ</dd>
              </dl>
              <dl>
                <dt>Thời gian vay:</dt>
                <dd>{info?.loan_duration} tháng</dd>
              </dl>
              <dl>
                <dt>Lãi suất:</dt>
                <dd>{info?.loan_interest_rate}%/tháng</dd>
              </dl>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotLoanList;
