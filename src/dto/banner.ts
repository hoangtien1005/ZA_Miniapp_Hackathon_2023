import { TYPE_APP, TYPE_BANNER } from '~/constants/enums';
import Banner from '~/domain/banner';

export interface BannerDTO {
  id: number;
  banner_type: TYPE_BANNER;
  banner_app_type: TYPE_APP;
  banner_index: number;
  title: string;
  description: string;
  image_url: string;
  redirect_url: string;
  product_id: number;
  product_type_id: number;
  partner_id: number;
}

export const bannerFromDTO = (dto: BannerDTO): Banner => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Banner;
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    bannerIndex: dto.banner_index,
    imageUrl: dto.image_url,
    redirectUrl: dto.redirect_url,
    bannerType: dto.banner_type,
    bannerAppType: dto.banner_app_type,
    productTypeId: dto.product_type_id,
    productId: dto.product_id,
    partnerId: dto.partner_id,
  };
};
