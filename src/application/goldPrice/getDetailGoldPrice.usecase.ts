import {
  ParamsGetGoldPrice,
  useGoldPriceService,
} from '~/adapters/app-service/gold-price.service';
import { GoldPrice } from '~/domain/goldPrice';
import { goldPriceFromDTO } from '~/dto/goldPrice';

export function useGoldPrices() {
  const goldPriceServiceApp = useGoldPriceService();

  async function getGoldPrices(params = {} as ParamsGetGoldPrice): Promise<{
    data: GoldPrice[];
    lastUpdated: number;
  }> {
    const res = await goldPriceServiceApp.getGoldPrices(params);
    const convertedData: GoldPrice[] = res?.data?.map((item) =>
      goldPriceFromDTO(item)
    );
    return {
      ...res,
      data: convertedData,
      lastUpdated: res?.last_updated,
    };
  }

  return {
    getGoldPrices,
  };
}
