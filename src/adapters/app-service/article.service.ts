import { BaseApiService } from '../baseApi.service';

import { ArticleDTO, OAArticleDTO } from '~/dto/article';
import { ArticleCategoryDTO } from '~/dto/articleCategory';

export interface ParamsGetArticles {
  category: number;
  offset: number;
  limit: number;
}

export interface ParamsGetOAArticles {
  category?: number;
  is_pinned?: boolean;
  offset?: number;
  limit?: number;
}

export type ArticleResp = ArticleCategoryDTO & {
  total: number;
  data: ArticleDTO[];
};

export type OAArticleResp = {
  total: number;
  data: OAArticleDTO[];
};

class ArticleService extends BaseApiService {
  getArticles(params: ParamsGetArticles): Promise<ArticleResp> {
    const path = 'article/list';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        const finalData = res?.data?.[0] as ArticleResp;
        finalData.data = finalData.data.map((article) => {
          article.category_name = finalData.name;
          return article;
        });
        return finalData;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get articles: ', err);
        }
        return [];
      });
  }

  getOAArticles(params: ParamsGetOAArticles): Promise<OAArticleResp> {
    const path = 'oa-article/list';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get OA articles: ', err);
        }
        return [];
      });
  }

  getArticleById(id): Promise<ArticleDTO> {
    const path = `website/article/${id}`;
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        const articleByCategory = res.data;
        const article = articleByCategory.data[0];
        article.category_name = articleByCategory.name;
        return article;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get article by id: ', err);
        }
        return {};
      });
  }

  getArticleCategories(): Promise<ArticleCategoryDTO[]> {
    const path = 'article-category/list';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get article categories: ', err);
        }
        return [];
      });
  }

  getOAArticleCategories(): Promise<ArticleCategoryDTO[]> {
    const path = 'oa-article-category/list';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get article categories: ', err);
        }
        return [];
      });
  }
}
export const useArticleService = () => new ArticleService();
