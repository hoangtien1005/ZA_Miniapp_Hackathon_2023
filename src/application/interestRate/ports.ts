import { InterestRateDTO } from '~/dto/interestRate';

export interface InterestRateServiceApp {
  getInterestRates: () => Promise<Array<InterestRateDTO>>;
}
