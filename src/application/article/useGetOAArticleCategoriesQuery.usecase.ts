import { useQuery } from '@tanstack/react-query';

import { ArticleServiceApp } from './ports';

import { useArticleService } from '~/adapters/app-service/article.service';
import { articleCategoryFromDTO } from '~/dto/articleCategory';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetOAArticleCategories {
  max?: number;
  sortFn?: any;
  convertFn?: any;
}
export function useGetOAArticleCategoriesQuery(
  params: ParamsGetOAArticleCategories
) {
  const articleService: ArticleServiceApp = useArticleService();
  const { max, sortFn, convertFn } = params;
  return useQuery({
    queryKey: ['oa-article-category/list'],
    queryFn: () => {
      return fetchWithGlobalLoading(() =>
        articleService.getOAArticleCategories()
      );
    },
    select: (data) => {
      const mappingData = data.map((articleCategory) => {
        return articleCategoryFromDTO(articleCategory);
      });
      let result = mappingData;
      if (sortFn) {
        result = result.sort(sortFn);
      }
      if (max) {
        result = result.slice(0, max);
      }
      if (convertFn) {
        result = convertFn(result);
      }
      return result;
    },
    staleTime: Infinity,
  });
}
