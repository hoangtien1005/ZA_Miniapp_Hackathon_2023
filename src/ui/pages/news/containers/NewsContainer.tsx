import React, { useEffect, useState } from 'react';

import { useGetOAArticleCategoriesQuery } from '~/application/article/useGetOAArticleCategoriesQuery.usecase';
import { useGetOAArticlesQuery } from '~/application/article/useGetOAArticlesQuery.usecase';
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

const NewsScrollNavItem = (props) => {
  const { value, name, tabKey, bannerType, onClickItem, currentItem } = props;
  return (
    <div
      className={`scroll_item ${currentItem?.value === value ? 'active' : ''}`}
      onClick={() => onClickItem({ value, name, bannerType, tabKey })}
    >
      <span>{name}</span>
    </div>
  );
};

const NewsContainer = () => {
  const openLink = useOpenLink();
  const [currentTab, setCurrentTab] = useState<any>(null);

  const { data: categoryTabList } = useGetOAArticleCategoriesQuery({
    sortFn: (firstItem, secondItem) =>
      sortTwoItemByIndex(firstItem, secondItem, true),
    convertFn: convertCategoriesToTabList,
  });

  useEffect(() => {
    if (categoryTabList && categoryTabList?.length > 0) {
      const defaultTab = categoryTabList[0];
      setCurrentTab(defaultTab);
    }
  }, [categoryTabList]);

  const { data: articles } = useGetOAArticlesQuery({
    limit: 5,
    offset: 0,
    category: currentTab?.value,
    isPinned: false,
    requiredCategory: true,
  });

  const { data: pinnedArticles } = useGetOAArticlesQuery({
    limit: 2,
    offset: 0,
    category: currentTab?.value,
    isPinned: true,
    requiredCategory: true,
  });

  const { data: displayProducts } = useGetPromoteProductsByTypeQuery({
    productType: MAPPING_CATEGORY_KEY_AND_PRODUCT_TYPE_ID[currentTab?.tabKey],
    sortFn: sortTwoItemByIndex,
    max: MAX_PROMOTE_ITEM_NEWS,
  });

  const { data: displayBanners } = useGetBannersByTypeQuery({
    type: currentTab?.bannerType,
    sortFn: sortTwoItemByIndex,
    max: MAX_BANNERS_NEWS,
  });

  const onClickPromoteProductItem = (productData) => {
    const { id, imageUrl, redirectUrl, productTypeId, productId, index } =
      productData;
    if (redirectUrl) openLink(redirectUrl);
  };
  const handleClickCategoryTab = (tab) => {
    setCurrentTab(tab);
  };
  const handleVerticalArticleClick = (article: OAArticle) => () => {
    handleOpenWebview(article.link);
  };
  const handleHorizontalArticleClick = (article: OAArticle) => () => {
    handleOpenWebview(article.link);
  };
  return (
    <>
      <ScrollNav
        items={categoryTabList}
        customClassNames={['nav_news', 'sticky']}
        ItemComponent={NewsScrollNavItem}
        onClickItem={handleClickCategoryTab}
        countShow={4}
        ItemComponentProps={{
          currentItem: currentTab,
        }}
      />
      <section className="sec_news pt-24">
        <div className="container">
          <SliderBanner
            key={`news-banner-${currentTab?.bannerType}`}
            banners={displayBanners}
          />
          <OAArticleListHorizontal
            articles={pinnedArticles?.data}
            containerClassName="mt-16"
            handleArticleClick={handleHorizontalArticleClick}
          />
          <SliderProduct
            products={displayProducts}
            customClassNames={['mt-24']}
            onClickItem={onClickPromoteProductItem}
            key={`promote-product-${currentTab?.bannerType}`}
          />
          <OAArticleListVertical
            articles={articles?.data}
            containerClassName="pt-8 pb-40"
            handleArticleClick={handleVerticalArticleClick}
          />
        </div>
      </section>
    </>
  );
};

export default withLayoutWrapper(NewsContainer);
