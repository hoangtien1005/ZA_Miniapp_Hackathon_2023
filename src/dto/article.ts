import { Article, OAArticle } from '~/domain/article';

export interface ArticleDTO {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: number;
  content: string;
  index: number;
  source: string;
  created_at: number;
  category_name: string;
}

export interface OAArticleDTO {
  allowed_audience_ids: any;
  description: string;
  id: number;
  index_pinned: number;
  is_pinned: boolean;
  link: string;
  oa_article_id: string;
  oa_created_at: number;
  oa_updated_at: number;
  product_id: number;
  product_type_id: number;
  tag: string;
  thumb: string;
  title: string;
  total_share: number;
  total_view: number;
}

export const articleFromDTO = (dto: ArticleDTO): Article => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Article;
  return {
    id: dto.id,
    title: dto.title,
    thumbnail: dto.thumbnail,
    description: dto.description,
    category: dto.category,
    content: dto.content,
    index: dto.index,
    source: dto.source || '',
    createdAt: dto.created_at || 0,
    categoryName: dto.category_name || '',
  };
};

export const oaArticleFromDTO = (dto: OAArticleDTO): OAArticle => {
  if (!dto || Object.keys(dto).length <= 0) return {} as OAArticle;
  return {
    allowedAudienceIds: dto.allowed_audience_ids,
    description: dto.description,
    id: dto.id,
    indexPinned: dto.index_pinned,
    isPinned: dto.is_pinned,
    link: dto.link,
    oaArticleId: dto.oa_article_id,
    oaCreatedAt: dto.oa_created_at,
    oaUpdatedAt: dto.oa_updated_at,
    productId: dto.product_id,
    productTypeId: dto.product_type_id,
    tag: dto.tag,
    thumb: dto.thumb,
    title: dto.title,
    totalShare: dto.total_share,
    totalView: dto.total_view,
  };
};
