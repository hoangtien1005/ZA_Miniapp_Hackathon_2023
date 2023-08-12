import { BaseApiService } from '../baseApi.service';

import { BankDTO } from '~/dto/bank';

class BankService extends BaseApiService {
  getBanksWithActiveCard(): Promise<BankDTO[]> {
    const path = 'website/bank/list-active-card';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get banks: ', err);
        }
        return [];
      });
  }

  getBanks(): Promise<BankDTO[]> {
    const path = 'homepage/v1/bank/list';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get banks: ', err);
        }
        return [];
      });
  }
}
export const useBankService = () => new BankService();
