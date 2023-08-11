import { BaseApiService } from '../baseApi.service';

export interface ParamsGetHotProducts {
  product_type_id: number;
}

class HotProductService extends BaseApiService {
  getHotProducts(params?: ParamsGetHotProducts): Promise<any[]> {
    const path = 'hot-product';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get hot product: ', err);
        }
        return [];
      });
  }
}
export const useHotProductService = () => new HotProductService();
