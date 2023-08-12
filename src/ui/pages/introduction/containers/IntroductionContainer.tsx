import React, { useEffect, useState } from 'react';

import { useGetOAArticleCategoriesQuery } from '~/application/oa/useGetOAArticleCategoriesQuery.usecase';
import { useGetAllOAFoodQuery } from '~/application/oa/useGetAllOA.usecase';
import { useGetBannersByTypeQuery } from '~/application/banner/useGetBannersByTypeQuery.usecase';
import { useGetPromoteProductsByTypeQuery } from '~/application/promoteProduct/useGetPromoteProductsByTypeQuery.usecase';
import {
  MAPPING_CATEGORY_KEY_AND_PRODUCT_TYPE_ID,
  MAX_BANNERS_NEWS,
  MAX_PROMOTE_ITEM_NEWS,
} from '~/constants';
import { OAArticle } from '~/domain/article';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import useOpenLink from '~/ui/hooks/use-open-link';
import {
  OAArticleListHorizontal,
  OAArticleListVertical,
} from '~/ui/shared/OAArticleList';
import ScrollNav from '~/ui/shared/ScrollNav';
import '~/ui/assets/scss/news.scss';
import SliderBanner from '~/ui/shared/SliderBanner';
import SliderProduct from '~/ui/shared/SliderProduct';
import { sortTwoItemByIndex } from '~/utils/common.util';
import { convertCategoriesToTabList } from '~/utils/format.util';
import { handleOpenWebview } from '~/utils/zalo.util';
import { useAppNavigate } from '~/ui/hooks';
import ROUTES from '~/constants/routes';
import { IntroductionImage } from '~/ui/assets/images';


const IntroductionContainer = () => {
  const navigate = useAppNavigate();
  // useEffect(() => {
  //   setTimeout(() => navigate(ROUTES.HOME), 1500);
  // }, [])
  return (
    <>
      <div className="modal_loading_page">
        {/* <Spinner visible /> */}
        <div className="inner_introduction">
          <div className="icon">
            {' '}
            <img className="w-full" src={IntroductionImage} alt="" onClick={() => navigate(ROUTES.HOME)}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayoutWrapper(IntroductionContainer);
