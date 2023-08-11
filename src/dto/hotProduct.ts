import { HotProduct } from '~/domain/hotProduct';
import { mappingDataSnakeToCamel } from '~/utils/convert.util';

export interface HotProductDTO {
  id: number;
  name: string;
  product_type_id: number;
  image_url: string;
  redirect_url: string;
  hot_index: number;
  json_config: string;
}

export const hotProductFromDTO = (dto: HotProductDTO): HotProduct => {
  if (!dto || Object.keys(dto).length <= 0) return {} as HotProduct;
  return mappingDataSnakeToCamel(dto) as HotProduct; // too much props for manually mapping
};
