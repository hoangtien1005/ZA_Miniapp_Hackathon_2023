import { PartnerLogo } from '~/domain/partnerLogo';

export type PartnerLogoDTO = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  redirect_url: string;
  logo_index: number;
  partner_id: number;
  product_type_id: number;
  product_id: number;
  bank_id: number;
  app_type: number;
  logo_type: number;
};

export const partnerLogoFromDTO = (dto: PartnerLogoDTO): PartnerLogo => {
  if (!dto || Object.keys(dto).length <= 0) return {} as PartnerLogo;
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.image_url,
    redirectUrl: dto.redirect_url,
    productTypeId: dto.product_type_id,
    index: dto.logo_index,
    bankId: dto.bank_id,
    partnerId: dto.partner_id,
    productId: dto.product_id,
    logoType: dto.logo_type,
  };
};
