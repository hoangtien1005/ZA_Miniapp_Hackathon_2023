import { ParamsGetPromoteProducts } from '~/adapters/app-service/promote-product.service';
import { PromoteProductDTO } from '~/dto/promoteProduct';

export interface PromoteProductServiceApp {
  getPromoteProducts: (
    params?: ParamsGetPromoteProducts
  ) => Promise<PromoteProductDTO[]>;
}
