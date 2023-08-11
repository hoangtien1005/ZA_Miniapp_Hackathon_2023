import {
  GROUP_STATE_CARD_AND_LOAN,
  JOB_STATUS_TYPE,
  PRODUCT_TYPE,
  TYPE_BANNER,
} from './enums';

export const AppConstant = {
  redux: {
    GLOBAL_STATE: 'globalState',
  },
};

export const MAX_ITEMS_SHORTCUT_HOME = 8;
export const MAX_LOAN_BANNERS_HOME = 10;
export const MAX_CARD_LOGOS_HOME = 4;
export const MAX_PROMOTE_CARD_HOME = 4;

export const MAX_LOAN_LOGOS_HOME = 4;
export const MAX_INSURANCE_LOGOS_HOME = 3;

export const MAX_INSURANCE_BANNERS_HOME = 10;
export const MAX_INSURANCE_ENTRIES_HOME = 3;
export const MAX_DISCOVER_BANNERS_DISCOVER = 10;
export const MAX_NEWAPPS_BANNERS_NEWAPPS = 10;

export const MAX_PROMOTE_ITEM_NEWS = 4;
export const MAX_BANNERS_NEWS = 10;

export const MAX_ITEMS_BAR_SHORTCUT_SUB_PAGE = 8;

export const ORIGIN_URL_MINIAPP = 'https://zalo.me/s/4490932538124269434';
export const OLD_ORIGIN_URL_MINIAPP =
  'https://zalo.me/app/link/zapps/4490932538124269434';

export const BLACK_ZONE_DEFAULT_AMOUNT = 8000000;
export const MIN_LOAN_AMOUNT = 5000000;
export const MAX_LOAN_AMOUNT = 900000000;
export const STEP_LOAN_AMOUNT = 5000000;
export const DEFAULT_LOAN_AMOUNT_FEC = 15000000;

export const MAX_MINUTES_CACHE_CARDS = 10;
export const MAX_MINUTES_CACHE_ARTICLES = 10;
export const MAX_DIGITS_DESC_CARD = 150;

export const MAX_LIMIT_FETCH_ARTICLE = 4;
export const DEFAULT_OFFSET_ARTICLE = 0;
export const STEP_MORE_ARTICLES = 4;

export const MAX_PROMOTE_ITEM_LOANS = 5;
export const MAX_LOAN_BUSINESS_LOGOS_LOANS = 8;
export const MAX_LOAN_CONSUMER_LOGOS_LOANS = 8;
export const MAX_BANNERS_NEWS_LOANS = 10;

export const MAX_PROMOTE_ITEM_CARDS = 5;
export const MAX_CARD_DOMESTIC_LOGOS_CARDS = 8;
export const MAX_CARD_CREDIT_LOGOS_CARDS = 8;
export const MAX_BANNERS_NEWS_CARDS = 10;

export const MAX_BANNERS_SUB_PAGE_INSURANCES = 5;

export const MAPPING_CATEGORY_KEY_AND_BANNER_TYPE = {
  organization: TYPE_BANNER.NEWS_LOAN,
  promotion: TYPE_BANNER.NEWS_CARD,
  financial: TYPE_BANNER.NEWS_FINANCIAL,
  securities: TYPE_BANNER.NEWS_STOCK,
};

export const MAPPING_CATEGORY_KEY_AND_PRODUCT_TYPE_ID = {
  organization: PRODUCT_TYPE.LOAN,
  promotion: PRODUCT_TYPE.CARD,
  financial: PRODUCT_TYPE.INSURANCE,
  securities: PRODUCT_TYPE.SECURITIES,
};

export const MAP_GROUP_STATE_CARD_AND_LOAN_TEXT = {
  [GROUP_STATE_CARD_AND_LOAN.APPROVED]: {
    text: 'Hồ sơ đã được duyệt',
    className: 'status_done',
  },
  [GROUP_STATE_CARD_AND_LOAN.PROCESSING]: {
    text: 'Đang chờ xử lý',
    className: 'status_wait',
  },
  [GROUP_STATE_CARD_AND_LOAN.UNSUITABLE]: {
    text: 'Hồ sơ không phù hợp',
    className: 'status_fail',
  },
  [GROUP_STATE_CARD_AND_LOAN.INCOMPLETE]: {
    text: 'Hồ sơ chưa hoàn tất',
    className: 'status_unfinish',
  },
};

