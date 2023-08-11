import { PRODUCT_TYPE } from '~/constants/enums';
import { PromoteProduct } from '~/domain/promoteProduct';

export interface PromoteProductDTO {
  id: number;
  name: string;
  promote_index: number;
  image_url: string;
  product_type_id: PRODUCT_TYPE;
  description: string;
  redirect_url: string;
  product_id: number;
}

export const promoteProductFromDTO = (
  dto: PromoteProductDTO
): PromoteProduct => {
  if (!dto || Object.keys(dto).length <= 0) return {} as PromoteProduct;
  return {
    id: dto.id,
    imageUrl: dto.image_url,
    name: dto.name,
    productId: dto.product_id,
    productTypeId: dto.product_type_id,
    redirectUrl: dto.redirect_url,
    promoteContent: dto.description,
    index: dto.promote_index,
  };
};
