import { GoldPriceDTO } from '~/dto/goldPrice';

export interface GoldPriceServiceApp {
  getGoldPrices: (params?: { to: number }) => Promise<GoldPriceDTO[]>;
}
