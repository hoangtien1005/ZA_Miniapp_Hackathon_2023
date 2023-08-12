import { any } from 'prop-types';
import { ArticleCategory } from '~/domain/articleCategory';

export type ArticleCategoryDTO = any;

export const articleCategoryFromDTO = (
  dto: ArticleCategoryDTO
): ArticleCategory => {
  if (!dto || Object.keys(dto).length <= 0) return {} as ArticleCategory;
  return {
    id: dto.id,
    key: dto.key,
    name: dto.name,
    index: dto.index,
  };
};
