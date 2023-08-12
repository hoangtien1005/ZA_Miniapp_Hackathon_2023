/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { PRODUCT_TYPE, TYPE_BANNER, TYPE_APP } from '~/constants/enums';
import useOpenLink from '~/ui/hooks/use-open-link';

type BannerItemProps = {
  altText?: string;
  onClickItem?: any;
  classNameBanner?: string;
  id: number;
  bannerType: TYPE_BANNER;
  bannerAppType: TYPE_APP;
  title: string;
  description: string;
  bannerIndex: number;
  imageUrl: string;
  redirectUrl: string;
  partnerId: number;
  productId: number;
  productTypeId: PRODUCT_TYPE;
  poster?: any;
};

export default function BannerItem(banner: BannerItemProps) {
  const { classNameBanner = 'banner_item' } = banner;
  const openLink = useOpenLink();

  const handleOnClickBanner = () => {
    // @ts-ignore
    if (banner.onClickItem) banner.onClickItem(banner);
    else if (banner.redirectUrl) openLink(banner.redirectUrl);
  };
  return (
    <div className={classNameBanner} onClick={handleOnClickBanner}>
      <div className="imgDrop">
        <img alt={banner.altText} src={banner.imageUrl} />
      </div>
    </div>
  );
}
