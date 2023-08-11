import { ConfigFeatureDTO } from '~/dto/configFeature';

export interface ConfigFeatureServiceApp {
  getConfigFeature: () => Promise<ConfigFeatureDTO[]>;
  getConfigFeatureByType: (iconType: number) => Promise<ConfigFeatureDTO[]>;
}
