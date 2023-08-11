import React, { useEffect, useState } from 'react';

import '~/ui/assets/scss/discover.scss';
import HotLoanComponent from '../components/hot-loan/HotLoanComponent';

import { useGetBannersByTypeOptimizedQuery } from '~/application/banner/useGetBannersByTypeOptimizedQuery.usecase';
import { MAX_DISCOVER_BANNERS_DISCOVER } from '~/constants';
import { TYPE_BANNER } from '~/constants/enums';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import {
  GoldPriceComponent,
  InterestRateComponent,
} from '~/ui/pages/discover/components';
import SliderBanner from '~/ui/shared/SliderBanner';
import { sortTwoItemByIndex } from '~/utils/common.util';

const DiscoverContainer = () => {
  const { data: discoverBanners } = useGetBannersByTypeOptimizedQuery({
    type: TYPE_BANNER.DISCOVER,
    sortFn: sortTwoItemByIndex,
    max: MAX_DISCOVER_BANNERS_DISCOVER,
  });

  return (
    <>
      <section className="sec_discover">
        <div className="container">
          <SliderBanner banners={discoverBanners} />
          <HotLoanComponent />
          <InterestRateComponent />
        </div>
      </section>
      <GoldPriceComponent />
    </>
  );
};

export default withLayoutWrapper(DiscoverContainer);
