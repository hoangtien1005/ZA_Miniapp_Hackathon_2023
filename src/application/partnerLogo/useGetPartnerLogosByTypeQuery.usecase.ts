import { useQuery } from '@tanstack/react-query';

import { PartnerLogoServiceApp } from './ports';

import { usePartnerLogoService } from '~/adapters/app-service/partner-logo.service';
import { TYPE_APP, TYPE_LOGO } from '~/constants/enums';
import { partnerLogoFromDTO } from '~/dto/partnerLogo';
import { fetchWithGlobalLoading } from '~/ui/hofs/fetch-with-global-loading';

export interface ParamsGetPartnerLogos {
  logoType: TYPE_LOGO;
  appType?: TYPE_APP;
  max?: number;
  sortFn?: any;
}

export function useGetPartnerLogosByTypeQuery(
  params = {} as ParamsGetPartnerLogos
) {
  const partnerLogoService: PartnerLogoServiceApp = usePartnerLogoService();
  const { appType, logoType, max, sortFn } = params;
  return useQuery({
    queryKey: ['logo-setup', appType],
    queryFn: () =>
      fetchWithGlobalLoading(() =>
        partnerLogoService.getPartnerLogos({
          app_type: appType || TYPE_APP.MOBILE,
        })
      ),
    select: (data) => {
      const mappingData = data.map((logo) => partnerLogoFromDTO(logo));
      let result = mappingData.filter((logo) => logo.logoType === logoType);
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
