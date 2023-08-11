import React from 'react';

import { InterestRate } from '~/domain/interestRate';
import { numberFormat } from '~/utils/format.util';

// import { useInterestRates } from '~/application/interest-rate/getDetailIsnterstRate.usecase';
// import { InterestRate } from '~/domain/interestRate';

export interface InterestRateListProps {
  data: InterestRate[];
  containerClassName?: string;
}

const InterestRateList = (
  props: InterestRateListProps = {
    data: [],
    containerClassName: '',
  }
) => {
  const { data, containerClassName } = props;

  return (
    <div className={`result_loan scrollbar ${containerClassName}`}>
      <div className="list_loan">
        {data?.length > 0 &&
          data?.map((item) => {
            const userRating = item.bank?.user_rating
              ? Math.floor(item.bank.user_rating)
              : 0;
            return (
              <div className="item_loan" key={item.id}>
                <div className="logo_brand">
                  <div className="imgDrop">
                    <img src={item.logoSquare} alt="" />
                  </div>
                </div>
                <div className="content fz-12">
                  <dl>
                    <dt>Lãi suất năm:</dt>
                    <dd>{item.rate}%</dd>
                  </dl>
                  <dl>
                    <dt>Tiền lãi:</dt>
                    <dd>{numberFormat(item.interest)}đ</dd>
                  </dl>
                  <dl>
                    <dt>Đánh giá:</dt>
                    <dd>
                      {[...Array(userRating).keys()].map((_) => {
                        return '⭐';
                      })}
                    </dd>
                  </dl>
                </div>
              </div>
            );
          })}
        {data?.length <= 0 && (
          <div className="empty text fz-12 color_text_400">
            Lãi suất đang được cập nhật
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestRateList;
