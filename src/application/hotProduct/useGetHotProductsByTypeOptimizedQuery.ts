import { useQuery } from '@tanstack/react-query';

import { HotProductServiceApp } from './ports';

import { useHotProductService } from '~/adapters/app-service/hot-product.service';
import { hotProductFromDTO } from '~/dto/hotProduct';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetHotProducts {
  productType: number;
}

export function useGetHotProductsByTypeOptimizedQuery(
  params = {} as ParamsGetHotProducts
) {
  const hotProductService: HotProductServiceApp = useHotProductService();
  const { productType } = params;

  return useQuery({
    queryKey: ['hot-product', productType],
    queryFn: () =>
      fetchWithGlobalLoading(() =>
        hotProductService.getHotProducts({ product_type_id: productType })
      ),
    select: (data) => {
      return data.map((feature) => hotProductFromDTO(feature));
    },
    staleTime: 5 * 60 * 1000,
  });
}
