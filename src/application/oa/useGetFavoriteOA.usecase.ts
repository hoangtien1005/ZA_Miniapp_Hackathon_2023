import { useQuery } from '@tanstack/react-query';

import { useArticleService } from '~/adapters/app-service/article.service';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';


export function useGetFavoriteOAFoodQuery() {
  const articleService = useArticleService();
  return useQuery({
    queryKey: [
      'oa', 'favorite'
    ],
    queryFn: () => {
      return fetchWithGlobalLoading(() => {
        return articleService.getFavoriteOAFood()
      })
    },
    select: (data) => {
      return data;
    },
    staleTime: Infinity,
  });
}
