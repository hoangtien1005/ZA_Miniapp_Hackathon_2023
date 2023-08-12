import { BaseApiService } from '../baseApi.service';

export interface ParamsGetPromoteProducts {
  product_type_id: number;
}

class PromoteProductService extends BaseApiService {
  getPromoteProducts(params?: ParamsGetPromoteProducts): Promise<any[]> {
    const path = 'promote-product';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get promote product: ', err);
        }
        return [];
      });
  }
}
export const usePromoteProductService = () => new PromoteProductService();
