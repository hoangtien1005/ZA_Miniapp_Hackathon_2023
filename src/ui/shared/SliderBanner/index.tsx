/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';
import Slider from 'react-slick';

import BannerItem from '../BannerItem';

import Banner from '~/domain/banner';

type SliderBannerProps = {
  banners: Banner[] | undefined;
  height?: string;
  customClassNames?: string[];
  onClickItem?: any;
  customSliderConfig?: Record<string, any>;
};

const sliderBannerDefaultConfig = {
  infinite: true,
  dots: true,
  arrows: false,
  fade: true,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 3500,
};

export default function SliderBanner(props: SliderBannerProps) {
  const {
    height = '160',
    banners = [],
    customClassNames = [],
    onClickItem,
    customSliderConfig,
  } = props;
  const sliderConfig = {
    ...sliderBannerDefaultConfig,
    ...customSliderConfig,
  };
  return (
    <Slider
      {...sliderConfig}
      className={classNames(
        'bdrs banner_slider slider',
        banners?.length > 1 && 'slick-dotted',
        `height_${height}`,
        ...customClassNames
      )}
    >
      {banners?.length > 0 &&
        banners.map((banner) => {
          return (
            <BannerItem
              key={banner.id}
              {...banner}
              altText="banner"
              onClickItem={onClickItem}
            />
          );
        })}
    </Slider>
  );
}
