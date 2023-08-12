export enum TYPE_APP {
  MOBILE = 1,
  MINIAPP = 2,
  WEBSITE = 3,
}

export enum API_CODE {
  SUCCESS = 0,
}

export enum TYPE_BANNER {
  WELCOME = 1,
  MASTHEAD,
  FEATURED,
  MINIAPP,
  GAME,
  LOANFORM,
  TRACKINGPIXEL,
  PROFILE,
  PARTNER,
  ADVERTISEMENT,
  DISCOVER,
  NEWS,
  HEADER,
  INSURANCE,
  LOAN,
  CARD,
  STOCK,
  NEWS_INSURANCE,
  NEWS_LOAN,
  NEWS_CARD,
  NEWS_STOCK,
  NEWS_FINANCIAL,
  SUBPAGE_INSURANCE,
}

export enum TYPE_FEATURE_CONFIG {
  UNKNOWN,
  ICON_SEARCH_PRODUCT,
  ICON_INTEREST_RATE,
  ICON_EXCHANGE_RATE,
  ICON_ATM,
  ICON_LOAN,
  ICON_INSURANCE,
  LINK_LOAN,
  ICON_PARTNER_RATING,
  ICON_GOLD_PRICE,
  ICON_LOAN_PRODUCT,
  ICON_ZONE_SHORTCUT,
  ICON_ZONE_SUBPAGE,
}

export enum PRODUCT_TYPE {
  CARD = 1,
  LOAN = 2,
  INSURANCE = 3,
  SECURITIES = 4,
}

export enum PARTNER_ID {
  Shinhan = 1,
  VPBank = 6,
  CitibankVendor = 20,
  SC = 23,
  EasyCredit = 24,
  FECredit = 25,
  ShinhanFinance = 26,
  UOB = 27,
  VIB = 28,
  TrustingSocial = 29,
  COMB = 30,
  LFVN = 31,
  HSBC = 32,
  TPBank = 33,
  Sacombank = 34,
  Yuanta = 35,
  UBank = 40,
  DICO = 41,
  PVI = 42,
}

export enum TYPE_PRODUCT {
  CARD = 1,
  LOAN,
}

export const OFFICIAL_PARTNER_NAME = {
  [PARTNER_ID.Shinhan]: 'Ngân hàng Shinhan Việt Nam',
  [PARTNER_ID.UBank]: 'Ngân hàng số UBank',
  [PARTNER_ID.FECredit]: 'Công Ty Tài Chính FE Credit',
  [PARTNER_ID.UOB]: 'Ngân hàng UOB Việt Nam',
  [PARTNER_ID.TPBank]: 'TPFico',
};

export const MAPPING_PARTNER_NAME = {
  [PARTNER_ID.Shinhan]: 'Shinhan',
  [PARTNER_ID.UBank]: 'UBank',
  [PARTNER_ID.FECredit]: 'FE Credit',
  [PARTNER_ID.UOB]: 'UOB',
  [PARTNER_ID.TPBank]: 'TPFico',
};

export enum STATE_LOGO {
  ACTIVE = 0,
  INACTIVE = 1,
}

export enum JOB_STATUS_TYPE {
  WORKING = 1,
  BOSS = 2,
  OTHER = 3,
}

export enum GROUP_STATE_CARD_AND_LOAN {
  APPROVED = 1,
  PROCESSING = 2,
  UNSUITABLE = 3,
  INCOMPLETE = 4,
}

export enum TYPE_LOGO {
  UNKNOWN,
  CARD_CREDIT,
  CARD_DOMESTIC,
  LOAN_FAST,
  LOAN_CONSUMER,
  LOAN_BUSINESS,
  INSURANCE,
}
