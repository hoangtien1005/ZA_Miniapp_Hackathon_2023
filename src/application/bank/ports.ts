import { BankDTO } from '~/dto/bank';

export interface BankServiceApp {
  getBanks: () => Promise<Array<BankDTO>>;
}