export const TOKEN_KEY = 'auth';

export const listNumberPhoneVietNam = [
  '032',
  '033',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '086',
  '096',
  '097',
  '098', // Viettel
  '089',
  '090',
  '093',
  '070',
  '079',
  '077',
  '076',
  '078', // Mobiphone
  '088',
  '091',
  '094',
  '083',
  '084',
  '085',
  '081',
  '082', // Vinaphone
  '092',
  '056',
  '058',
  '052', // Vietnamobile
  '099',
  '059', // G-mobile
  '087', // Itelecom
];

export const genderList = [
  { value: 1, name: 'Nam' },
  { value: 2, name: 'Nữ' },
];

export const jobVIBList = [
  { value: 14, name: 'Nhân viên văn phòng', type: JOB_STATUS_TYPE.WORKING },
  {
    value: 2,
    name: 'Bán hàng/Tiếp thị (Marketing)',
    type: JOB_STATUS_TYPE.WORKING,
  },
  { value: 10, name: 'Kỹ sư/Luật sư', type: JOB_STATUS_TYPE.WORKING },
  {
    value: 4,
    name: 'Cán bộ/Chuyên viên Khối nhà nước',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 15,
    name: 'Nhân viên Ngân hàng, Tài chính',
    type: JOB_STATUS_TYPE.WORKING,
  },
  { value: 7, name: 'Giáo viên/Giảng viên', type: JOB_STATUS_TYPE.WORKING },
  { value: 1, name: 'Bác sĩ/Nha sĩ/Dược sĩ', type: JOB_STATUS_TYPE.WORKING },
  {
    value: 30,
    name: 'Kế toán/ Kiểm toán/ Thanh tra viên/ Thẩm định viên',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 31,
    name: 'Công nhân/ Nhân viên bảo vệ',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 17,
    name: 'Tài xế, thuyền viên, thủy thủ',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 5,
    name: 'Nhân viên làm việc tại quán bar, night club, karaoke, phòng massage',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 13,
    name: 'Nhân viên thu nợ (công ty thu nợ)',
    type: JOB_STATUS_TYPE.WORKING,
  },
  {
    value: 6,
    name: 'Nhân viên sòng bạc, tiệm cầm đồ',
    type: JOB_STATUS_TYPE.WORKING,
  },
  { value: 28, name: 'Khác', type: JOB_STATUS_TYPE.WORKING },

  { value: 18, name: 'Bán buôn, bán lẻ', type: JOB_STATUS_TYPE.BOSS },
  { value: 29, name: 'Hoạt động dịch vụ khác', type: JOB_STATUS_TYPE.BOSS },
  { value: 27, name: 'Xây dựng', type: JOB_STATUS_TYPE.BOSS },
  { value: 19, name: 'Dịch vụ lưu trú và ăn uống', type: JOB_STATUS_TYPE.BOSS },
  { value: 22, name: 'Kinh doanh bất động sản', type: JOB_STATUS_TYPE.BOSS },
  {
    value: 23,
    name: 'Nghệ thuật, vui chơi và giải trí',
    type: JOB_STATUS_TYPE.BOSS,
  },
  { value: 20, name: 'Giáo dục và đào tạo', type: JOB_STATUS_TYPE.BOSS },
  {
    value: 21,
    name: 'Hoạt động tài chính, bảo hiểm',
    type: JOB_STATUS_TYPE.BOSS,
  },
  {
    value: 24,
    name: 'Quán bar, night club, karaoke, phòng massage',
    type: JOB_STATUS_TYPE.BOSS,
  },
  { value: 26, name: 'Tiệm cầm đồ, sòng bạc', type: JOB_STATUS_TYPE.BOSS },
];

