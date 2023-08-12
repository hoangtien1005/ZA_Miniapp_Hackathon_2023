import api from 'zmp-sdk';

import { BaseApiService } from '../baseApi.service';

import { formatQueryParamsToUtm } from '~/utils/format.util';

class AppService extends BaseApiService {
  getQueryParams = () => {
    const params = api.getRouteParams();
    return formatQueryParamsToUtm(params);
  };
}

export const useAppService = () => new AppService();
