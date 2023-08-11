// Core model in app, only necessary properties
import { PRODUCT_TYPE, TYPE_APP, TYPE_BANNER } from '~/constants/enums';

export default interface Banner {
  id: number;
  bannerType: TYPE_BANNER;
  bannerAppType: TYPE_APP;
  bannerIndex: number;
  title: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
  partnerId: number;
  productId: number;
  productTypeId: PRODUCT_TYPE;
}
