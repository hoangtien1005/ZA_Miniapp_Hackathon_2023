import { ConfigServiceApp } from './ports';

import { useConfigService } from '~/adapters/app-service/config.service';

export async function useGetConfigConsent() {
  const configService: ConfigServiceApp = useConfigService();
  return configService.getConfigConsent();
}
