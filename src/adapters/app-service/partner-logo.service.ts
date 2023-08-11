import { BaseApiService } from '../baseApi.service';

import { TYPE_APP, TYPE_LOGO } from '~/constants/enums';
import { PartnerLogoDTO } from '~/dto/partnerLogo';

export interface ParamsGetPartnerLogos {
  app_type?: TYPE_APP;
  logo_type?: TYPE_LOGO;
}
class PartnerLogoService extends BaseApiService {
  getPartnerLogos(params?: ParamsGetPartnerLogos): Promise<PartnerLogoDTO[]> {
    const path = 'logo-setup';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get partnerLogos: ', err);
        }
        return [];
      });
  }

  getPartnerLogosById(id): Promise<PartnerLogoDTO> {
    const path = `logo-setup/${id}`;
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get partnerLogo by id: ', err);
        }
        return [];
      });
  }
}
export const usePartnerLogoService = () => new PartnerLogoService();
