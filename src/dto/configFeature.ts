import { ConfigFeature } from '~/domain/configFeature';

export interface ConfigFeatureDTO {
  id: number;
  name: string;
  feature_index: number;
  image_url: string;
  redirect_url: string;
  icon_type: number;
}

export const configFeatureFromDTO = (dto: ConfigFeatureDTO): ConfigFeature => {
  if (!dto || Object.keys(dto).length <= 0) return {} as ConfigFeature;
  return {
    id: dto.id,
    imageUrl: dto.image_url,
    name: dto.name,
    index: dto.feature_index,
    iconType: dto.icon_type,
    redirectUrl: dto.redirect_url,
  };
};
