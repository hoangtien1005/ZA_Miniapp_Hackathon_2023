import { ParamsGetHotProducts } from '~/adapters/app-service/hot-product.service';
import { HotProductDTO } from '~/dto/hotProduct';

export interface HotProductServiceApp {
  getHotProducts: (params: ParamsGetHotProducts) => Promise<HotProductDTO[]>;
}
