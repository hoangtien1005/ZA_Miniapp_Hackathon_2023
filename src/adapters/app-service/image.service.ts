import { BaseApiService } from '../baseApi.service';

class TokenizeImageService extends BaseApiService {
  getTokenizeImage(src) {
    return super
      .get(src)
      .then((res) => res.blob())
      .then((blob) => {
        return URL.createObjectURL(blob);
      })
      .catch((err) => {
        if (err) {
          console.log('Error get image: ', err);
        }
        return [];
      });
  }
}

export const useTokenizeImageServiceService = () => new TokenizeImageService();
