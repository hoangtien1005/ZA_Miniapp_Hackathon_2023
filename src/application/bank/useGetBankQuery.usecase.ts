import { useQuery } from '@tanstack/react-query';

import { BankServiceApp } from './ports';

import { useBankService } from '~/adapters/app-service/bank.service';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export function useGetBanksByTypeQuery() {
  const bankService: BankServiceApp = useBankService();
  return useQuery({
    queryKey: ['bank/list'],
    queryFn: () => fetchWithGlobalLoading(() => bankService.getBanks()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
