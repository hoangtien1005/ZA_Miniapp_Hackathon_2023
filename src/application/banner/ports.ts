import { ParamsGetBanners } from '~/adapters/app-service/banner.service';
import { BannerDTO } from '~/dto/banner';

export interface BannerServiceApp {
  getBanners: (params?: ParamsGetBanners) => Promise<BannerDTO[]>;
}
