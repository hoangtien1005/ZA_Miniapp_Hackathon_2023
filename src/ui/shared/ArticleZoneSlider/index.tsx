import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';

import { useGetOAArticlesQuery } from '~/application/article/useGetOAArticlesQuery.usecase';
import { PRODUCT_TYPE } from '~/constants/enums';
import ROUTES from '~/constants/routes';
import { OAArticle } from '~/domain/article';
import { useAppNavigate } from '~/ui/hooks';
import { handleOpenWebview } from '~/utils/zalo.util';

interface ArticleZoneProps {
  productTypeId?: PRODUCT_TYPE;
}

function OAArticleItem({ article, onClick }) {
  return (
    <div>
      <div className="news_item shadow bdrs news_item_slider" onClick={onClick}>
        <div className="images">
          <div className="imgDrop">
            <img src={article.thumb} alt="" />
          </div>
        </div>
        <div className="news_des">
          <h4 className="ttl fw-500 trim trim_2">{article.title}</h4>
        </div>
      </div>
    </div>
  );
}

export const ArticleZoneSlider: React.FC<ArticleZoneProps> = () => {
  const navigate = useAppNavigate();

  const sliderArticleConfig = {
    infinite: true,
    dots: true,
    arrows: false,
    fade: false,
    slidesToShow: 1,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 3500,
  };

  const handleArticleClick = (article: OAArticle, idx: number) => () => {
    handleOpenWebview(article.link);
  };

  const { data: articles } = useGetOAArticlesQuery({
    limit: 10,
    offset: 0,
    isPinned: false,
  });

  return (
    <section className="sec_news sec_module">
      <div className="container">
        <div className="heading">
          <h2 className="ttl fz-16 fw-700">Tin tức</h2>
          <a className="link" onClick={() => navigate(ROUTES.NEWS)}>
            Xem thêm
          </a>
        </div>
      </div>
      <div className="content_main">
        <Slider
          {...sliderArticleConfig}
          className="news_slider slider slick-dotted"
        >
          {articles &&
            articles?.data?.length > 0 &&
            articles.data.map((article, idx) => {
              return (
                <OAArticleItem
                  key={article.id}
                  article={article}
                  onClick={handleArticleClick(article, idx)}
                />
              );
            })}
        </Slider>
      </div>
    </section>
  );
};
