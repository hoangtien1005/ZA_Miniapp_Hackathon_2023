import { BaseApiService } from '../baseApi.service';

import { InterestRateDTO } from '~/dto/interestRate';

class InterestRateService extends BaseApiService {
  getInterestRates(): Promise<Array<InterestRateDTO>> {
    const path = 'homepage/v1/interest-rate';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error('Error get interest rate: ', err);
        return {};
      });
  }
}

export const useInterestRateService = () => new InterestRateService();
