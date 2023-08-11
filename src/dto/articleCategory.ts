import { ArticleCategory } from '~/domain/articleCategory';

export interface ArticleCategoryDTO {
  id: number;
  key: string;
  name: string;
  index: number;
}

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
