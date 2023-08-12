import { PRODUCT_TYPE } from '~/constants/enums';

export type PartnerLogo = {
  id: number;
  name: string;
  imageUrl: string;
  redirectUrl: string;
  productTypeId: PRODUCT_TYPE;
  index: number;
  bankId: number;
  partnerId: number;
  productId: number;
  logoType: number;
};
