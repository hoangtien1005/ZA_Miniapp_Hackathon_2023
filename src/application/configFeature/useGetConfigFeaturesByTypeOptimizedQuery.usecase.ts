import { useQuery } from '@tanstack/react-query';

import { ConfigFeatureServiceApp } from './ports';

import { useConfigService } from '~/adapters/app-service/config.service';
import { TYPE_FEATURE_CONFIG } from '~/constants/enums';
import { configFeatureFromDTO } from '~/dto/configFeature';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetConfigFeatures {
  iconType: TYPE_FEATURE_CONFIG;
  max?: number;
  sortFn?: any;
}

export function useGetConfigFeaturesByTypeOptimizedQuery(
  params = {} as ParamsGetConfigFeatures
) {
  const configFeatureService: ConfigFeatureServiceApp = useConfigService();
  const { iconType, max, sortFn } = params;

  return useQuery({
    queryKey: ['categories', iconType],
    queryFn: () =>
      fetchWithGlobalLoading(() =>
        configFeatureService.getConfigFeatureByType(iconType)
      ),
    select: (data) => {
      const mappingData = data.map((feature) => configFeatureFromDTO(feature));
      let result = mappingData;
      if (sortFn) {
        result = result.sort(sortFn);
      }
      if (max) {
        result = result.slice(0, max);
      }
      return result;
    },
    staleTime: Infinity,
  });
}
