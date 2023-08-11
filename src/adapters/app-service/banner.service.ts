import { BaseApiService } from '../baseApi.service';

import { TYPE_APP, TYPE_BANNER } from '~/constants/enums';
import { BannerDTO } from '~/dto/banner';

export interface ParamsGetBanners {
  banner_app_type?: TYPE_APP;
  banner_type?: TYPE_BANNER;
}

class BannerService extends BaseApiService {
  getBanners(params?: ParamsGetBanners): Promise<BannerDTO[]> {
    const path = 'banner';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get banners: ', err);
        }
        return [];
      });
  }
}

export const useBannerService = () => new BannerService();
