import { useQuery } from '@tanstack/react-query';

import { ArticleServiceApp } from './ports';

import { useArticleService } from '~/adapters/app-service/article.service';
import { oaArticleFromDTO } from '~/dto/article';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetOAArticles {
  lat: number;
  lon: number;
}

export function useGetNearestOAFoodQuery(params = {} as ParamsGetOAArticles) {
  const articleService = useArticleService();
  const {
    lat, lon
  } = params;
  return useQuery({
    queryKey: [
      'oa', 'nearest', lat, lon
    ],
    queryFn: () => {
      return fetchWithGlobalLoading(() => {
        return articleService.getNearestOAFood({ lat, lon })
      })
    },
    select: (data) => {
      return data;
    },
    staleTime: Infinity,
  });
}
