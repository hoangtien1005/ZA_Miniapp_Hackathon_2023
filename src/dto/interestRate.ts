import { InterestRate } from '~/domain/interestRate';
import { mappingDataSnakeToCamel } from '~/utils/convert.util';

export interface InterestRateType {
  id: number;
  gold_name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface InterestRateDTO {
  id: number;
  company_code: string;
  company: string;
  url: string;
  gold_types: Array<InterestRateType>;
}

export const interestRateFromDTO = (dto: InterestRateDTO): InterestRate => {
  if (!dto || Object.keys(dto).length <= 0) return {} as InterestRate;
  return mappingDataSnakeToCamel(dto); // too much props for manually mapping
};
