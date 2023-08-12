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
// export const formatDate = (date, locale?: 'vi-VN', format?: string) => {
//   return date && dayjs(Number(date)).format(format || 'DD/MM/YYYY HH:mm:ss');
// };

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

export const formatFileName = (name: string) => {
  const splitted = name.split('.');

  const extension = splitted.slice(-1)[0];
  const baseName = splitted.slice(0, -1).join('.');

  return `${Date.now()}-${kebabCase(
    baseName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  )}.${extension}`;
};

export const formatFileSize = (size: number) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  }`;
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);
  const now = new Date();

  if (dayjs().isSame(formatter, 'date')) return formatter.format('h:mm A');

  if (dayjs().isSame(formatter, 'week')) return formatter.format('ddd h:mm A');

  if (now.getFullYear() === date.getFullYear())
    return formatter.format('MMM DD h:mm A');

  return formatter.format('DD MMM YYYY h:mm A');
};

export const splitLinkFromMessage = (message: string) => {
  const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;

  const result = message.split(' ').reduce((acc, item) => {
    const isURL = URL_REGEX.test(item);
    if (isURL) acc.push({ link: item });
    else {
      if (typeof acc.slice(-1)[0] === 'string') {
        acc = [...acc.slice(0, -1), `${acc.slice(-1)[0]} ${item}`];
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, [] as ({ link: string } | string)[]);

  return result;
};
