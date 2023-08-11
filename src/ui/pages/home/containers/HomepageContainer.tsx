import React, { useEffect } from 'react';

import { CardsZone } from '../components/CardsZone';
import { EntriesHomeZone } from '../components/EntriesHomeZone';
import { InsurancesZone } from '../components/InsurancesZone';
import { LoansZone } from '../components/LoansZone';

import { useGetBannersByTypeQuery } from '~/application/banner/useGetBannersByTypeQuery.usecase';
import { useGetPartnerLogosByTypeQuery } from '~/application/partnerLogo/useGetPartnerLogosByTypeQuery.usecase';
import {
  MAX_CARD_LOGOS_HOME,
  MAX_INSURANCE_BANNERS_HOME,
  MAX_INSURANCE_LOGOS_HOME,
  MAX_LOAN_BANNERS_HOME,
  MAX_LOAN_LOGOS_HOME,
} from '~/constants';
import { PRODUCT_TYPE, TYPE_BANNER, TYPE_LOGO } from '~/constants/enums';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import '~/ui/assets/scss/home.scss';
import { ArticleZoneSlider } from '~/ui/shared/ArticleZoneSlider';
import { sortTwoItemByIndex } from '~/utils/common.util';

export const HomepageContainer = () => {
  const { data: insuranceBanners } = useGetBannersByTypeQuery({
    type: TYPE_BANNER.INSURANCE,
    sortFn: sortTwoItemByIndex,
    max: MAX_INSURANCE_BANNERS_HOME,
  });
  const { data: headerBanners } = useGetBannersByTypeQuery({
    type: TYPE_BANNER.HEADER,
    sortFn: sortTwoItemByIndex,
  });
  const { data: loanBanners } = useGetBannersByTypeQuery({
    type: TYPE_BANNER.LOAN,
    sortFn: sortTwoItemByIndex,
    max: MAX_LOAN_BANNERS_HOME,
  });

  const { data: loanPartnerLogos } = useGetPartnerLogosByTypeQuery({
    logoType: TYPE_LOGO.LOAN_FAST,
    sortFn: sortTwoItemByIndex,
    max: MAX_LOAN_LOGOS_HOME,
  });

  const { data: insurancePartnerLogos } = useGetPartnerLogosByTypeQuery({
    logoType: TYPE_LOGO.INSURANCE,
    sortFn: sortTwoItemByIndex,
    max: MAX_INSURANCE_LOGOS_HOME,
  });

  const { data: cardPartnerLogos } = useGetPartnerLogosByTypeQuery({
    logoType: TYPE_LOGO.CARD_CREDIT,
    sortFn: sortTwoItemByIndex,
    max: MAX_CARD_LOGOS_HOME,
  });

  useEffect(() => {
    // scroll shortcut
    const zauiPage = document.querySelector('.zaui-page') as HTMLElement;
    const secProductElement = document.querySelector(
      '.sec_product'
    ) as HTMLElement;
    const scrollFixedProductMain = document.querySelector(
      '.product_main.scroll_fixed'
    ) as HTMLElement;

    function handleScrollEntriesZone() {
      const scroll = zauiPage?.scrollTop;
      const elementHeight = secProductElement?.offsetHeight;

      if (scroll >= elementHeight) {
        scrollFixedProductMain?.classList.add('fadeIn');
      } else {
        scrollFixedProductMain?.classList.remove('fadeIn');
      }
    }

    zauiPage?.addEventListener('scroll', handleScrollEntriesZone);
    return () => {
      zauiPage?.removeEventListener('scroll', handleScrollEntriesZone);
    };
  }, []);

  return (
    <>
      <EntriesHomeZone headerBanner={headerBanners?.[0]} />
      <LoansZone
        loanBanners={loanBanners}
        loanPartnerLogos={loanPartnerLogos}
      />
      <CardsZone cardPartnerLogos={cardPartnerLogos} />
      <InsurancesZone
        banners={insuranceBanners}
        logos={insurancePartnerLogos}
      />
      <ArticleZoneSlider />
    </>
  );
};

export default withLayoutWrapper(HomepageContainer);
