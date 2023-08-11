import { endLoading, startLoading } from '~/adapters/store/actions/loading';

export const fetchWithGlobalLoading = async <T>(
  asyncFunc: () => Promise<T>,
  minLoadingTime = 500
) => {
  // error case: auto throw
  try {
    startLoading();
    const [data] = await Promise.all([
      asyncFunc(),
      new Promise((resolve) => {
        setTimeout(resolve, minLoadingTime);
      }),
    ]);
    return data;
  } finally {
    endLoading();
  }
};
