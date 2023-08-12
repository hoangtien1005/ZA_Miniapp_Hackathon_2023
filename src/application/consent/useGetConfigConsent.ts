import { ConfigServiceApp } from './ports';

import { useConfigService } from '~/adapters/app-service/config.service';

export async function useGetAllCategories() {
  const configService = useConfigService();
  return configService.getAllCategories();
}
