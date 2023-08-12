import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';

import { useGetAllOAFoodQuery } from '~/application/oa/useGetAllOA.usecase';
import { useGetFavoriteOAFoodQuery } from '~/application/oa/useGetFavoriteOA.usecase';
import { useGetNearestOAFoodQuery } from '~/application/oa/useGetNearestOA.usecase';
import { LIST_OA_TYPE } from '~/constants/app';
import { PRODUCT_TYPE } from '~/constants/enums';
import ROUTES from '~/constants/routes';
import { OAArticle } from '~/domain/article';
import { useAppNavigate } from '~/ui/hooks';
import { handleOpenWebview } from '~/utils/zalo.util';

interface ArticleZoneProps {
  listOAType: LIST_OA_TYPE;
  onClickViewDetailOA: any;
}

function OAArticleItem({ article, onClick }) {
  return (
    <div>
      <div className="news_item shadow bdrs news_item_slider" onClick={onClick}>
        <div className="images">
          <div className="imgDrop">
            <img src={article.oa_cover} alt="" />
          </div>
        </div>
        <div className="news_des">
          <h4 className="ttl fw-500 trim trim_2">{article.oa_name}</h4>
        </div>
      </div>
    </div>
  );
}

export const ArticleZoneSlider: React.FC<ArticleZoneProps> = ({ listOAType, onClickViewDetailOA }) => {
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

  

  const mappingOA = {
    [LIST_OA_TYPE.FAVORITE]: {
      title: 'Quán ăn yêu thích',
      getApi: useGetFavoriteOAFoodQuery,
    },
    [LIST_OA_TYPE.NEAREST]: {
      title: 'Quán ăn gần đây',
      getApi: useGetNearestOAFoodQuery,
      paramsGetApi: {
        lat: 10,
        lon: 10,
      }
    }
  }

  const { data: articles } = mappingOA[listOAType].getApi(mappingOA[listOAType].paramsGetApi);
  return (
    <section className="sec_news sec_module">
      <div className="container">
        <div className="heading">
          <h2 className="ttl fz-16 fw-700">{mappingOA[listOAType].title}</h2>
          {/* <a className="link" onClick={() => navigate(ROUTES.NEWS)}>
            Xem thêm
          </a> */}
        </div>
      </div>
      <div className="content_main">
        <Slider
          {...sliderArticleConfig}
          className="news_slider slider slick-dotted"
        >
          {articles &&
            articles?.length > 0 &&
            articles.map((article, idx) => {
              return (
                <OAArticleItem
                  key={article.id}
                  article={article}
                  onClick={() => onClickViewDetailOA(article.id)}
                />
              );
            })}
        </Slider>
      </div>
    </section>
  );
};
