import { listNumberPhoneVietNam } from '~/constants';

export function validateOnlyNormalCharacter(char: string) {
  return /^[A-Za-z0-9]*$/.test(char);
}

export function validateExpiredTime(date?: Date | string) {
  if (!date) return true;
  if (typeof date === 'string') {
    return new Date(date).toISOString() < new Date().toISOString();
  }
  return date.toISOString() < new Date().toISOString();
}

export function validateMaxLength(char: string, maxLength: number) {
  return char.length <= maxLength;
}

export function validateUtf8(str: string) {
  return /[^a-zA-Z '\u00C0-\u01B0\u1EA0-\u1EFF]/g.test(str); // do not define constant regex, it's not pure
}

export function isValidURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

export function isNavigateToOtherDomain(url: any) {
  if (url && isValidURL(url)) {
    return true;
  }
  return false;
}

export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}

export function isEmptyArray(arr: any[]) {
  return arr?.length === 0;
}

export function isNumber(value: any) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function validateIc(value, validLength = [9, 12]) {
  const trimValue = value && value.trim();
  let isError = false;
  if (
    trimValue &&
    (!validLength.includes(trimValue.length) || /[^0-9]/.test(trimValue))
  ) {
    isError = true;
  }
  return !isError;
}

export function validateAllWhiteSpace(value) {
  const validatedValue = value || '';
  let isAllWhiteSpace = false;

  if (validatedValue.trim() === '' && validatedValue !== '') {
    isAllWhiteSpace = true;
  }

  return !isAllWhiteSpace;
}

export function validateDatetimeNotExceedNow(time: Date) {
  const timeValue = time.getTime();
  let isError = false;

  if (Date.now() < timeValue) {
    isError = true;
  }

  return !isError;
}

export function validatePhone(phone: string) {
  const validatedValue = phone || '';

  let isError = false;

  if (validatedValue && validatedValue.length !== 10) {
    isError = true;
  } else if (validatedValue.length === 10) {
    isError = !listNumberPhoneVietNam.some((prefix) =>
      validatedValue.startsWith(prefix)
    );
  }
  return !isError;
}

export function duplicateWithUserPhone(phone: string, userPhone) {
  const validatedPhoneValue = phone.trim() || '';
  let isError = false;
  if (validatedPhoneValue === userPhone) {
    isError = true;
  }
  return !isError;
}

export function validateEmail(email: string) {
  const validatedValue = email || '';

  let isError = false;

  const atIndex = validatedValue.indexOf('@');
  const dotIndex = validatedValue.indexOf('.');
  if (atIndex > -1 && atIndex + 1 === dotIndex) {
    isError = true;
  }

  return !isError;
}

export function validateCompanyName(value) {
  const validatedValue = value || '';
  let isError = false;

  const regex =
    // eslint-disable-next-line no-useless-escape
    /[^a-zA-Z0-9!@#$%^&*()+=._\-\\\/" \u00C0-\u00C3\u00C8-\u00CA\u00CC-\u00CD\u00D0\u00D2-\u00D5\u00D9-\u00DA\u00DD\u00E0-\u00E3\u00E8-\u00EA\u00EC-\u00ED\u00F2-\u00F5\u00F9-\u00FA\u00FD\u0102-\u0103\u0110-\u0111\u0128-\u0129\u0130\u0168-\u0169\u0189\u01A0-\u01A1\u01AF-\u01B0\u1EA0-\u1EF9\u1FB8]/g;

  if (regex.test(validatedValue)) {
    isError = true;
  }
  return !isError;
}

export function isDate(myDate) {
  return myDate.constructor.toString().indexOf('Date') > -1;
}
