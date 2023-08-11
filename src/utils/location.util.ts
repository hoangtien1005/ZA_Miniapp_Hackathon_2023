import { Location } from 'react-router-dom';

export const isFirstAccessPath = (location: Location) => {
  return location.key === 'default';
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
