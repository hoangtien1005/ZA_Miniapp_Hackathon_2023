import { useQuery } from '@tanstack/react-query';


import { useArticleService } from '~/adapters/app-service/article.service';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';


export function useGetAllOAFoodQuery() {
  const articleService = useArticleService();
  return useQuery({
    queryKey: [
      'oa'
    ],
    queryFn: () => {
      return fetchWithGlobalLoading(() => {
        return articleService.getAllOAFood()
      })
    },
    select: (data) => {
      return data;
    },
    staleTime: Infinity,
  });
}
