/* eslint-disable no-unused-expressions */
import { removeAccents } from './convert.util';
import { isNavigateToOtherDomain } from './validate.util';

export const compareAlphabeticalLabel = (firstString, secondString) => {
  const removedAccentsFirstString = removeAccents(
    firstString.label
  ).toLowerCase();
  const removedAccentsSecondString = removeAccents(
    secondString.label
  ).toLowerCase();
  // eslint-disable-next-line no-nested-ternary
  return removedAccentsFirstString !== removedAccentsSecondString
    ? removedAccentsFirstString < removedAccentsSecondString
      ? -1
      : 1
    : 0;
};

export const compareDynamicPath = (firstPath, secondPath) => {
  // for only 2 dynamic path with 1 nested level
  const startSplashIdx = firstPath.indexOf('/');
  const secondPlashIdx = firstPath.indexOf('/', startSplashIdx + 1);
  if (secondPlashIdx < 0) return false;
  return (
    firstPath.substring(startSplashIdx, secondPlashIdx) ===
    secondPath.substring(startSplashIdx, secondPlashIdx)
  );
};

export const getBannersByType = (banners, type) => {
  return banners.filter((banner) => banner.bannerType === type);
};
export const redirectByLink = (navigateTo) => {
  const isNavigatedToOtherDomain = isNavigateToOtherDomain(navigateTo);

  if (isNavigatedToOtherDomain) {
    window.location.href = navigateTo;
  }
};

export function extend(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

export function sortWithItemsFirst<T>(
  list: T[],
  filterValues: any[],
  sortField: string
): T[] {
  const sortedList = list.sort((a, b) => {
    if (filterValues.includes(a[sortField])) {
      return -1;
    }
    if (filterValues.includes(b[sortField])) {
      return 1;
    }
    return 0;
  });
  return sortedList;
}

export function sortWithItemsLast<T>(
  list: T[],
  filterValues: any[],
  sortField: string
): T[] {
  const sortedList = list.sort((a, b) => {
    if (filterValues.includes(a[sortField])) {
      return 1;
    }
    if (filterValues.includes(b[sortField])) {
      return -1;
    }
    return 0;
  });
  return sortedList;
}

export const buildParams = (data?: any) => {
  if (data) {
    const dataEdited = {
      ...data,
    };

    let queryData = {};
    try {
      queryData = Object.fromEntries(
        Object.entries(dataEdited).filter(([_, v]) => v != null && v !== '')
      );
    } catch (err) {
      console.error('Có lỗi xảy ra: ', err);
    }

    return Object.keys(queryData)
      .map((key) =>
        Array.isArray(queryData[key])
          ? `${key}=[${queryData[key]}]`
          : `${key}=${encodeURIComponent(queryData[key])}`
      )
      .join('&');
  }
  return '';
};
export const buildURLWithParam = (url: string, query?: any) => {
  return `${url}?${buildParams(query)}`;
};

export function throttle(cb, delay) {
  let wait = false;
  let storedArgs: any = null;

  function checkStoredArgs() {
    if (storedArgs == null) {
      wait = false;
    } else {
      cb(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  }

  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}

export const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const getUrlAndQueryParams = (link) => {
  const pathNameArray: any = [];
  const queryParams = {};
  let prefixUrl: string;
  if (link.includes('?')) {
    // eslint-disable-next-line prefer-destructuring
    prefixUrl = link.split('?')[0];
    const queryString = link.split('?')[1];
    const paramPairs = queryString.split('&');
    paramPairs.forEach((value) => {
      const prop = value.split('=');
      // eslint-disable-next-line prefer-destructuring
      queryParams[prop[0]] = prop[1];
    });

    const pathArray: any = prefixUrl.split('/');
    pathArray.forEach((value: any, index) => {
      if (index > 2) {
        pathNameArray.push(value);
      }
    });
  } else {
    const pathArray = link.split('/');
    pathArray.forEach((value, index) => {
      if (index > 2) {
        pathNameArray.push(value);
      }
    });
  }

  return { pathArray: pathNameArray, queryParams };
};

export function filterPartnerLogosByProductType(
  partnerLogos,
  productType: number
) {
  return partnerLogos.filter((item) => item.productTypeId === productType);
}

export const sortTwoItemByIndex = (
  firstItem,
  secondItem,
  isIncreased = true
) => {
  if (isIncreased) {
    return firstItem.index - secondItem.index;
  }
  return secondItem.index - firstItem.index;
};
