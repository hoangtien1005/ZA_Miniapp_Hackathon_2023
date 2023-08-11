import { BaseApiService } from '../baseApi.service';

import { GoldPriceDTO } from '~/dto/goldPrice';

export interface ParamsGetGoldPrice {
  from?: number;
  to: number;
}

class GoldPriceService extends BaseApiService {
  getGoldPrices(params: ParamsGetGoldPrice): Promise<{
    data: GoldPriceDTO[];
    last_updated: number;
  }> {
    const path = 'homepage/v1/gold-detail';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error('Error get user flow: ', err);
        return {};
      });
  }
}

export const useGoldPriceService = () => new GoldPriceService();
