import { BaseApiService } from '../baseApi.service';

import { ConfigFeatureDTO } from '~/dto/configFeature';
import { mappingDataSnakeToCamel } from '~/utils/convert.util';

class ConfigService extends BaseApiService {
  getConfigTheme(): Promise<any> {
    const path = 'config-theme';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error('Error get config theme: ', err);
        return {};
      });
  }

  getConfigFeature(): Promise<ConfigFeatureDTO[]> {
    const path = 'config-feature';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error('Error get config feature: ', err);
        return {};
      });
  }

  getConfigFeatureByType(iconType: number): Promise<ConfigFeatureDTO[]> {
    const path = 'config-feature';
    return super
      .get(this.generateUrl(path), {
        icon_type: iconType,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error('Error get config feature by type: ', err, iconType);
        return {};
      });
  }

  getConfigFeatureById(id: number): Promise<ConfigFeatureDTO> {
    const path = `config-feature/${id}`;
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error('Error get config feature by id: ', err, id);
        return {};
      });
  }

  getConfigConsent(): Promise<any> {
    const path = `config/consent-version`;
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return mappingDataSnakeToCamel(res.data);
      })
      .catch((err) => {
        console.error('Error get config consent: ', err);
        return {};
      });
  }
}

export const useConfigService = () => new ConfigService();
