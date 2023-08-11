/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';

import { useGoldPrices } from '~/application/goldPrice/getDetailGoldPrice.usecase';
import { GoldPrice } from '~/domain/goldPrice';
import { GoldType } from '~/dto/goldPrice';
import CustomDatePicker from '~/ui/shared/CustomDatePicker';
import { formatDate, numberFormat } from '~/utils/format.util';

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
const currentDateLastYear = new Date(currentDate.getFullYear() - 1);
const currentYear = currentDate.getFullYear();
const lastYear = currentYear - 1;

const GoldPriceComponent = () => {
  const { getGoldPrices } = useGoldPrices();
  const [goldPrices, setGoldPrices] = useState<Array<GoldPrice>>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const sliderGold = {
    infinite: true,
    arrows: false,
    // -   slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: false,
    swipe: true,
    variableWidth: true,
    // key: currentDateTime(), // for refresh position slider when change tab
  };

  const [filter, setFilter] = useState({
    to: currentDate.getTime() + 28800000,
  });

  const handleFetchData = async () => {
    const response = await getGoldPrices(filter);
    setGoldPrices(response?.data);
    setLastUpdated(response?.lastUpdated);
  };

  const handleDateChange = (value) => {
    const dateTo = new Date(value);
    dateTo.setHours(0, 0, 0, 0);
    const to = dateTo.getTime() + 28800000;
    setFilter({ ...filter, to });
  };

  const handleVisibilityChange = (visibilityState) => {
    if (!visibilityState) {
      handleFetchData();
    }
  };

  const classPrice = (varPrice) => {
    if (varPrice > 0) {
      return 'price_up';
    }
    if (varPrice === 0) {
      return 'price_nomal';
    }
    return 'price_down';
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <section className="sec_gold">
        <div className="container">
          <div className="heading flex flex-midle flex-space">
            <h2 className="ttl fz-14 fw-700">Giá vàng</h2>
            <div className="sort_time">
              <div className="field reset_space">
                <label className="label" />
                <div className="control">
                  <CustomDatePicker
                    placeholder="dd/mm/yyyy"
                    mask
                    maskClosable
                    dateFormat="dd/mm/yyyy"
                    startDate={currentDateLastYear}
                    endDate={currentDate}
                    startYear={lastYear}
                    endYear={currentYear}
                    defaultValue={currentDate}
                    onChange={handleDateChange}
                    onVisibilityChange={handleVisibilityChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content_main mt-16">
            <Slider
              {...sliderGold}
              className="slider slider_gold slick-flex has_shadow"
            >
              {goldPrices?.map((item) => {
                return (
                  <div className="module_box" key={item.id}>
                    <div className="module_box_heading">
                      <div className="ttl">{item.company}</div>
                      <div className="logo">
                        <div className="imgDrop">
                          <img src={item.logoUrl} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="module_box_boding">
                      <div className="scrollbar mxh-160">
                        <div className="table_gold fz-12">
                          <div className="tr tr_head">
                            <div className="td">Loại vàng</div>
                            <div className="td">Giá mua</div>
                            <div className="td">Giá bán</div>
                          </div>
                          {item?.goldTypes?.length > 0 &&
                            item?.goldTypes?.map((i: GoldType) => {
                              return (
                                // eslint-disable-next-line react/jsx-key
                                <div className="tr tr_body">
                                  <div className="td">{i?.gold_name}</div>
                                  <div className="td">
                                    {numberFormat(i?.buy / 1000)}
                                    <span
                                      className={`fz-10 ${classPrice(
                                        i.buy_change
                                      )}`}
                                    >
                                      {i?.buy_change / 1000}K
                                    </span>
                                  </div>
                                  <div className="td">
                                    {numberFormat(i?.sell / 1000)}
                                    <span
                                      className={`fz-10 ${classPrice(
                                        i.sell_change
                                      )}`}
                                    >
                                      {i?.sell_change / 1000}K
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          {item?.goldTypes?.length <= 0 && (
                            <div className="empty text fz-12 color_text_400">
                              Giá Vàng đang được cập nhật
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="footing flex flex-midle flex-space mt-16 fz-10">
            <div className="text">Đơn vị tính: ngàn đồng/lượng</div>
            <div className="text">
              Cập nhật lúc:{' '}
              {formatDate(lastUpdated, 'vi-VN', 'HH:mm - DD/MM/YYYY')}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoldPriceComponent;
