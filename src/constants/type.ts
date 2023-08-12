import { Bank } from '../domain/bank';

import { TYPE_PRODUCT } from './enums';

import { Article, OAArticle } from '~/domain/article';
import { ArticleCategory } from '~/domain/articleCategory';
import { Card } from '~/domain/card';
import Profile from '~/domain/profile';

export type InnerHtml = string;
export type Image = string;

export type ArticleListViewModel = {
  total: number;
  data: Article[];
};

export type OAArticleListViewModel = {
  total: number;
  data: OAArticle[];
};

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

export type ListMapCards = Record<Bank['id'], Card[]>;
export type ListMapArticles = Record<
  ArticleCategory['id'],
  ArticleListViewModel
>;

type ProductDetailViewModel = {
  name: string;
  briefPromotion: string;
  qrImage: string;
};

type PartnerDetailViewModel = {
  logo: string;
  name: string;
};
export type DetailQRProps = {
  profile: Profile;
  product: ProductDetailViewModel;
  partner: PartnerDetailViewModel;
  type: TYPE_PRODUCT;
};
