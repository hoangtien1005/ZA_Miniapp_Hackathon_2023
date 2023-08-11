import { useQuery } from '@tanstack/react-query';

import { ArticleServiceApp } from './ports';

import { useArticleService } from '~/adapters/app-service/article.service';
import { oaArticleFromDTO } from '~/dto/article';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetOAArticles {
  category?: number;
  isPinned?: boolean;
  offset?: number;
  limit?: number;
  requiredCategory?: boolean;
}

export function useGetOAArticlesQuery(params = {} as ParamsGetOAArticles) {
  const articleService: ArticleServiceApp = useArticleService();
  const {
    category,
    isPinned,
    offset,
    limit,
    requiredCategory = false,
  } = params;
  return useQuery({
    queryKey: [
      'oa-article/list',
      category,
      isPinned,
      offset,
      limit,
      requiredCategory,
    ],
    queryFn: () => {
      if (requiredCategory && !category) return { total: 0, data: [] };
      return fetchWithGlobalLoading(() => {
        return articleService.getOAArticles({
          category,
          is_pinned: isPinned,
          offset,
          limit,
        });
      });
    },
    select: (data) => {
      return {
        total: data?.total,
        data: data?.data?.map((article) => oaArticleFromDTO(article)),
      };
    },
    staleTime: Infinity,
  });
}
