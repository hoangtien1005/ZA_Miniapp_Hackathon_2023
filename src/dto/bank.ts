import { Bank } from '~/domain/bank';

export interface BankDTO {
  id: number;
  swift_code: string;
  name: string;
  bank_group: number;
  phone: string;
  landing_page: string;
  logo_url: string;
  rating: number;
  short_name: string;
  logo400x100_url: string;
  keywords: string;
  user_rating: number;
  logo_homepage_url: string;
  has_ec_code: boolean;
}

export const bankFromDTO = (dto: BankDTO): Bank => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Bank;
  return {
    id: dto.id,
    name: dto.name,
    bankGroup: dto.bank_group,
    landingPage: dto.landing_page,
    logoUrl: dto.logo_url,
    rating: dto.rating,
    shortName: dto.short_name,
    logo400x100Url: dto.logo400x100_url,
    userRating: dto.user_rating,
    logoHomepageUrl: dto.logo_homepage_url,
    hasEcCode: dto.has_ec_code,
  };
};
