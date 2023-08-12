/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { OAArticle } from '~/domain/article';
import { formatDate } from '~/utils/format.util';
import { handleOpenWebview } from '~/utils/zalo.util';

interface OAArticleListProps {
  containerClassName?: string;
  articles: any;
  handleArticleClick: any;
  onClickViewDetailOA: any;
}

export const OAArticleListVertical: React.FC<OAArticleListProps> = ({
  containerClassName,
  articles = [],
  handleArticleClick,
  onClickViewDetailOA,
}) => {
  return (
    <div className={`news_list ${containerClassName}`}>
      {articles.map((article) => {
        return (
          <div
            key={article.oa_id}
            className="news_item news_item_list mt-16"
            onClick={() => onClickViewDetailOA(article.oa_id)}
          >
            <div className="images">
              <div className="imgDrop">
                {' '}
                <img src={article.cover} alt="" />
              </div>
            </div>
            <div className="news_des">
              <h4 className="ttl fw-500 trim trim_2">{article.name}</h4>
              <div className="date fz-12 mt-8 color_text_500">
                {/* {formatDate(article.oaUpdatedAt, 'vi-VN', 'DD/MM/YYYY')} •{' '} */}
                {/* {article.totalView} người xem
                 */}
                 {article.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const OAArticleListHorizontal: React.FC<OAArticleListProps> = ({
  containerClassName,
  articles = [],
  handleArticleClick,
}) => {
  return (
    <div className={`flex flex-wrap gap-16 ${containerClassName}`}>
      {articles.map((article) => {
        return (
          <div
            className="news_item news_item_column"
            key={article.oaArticleId}
            onClick={handleArticleClick(article)}
          >
            <div className="images">
              <div className="imgDrop">
                {' '}
                <img src={article.thumb} alt="" />
              </div>
            </div>
            <div className="news_des">
              <h4 className="ttl fw-500 trim trim_2">{article.title}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};
