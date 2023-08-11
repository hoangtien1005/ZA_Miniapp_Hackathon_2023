export const getLogoUrl = (size, code) => {
  const default_url = 'https://stc-fin.zdn.vn/resources/images/bank-icons/';
  const file_type = '.png';

  return `${default_url + size}/${code.toUpperCase()}${file_type}`;
};

export const getSquareLogo = (code) => {
  return getLogoUrl('150x150-1', code);
};

export const getLogo = (code) => {
  return getLogoUrl('400x100-1', code);
};
