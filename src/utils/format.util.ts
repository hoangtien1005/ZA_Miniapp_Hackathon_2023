// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

import { MAPPING_CATEGORY_KEY_AND_BANNER_TYPE } from '~/constants';

export function trimExtraSpace(str: string) {
  return str.replace(/\s+/g, ' ').trim();
}

export const numberFormat = (value) =>
  new Intl.NumberFormat('vi').format(value);

export const currencyFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);

export const formatQueryStringToObject = (value) => {
  return value.split('&').reduce((prev: any, curr: any) => {
    const splitEqual = curr.split('=');
    const param = splitEqual[0];
    const newValue = splitEqual[1];
    const obj = { [param]: newValue };
    prev = { ...prev, ...obj };
    return prev;
  }, {});
};

export const articleCreatedTimeFormat = (value) => {
  return dayjs(value).format('DD/MM/YYYY - HH:mm');
};

/**
 *
 * @param seconds - the input seconds
 * @returns an array contains [minutes, seconds] (ex: 63 -> ["01", "03"])
 */
export const formatCountdown = (seconds) => {
  const convertedTime = new Date(seconds * 1000).toISOString().slice(14, 19);
  return convertedTime.split(':');
};

export const generateTextLocation = (arrayParams: Array<string>) => {
  return arrayParams
    .filter((item) => item)
    .map((text) => {
      return text ? ` ${text}` : '';
    })
    .join()
    .trim();
};

export const formatDateToTimestamp = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const getRoundInterestRate = (rate) => {
  return Math.round(rate * 100) / 100;
};

export const standardlizePath = (path: string) => {
  if (path?.endsWith('/') && path.length > 1)
    return path.slice(0, path.length - 1);
  return path;
};

// function to format date to locale
export const formatDate = (date, locale?: 'vi-VN', format?: string) => {
  return date && dayjs(Number(date)).format(format || 'DD/MM/YYYY HH:mm:ss');
};

export const formatQueryParamsToUtm = (params = {}) => {
  const mapping = {
    zma_source: 'utm_source',
    zma_medium: 'utm_medium',
    zma_campaign: 'utm_campaign',
    zma_term: 'utm_term',
    zma_content: 'utm_content',
  };
  const reverseMapping = {
    utm_source: 'zma_source',
    utm_medium: 'zma_medium',
    utm_campaign: 'zma_campaign',
    utm_term: 'zma_term',
    utm_content: 'zma_content',
  };

  const excludeParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];
  return Object.keys(params).reduce((obj, key) => {
    if (mapping[key]) {
      // exist 'zma_' queryParams
      obj[mapping[key]] = params[key];
    } else if (!excludeParams.includes(key)) {
      // exclude 'utm_' queryParams
      obj[key] = params[key];
    } else if (excludeParams.includes(key) && !params[reverseMapping[key]]) {
      // exist 'utm_' but not exist 'zma_' queryParams
      obj[key] = params[key];
    }
    return obj;
  }, {});
};

export const convertCategoriesToTabList = (categories) => {
  return categories.map((item) => ({
    value: item.id,
    name: item.name,
    tabKey: item.key,
    bannerType: MAPPING_CATEGORY_KEY_AND_BANNER_TYPE[item.key],
  }));
};
