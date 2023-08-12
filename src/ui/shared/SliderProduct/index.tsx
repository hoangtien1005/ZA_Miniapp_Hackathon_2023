/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';
import Slider from 'react-slick';

import SliderProductItem from '../SliderProductItem';

type SliderProductProps = {
  products: any;
  hasStatus?: boolean;
  customClassNames?: string[];
  onClickItem?: any;
  onClickStatusItem?: any;
  customSliderConfig?: Record<string, any>;
};

const sliderProductDefaultConfig = {
  infinite: true,
  dots: true,
  arrows: false,
  fade: true,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 3500,
};

export default function SliderProduct(props: SliderProductProps) {
  const {
    hasStatus = false,
    products = [],
    customClassNames = [],
    onClickItem,
    onClickStatusItem,
    customSliderConfig,
  } = props;
  const sliderConfig = {
    ...sliderProductDefaultConfig,
    ...customSliderConfig,
  };
  return (
    <Slider
      {...sliderConfig}
      className={classNames(
        'product_slider slider',
        products?.length > 1 && 'slick-dotted',
        hasStatus && `has_status`,
        ...customClassNames
      )}
    >
      {products?.length > 0 &&
        products.map((product) => {
          return (
            <SliderProductItem
              key={product.id}
              productData={product}
              hasStatus={hasStatus}
              altText={product.altText || 'product'}
              onClickItem={onClickItem}
              onClickStatusItem={onClickStatusItem}
            />
          );
        })}
    </Slider>
  );
}
