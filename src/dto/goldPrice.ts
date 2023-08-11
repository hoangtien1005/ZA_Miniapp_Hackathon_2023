import { GoldPrice } from '~/domain/goldPrice';
import { mappingDataSnakeToCamel } from '~/utils/convert.util';

export interface GoldType {
  id: number;
  gold_name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface GoldPriceDTO {
  id: number;
  company_code: string;
  company: string;
  url: string;
  gold_types: Array<GoldType>;
}

export const goldPriceFromDTO = (dto: GoldPriceDTO): GoldPrice => {
  if (!dto || Object.keys(dto).length <= 0) return {} as GoldPrice;
  return mappingDataSnakeToCamel(dto); // too much props for manually mapping
};
