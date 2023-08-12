import { useQuery } from '@tanstack/react-query';

import { BannerServiceApp } from './ports';

import { useBannerService } from '~/adapters/app-service/banner.service';
import { TYPE_APP, TYPE_BANNER } from '~/constants/enums';
import { bannerFromDTO } from '~/dto/banner';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetBanners {
  type: TYPE_BANNER;
  appType?: TYPE_APP;
  max?: number;
  sortFn?: any;
}

export function useGetBannersByTypeOptimizedQuery(
  params = {} as ParamsGetBanners
) {
  const bannerService: BannerServiceApp = useBannerService();
  const { appType, type, max, sortFn } = params;
  return useQuery({
    queryKey: ['banner', appType, type],
    queryFn: () =>
      fetchWithGlobalLoading(() =>
        bannerService.getBanners({
          banner_app_type: appType || TYPE_APP.MOBILE,
          banner_type: type,
        })
      ),
    select: (data) => {
      const mappingData = data.map((banner) => bannerFromDTO(banner));
      let result = mappingData;
      if (sortFn) {
        result = result.sort(sortFn);
      }
      if (max) {
        result = result.slice(0, max);
      }
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
