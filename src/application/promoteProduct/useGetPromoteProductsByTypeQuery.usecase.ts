import { useQuery } from '@tanstack/react-query';

import { PromoteProductServiceApp } from './ports';

import { usePromoteProductService } from '~/adapters/app-service/promote-product.service';
import { PRODUCT_TYPE } from '~/constants/enums';
import { promoteProductFromDTO } from '~/dto/promoteProduct';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetPromoteProducts {
  productType: PRODUCT_TYPE;
  max?: number;
  sortFn?: any;
}

export function useGetPromoteProductsByTypeQuery(
  params = {} as ParamsGetPromoteProducts
) {
  const promoteProductService: PromoteProductServiceApp =
    usePromoteProductService();
  const { productType, max, sortFn } = params;

  return useQuery({
    queryKey: ['promote-product'],
    queryFn: () =>
      fetchWithGlobalLoading(() => promoteProductService.getPromoteProducts()),
    select: (data) => {
      const mappingData = data.map((prd) => promoteProductFromDTO(prd));
      let result = mappingData.filter(
        (prd) => prd.productTypeId === productType
      );
      if (sortFn) {
        result = result.sort(sortFn);
      }
      if (max) {
        result = result.slice(0, max);
      }
      return result;
    },
    staleTime: 5 * 60 * 1000,
  });
}
