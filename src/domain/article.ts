export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: number;
  content: string;
  index: number;
  source: string;
  createdAt: number;
  categoryName: string;
}

export interface OAArticle {
  allowedAudienceIds: any;
  description: string;
  id: number;
  indexPinned: number;
  isPinned: boolean;
  link: string;
  oaArticleId: string;
  oaCreatedAt: number;
  oaUpdatedAt: number;
  productId: number;
  productTypeId: number;
  tag: string;
  thumb: string;
  title: string;
  totalShare: number;
  totalView: number;
}