export const jobSacombankList = [
  { value: 1, name: 'Nhân viên văn phòng' },
  { value: 16, name: 'Công chức nhà nước' },
  { value: 3, name: 'Bác sĩ' },
  { value: 4, name: 'Kỹ sư' },
  { value: 13, name: 'Giáo viên' },
  { value: 5, name: 'Quân đội/Công an/Cảnh sát' },
  { value: 2, name: 'Tự kinh doanh' },
  { value: 7, name: 'Tài xế' },
  { value: 14, name: 'Bảo vệ' },
  { value: 8, name: 'Công nhân' },
  { value: 12, name: 'Khác' },
];

export const maritalStatusList = [
  { value: -1, name: 'Vui lòng chọn tình trạng hôn nhân' },
  { value: 1, name: 'Độc thân' },
  { value: 2, name: 'Đã kết hôn' },
  { value: 3, name: 'Khác' },
];

export const DEFAULT_AVATAR = '/default-avatar.png';
export const IMAGE_PROXY = (url: string) =>
  `https://apoqrsgtqq.cloudimg.io/${url}`;

export const STICKERS_URL =
  'https://cdn.jsdelivr.net/gh/naptestdev/zalo-stickers/data/favourite.json';

export const FILE_ICON = (extension: string) =>
  `https://cdn.jsdelivr.net/gh/napthedev/file-icons/file/${extension}.svg`;

export const REACTIONS_UI: {
  [key: string]: {
    icon: string;
    gif: string;
  };
} = {
  Like: {
    icon: '/reactions-icon/like.svg',
    gif: '/reactions/like.gif',
  },
  Love: {
    icon: '/reactions-icon/love.svg',
    gif: '/reactions/love.gif',
  },
  Care: {
    icon: '/reactions-icon/care.svg',
    gif: '/reactions/care.gif',
  },
  Haha: {
    icon: '/reactions-icon/haha.svg',
    gif: '/reactions/haha.gif',
  },
  Wow: {
    icon: '/reactions-icon/wow.svg',
    gif: '/reactions/wow.gif',
  },
  Sad: {
    icon: '/reactions-icon/sad.svg',
    gif: '/reactions/sad.gif',
  },
  Angry: {
    icon: '/reactions-icon/angry.svg',
    gif: '/reactions/angry.gif',
  },
};

export const EMOJI_REPLACEMENT = {
  '😭': ['ToT', 'T-T', 'T_T', 'T.T', ':((', ':-(('],
  '😓': ["'-_-"],
  '😜': [';p', ';-p', ';P', ';-P'],
  '😑': ['-_-'],
  '😢': [":'(", ":'-("],
  '😞': [':(', ':-(', '=(', ')=', ':['],
  '😐': [':|', ':-|'],
  '😛': [':P', ':-P', ':p', ':-p', '=P', '=p'],
  '😁': [':D', ':-D', '=D', ':d', ':-d', '=d'],
  '😗': [':*', ':-*'],
  '😇': ['O:)', 'O:-)'],
  '😳': ['O_O', 'o_o', '0_0'],
  '😊': ['^_^', '^~^', '=)'],
  '😠': ['>:(', '>:-(', '>:o', '>:-o', '>:O', '>:-O'],
  '😎': ['8)', 'B)', '8-)', 'B-)', ':))'],
  '😚': ['-3-'],
  '😉': [';)', ';-)'],
  '😲': [':O', ':o', ':-O', ':-o'],
  '😣': ['>_<', '>.<'],
  '😘': [';*', ';-*'],
  '😕': [':/', ':-/', ':\\', ':-\\', '=/', '=\\'],
  '🙂': [':)', ':]', ':-)', '(:', '(='],
  '♥': ['<3'],
  '😂': [":')"],
  '🤑': ['$-)'],
};

export const EMOJI_REGEX = /^\p{Extended_Pictographic}$/u;

export const THEMES = [
  '#0D90F3',
  '#EB3A2A',
  '#0AD4EB',
  '#643ECB',
  '#93BF34',
  '#E84FCF',
  '#B43F3F',
  '#E6A50A',
  '#69C90C',
];
