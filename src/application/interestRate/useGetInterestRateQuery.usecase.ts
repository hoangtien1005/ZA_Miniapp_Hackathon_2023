import { useQuery } from '@tanstack/react-query';

import { InterestRateServiceApp } from './ports';

import { useInterestRateService } from '~/adapters/app-service/interest-rate.service';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export function useGetInterestRatesByTypeQuery() {
  const interestRateService: InterestRateServiceApp = useInterestRateService();
  return useQuery({
    queryKey: ['interest-rate'],
    queryFn: () =>
      fetchWithGlobalLoading(() => interestRateService.getInterestRates()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
