import { ParamsGetPartnerLogos } from '~/adapters/app-service/partner-logo.service';
import { PartnerLogoDTO } from '~/dto/partnerLogo';

export interface PartnerLogoServiceApp {
  getPartnerLogos: (
    params?: ParamsGetPartnerLogos
  ) => Promise<PartnerLogoDTO[]>;
}
