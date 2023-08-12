import { PRODUCT_TYPE } from '~/constants/enums';

export type PromoteProduct = {
  id: number;
  name: string;
  index: number;
  imageUrl: string;
  productTypeId: PRODUCT_TYPE;
  promoteContent: string;
  redirectUrl: string;
  productId: number;
};
