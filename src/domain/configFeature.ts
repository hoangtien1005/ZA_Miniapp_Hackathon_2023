import { TYPE_FEATURE_CONFIG } from '~/constants/enums';

export type ConfigFeature = {
  id: number;
  name: string;
  index: number;
  iconType: TYPE_FEATURE_CONFIG;
  imageUrl: string;
  redirectUrl: string;
};
