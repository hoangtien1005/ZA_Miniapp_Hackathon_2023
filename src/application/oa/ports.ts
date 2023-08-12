import {
  ArticleResp,
  OAArticleResp,
  ParamsGetArticles,
  ParamsGetOAArticles,
} from '~/adapters/app-service/article.service';
import { ArticleDTO } from '~/dto/article';
import { ArticleCategoryDTO } from '~/dto/articleCategory';

export interface ArticleServiceApp {
  getArticles: (params: ParamsGetArticles) => Promise<ArticleResp>;
  getArticleById: (id) => Promise<ArticleDTO>;
  getArticleCategories: () => Promise<ArticleCategoryDTO[]>;
  getOAArticles: (params: ParamsGetOAArticles) => Promise<OAArticleResp>;
  getOAArticleCategories: () => Promise<ArticleCategoryDTO[]>;
}
