export const IS_PRODUCTION = import.meta.env.PROD;

// @ts-nocheck

type Config = {
  isProd: boolean;
  DEFAULT_ACCESS_TOKEN: string | boolean | undefined;
  production: {
    api_base_url: string | boolean | undefined;
    api_tracking_url: string | boolean | undefined;
    api_old_fiza_url: string | boolean | undefined;
  };
  development: {
    api_base_url: string | boolean | undefined;
    api_tracking_url: string | boolean | undefined;
    api_old_fiza_url: string | boolean | undefined;
  };
};

const appConfig: Config = {
  isProd: import.meta.env.PROD,
  DEFAULT_ACCESS_TOKEN: import.meta.env.VITE_DEFAULT_ACCESS_TOKEN,
  production: {
    api_base_url: import.meta.env.VITE_BASE_URL,
    api_tracking_url: import.meta.env.VITE_TRACKING_URL,
    api_old_fiza_url: import.meta.env.VITE_OLD_FIZA_URL,
  },
  development: {
    api_base_url: import.meta.env.VITE_BASE_URL,
    api_tracking_url: import.meta.env.VITE_TRACKING_URL,
    api_old_fiza_url: import.meta.env.VITE_OLD_FIZA_URL,
  },
};

export const DOMAIN_API_URL = appConfig.isProd
  ? appConfig.production.api_base_url
  : appConfig.development.api_base_url;

export const TRACKING_URL = appConfig.isProd
  ? appConfig.production.api_tracking_url
  : appConfig.development.api_tracking_url;

export const FIZA_BASE_URL = import.meta.env.VITE_FIZA_BASE_URL;
export const ZALOPAY_PAYMENT_URL = import.meta.env.VITE_ZALOPAY_PAYMENT_URL;
export const BASE_URL_PDF = import.meta.env.VITE_BASE_URL_PDF;

export const OLD_FIZA_URL = appConfig.isProd
  ? appConfig.production.api_old_fiza_url
  : appConfig.development.api_old_fiza_url;

export const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export default appConfig;
