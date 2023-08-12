import { useArticleService } from '~/adapters/app-service/article.service';
import { useQuery } from '@tanstack/react-query';

import { ArticleServiceApp } from './ports';

import { oaArticleFromDTO } from '~/dto/article';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetOAArticles {
  id: number;
}

export function useGetOAByIdQuery(params = {} as ParamsGetOAArticles) {
  const articleService = useArticleService();
  const {
    id
  } = params;
  return useQuery({
    queryKey: [
      'oaById', id
    ],
    queryFn: () => {
      return fetchWithGlobalLoading(() => {
        return articleService.getOAById({ oa_id: id })
      })
    },
    select: (data) => {
      return data;
    },

    staleTime: Infinity,
  });
}
