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
import { TYPE_BANNER, TYPE_LOGO } from '~/constants/enums';
import '~/ui/assets/scss/home.scss';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { ArticleZoneSlider } from '~/ui/shared/ArticleZoneSlider';
import { sortTwoItemByIndex } from '~/utils/common.util';
import { LIST_OA_TYPE } from '~/constants/app';
import {
  OAArticleListHorizontal,
  OAArticleListVertical,
} from '~/ui/shared/OAArticleList';
import { useGetAllOAFoodQuery } from '~/application/oa/useGetAllOA.usecase';
import { handleOpenWebview } from '~/utils/zalo.util';
import { FoodBannerImg } from '~/ui/assets/images';
import { useAppNavigate } from '~/ui/hooks';
import ROUTES from '~/constants/routes';

export const HomepageContainer = () => {
  const { data: insuranceBanners } = useGetBannersByTypeQuery({
    type: TYPE_BANNER.INSURANCE,
    sortFn: sortTwoItemByIndex,
    max: MAX_INSURANCE_BANNERS_HOME,
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

  const headerBanner = {
    imageUrl: FoodBannerImg,
    altText: 'food banner',
  };

  const { data: pinnedArticles } = useGetAllOAFoodQuery();

  const handleHorizontalArticleClick = (article) => () => {
    handleOpenWebview(article.link);
  };
  const navigate = useAppNavigate();
  // useEffect(() => {
  //   navigate(`${ROUTES.BOOKING}?id=1`);
  // }, [])

  const onClickViewDetailOA = (oaId) => {
    navigate(`${ROUTES.BOOKING}?id=${oaId}`); 
  }
  return (
    <>
      <EntriesHomeZone headerBanner={headerBanner} />
      {/* <LoansZone
        loanBanners={loanBanners}
        loanPartnerLogos={loanPartnerLogos}
      />
      <CardsZone cardPartnerLogos={cardPartnerLogos} />
      <InsurancesZone
        banners={insuranceBanners}
        logos={insurancePartnerLogos}
      /> */}
      <ArticleZoneSlider listOAType={LIST_OA_TYPE.FAVORITE} onClickViewDetailOA={onClickViewDetailOA}/>

      <ArticleZoneSlider listOAType={LIST_OA_TYPE.NEAREST} onClickViewDetailOA={onClickViewDetailOA}/>

      <section className="sec_news mb-16">
        <div className="container">
          <OAArticleListVertical
            articles={pinnedArticles}
            containerClassName="mt-16"
            handleArticleClick={handleHorizontalArticleClick} onClickViewDetailOA={onClickViewDetailOA}
          />
        </div>
      </section>
    </>
  );
};

export default withLayoutWrapper(HomepageContainer);
