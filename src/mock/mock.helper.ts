import { ResponseData } from '~/adapters/api.helper';

export const mockApi = async <T>(
  data: T,
  code = 0,
  fetchTime = 1000
): Promise<ResponseData<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        code,
        msg: 'success',
        data,
      });
    }, fetchTime);
  });
};
